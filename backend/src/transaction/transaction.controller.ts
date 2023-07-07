import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { ListTransactionDto, SetTransactionDto } from './transaction.dto';
import { GetUser } from '@/auth/decorator/get-user.decorator';
import { User } from '@/user/entities/user.entity';
import { JwtAuthGuard } from '@/auth/guard/jwt-auth.guard';
import { Public } from '@/auth/decorator/public.decorator';

@UseGuards(JwtAuthGuard)
@Controller('transaction')
export class TransactionController {
  constructor(private service: TransactionService) {}

  @Get()
  @Public()
  listTran(@Query() query: ListTransactionDto) {
    return this.service.listTransaction(query);
  }

  @Post()
  set(@Body() dto: SetTransactionDto, @GetUser() user: User) {
    return this.service.set({ ...dto, user: user });
  }
}
