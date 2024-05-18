import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
const TabCategories = () => {
  return (
    <div className="container px-4 mx-auto my-12">
      <Tabs>
        <div className="text-center">
        <h1 className="text-3xl font-bold my-2">Browse Jobs By Categories</h1>
        <p className="w-1/2 mx-auto mb-5">Three categories available for the time being. They are Web Development, Graphics Design and Digital Marketing. Browse them by clicking on the tabs below </p>
        </div>
        <div className="flex justify-center items-center">
        <TabList >
            
            <Tab>Web</Tab>
            <Tab>Graphics</Tab>
            <Tab>Digital Media</Tab>
          </TabList>
        </div>

        <TabPanel>
          <h2>Any content 1</h2>
        </TabPanel>
        <TabPanel>
          <h2>Any content 2</h2>
        </TabPanel>
        <TabPanel>
          <h2>Any content 3</h2>
        </TabPanel>
      </Tabs>
    </div>
  );
};

TabCategories.propTypes = {};

export default TabCategories;
