import express from "express";
import { createPhase,updatePhaseStatus,getProjectIdByIdentifier,getphasebyid,getverifiedforphase,verifyfordocument } from "../controllers/phasecontroller.js";
import { protect,project,technicalOfficer } from "../middleware/auth.middleware.js";
import { Router } from "express";
// import { upload } from "../middleware/multer.middleware.js";
import { v2 as cloudinary} from "cloudinary";
import { Project} from "../models/project.js";
import { Phase } from "../models/phase.js";
import multer from "multer";
const router=Router()
// router.get('/:projectId', getProjectIdByIdentifier);
router.route('/:projectId').post(protect, project, createPhase);
router.route('/:projectId').get(protect, project,getProjectIdByIdentifier);
router.route('/m/:phaseId').get(getphasebyid);
router.route('/p/:projectId').get(protect,getProjectIdByIdentifier);
router.route('/:id').put(protect,project,updatePhaseStatus);
router.route('/v/:phaseId').put(protect,technicalOfficer,getverifiedforphase);
router.route('/verify/:id').put(verifyfordocument);
cloudinary.config({
    cloud_name: process.env.
    CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_APIKEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
router.put('/u/:id', upload.single('file'), async (req, res) => {
    const { id } = req.params;
    const file = req.file;

    if (file) {
        try {
            // Update the phase with the file data directly in the database
            const updateData = {
                fileName: file.originalname,
                fileType: file.mimetype,
                fileData: file.buffer // Save the binary data directly
            };

            const updatedPhase = await Phase.findByIdAndUpdate(id, updateData, { new: true });

            // Return the updated phase data
            res.status(201).json(updatedPhase);
        } catch (error) {
            res.status(500).json({ message: 'Error saving file to the database', error });
        }
    } else {
        // If no file is uploaded, return an error
        res.status(400).json({ message: 'No file provided' });
    }
});
router.get('/download/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const phase = await Phase.findById(id);

        if (!phase || !phase.fileData) {
            return res.status(404).json({ message: 'File not found' });
        }

        res.set({
            'Content-Type': phase.fileType,
            'Content-Disposition': `attachment; filename="${phase.fileName}"`
        });

        res.send(phase.fileData);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving file from the database', error });
    }
});



export default router