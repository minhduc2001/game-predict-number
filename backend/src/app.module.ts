import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// BASE
import { config } from '@/config';
import { LoggerModule } from '@base/logger/logger.module';
import { dbConfig } from '@base/db/db.config';
import { MailerModule } from '@base/mailer/mailer.module';

// APPS
import { UserModule } from '@/user/user.module';
import { AuthModule } from '@/auth/auth.module';
import { RoleModule } from '@/role/role.module';

// SHARED
import { SeedersModule } from '@shared/seeder/seeder.module';
import { SocketModule } from './socket/socket.module';
import { TransactionModule } from './transaction/transaction.module';
import { SessionModule } from './session/session.module';

const appModule = [
  SocketModule,
  AuthModule,
  UserModule,
  RoleModule,
  MailerModule,
];
const baseModule = [LoggerModule];

@Module({
  imports: [
    ...baseModule,
    ...appModule,
    TypeOrmModule.forRoot(dbConfig),
    SeedersModule,
    TransactionModule,
    SessionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
