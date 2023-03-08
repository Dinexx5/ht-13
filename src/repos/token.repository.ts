import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Token, TokenDocument } from '../domain/token.schema';

@Injectable()
export class TokenRepository {
  constructor(@InjectModel(Token.name) private tokenModel: Model<TokenDocument>) {}

  async findToken(exp: string): Promise<TokenDocument | null> {
    const foundToken = await this.tokenModel.findOne({ expiredAt: exp });
    if (!foundToken) return null;
    return foundToken;
  }

  async save(instance: any) {
    instance.save();
  }
}
