import EMI from '../models/emiModel.js';

export const createEMI = async (req, res) => {
    try {
        const newEMI = new EMI(req.body);
        const savedEMI = await newEMI.save();
        res.status(201).json(savedEMI);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getAllEMIs = async (req, res) => {
    try {
        const emis = await EMI.find();
        res.status(200).json(emis);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getEMIById = async (req, res) => {
    try {
        const emi = await EMI.findById(req.params.id);
        if (!emi) return res.status(404).json({ message: 'EMI not found' });
        res.status(200).json(emi);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateEMI = async (req, res) => {
    try {
        const updatedEMI = await EMI.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedEMI)
            return res.status(404).json({ message: 'EMI not found' });
        res.status(200).json(updatedEMI);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteEMI = async (req, res) => {
    try {
        const deletedEMI = await EMI.findByIdAndDelete(req.params.id);
        if (!deletedEMI)
            return res.status(404).json({ message: 'EMI not found' });
        res.status(200).json({ message: 'EMI deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
