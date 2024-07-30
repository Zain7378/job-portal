import React from "react";

function Banner({ query, handleInput, handleLocation }) {
  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 md:py-20 py-14">
      <div className="space-y-3">
        <h1 className="text-5xl text-black text-bold">
          Find your <span className="text-blue-500">new job</span> today
        </h1>
        <p className="text-lg text-black/70">
          Thousands of jobs in the computer, engineering, and technology
          sectors are waiting for you.
        </p>
      </div>
      <form action="" className="mt-8">
        <div className="flex justify-start md:flex-row flex-col md:gap-1 gap-4">
          <div className="flex md:rounded-s-md rounded shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring0-indigo-600 md:w-1/2 w-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.2}
              stroke="currentColor"
              className="size-5 text-gray-400 absolute mt-2 ml-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>

            <input
              type="text"
              name="title"
              placeholder="What position are you looking for?"
              className="block flex-1 border-0 bg-transparent py-1.5 pl-8 text-gray-900 placeholder:text-gray-400 focus-right-0 sm:text-sm sm:leading-6"
              onChange={handleInput}
            />
          </div>

          <div className="flex md:rounded-s-md rounded shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring0-indigo-600 md:w-1/3 w-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-5 text-gray-400 absolute mt-2 ml-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
              />
            </svg>

            <input
              type="text"
              name="location"
              placeholder="Location"
              className="block flex-1 border-0 bg-transparent py-1.5 pl-8 text-gray-900 placeholder:text-gray-400 focus-right-0 sm:text-sm sm:leading-6"
              onChange={handleLocation}
            />
          </div>
          <button className="bg-blue-600 py-2 px-8 text-white md:rounded-md-none rounded">
            Search
          </button>
        </div>
      </form>
    </div>
  );
}

export default Banner;