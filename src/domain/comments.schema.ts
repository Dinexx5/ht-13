import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type CommentDocument = HydratedDocument<Comment>;

@Schema()
export class LikingUsers {
  @Prop()
  _id: mongoose.Schema.Types.ObjectId;
  @Prop()
  myStatus: string;
}

@Schema()
export class LikesInfo {
  @Prop()
  likesCount: number;
  @Prop()
  dislikesCount: number;
}

@Schema()
export class CommentatorModel {
  @Prop()
  userId: string;
  @Prop()
  userLogin: string;
}

@Schema()
export class Comment {
  @Prop()
  _id: mongoose.Schema.Types.ObjectId;
  @Prop({ required: true })
  content: string;
  @Prop()
  commentatorInfo: CommentatorModel;
  @Prop()
  createdAt: string;
  @Prop()
  likingUsers: LikingUsers[];
  @Prop()
  postId: string;
  @Prop()
  likesInfo: LikesInfo;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);

export class createCommentModel {
  content: string;
}

export class commentViewModel {
  constructor(
    public id: string,
    public content: string,
    public commentatorInfo: {
      userId: string;
      userLogin: string;
    },
    public createdAt: string,
    public likesInfo: {
      likesCount: number;
      dislikesCount: number;
      myStatus: string;
    },
  ) {}
}
