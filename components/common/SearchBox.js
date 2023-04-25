import { gadgetSearch } from "@/utils/api";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoMdSearch, IoMdClose } from "react-icons/io";

export const SearchBox = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = (e) => {
    setQuery(e.target.value);
    setIsLoading(true);
    setNoResults(false);

    if (e.target.value) {
      fetch(`${gadgetSearch}${e.target.value}`)
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

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={handleSearch}
        onFocus={handleFocus}
        className="border border-gray-300 rounded-md pl-10 pr-3 py-2 w-full focus:outline-none focus:ring focus:ring-blue-400 mr-4"
      />
      {isFocused && isLoading && (
        <div className="absolute top-full left-0 z-50 bg-white border border-gray-300 dark:border-gray-800  dark:bg-gray-900 rounded-md w-full">
          <div className="px-3 py-2">Searching...</div>
        </div>
      )}
      {isFocused && noResults && (
        <div className="absolute top-full left-0 z-50 bg-white border border-gray-300 dark:border-gray-800  dark:bg-gray-900 rounded-md w-full">
          <div className="px-3 py-2">No results</div>
        </div>
      )}
      {isFocused && suggestions.length > 0 && (
        <div className="absolute top-full left-0 z-50 bg-white border border-gray-300 dark:border-gray-800  dark:bg-gray-900 rounded-md w-full">
          {suggestions.map((suggestion) => (
            <Link
              key={suggestion}
              href={`/details/${suggestion.replace(/\s+/g, "-").toLowerCase()}`}
              className="block px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
              onClick={() => setIsFocused(false)}
            >
              {suggestion}
            </Link>
          ))}
        </div>
      )}

      <div className="absolute top-0 right-0 mt-3 mr-3">
        <IoMdSearch size={24} />
      </div>
    </div>
  );
};
