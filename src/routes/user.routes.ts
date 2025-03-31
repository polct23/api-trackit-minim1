import { Router } from 'express';

const router = Router();

import { 
    postUser, 
    getAllUsers, 
    getUserById, 
    deleteUserById, 
    updateUserById, 
    deactivateUserById, 
    getUserPackets, 
    addPacketToUser, 
    getUserByName
} from '../controllers/user.controller';

router.get("/", getAllUsers);
router.post("/", postUser);
router.get('/:id', getUserById);
router.get('/name/:name', getUserByName);
router.put('/:id', updateUserById);
router.delete('/:id', deleteUserById);
router.put('/:id/deactivate', deactivateUserById);
router.get('/:id/packets', getUserPackets);
router.post('/:name/packets', addPacketToUser);

export default router;