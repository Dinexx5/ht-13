import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class emailConfirmationSchema {
  @Prop()
  confirmationCode: string;
  @Prop()
  expirationDate: Date;
  @Prop()
  isConfirmed: boolean;
  @Prop()
  createdAt: string;
}
@Schema()
export class passwordRecoverySchema {
  @Prop({ default: null })
  recoveryCode: string;
  @Prop({ default: null })
  expirationDate: Date;
}

@Schema()
export class accountDataSchema {
  @Prop()
  login: string;
  @Prop()
  email: string;
  @Prop()
  createdAt: string;
  @Prop()
  passwordHash: string;
}

@Schema()
export class User {
  @Prop()
  _id: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  accountData: accountDataSchema;

  @Prop({ required: true })
  emailConfirmation: emailConfirmationSchema;

  @Prop({ required: true })
  passwordRecovery: passwordRecoverySchema;
}

export const UserSchema = SchemaFactory.createForClass(User);

export class userViewModel {
  constructor(
    public id: string,
    public login: string,
    public email: string,
    public createdAt: string,
  ) {}
}
