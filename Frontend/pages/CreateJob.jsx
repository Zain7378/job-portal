import React, { useState } from "react";
import Navbar from "../src/components/Navbar";
import { useForm } from "react-hook-form";
import CreateableSelect from 'react-select/creatable';
import axios from 'axios';
import toast from 'react-hot-toast';

function CreateJob() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [selectedOption, setSelectedOption] = useState([]);

  const onSubmit = (data) => {
    // Ensure that data.skills is an array of selected skill values
    data.skills = selectedOption.map(option => option.value);
   const skills=data.skills

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
      employmentType: data.employmentType, // Correct field name
      description: data.description,
      skills: skills, // Fixed the field name to match schema
      postedBy: data.postedBy
    };

    axios.post("http://localhost:4000/jobs/post", jobInfo)
      .then((res) => {
        console.log(res.data);
        toast.success('Job posted Successfully!');
        reset();
        setSelectedOption([]); // Clear selected options after submission
      })
      .catch((err) => {
        toast.error('Error occurred while posting:', err.message);
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
    <>
      <Navbar />
      <div className="mb-20">
        <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
          <div className="bg-[#FAFAFA] py-10 px-4 lg:px-16">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              
              <div className="flex md:flex-row flex-col items-center justify-between gap-8">
                <div className="lg:w-1/2 w-full">
                  <label className="block mb-2 text-lg">Job title</label>
                  <input
                    type="text"
                    defaultValue="Web Developer"
                    {...register("jobTitle")}
                    className="create-job-input"
                  />
                </div>
                <div className="lg:w-1/2 w-full">
                  <label className="block mb-2 text-lg">Company name</label>
                  <input
                    type="text"
                    placeholder="Ex: Microsoft"
                    {...register("companyName")}
                    className="create-job-input"
                  />
                </div>
              </div>

              <div className="flex md:flex-row flex-col items-center justify-between gap-8">
                <div className="lg:w-1/2 w-full">
                  <label className="block mb-2 text-lg">Minimum Salary</label>
                  <input
                    type="text"
                    placeholder="$20k"
                    {...register("minPrice")}
                    className="create-job-input"
                  />
                </div>
                <div className="lg:w-1/2 w-full">
                  <label className="block mb-2 text-lg">Maximum Salary</label>
                  <input
                    type="text"
                    placeholder="$120k"
                    {...register("maxPrice")}
                    className="create-job-input"
                  />
                </div>
              </div>
              
              <div className="flex md:flex-row flex-col items-center justify-between gap-8">
                <div className="lg:w-1/2 w-full">
                  <label className="block mb-2 text-lg">Salary Type</label>
                  <select
                    {...register("salaryType", { required: true })}
                    className="create-job-input"
                  >
                    <option value="">Choose your salary</option>
                    <option value="hourly">Hourly</option>
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                  </select>
                </div>
                <div className="lg:w-1/2 w-full">
                  <label className="block mb-2 text-lg">Job Location</label>
                  <input
                    type="text"
                    placeholder="Ex: London"
                    {...register("jobLocation")}
                    className="create-job-input"
                  />
                </div>
              </div>
              
              <div className="flex md:flex-row flex-col items-center justify-between gap-8">
                <div className="lg:w-1/2 w-full">
                  <label className="block mb-2 text-lg">Job Posting</label>
                  <input
                    type="date"
                    placeholder="mm/dd/yyy"
                    {...register("postingDate")}
                    className="create-job-input"
                  />
                </div>
                <div className="lg:w-1/2 w-full">
                  <label className="block mb-2 text-lg">Experience Level</label>
                  <select
                    {...register("experienceLevel", { required: true })}
                    className="create-job-input"
                  >
                    <option value="">Choose your experience</option>
                    <option value="Any experience">Any experience</option>
                    <option value="Work remotely">Work remotely</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block mb-2 text-lg">Required skill set:</label>
                <CreateableSelect 
                  value={selectedOption} // Ensure value is properly bound
                  onChange={setSelectedOption}
                  isMulti
                  options={options} 
                  className="create-job-input"  
                />
              </div> 
              
              <div className="flex md:flex-row flex-col items-center justify-between gap-8">
                <div className="lg:w-1/2 w-full">
                  <label className="block mb-2 text-lg">Company Logo</label>
                  <input
                    type="text"
                    placeholder="paste your image url: https://weshare.com/img1"
                    {...register("companyLogo")}
                    className="create-job-input"
                  />
                </div>
                <div className="lg:w-1/2 w-full">
                  <label className="block mb-2 text-lg">Employee type</label>
                  <select
                    {...register("employmentType", { required: true })} // Fixed the field name
                    className="create-job-input"
                  >
                    <option value="">Choose employee type</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Temporary">Temporary</option>
                  </select>
                </div>
              </div>

              <div className="w-full">
                <label className="block mb-2 text-lg">Job Description</label>
                <textarea 
                  className="create-job-input"
                  rows={6}
                  defaultValue="Full Stack Developer: Design, develop, maintain web applications using MERN stack"
                  {...register("description", { required: true })}
                ></textarea>
              </div>

              <div className="w-full">
                <label className="block mb-2 text-lg">Job Posted by:</label>
                <input
                  type="email"
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
    </>
  );
}

export default CreateJob;
