const Tabs = ({ tabs, activeTab, onTabChange }) => {
  return (
    <nav className="flex space-x-20 border-b mb-10"> {/* space-x-8로 간격 조정 */}
      {tabs.map((tab, index) => (
        <button
          key={index}
          onClick={() => onTabChange(tab)}
          className={`py-2 text-sm ${
            activeTab === tab
              ? 'text-orange-500 font-semibold border-b-2 border-orange-500'
              : 'text-gray-600 hover:text-orange-500'
          }`}
        >
          {tab}
        </button>
      ))}
    </nav>
  );
};

export default Tabs;
