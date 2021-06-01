import { Document } from 'mongoose';

export interface IUser extends Document {
    uuid: string;
    name: string;
    username: string;
    email: string;
    password: string;
    passwordResetToken: string;
    passwordResetExpires: Date;
    createdAt: Date; 
}

export interface IUserInput extends Omit<IUser, "passwordResetToken" | 
                                                "passwordResetExpires" | 
                                                "createdAt">{}

//export interface IuserResponse extends Omit<IuserInput, "password">{}
export interface IUserResponse {
    uuid: string;
    name: string;
    username: string;
    email: string;
    password?: string;
}