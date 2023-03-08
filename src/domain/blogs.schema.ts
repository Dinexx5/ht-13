import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { IsUrl, Length } from 'class-validator';

export type BlogDocument = HydratedDocument<Blog>;

@Schema()
export class Blog {
  @Prop()
  _id: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop()
  isMembership: boolean;

  @Prop({ required: true })
  websiteUrl: string;

  @Prop()
  createdAt: string;
}

export const BlogSchema = SchemaFactory.createForClass(Blog);

export class createBlogModel {
  @Length(0, 15)
  name: string;
  @Length(0, 500)
  description: string;
  @IsUrl()
  websiteUrl: string;
}

export class updateBlogModel {
  @Length(0, 15)
  name: string;
  @Length(0, 500)
  description: string;
  @IsUrl()
  websiteUrl: string;
}

export class blogViewModel {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public isMembership: boolean,
    public websiteUrl: string,
    public createdAt: string,
  ) {}
}
