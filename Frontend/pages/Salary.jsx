import React, { useEffect, useState } from "react";
import Navbar from "../src/components/Navbar";
import PageHeader from "../src/components/PageHeader";
import axios from "axios";

export default function Salary() {
  const [searchText, setSearchText] = useState("");
  const [salaries, setSalaries] = useState([]);
  const [filteredSalaries, setFilteredSalaries] = useState([]);

  useEffect(() => {
    axios.get("salary.json").then((res) => {
      setSalaries(res.data);
      setFilteredSalaries(res.data); // Initialize filteredSalaries with the full list
    });
  }, [searchText]);

  const handleClick = () => {
    const filter = salaries.filter((job) =>
      job.title.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredSalaries(filter); // Update filteredSalaries instead of salaries
  };

  return (
    <>
      <Navbar />
      <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
        <PageHeader title={"Estimate salary"} path={"salary"} />
        <div className="mt-5">
          <div>
            <input
              type="text"
              name="search"
              className="salary-input-main"
              onChange={(e) => setSearchText(e.target.value)}
            />
            <button
              className="bg-blue-400 text-white font-semibold px-8 py-2 rounded-sm mb-4"
              onClick={handleClick}
            >
              Search
            </button>
          </div>
        </div>
        <div className="card-salaryPage">
          {filteredSalaries.length === 0 ? (
            <p>No results found</p>
          ) : (
            filteredSalaries.map((data) => (
              <div key={data.id} className="mb-4 shadow px-4 py-8">
                <h4 className="text-xl font-semibold">{data.title}</h4>
                <p className="text-lg">{data.salary}</p>
                <div className="flex flex-wrap gap-4">
                  <a href="/" className="underline text-blue-500">{data.status}</a>
                  <a href="/" className="underline text-blue-500">{data.skills}</a>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
