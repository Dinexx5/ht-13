import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type PostDocument = HydratedDocument<Post>;

@Schema()
export class LikingUsers {
  @Prop()
  _id: mongoose.Schema.Types.ObjectId;
  @Prop()
  myStatus: string;
}

@Schema()
export class ExtendedLikesInfo {
  @Prop()
  likesCount: number;
  @Prop()
  dislikesCount: number;
}

@Schema()
export class LikeModel {
  @Prop()
  addedAt: string;
  @Prop()
  userId: string;
  @Prop()
  login: string;
}

@Schema()
export class Post {
  @Prop()
  _id: mongoose.Schema.Types.ObjectId;
  @Prop({ required: true })
  title: string;
  @Prop({ required: true })
  shortDescription: string;
  @Prop({ required: true })
  content: string;
  @Prop()
  blogId: string;
  @Prop()
  blogName: string;
  @Prop()
  createdAt: string;
  @Prop()
  likingUsers: LikingUsers[];
  @Prop()
  likes: LikeModel[];
  @Prop()
  extendedLikesInfo: ExtendedLikesInfo;
}

export const PostSchema = SchemaFactory.createForClass(Post);

export class createPostModel {
  constructor(
    public title: string,
    public shortDescription: string,
    public content: string,
  ) {}
}

export class createPostInputModelWithBlogId {
  constructor(
    public title: string,
    public shortDescription: string,
    public content: string,
    public blogId: string,
  ) {}
}

export class updatePostModel {
  constructor(
    public title: string,
    public shortDescription: string,
    public content: string,
    public blogId: string,
  ) {}
}

export class postViewModel {
  constructor(
    public id: string,
    public title: string,
    public shortDescription: string,
    public content: string,
    public blogId: string,
    public blogName: string,
    public createdAt: string,
    public extendedLikesInfo: {
      likesCount: number;
      dislikesCount: number;
      myStatus: string;
      newestLikes: LikeModel[];
    },
  ) {}
}
