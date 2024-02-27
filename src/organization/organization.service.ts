import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, Schema, Types } from 'mongoose';
import {
  AddToOrganizationInput,
  RemoveFromOrganizationInput,
} from 'src/organization/dto/add-to-organization.input';
import { Organization } from 'src/organization/organization.model';
import { CreateOrganizationInput } from './dto/create-organization.input';
import { UpdateOrganizationInput } from './dto/update-organization.input';

@Injectable()
export class OrganizationService {
  constructor(
    @InjectModel('Organization')
    private readonly organizationModel: Model<Organization>,
  ) {}

  async create(
    createOrganizationInput: CreateOrganizationInput,
    createdById: Schema.Types.ObjectId,
  ) {
    const organization = new this.organizationModel({
      _id: new mongoose.Types.ObjectId(),
      name: createOrganizationInput.name,
      createdById,
      users: [
        {
          user: createdById,
          role: 'admin',
        },
      ],
    });

    return organization.save();
  }

  async addToOrg(addToOrgInput: AddToOrganizationInput) {
    const oldOrg = await this.organizationModel.findById(
      new Types.ObjectId(addToOrgInput._id),
    );

    if (
      oldOrg.users.find((u) => u.user === new Types.ObjectId(addToOrgInput._id))
    ) {
      return oldOrg;
    } else {
      const org = await this.organizationModel.findByIdAndUpdate(
        new Types.ObjectId(addToOrgInput._id),
        {
          $addToSet: {
            users: {
              user: new Types.ObjectId(addToOrgInput.userId),
              role: addToOrgInput.role,
            },
          },
        },
        { new: true },
      );
      return org;
    }
  }

  async updateUserRole(addToOrgInput: AddToOrganizationInput) {
    const org = await this.organizationModel.findByIdAndUpdate(
      new Types.ObjectId(addToOrgInput._id),
      {
        $set: {
          'users.$[elem].role': addToOrgInput.role,
        },
      },
      {
        arrayFilters: [
          {
            'elem.user': new Types.ObjectId(addToOrgInput.userId),
          },
        ],
        new: true,
      },
    );
    return org;
  }

  async removeFromOrg(addToOrgInput: RemoveFromOrganizationInput) {
    const org = await this.organizationModel.findByIdAndUpdate(
      new Types.ObjectId(addToOrgInput._id),
      {
        $pull: {
          users: {
            user: new Types.ObjectId(addToOrgInput.userId),
          },
        },
      },
      { new: true },
    );
    return org;
  }

  findAll() {
    return this.organizationModel.find({});
  }

  async findOne(id: string) {
    const org = await this.organizationModel.findById(new Types.ObjectId(id));
    return org;
  }

  async update(updateOrganizationInput: UpdateOrganizationInput) {
    const id = new Types.ObjectId(updateOrganizationInput._id);

    const updatedOrg = await this.organizationModel.findByIdAndUpdate(id, {
      name: updateOrganizationInput.name,
    });

    return updatedOrg;
  }

  remove(id: string) {
    return this.organizationModel.findByIdAndDelete(new Types.ObjectId(id));
  }
}
