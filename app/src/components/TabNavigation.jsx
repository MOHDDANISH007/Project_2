// components/TabNavigation.js
import React from 'react';

const TabNavigation = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <div className="border-b border-gray-600 border-opacity-50 pt-4">
      <ul className="flex flex-wrap gap-4 p-4 text-white justify-center">
        {tabs.map((tab) => (
          <li
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`cursor-pointer font-bold text-lg md:text-2xl ${
              activeTab === tab ? 'underline' : ''
            }`}
          >
            {tab}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TabNavigation;