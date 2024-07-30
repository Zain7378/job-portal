import React, { useEffect, useState } from 'react'
import Navbar from '../src/components/Navbar'
import axios from 'axios';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

function Myjobs() {
    const localData = localStorage.getItem('user');
    const parsedData = JSON.parse(localData);
    const email = parsedData.email
    
    const [jobs, setJobs] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [isLoading, setIsLoading] = useState(true);
const [ currentpage, setCurrentpage] = useState(1);
const itemperPage= 4;

    useEffect(() => {
        setIsLoading(true);
        axios.get(`http://localhost:4000/jobs/myjobs/${email}`)
            .then((res) => {
                setJobs(res.data);
                setIsLoading(true);
            })
            .catch((error) => {
                console.error('Error fetching jobs:', error);
                setIsLoading(false);
            });
    }, [isLoading,searchText]);

    const handleSearch = () => {
        const filteredJobs = jobs.filter((job) => job.jobTitle.toLowerCase().includes(searchText.toLowerCase()));
        setJobs(filteredJobs);
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:4000/jobs/myjobs/${id}`)
            .then(() => {
                toast.success('Job deleted successfully!');
setTimeout(()=>{

    window.location.reload();
},500)
                // Remove the deleted job from state
                // setJobs(jobs.filter(job => job._id !== id));
            })
            .catch((err) => {
                toast.error(`Can't delete job!`);
                console.error('Error deleting job:', err);
            });
    };

    const indexofLastItem = currentpage*itemperPage;
const indexOfFirstItem = indexofLastItem - itemperPage;
const currentJob = jobs.slice(indexOfFirstItem , indexofLastItem);

const nextpage = ()=>{
    if(indexofLastItem<jobs.length){
        setCurrentpage(currentpage+1)
    }
}
const prevPage = ()=>{
    if(currentpage>1){
        setCurrentpage(currentpage-1)
    }
}

    return (
        <>
            <Navbar />
            <div className='max-w-screen-2xl container mx:auto xl:px-24 px-4'>
                <div className='mb-20'>
                    <h1 className='my-job-heading'> All My Jobs</h1>
                    <div className='p-2 text-center'>
                        <input
                            type="text"
                            name='search'
                            id='my-job-search'
                            onChange={(e) => setSearchText(e.target.value)}
                        />
                        <button
                            className='bg-blue-400 text-white font-semibold px-8 py-2 rounded-sm mb-4'
                            onClick={handleSearch}
                        >
                            Search
                        </button>
                    </div>
                </div>
                
                <section className="myjob-section">
                    <div className="myjob-table-wrapper">
                        <div className="myjob-table-container">
                            <div className="myjob-table-header">
                                <div className="myjob-header-content">
                                    <div className="myjob-header-title">
                                        <h3 className="myjob-title-text">All jobs</h3>
                                    </div>
                                    <div className="myjob-header-button">
                                        <Link to="/post-job">
                                            <button className="myjob-seeall-btn" type="button">Post a job</button>
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            <div className="myjob-table-content">
                                <table className="myjob-table">
                                    <thead>
                                        <tr>
                                            <th className="myjob-table-heading">No</th>
                                            <th className="myjob-table-heading">Title</th>
                                            <th className="myjob-table-heading">Company Name</th>
                                            <th className="myjob-table-heading">Salary</th>
                                            <th className="myjob-table-heading">Edit</th>
                                            <th className="myjob-table-heading">Delete</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {
                                            currentJob.map((job, index) => (
                                                <tr key={index}>
                                                    <th className="myjob-table-cell">{index + 1}</th>
                                                    <td className="myjob-table-cell">{job.jobTitle}</td>
                                                    <td className="myjob-table-cell">{job.companyName}</td>
                                                    <td className="myjob-table-cell">${job.minPrice}-${job.maxPrice}</td>
                                                    <td className="myjob-table-cell">
                                                        <button><Link to={`edit-job/${job._id}`}>Edit</Link></button>
                                                    </td>
                                                    <td className="myjob-table-cell">
                                                        <button className='my-job-delete' onClick={() => handleDelete(job._id)}>Delete</button>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                  
                </section>

                <div className='flex justify-center text-black space-x-8'>
                    {
                        currentpage>1 && (
                            <button className='hover:underline text-black' onClick={prevPage}>Previous</button>
                        )
                    }
                    {
                        indexofLastItem<jobs.length && (
                            <button className='hover:underline' onClick={nextpage}>Next</button>

                        )
                    }

                </div>
            </div>
        </>
    );
}

export default Myjobs;
