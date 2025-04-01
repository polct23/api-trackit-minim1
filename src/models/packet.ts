import { ObjectId, Schema, model } from 'mongoose';
import { ICategory } from './category';

export interface IPacket {
  _id: ObjectId;
  name: string;
  description: string;
  status: string;
  categories: ObjectId[]; // Relación con Category
}

const packetSchema = new Schema<IPacket>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, required: true },
  categories: [{ type: Schema.Types.ObjectId, ref: "Category" }], // Relación
});

export const PacketModel = model("Packet", packetSchema);