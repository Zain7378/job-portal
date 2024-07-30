import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from "../src/components/Navbar";
import { useForm } from "react-hook-form";
import CreateableSelect from 'react-select/creatable';
import toast from 'react-hot-toast'; // Ensure toast is imported

function UpdatePage() {
  const { id } = useParams();
  const [job, setJob] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:4000/jobs/myjobs/byId/${id}`)
      .then((response) => {
        const jobData = response.data;
        setJob(jobData);
        setSelectedOption(jobData.skills.map(skill => ({ value: skill, label: skill }))); // Map skills to {value, label} format
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching job:', error);
        setLoading(false);
      });
  }, [id]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    data.skills = selectedOption.map(option => option.value);

    const jobInfo = {
      companyName: data.companyName,
      jobTitle: data.jobTitle,
      companyLogo: data.companyLogo,
      minPrice: data.minPrice,
      maxPrice: data.maxPrice,
      salaryType: data.salaryType,
      jobLocation: data.jobLocation,
      postingDate: data.postingDate,
      experienceLevel: data.experienceLevel,
      employmentType: data.employmentType,
      description: data.description,
      skills: data.skills,
      postedBy: data.postedBy
    };

    axios.patch(`http://localhost:4000/jobs/update/${id}`, jobInfo)
      .then((res) => {
        console.log(res.data);
        toast.success('Job updated Successfully!');
        reset();
      })
      .catch((err) => {
        toast.error('Error occurred while updating:', err.message);
      });
  };

  const options = [
    { value: 'javascript', label: 'Javascript' },
    { value: 'java', label: 'Java' },
    { value: 'python', label: 'Python' },
    { value: 'csharp', label: 'C#' },
    { value: 'cpp', label: 'C++' },
    { value: 'ruby', label: 'Ruby' },
    { value: 'go', label: 'Go' },
    { value: 'swift', label: 'Swift' },
    { value: 'kotlin', label: 'Kotlin' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'php', label: 'PHP' },
    { value: 'rust', label: 'Rust' }
  ];

  return (
    <div>
      <Navbar />
      {/* first row */}
      <div className="mb-20">
        <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4  ">
          <div className="bg-[#FAFAFA] py-10 px-4 lg:px-16">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              
              <div className="flex md:flex-row flex-col items-center justify-between gap-8">
                <div className="lg:w-1/2 w-full">
                  <label className="block mb-2 text-lg">Job title</label>
                  <input
                    type="text"
                    defaultValue={job.jobTitle}
                    {...register("jobTitle")}
                    className="create-job-input"
                  />
                </div>
                <div className="lg:w-1/2 w-full">
                  <label className="block mb-2 text-lg">Company name</label>
                  <input
                    type="text"
                    defaultValue={job.companyName}
                    {...register("companyName")}
                    className="create-job-input"
                  />
                </div>
              </div>

              {/* second row */}
              <div className="flex md:flex-row flex-col items-center justify-between gap-8">
                <div className="lg:w-1/2 w-full">
                  <label className="block mb-2 text-lg">Minimum Salary</label>
                  <input
                    type="text"
                    defaultValue={job.minPrice}
                    {...register("minPrice")}
                    className="create-job-input"
                  />
                </div>
                <div className="lg:w-1/2 w-full">
                  <label className="block mb-2 text-lg">Maximum Salary</label>
                  <input
                    type="text"
                    defaultValue={job.maxPrice}
                    {...register("maxPrice")}
                    className="create-job-input"
                  />
                </div>
              </div>

              {/* third row */}
              <div className="flex md:flex-row flex-col items-center justify-between gap-8">
                <div className="lg:w-1/2 w-full">
                  <label className="block mb-2 text-lg">Salary Type</label>
                  <select
                    defaultValue={job.salaryType}
                    {...register("salaryType", { required: true })}
                    className="create-job-input"
                  >
                    <option value="">Select Salary Type</option>
                    <option value="hourly">Hourly</option>
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                  </select>
                </div>
                <div className="lg:w-1/2 w-full">
                  <label className="block mb-2 text-lg">Job Location</label>
                  <input
                    type="text"
                    defaultValue={job.jobLocation}
                    {...register("jobLocation")}
                    className="create-job-input"
                  />
                </div>
              </div>

              {/* fourth row */}
              <div className="flex md:flex-row flex-col items-center justify-between gap-8">
                <div className="lg:w-1/2 w-full">
                  <label className="block mb-2 text-lg">Job Posting</label>
                  <input
                    type="date"
                    defaultValue={job.postingDate?.slice(0, 10)} // Ensure correct date format
                    {...register("postingDate")}
                    className="create-job-input"
                  />
                </div>
                <div className="lg:w-1/2 w-full">
                  <label className="block mb-2 text-lg">Experience Level</label>
                  <select
                    defaultValue={job.experienceLevel}
                    {...register("experienceLevel", { required: true })}
                    className="create-job-input"
                  >
                    <option value="">Select Experience Level</option>
                    <option value="Any experience">Any experience</option>
                    <option value="Work remotely">Work remotely</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>
              </div>

              {/* fifth row */}
              <div>
                <label className="block mb-2 text-lg">Required skill set:</label>
                <CreateableSelect
                  value={selectedOption}
                  onChange={setSelectedOption}
                  isMulti
                  options={options}
                  className="create-job-input"
                />
              </div>

              {/* sixth row */}
              <div className="flex md:flex-row flex-col items-center justify-between gap-8">
                <div className="lg:w-1/2 w-full">
                  <label className="block mb-2 text-lg">Company Logo</label>
                  <input
                    type="text"
                    defaultValue={job.companyLogo}
                    placeholder="Paste your image URL: https://example.com/img1"
                    {...register("companyLogo")}
                    className="create-job-input"
                  />
                </div>
                <div className="lg:w-1/2 w-full">
                  <label className="block mb-2 text-lg">Employee Type</label>
                  <select
                    defaultValue={job.employmentType}
                    {...register("employmentType", { required: true })}
                    className="create-job-input"
                  >
                    <option value="">Select Employee Type</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Temporary">Temporary</option>
                  </select>
                </div>
              </div>

              {/* seventh row */}
              <div className="w-full">
                <label className="block mb-2 text-lg">Job Description</label>
                <textarea
                  className="create-job-input"
                  rows={6}
                  defaultValue={job.description}
                  {...register("description", { required: true })}
                ></textarea>
              </div>

              {/* last row */}
              <div className="w-full">
                <label className="block mb-2 text-lg">Job Posted by:</label>
                <input
                  type="email"
                  defaultValue={job.postedBy}
                  placeholder="abc@mail.com"
                  {...register("postedBy")}
                  className="create-job-input"
                />
              </div>

              <input
                type="submit"
                className="block mt-12 bg-blue-400 text-white font-semibold px-8 py-2 rounded-sm cursor-pointer mb-10"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdatePage;
