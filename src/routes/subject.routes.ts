import {Router} from 'express';

const router = Router();

import {postSubject, getAllSubjects, getSubjectById, deleteSubjectById, updateSubjectById} from '../controllers/subject.controller'

router.get("/", getAllSubjects);
router.post("/", postSubject);
router.get('/:id', getSubjectById);
router.put('/:id', updateSubjectById);
router.delete('/:id', deleteSubjectById);

export default router;