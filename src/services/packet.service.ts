import { IPacket, PacketModel } from '../models/packet';

export class PacketService {
    async postPacket(packet: Partial<IPacket>): Promise<IPacket> {
        const newPacket = new PacketModel(packet);
        return await newPacket.save();
    }

    async getAllPackets(page: number, limit: number): Promise<{ 
            totalPackets: number; 
            totalPages: number; 
            currentPage: number; 
            data: IPacket[]; 
        }> {
            const skip = (page - 1) * limit;
        
            const totalPackets = await PacketModel.countDocuments();
        
            const users = await PacketModel.find().skip(skip).limit(limit);
        
            return {
                totalPackets,
                totalPages: Math.ceil(totalPackets / limit),
                currentPage: page,
                data: users,
            };
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