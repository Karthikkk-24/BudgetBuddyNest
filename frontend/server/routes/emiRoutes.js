import express from 'express';
import { createEMI, deleteEMI, getAllEMIs, getEMIById, updateEMI } from '../controller/emiController.js';

const router = express.Router();

router.post('/', createEMI);
router.get('/', getAllEMIs);
router.get('/:id', getEMIById);
router.put('/:id', updateEMI);
router.delete('/:id', deleteEMI);

export default router;