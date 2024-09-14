import 'remixicon/fonts/remixicon.css';

interface SearchBarProps {
  searchTerm: string;
  onSearch: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onSearch }) => {
  return (
    <div className="relative w-full mb-4">
      <input 
        type="text" 
        value={searchTerm} 
        onChange={(e) => onSearch(e.target.value)} 
        placeholder='搜索记录' 
        className='border p-2 w-full rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10' 
      />
      
      <i className="ri-search-line absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
    </div>
  );
};

export default SearchBar;
