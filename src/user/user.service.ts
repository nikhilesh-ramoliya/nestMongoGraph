import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import { ObjectId } from 'mongodb';
import mongoose, { Model } from 'mongoose';
import { User } from 'src/user/entities/user.model';
import { SignInUserInput } from 'src/user/user.resolver';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  create(createUserInput: CreateUserInput) {
    const user = new this.userModel({
      _id: new mongoose.Types.ObjectId(),
      ...createUserInput,
    });
    return user.save();
  }

  findAll() {
    return this.userModel.find({});
  }

  async signIn(args: SignInUserInput) {
    const user = await this.userModel.findOne({
      email: args.email,
    });

    const isCorrectPss = await bcrypt.compare(args.password, user.password);
    if (isCorrectPss) {
      return user;
    } else null;
  }

  async findOne(id: ObjectId) {
    const user = await this.userModel.findById(new mongoose.Types.ObjectId(id));
    return user;
  }

  async update(id: string, updateUserInput: Omit<UpdateUserInput, '_id'>) {
    if (updateUserInput?.password) {
      const password = await bcrypt.hash(updateUserInput.password, 10);
      updateUserInput.password = password;
    }

    const user = await this.userModel.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(id) },
      updateUserInput,
      { new: true },
    );
    return user;
  }

  remove(id: ObjectId) {
    return this.userModel.findByIdAndDelete(id);
  }
}
