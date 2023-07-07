import { BaseService } from '@/base/service/base.service';
import { Injectable } from '@nestjs/common';
import { Session } from './session.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SessionService extends BaseService<Session> {
  constructor(
    @InjectRepository(Session) protected repository: Repository<Session>,
  ) {
    super(repository);
  }

  async getOne(id: number) {
    return this.repository.findOne({ where: { phien: id.toString() } });
  }

  async getTurn() {
    const session = await this.repository
      .createQueryBuilder('session')
      .orderBy({ id: 'DESC' })
      .limit(1)
      .getMany();
    return session[0];
  }

  async getCltx() {
    const session = await this.repository
      .createQueryBuilder('session')
      .orderBy({ id: 'DESC' })
      // .select(['res_cl', 'res_tx'])
      .limit(10)
      .getMany();

    const cl = [];
    const tx = [];
    for (const val of session) {
      if (val.res_cl) cl.push(0);
      else cl.push(1);
      if (val.res_tx) tx.push(0);
      else tx.push(1);
    }

    return {
      cl: cl,
      tx: tx,
    };
  }

  async createSession() {
    try {
      console.log('vao day');

      const preSession = await this.repository
        .createQueryBuilder('session')
        .orderBy({ id: 'DESC' })
        .limit(1)
        .getMany();

      const newSession = this.repository.create();
      newSession.coinPrev = preSession[0]?.coin ?? '0';
      newSession.coin = '0';
      await newSession.save();

      return {
        ...newSession,
        totalCoin: preSession?.[0]?.totalCoin ?? '0',
      };
    } catch (error) {
      console.log(error.message, 'lsakjkj');

      return false;
    }
  }

  async randomCoin() {
    const session = await this.getTurn();
    const coinRandom = Math.floor(Math.random() * 9999999) + 1000000;
    session.coinRandom = coinRandom.toString();
    await session.save();
    return session.coinRandom;
  }

  async totalCoin() {
    const session = await this.getTurn();
    session.setTotalCoin();
    await session.save();
    console.log(session, 'dsjaksjk');
    return session;
  }

  async setCoin(coin: string) {
    const session = await this.getTurn();
    session.coin = String(Number(session.coin) + Number(coin));
    await session.save();
    return session;
  }

  async setRes() {
    const session = await this.getTurn();
    session.setResCoin(session.totalCoin);
    await session.save();
    return session;
  }
}
