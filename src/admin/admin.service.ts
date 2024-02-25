import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Admin } from 'src/admin/admin.model';
import { Book } from 'src/admin/book.model';
import { CreateAdminInput, PaginatedArgs } from './dto/create-admin.input';
import { UpdateAdminInput } from './dto/update-admin.input';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel('Admin') private readonly userModel: Model<Admin>,
    @InjectModel('Book') private readonly bookModel: Model<Book>,
  ) {}

  create(createAdminInput: CreateAdminInput) {
    const admin = new this.userModel(createAdminInput);
    return admin.save();
  }

  async findAll(args: PaginatedArgs) {
    const book = await this.bookModel.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId('65d980a673b8ded07444b388'),
        },
      },
      {
        $lookup: {
          from: 'admins',
          localField: 'readers',
          foreignField: '_id',
          as: 'readers',
        },
      },
    ]);

    const urss = await this.userModel.aggregate([
      {
        $lookup: {
          from: 'books',
          foreignField: '_id',
          localField: 'books',
          as: 'books',
        },
      },
    ]);
    // .populate('books');
    return urss;
  }

  findOne(id: number) {
    return `This action returns a #${id} admin`;
  }

  update(id: number, updateAdminInput: UpdateAdminInput) {
    return `This action updates a #${id} admin`;
  }

  remove(id: number) {
    return `This action removes a #${id} admin`;
  }
}
