import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import * as exc from '@base/api/exception.reslover';
import { UserService } from '@/user/user.service';
import { LoginDto, RegisterDto } from './dtos/auth.dto';
import { IJWTPayload } from './interfaces/auth.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(username);
    if (user && user.comparePassword(pass)) {
      delete user.password;
      return user;
    }
    return null;
  }

  async login(dto: LoginDto): Promise<any> {
    const { email, password } = dto;
    const user = await this.userService.getUserByUniqueKey({ email });
    if (!user || !user.comparePassword(password))
      throw new exc.BadException({
        message: 'email or password does not exists',
      });
    const payload: IJWTPayload = {
      sub: user.id,
    };
    const accessToken = this.jwtService.sign(payload);

    return {
      ...user,
      accessToken: accessToken,
    };
  }

  async register(dto: RegisterDto) {
    const isExists = await this.userService.getUserByUniqueKey({
      email: dto.email,
    });
    if (isExists)
      throw new exc.BadException({ message: 'email already is use' });

    const user = await this.userService.createUser(dto);
    const payload: IJWTPayload = {
      sub: user.id,
    };
    const accessToken = this.jwtService.sign(payload);
    return {
      ...user,
      accessToken: accessToken,
    };
  }

  thirdPartyLogin(data: any) {}
}
