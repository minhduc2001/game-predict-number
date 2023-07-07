import { AbstractEntity } from '@/base/service/abstract-entity.service';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from 'typeorm';
import { ESelection, EServer, EStatus, EVXMM } from './transaction.enum';
import { User } from '@/user/entities/user.entity';
import { Session } from '@/session/session.entity';

@Entity()
export class Transaction extends AbstractEntity {
  @Column({ type: 'enum', enum: EVXMM, default: EVXMM.Normal })
  vxmm: EVXMM;

  @Column({ type: 'enum', enum: EServer, default: EServer.HaNoi })
  server: EServer;

  @Column({ nullable: false })
  xu_dat: string;

  @Column({ type: 'enum', enum: EStatus, default: EStatus.Pending })
  status: EStatus;

  @Column({ nullable: true, default: null })
  xu_an: string;

  @Column({ type: 'enum', enum: ESelection, nullable: false })
  selection: ESelection;

  @ManyToOne(() => User, (user) => user.transactions)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Session, (session) => session.transactions)
  @JoinColumn()
  session: Session;
}
