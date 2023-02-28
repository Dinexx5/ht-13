import mongoose, { HydratedDocument } from 'mongoose';
export type BlogDocument = HydratedDocument<Blog>;
export declare class Blog {
    _id: mongoose.Schema.Types.ObjectId;
    name: string;
    description: string;
    isMembership: boolean;
    websiteUrl: string;
    createdAt: string;
}
export declare const BlogSchema: mongoose.Schema<Blog, mongoose.Model<Blog, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Blog>;
export declare class createBlogModel {
    name: string;
    description: string;
    websiteUrl: string;
    constructor(name: string, description: string, websiteUrl: string);
}
export declare class updateBlogModel {
    name: string;
    description: string;
    websiteUrl: string;
    constructor(name: string, description: string, websiteUrl: string);
}
export declare class blogViewModel {
    id: string;
    name: string;
    description: string;
    isMembership: boolean;
    websiteUrl: string;
    createdAt: string;
    constructor(id: string, name: string, description: string, isMembership: boolean, websiteUrl: string, createdAt: string);
}
