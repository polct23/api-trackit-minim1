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
        const packets = await PacketModel.find().skip(skip).limit(limit);
        return {
            totalPackets,
            totalPages: Math.ceil(totalPackets / limit),
            currentPage: page,
            data: packets,
        };
    }

    async getPacketById(id: string): Promise<IPacket | null> {
        return await PacketModel.findById(id).populate('categories');
    }

    async updatePacketById(id: string, packet: Partial<IPacket>): Promise<IPacket | null> {
        return await PacketModel.findByIdAndUpdate(id, packet, { new: true }).populate('categories');
    }

    async deletePacketById(id: string): Promise<IPacket | null> {
        return await PacketModel.findByIdAndDelete(id);
    }

    async addCategoryToPacket(packetId: string, categoryId: string): Promise<IPacket | null> {
        return await PacketModel.findByIdAndUpdate(
            packetId,
            { $addToSet: { categories: categoryId } },
            { new: true }
        ).populate('categories');
    }

    async deleteCategoryFromPacket(packetId: string, categoryId: string): Promise<IPacket | null> {
        return await PacketModel.findByIdAndUpdate(
            packetId,
            { $pull: { categories: categoryId } },
            { new: true }
        ).populate('categories');
    }

    async searchPacketsByCategory(categoryId: string, page: number, limit: number): Promise<{ 
        totalPackets: number; 
        totalPages: number; 
        currentPage: number; 
        data: IPacket[]; 
    }> {
        const skip = (page - 1) * limit;
        const totalPackets = await PacketModel.countDocuments({ categories: categoryId });
        const packets = await PacketModel.find({ categories: categoryId })
            .skip(skip)
            .limit(limit)
            .populate('categories');
        return {
            totalPackets,
            totalPages: Math.ceil(totalPackets / limit),
            currentPage: page,
            data: packets,
        };
    }
}

export default new PacketService();