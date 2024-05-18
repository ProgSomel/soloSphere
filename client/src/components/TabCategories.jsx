import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import PropTypes from 'prop-types';
import JobCard from './JobCard';
import { useEffect, useState } from "react";
import axios from "axios";
const TabCategories = () => {

  const [jobs, setJobs] = useState([]);

  useEffect(()=> {
    const getData = async() => {
      const {data} = await axios(`${import.meta.env.VITE_API_URL}/jobs`);
      setJobs(data);
    }
    getData();
  }, [])

  return (
    <div className="container px-4 mx-auto my-12">
      <Tabs>
        <div className="text-center">
        <h1 className="text-3xl font-bold my-2">Browse Jobs By Categories</h1>
        <p className="w-1/2 mx-auto mb-5">Three categories available for the time being. They are Web Development, Graphics Design and Digital Marketing. Browse them by clicking on the tabs below </p>
        </div>
        <div className="flex justify-center items-center">
        <TabList >
            
            <Tab>Web Development</Tab>
            <Tab>Graphics Design</Tab>
            <Tab>Digital Marketing</Tab>
          </TabList>
        </div>

        <TabPanel className="my-12">
          <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {
            jobs?.filter(j=> j.category==='Web Development').map((job)=> (
              <JobCard key={job._id} job={job}></JobCard>
            ))
          }
          </div>
        </TabPanel>
        <TabPanel>
        <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {
            jobs?.filter(j=> j.category==='Graphics Design').map((job)=> (
              <JobCard key={job._id} job={job}></JobCard>
            ))
          }
          </div>
        </TabPanel>
        <TabPanel>
        <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {
            jobs?.filter(j=> j.category==='Digital Marketing').map((job)=> (
              <JobCard key={job._id} job={job}></JobCard>
            ))
          }
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
};

TabCategories.propTypes = {
  jobs: PropTypes.array
};

export default TabCategories;
