import express from "express";
import { createPhase,updatePhaseStatus,getProjectIdByIdentifier } from "../controllers/phasecontroller.js";
import { protect,project } from "../middleware/auth.middleware.js";
import { Router } from "express";
const router=Router()
// router.get('/:projectId', getProjectIdByIdentifier);
router.route('/:projectId').post(protect, project, createPhase);
router.route('/:projectId').get(protect, project,getProjectIdByIdentifier);
router.route('/p/:projectId').get(protect,getProjectIdByIdentifier);
router.route('/:id').put(protect,project,updatePhaseStatus);

export default router