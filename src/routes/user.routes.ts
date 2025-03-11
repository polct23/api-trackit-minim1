import { Router } from 'express';

const router = Router();

import { postUser, getAllUsers, getUserById, deleteUserById, updateUserById, deactivateUserById } from '../controllers/user.controller'

router.get( "/", getAllUsers);
router.post( "/", postUser );
router.get('/:id', getUserById);
router.put('/:id', updateUserById);
router.delete('/:id', deleteUserById);
router.put('/:id/deactivate', deactivateUserById);

export default router;