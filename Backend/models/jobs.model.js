const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    companyName: {
        type: String,
    },
    jobTitle: {
        type: String,
    },
    companyLogo: {
        type: String,
        required: false // Assuming the logo path is optiona
    },
    minPrice: {
        type: Number,
    },
    maxPrice: {
        type: Number,
    },
    salaryType: {
        type: String,
        
    },
    jobLocation: {
        type: String,
    },
    postingDate: {
        type: Date,
    },
    experienceLevel: {
        type: String,
        
    },
    employmentType: {
        type: String,
        
    },
    description: {
        type: String,
    },
    postedBy: {
        type: String,
    },
    skills: {
        type: [String], // Array of strings
        required: false // Make this true if skills are mandatory
    }
});

const Jobmodel = mongoose.model('Job', jobSchema);

module.exports = Jobmodel;
