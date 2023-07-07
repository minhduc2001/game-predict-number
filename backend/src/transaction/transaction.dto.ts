import { ListDto } from '@/shared/dtos/common.dto';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ESelection, EServer, EVXMM } from './transaction.enum';
import { Trim } from '@/base/decorators/common.decorator';
import { User } from '@/user/entities/user.entity';

export class ListTransactionDto extends ListDto {}

export class SetTransactionDto {
  @ApiProperty({ example: EServer.HaNoi })
  @IsEnum(EServer)
  //   @IsOptional()
  @IsNotEmpty()
  server: EServer;

  @ApiProperty({ example: EVXMM.Normal })
  @IsEnum(EVXMM)
  @IsOptional()
  vxmm: EVXMM;

  @ApiProperty({ example: '10000' })
  @IsString()
  @IsNotEmpty()
  @Trim()
  xu_dat: string;

  @ApiProperty({ example: ESelection.Chan })
  @IsEnum(ESelection)
  @IsNotEmpty()
  selection: ESelection;

  @ApiHideProperty()
  @IsOptional()
  user: User;
}
