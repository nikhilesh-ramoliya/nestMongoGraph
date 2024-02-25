import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Admin, AdminSchema } from 'src/admin/admin.model';
import { Book, BookSchema } from 'src/admin/book.model';
import { AdminResolver } from './admin.resolver';
import { AdminService } from './admin.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Admin.name,
        schema: AdminSchema,
      },
      {
        name: Book.name,
        schema: BookSchema,
      },
    ]),
  ],
  providers: [AdminResolver, AdminService],
})
export class AdminModule {}
