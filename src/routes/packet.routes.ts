import { Router } from 'express';
import { 
    postPacket, 
    getAllPackets, 
    getPacketById, 
    updatePacketById, 
    deletePacketById, 
    addCategoryToPacket, 
    deleteCategoryFromPacket, 
    searchPacketsByCategory 
} from '../controllers/packet.controller';

const router = Router();

router.post('/', postPacket);
router.get('/', getAllPackets);
router.get('/:id', getPacketById);
router.put('/:id', updatePacketById);
router.delete('/:id', deletePacketById);
router.post('/:id/categories/:categoryId', addCategoryToPacket);
router.delete('/:id/categories/:categoryId', deleteCategoryFromPacket);
router.get('/search/category/:categoryId', searchPacketsByCategory);

export default router;