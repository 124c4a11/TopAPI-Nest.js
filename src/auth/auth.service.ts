import { Injectable } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { genSaltSync, hashSync } from 'bcryptjs';
import { InjectModel } from 'nestjs-typegoose';

import { AuthDto } from './dto/auth.dto';
import { UserModel } from './user.model';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(UserModel) private readonly userModel: ModelType<UserModel>,
  ) {}

  async createUser({ login, password}: AuthDto) {
    const salt = genSaltSync(10);
    const newUser = new this.userModel({
      email: login,
      passwordHash: hashSync(password, salt),
    });

    return newUser.save();
  }

  async findUser(email: string) {
    return this.userModel.findOne({ email }).exec();
  }
}
