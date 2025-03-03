import { ObjectId, Schema, model } from 'mongoose';

export interface IPacket {
  _id: ObjectId;
  name: string;
  description: string;
  status: string;
}

const packetSchema = new Schema<IPacket>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, required: true },
});

export const PacketModel = model("Packet", packetSchema);