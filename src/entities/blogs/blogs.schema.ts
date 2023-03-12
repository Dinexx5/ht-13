import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { IsNotEmpty, IsString, IsUrl, Length } from 'class-validator';
import { Transform } from 'class-transformer';

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
  @IsString()
  @IsNotEmpty()
  @Length(0, 15)
  @Transform(({ value }) => value?.trim?.())
  name: string;
  @IsString()
  @IsNotEmpty()
  @Length(0, 500)
  @Transform(({ value }) => value?.trim?.())
  description: string;
  @IsNotEmpty()
  @IsUrl()
  websiteUrl: string;
}

export class updateBlogModel {
  @IsString()
  @IsNotEmpty()
  @Length(0, 15)
  @Transform(({ value }) => value?.trim?.())
  name: string;
  @IsString()
  @IsNotEmpty()
  @Length(0, 500)
  @Transform(({ value }) => value?.trim?.())
  description: string;
  @IsNotEmpty()
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
