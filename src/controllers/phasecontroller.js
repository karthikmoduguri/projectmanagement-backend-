import { Project} from "../models/project.js";
import { Phase } from "../models/phase.js";



const getProjectIdByIdentifier = async (req, res) => {
  const { projectId } = req.params; // This could be projectId or another field

  try {
      const project = await Project.findOne({ projectId: projectId });
      if (!project) return res.status(404).json({ message: 'Project not found' });
      res.json({ _id: project._id,projectId:project.projectId });
  } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export { getProjectIdByIdentifier };

const createPhase = async (req, res) => {
  const { phases} = req.body;
   // expecting an array of phases
   const { projectId } = req.params;
  try {
    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    if(project){
    const createdPhases = await Phase.insertMany(phases.map(phase => ({
      name: phase.name,
      monitor: phase.monitor,
      status: 'not started',
      deadline: phase.deadline,
    })));

    project.phases.push(...createdPhases.map(phase => phase._id));
    await project.save();

    res.status(201).json(createdPhases);}
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Controller to update phase status
const updatePhaseStatus = async (req, res) => {
  const { status, completionDate, isOnTime } = req.body;

  try {
    const phase = await Phase.findById(req.params.id);

    if (phase) {
      phase.status = status;
      phase.completionDate = completionDate;
      phase.isOnTime = isOnTime;
      await phase.save();
      res.json(phase);
    } else {
      res.status(404).json({ message: 'Phase not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export { createPhase, updatePhaseStatus };
