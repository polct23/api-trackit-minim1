import { Router } from 'express';
import { postPacket, getAllPackets, getPacketById, updatePacketById, deletePacketById } from '../controllers/packet.controller';

const router = Router();

router.post('/', postPacket);
router.get('/', getAllPackets);
router.get('/:id', getPacketById);
router.put('/:id', updatePacketById);
router.delete('/:id', deletePacketById);

export default router;