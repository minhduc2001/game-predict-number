import { AbstractEntity } from '@/base/service/abstract-entity.service';
import { Transaction } from '@/transaction/transaction.entity';
import { Column, Entity, ManyToMany, OneToMany } from 'typeorm';

@Entity()
export class Session extends AbstractEntity {
  @Column({ default: new Date().getTime() })
  phien: string;

  @Column({ nullable: true, default: null })
  coinRandom: string;

  @Column({ nullable: true, default: 0 })
  coin: string;

  @Column({ nullable: true, default: 0 })
  coinPrev: string;

  @Column({ nullable: true })
  totalCoin: string;

  @Column({ type: 'boolean', nullable: true, default: null })
  res_cl: boolean;

  @Column({ type: 'boolean', nullable: true, default: null })
  res_tx: boolean;

  @OneToMany(() => Transaction, (transaction) => transaction.session)
  transactions: Transaction[];

  setTotalCoin() {
    this.totalCoin = String(
      Number(this.coin) + Number(this.coinPrev) + Number(this.coinRandom),
    );
    console.log(this.totalCoin, 'jkshdkahdisdijasldjlasjidoisj');
  }
  setResCoin(coin: string) {
    let total = 0;
    for (let i = 0; i < coin.length; i++) {
      total += Number(coin[i]);
    }
    this.res_cl = false;
    this.res_tx = false;
    console.log(Number(total.toString().slice(-1)), 'ajshjkhjk');
    if (Number(total.toString().slice(-1)) >= 5) this.res_tx = true;
    if (Number(total.toString().slice(-1)) % 2 == 0) this.res_cl = true;
  }
}
