import CommonCard from "@/components/cards/common/CommonCard";

import Pagination from "../pagination/Pagination";
import { useRouter } from "next/router";

const Container = ({
  gadgetsData,
  currentPage,
  totalPages,
  pageSlug,
  itemsPerPage,
  handleItemsPerPageChange,
  mainTitle,
  minPrice,
  maxPrice,
  setMinPrice,
  setMaxPrice,
  handlePriceFilter,
}) => {
  const router = useRouter();

  const handleGoBack = () => {
    router.push("/");
  };
  return (
    <>
      <h1 className="text-2xl font-bold mb-4 text-center text-black dark:text-white">
        {mainTitle}
      </h1>

      {gadgetsData.status === false && (
        <div className="flex items-center justify-center h-screen bg-gray-100">
          <div className="max-w-lg p-8 bg-white rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold text-red-500 mb-4">Error</h1>
            <p className="text-lg text-gray-500">{gadgetsData.message}</p>
            <button
              onClick={handleGoBack}
              className="my-2 px-4 py-2 text-white bg-blue-600 rounded-md focus:outline-none focus:ring focus:ring-blue-600 focus:border-blue-600"
            >
              Go Back to Home
            </button>
          </div>
        </div>
      )}

      <div className="flex justify-center pb-4">
        <div className="ml-3">
          <label
            htmlFor="itemsPerPage"
            className="font-medium mr-2 text-black dark:text-white"
          >
            Items per page:
          </label>
          <select
            id="itemsPerPage"
            name="itemsPerPage"
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            className="border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black dark:text-white"
          >
            <option value={8}>8</option>
            <option value={16}>16</option>
            <option value={24}>24</option>
          </select>
        </div>
      </div>

      <form
        onSubmit={handlePriceFilter}
        className="flex flex-col md:flex-row mb-3 items-center justify-center gap-4"
      >
        <div className="flex flex-col items-center md:flex-row">
          <label htmlFor="minPrice" className="text-gray-700"></label>
          <input
            id="minPrice"
            placeholder="Enter Minimum Price"
            type="number"
            name="minPrice"
            value={minPrice}
            onChange={(event) => setMinPrice(parseInt(event.target.value))}
            className="px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-600 focus:border-blue-600"
            required
            min={1000}
          />
        </div>
        <div className="flex flex-col items-center md:flex-row">
          <label htmlFor="maxPrice" className="text-gray-700"></label>
          <input
            id="maxPrice"
            placeholder="Enter Maximum Price"
            type="number"
            name="maxPrice"
            value={maxPrice}
            onChange={(event) => setMaxPrice(parseInt(event.target.value))}
            className="px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-600 focus:border-blue-600"
            required
            max={300000}
          />
        </div>
        <div className="md:self-end">
          <button
            type="submit"
            className="px-4 py-2 text-white bg-blue-600 rounded-md focus:outline-none focus:ring focus:ring-blue-600 focus:border-blue-600"
          >
            Filter
          </button>
        </div>
      </form>

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {gadgetsData.gadgets?.map((gadget) => (
          <CommonCard key={gadget._id} gadget={gadget} />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        pageSlug={pageSlug}
      />
    </>
  );
};

export default Container;
