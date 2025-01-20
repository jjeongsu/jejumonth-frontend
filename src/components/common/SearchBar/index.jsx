
const SearchBar = ({ onSearch }) => {
  return (
    <div className="flex items-center border rounded-r-md px-2 py-1 bg-gray-100 text-sm w-256 h-44"> 
      <input
        type="text"
        placeholder="검색어를 입력해주세요"
        className="flex-grow outline-none bg-transparent"
        onChange={(e) => onSearch(e.target.value)}
      />
      <button className="text-orange-500 hover:text-orange-600">
        
      </button>
    </div>
  );
};

export default SearchBar;
