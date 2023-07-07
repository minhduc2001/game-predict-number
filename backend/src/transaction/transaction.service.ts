import { ListTransactionDto, SetTransactionDto } from './transaction.dto';
import { BaseService } from '@/base/service/base.service';
import { Injectable } from '@nestjs/common';
import { Transaction } from './transaction.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginateConfig } from '@/base/service/paginate/paginate';
import { SessionService } from '@/session/session.service';
import { EStatus } from './transaction.enum';
import { UserService } from '@/user/user.service';

@Injectable()
export class TransactionService extends BaseService<Transaction> {
  constructor(
    @InjectRepository(Transaction)
    protected repository: Repository<Transaction>,
    private sessionService: SessionService,
    private userService: UserService,
  ) {
    super(repository);
  }

  async listTransaction(query: ListTransactionDto) {
    const config: PaginateConfig<Transaction> = {
      sortableColumns: ['createdAt'],
      defaultSortBy: [['createdAt', 'DESC']],
    };

    const queryB = this.repository
      .createQueryBuilder('transaction')
      .leftJoinAndSelect('transaction.user', 'user');

    return this.listWithPage(query, config, queryB);
  }

  async set(dto: SetTransactionDto) {
    const transaction = this.repository.create(dto);
    const session = await this.sessionService.getTurn();
    session.coin = String(Number(transaction.xu_dat) + Number(session.coin));
    transaction.session = session;
    await session.save();
    return transaction.save();
  }

  async setRes(): Promise<void> {
    const session = await this.sessionService.getTurn();
    const transactions = await this.repository.find({
      where: { session: { id: session.id } },
      relations: { user: true },
    });

    for (const transaction of transactions) {
      let res = false;

      if (session.res_cl && transaction.selection == 0) res = true;
      if (!session.res_cl && transaction.selection == 1) res = true;

      if (session.res_tx && transaction.selection == 2) res = true;
      if (!session.res_tx && transaction.selection == 3) res = true;

      transaction.status = res ? EStatus.Win : EStatus.Lose;
      transaction.xu_an = res
        ? Math.floor(
            Number(transaction.xu_dat) + Number(transaction.xu_dat) * (9 / 10),
          ).toString()
        : '0';

      await transaction.save();

      await this.userService.updateCoin(transaction.user.id, transaction.xu_an);
    }
  }
}
