import React, { useEffect, useState } from "react";
import Navbar from "../src/components/Navbar";
import axios from "axios";
import Banner from "../src/components/Banner";
import Cards from "../src/components/Cards";
import Job from "./Job";
import './job.css';
import Siderbar from "../src/sidebar/Siderbar";
import NewsLetter from "../src/components/NewsLetter";

function Home() {
  const [query, setQuery] = useState("");
  const[LocQuery , setLocQuery] = useState('');
  const [selectedCategory, SetSelectedCategory] = useState(null);
  const [jobs, setJobs] = useState([]);
  const[isloading , SetisLoading] = useState(true);
  const [ currentPage , setCurrentPage] = useState(1);
  const itemPerPage=6

  useEffect(() => {
    SetisLoading(true);
    axios
      .get("http://localhost:4000/jobs/get")
      .then((res) => {
        setJobs(res.data);
        SetisLoading(false);
      })
      .catch((err) => console.log("error occurred during data fetch", err));
  }, []);

  const handleInput = (e) => {
    setQuery(e.target.value);
  };
  const handleLocationInput = (e)=>{
    setLocQuery(e.target.value);

  }

  const filteredItems = jobs.filter((job) =>
    job.jobTitle.toLowerCase().includes(query.toLowerCase())
  
  );
  const filteredLocationItems = jobs.filter((job) =>
    job.jobLocation.toLowerCase().includes(LocQuery.toLowerCase())
  );


  const handleLocationRadio = (e) => {
    SetSelectedCategory(e.target.value);
    console.log(selectedCategory);
  };

  const salaryButton = (e) => {
    SetSelectedCategory(e.target.value);
  };
  
  const CalculatePageRange = ()=>{
    const startIndex = (currentPage - 1)* itemPerPage;
    const endIndex = startIndex+itemPerPage;
    return(startIndex , endIndex);
  }

  const NextPage = ()=>{
    if(currentPage < Math.ceil(filteredItems.length / itemPerPage)){
      setCurrentPage(currentPage+1)
    }
  }
  const prevPage= ()=>{
    if(currentPage>1){
      setCurrentPage(currentPage-1)
    }
  }

  const filteredData = (jobs, selected, query) => {
    let filteredJobs = jobs;
    if (query) {
      filteredJobs = filteredItems;
    }
    if(LocQuery){
      filteredJobs = filteredLocationItems;
    }
    if (selected) {
      filteredJobs = filteredJobs.filter(
        ({
          jobLocation,
          maxPrice,
          experienceLevel,
          salaryType,
          employmentType,
          postingDate,
        }) => {
          const lowerSelected = selected ? selected.toLowerCase() : '';
          const lowerJobLocation = jobLocation ? jobLocation.toLowerCase() : '';
          const lowerSalaryType = salaryType ? salaryType.toLowerCase() : '';
          const lowerExperienceLevel = experienceLevel ? experienceLevel.toLowerCase() : '';
          const lowerEmploymentType = employmentType ? employmentType.toLowerCase() : '';
      
          // Parse dates
          const postingDateObj = postingDate ? new Date(postingDate) : null;
          const selectedDateObj = selected ? new Date(selected) : null;
      
          return (
            lowerJobLocation === lowerSelected ||
            parseInt(maxPrice) === parseInt(selected) ||
            lowerSalaryType === lowerSelected ||
            lowerExperienceLevel === lowerSelected ||
            lowerEmploymentType === lowerSelected ||
            (postingDateObj && selectedDateObj && postingDateObj >= selectedDateObj)
          );
        }
      );
      
    }
    const {startIndex , endIndex} = CalculatePageRange();
    filteredJobs = filteredJobs.slice(startIndex , endIndex)
    return filteredJobs.map((data, i) => <Cards key={i} data={data} />);
  };

  const result = filteredData(jobs, selectedCategory, query);


  return (
    <>
      <Navbar />
      <Banner query={query} handleInput={handleInput} handleLocation={handleLocationInput} />

      <div className="containerJob">
        <div className="box">
          <Siderbar handleChange={handleLocationRadio} handleClick={salaryButton} />
        </div>
        <div className="col-span-2 box">
          {
            isloading? (<p className="text-medium">Loading....</p>):result.length>0?(<Job result={result} />):<>
            <h3 className="text-lg font-bold mb-2">{result.length} Jobs</h3>
            <p>No Data Found!!</p>
            </>
          }

            {
              result.length>0?(
                <div className="">
                 <div className="flex justify-between px-20">
                 <button onClick={prevPage} disabled={currentPage===1} className="hover:underline">Previous</button>
                  <span>Page {currentPage} of {Math.ceil(filteredItems.length / itemPerPage)}</span>
                  <button onClick={NextPage} disabled={currentPage === Math.ceil(filteredItems.length/itemPerPage)}
                  className="hover:underline">Next</button>
                 </div>
                </div>
              ):""
            }
        </div>
        <div className="box">
          <NewsLetter />
        </div>
      </div>
    </>
  );
}

export default Home;
