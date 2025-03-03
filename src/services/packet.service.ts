import { IPacket, PacketModel } from '../models/packet';

export class PacketService {
    async postPacket(packet: Partial<IPacket>): Promise<IPacket> {
        const newPacket = new PacketModel(packet);
        return await newPacket.save();
    }

    async getAllPackets(): Promise<IPacket[]> {
        return await PacketModel.find();
    }

    async getPacketById(id: string): Promise<IPacket | null> {
        return await PacketModel.findById(id);
    }

    async updatePacketById(id: string, packet: Partial<IPacket>): Promise<IPacket | null> {
        return await PacketModel.findByIdAndUpdate(id, packet, { new: true });
    }

    async deletePacketById(id: string): Promise<IPacket | null> {
        return await PacketModel.findByIdAndDelete(id);
    }
}

export default new PacketService();