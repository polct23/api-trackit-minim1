import { IPacket, PacketModel } from '../models/packet';

export class PacketService {
    async postPacket(packet: Partial<IPacket>): Promise<IPacket> {
        const newPacket = new PacketModel(packet);
        return await newPacket.save();
    }

    async getAllPackets(page: number, limit: number): Promise<{ 
            totalUsers: number; 
            totalPages: number; 
            currentPage: number; 
            data: IPacket[]; 
        }> {
            const skip = (page - 1) * limit;
        
            const totalUsers = await PacketModel.countDocuments();
        
            const users = await PacketModel.find().skip(skip).limit(limit);
        
            return {
                totalUsers,
                totalPages: Math.ceil(totalUsers / limit),
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