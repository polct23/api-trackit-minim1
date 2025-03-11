import {ObjectId, Schema, model} from 'mongoose';

export interface IUser {
  _id?: ObjectId;
  name: string;
  email: string;
  password: string;
  phone: string;
  available: boolean;
  packets: ObjectId[];
}

const userSchema = new Schema<IUser>({
  name: {
    type: String, 
    required: true
  },

  email: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true
  },

  phone: {
    type: String,
     required: true
  },

  available: {
    type: Boolean,
    required: true,
    default: true
  },
  
  packets: [{type: Schema.Types.ObjectId, ref: "Packet"}],
});

export const UserModel = model("User", userSchema);