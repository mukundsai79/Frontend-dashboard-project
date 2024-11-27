import React from "react";
import { Tab, TabNavigation } from "evergreen-ui";

const TabNavigationComponent = ({ tabs, selectedIndex, setSelectedIndex }) => {
  return (
    <TabNavigation>
      {tabs.map((tab, index) => (
        <Tab
          key={tab}
          isSelected={selectedIndex === index}
          onSelect={() => setSelectedIndex(index)}
        >
          {tab}
        </Tab>
      ))}
    </TabNavigation>
  );
};

export default TabNavigationComponent;
