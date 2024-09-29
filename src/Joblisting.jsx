import data from "./data.json";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Mobileheader from "./assets/Bgheadermobile.svg";
import Desktopheader from "./assets/Bgheaderdesktop.svg";
import Photosnaplogo from "./assets/photosnap.svg";
import Myhomelogo from "./assets/myhome.svg";
import Insurelogo from "./assets/insure.svg";
import Loopstudiologo from "./assets/loop-studios.svg";
import Managelogo from "./assets/manage.svg";
import Shortlylogo from "./assets/shortly.svg";
import Aircompanylogo from "./assets/the-air-filter-company.svg";
import Accountlogo from "./assets/account.svg";
import Eyecamlogo from "./assets/eyecam-co.svg";
import Faceitlogo from "./assets/faceit.svg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

function Joblisting() {
  const [jobs] = useState(data); // Directly setting the state with the imported data
  
  const [filteredJobs, setFilteredJobs] = useState(data); // Displayed filtered list

  const [filters, setFilters] = useState([]);

  const addFilter = (selectedFilter) => {
  // Check if the tool is already in the filters list
  if (!filters.includes(selectedFilter)) {
    // Add the new filter to the list
    const updatedFilters = [...filters, selectedFilter];
    setFilters(updatedFilters);

    // Filter jobs based on all current items of the filters array
    const newFilteredJobs = jobs.filter((job) =>
      updatedFilters.every((filter) =>
        // Check if the filter matches the job's role, level, languages, or tools
        job.role.includes(filter) ||
        job.level.includes(filter) ||
        job.languages.includes(filter) ||
        job.tools.includes(filter)
      )
    );

    setFilteredJobs(newFilteredJobs);
  }
};

const removeFilter = (removedFilter) => {
  const updatedFilters = filters.filter((filter) => filter !== removedFilter);
  setFilters(updatedFilters);

      // Filter jobs based on all current items of the filters array
      const newFilteredJobs = jobs.filter((job) =>
        updatedFilters.every((filter) =>
          // Check if the filter matches the job's role, level, languages, or tools
          job.role.includes(filter) ||
          job.level.includes(filter) ||
          job.languages.includes(filter) ||
          job.tools.includes(filter)
        )
      );
  
      setFilteredJobs(newFilteredJobs);
};
  
  const logos = {
    Photosnaplogo,
    Myhomelogo,
    Insurelogo,
    Loopstudiologo,
    Managelogo,
    Shortlylogo,
    Aircompanylogo,
    Accountlogo,
    Eyecamlogo,
    Faceitlogo,
  };

  return (
    <div className='job'>
      <img className="mobile-header" style={{ width: "100vw" }} src={Mobileheader} alt="header" />
      <img className="desktop-header" style={{width: '100vw'}} src={Desktopheader} alt="header" />

      <div className="filters-div rounded bg-white d-flex flex-wrap">
        {filters.map((filter, index) => (
          <li key={index} className="filter-item rounded mx-1 mt-1">{filter} <FontAwesomeIcon className="font-icon mx-2 p-1 rounded"  onClick={() => removeFilter(filter)} icon={faX} style={{backgroundColor: 'hsl(180, 29%, 50%)', color: 'white'}} /> </li>
        ))}
      </div>

      <ul className="jobs-ul list-group">
        {filteredJobs.map((job) => (
          <li
            className="job-li rounded list-item list-group-item mt-5"
            key={job.id}
          >
            <img
              className="logo-img"
              style={{ width: "50px" }}
              src={logos[job.logo]}
              alt={`{job.company} logo`}
            />
            <div className="d-flex ">
              <p className="company">{job.company}</p>
              <p
                style={{ display: job.new ? "flex" : "none" }}
                className="new mx-2 border text-white px-2 pt-1"
              >
                NEW!
              </p>
              <p
                style={{ display: job.featured ? "flex" : "none" }}
                className="featured border text-white bg-dark px-2 pt-1"
              >
                FEATURED
              </p>
            </div>
            <h2>{job.position}</h2>
            <div className="contract-div d-flex">
              <p>{job.postedAt}</p>
              <p className="mx-2">. {job.contract}</p>
              <p>. {job.location}</p>
            </div>
            <hr />
            <div className="language-tool-div d-flex flex-wrap">
              <p onClick={() =>  addFilter(job.role)} className="filter rounded">{job.role}</p>
              <p onClick={() => addFilter(job.level)} className="filter mx-1">{job.level}</p>
              {job.languages.map((language, index) => (
                <p onClick={() => addFilter(language)} key={index} className="filter rounded mx-1">
                  {language}
                </p>
              ))}
              {/* Display each tool individually, only if there are tools */}
              {job.tools.length > 0 &&
                job.tools.map((tool, index) => (
                  <p onClick={() => addFilter(tool)} key={index} className="filter mx-1">
                    {tool}
                  </p>
                ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Joblisting;
