import mongoose, { Schema } from 'mongoose';
import { IUser } from '../interfaces/user.interface';
import { Utils } from '../utils/utils';
import * as bcrypt from 'bcrypt';
import { uuid } from 'uuidv4';


const UserSchema:Schema = new Schema({
    uuid: {
        type: String
    },
    name: {
        type: String, 
        required: true,
        minlength: 3
    },
    username: {
        type: String, 
        required: true,
        unique: true,
        minlength: 3
    },
    email: {
        type: String, 
        required: true,
        unique: true,
        validate: Utils.validateEmail,
        lowercase: true,
    },
    password: {
        type: String, 
        required: true,
        minlength: 3,
        select: false
    },
    passwordResetToken: {
        type: String, 
        select: false, 
    },
    passwordResetExpires: {
        type: Date,
        select: false,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }  
});

UserSchema.pre<IUser>('save', async function(next) {
    const hash = await bcrypt.hash(this.password.toString(), 10);
    this.password = hash;

    this.uuid = uuid();

    next();
});

export default mongoose.model<IUser>('User', UserSchema);