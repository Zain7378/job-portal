const express = require('express');
const { getJob, postJob, searchJob, deleteJob, getUniqueJob, updateData } = require('../controllers/Job.controller.js');

const router = express.Router();

router.get('/get', getJob);
router.post('/post', postJob);
router.get('/myjobs/:email', searchJob);
router.get('/myjobs/byId/:id', getUniqueJob);
router.delete('/myjobs/:_id', deleteJob);
router.patch('/update/:id', updateData);

module.exports = router;
