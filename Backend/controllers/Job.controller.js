const jobmodel = require('../models/jobs.model.js');

const getJob = async (req, res) => {
    try {
        const jobs = await jobmodel.find();
        res.status(200).json(jobs);
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json(error);
    }
};

const getUniqueJob = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await jobmodel.findById(id);
        if (!result) {
            return res.status(404).json({ message: 'Job not found' });
        }
        res.status(200).json(result);
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const postJob = async (req, res) => {
    try {
        const { companyName, jobTitle, companyLogo, minPrice, maxPrice, salaryType, jobLocation, postingDate, experienceLevel, employmentType, description, postedBy } = req.body;

        const newJob = new jobmodel({
            companyName,
            jobTitle,
            companyLogo,
            minPrice,
            maxPrice,
            salaryType,
            jobLocation,
            postingDate,
            experienceLevel,
            employmentType,
            description,
            postedBy
        });

        await newJob.save();
        res.status(201).json({ message: 'Job posted successfully', job: newJob });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Failed to post job', error: error.message });
    }
};

const searchJob = async (req, res) => {
    try {
        const myjobs = await jobmodel.find({ postedBy: req.params.email });
        res.send(myjobs);
    } catch (error) {
        console.log('Error occurred:', error);
    }
};

const deleteJob = async (req, res) => {
    try {
        const id = req.params._id;
        const result = await jobmodel.deleteOne({ _id: id });
        res.send({ message: 'Job deleted successfully' });
    } catch (error) {
        console.error('Error deleting job:', error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
};

const updateData = async (req, res) => {
    console.log('UpdateData called');
    try {
      const id = req.params.id;
      console.log('ID:', id);
      const jobdata = req.body;
      console.log('Jobdata:', jobdata);
  
      const filter={_id:id};
  
      // Merge the new data with the existing data
      const updatedJobData = {
       $set: {
        ...jobdata
       },
      };
  
      // Perform the update operation
      const result = await jobmodel.findByIdAndUpdate(filter, updatedJobData, { new: true });
      console.log('Update result:', result);
  
      // Send the result back to the client
      res.json(result);
    } catch (error) {
      console.error('Error updating job:', error);
      res.status(500).json({ message: 'Internal server error', error });
    }
  };
  
module.exports = { getJob, postJob, searchJob, deleteJob, getUniqueJob, updateData };
