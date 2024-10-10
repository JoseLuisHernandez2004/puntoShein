import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(email: string, password: string): Promise<User> {
    const newUser = new this.userModel({ email, password });
    return newUser.save();  // Esto guarda el nuevo usuario en la base de datos
  }
}
