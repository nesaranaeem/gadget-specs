import { phoneSearch } from "@/utils/api";
import { useEffect, useState } from "react";
import { IoMdSearch, IoMdClose } from "react-icons/io";

export const SearchBox = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);

  const handleSearch = (e) => {
    setQuery(e.target.value);
    setIsLoading(true);
    setNoResults(false);

    if (e.target.value) {
      fetch(`${phoneSearch}${e.target.value}`)
        .then((response) => response.json())
        .then((data) => {
          setIsLoading(false);
          if (data.data?.length > 0) {
            setSuggestions(data.data.map((item) => item.title));
          } else {
            setNoResults(true);
          }
        });
    } else {
      setIsLoading(false);
      setSuggestions([]);
    }
  };

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={handleSearch}
        className="border border-gray-300 rounded-md pl-10 pr-3 py-2 w-full focus:outline-none focus:ring focus:ring-blue-400 mr-4"
      />
      {isLoading && (
        <div className="absolute top-full left-0 z-50 bg-white border border-gray-300 rounded-md w-full">
          <div className="px-3 py-2">Searching...</div>
        </div>
      )}
      {noResults && (
        <div className="absolute top-full left-0 z-50 bg-white border border-gray-300 rounded-md w-full">
          <div className="px-3 py-2">No results</div>
        </div>
      )}
      {suggestions.length > 0 && (
        <div className="absolute top-full left-0 z-50 bg-white border border-gray-300 rounded-md w-full">
          {suggestions.map((suggestion) => (
            <div
              key={suggestion}
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}
      <div className="absolute top-0 right-0 mt-3 mr-3">
        <IoMdSearch size={24} />
      </div>
    </div>
  );
};
