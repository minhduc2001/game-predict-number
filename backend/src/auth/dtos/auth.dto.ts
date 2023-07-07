import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
export class LoginDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'email không được để trống' })
  @Transform(({ value }) => value && value.trim())
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'USER011101' })
  @IsString()
  password: string;
}

export class RegisterDto extends LoginDto {}
