import Link from "next/link";
import React from "react";
import { BeatLoader } from "react-spinners";
import Pagination from "../common/pagination/Pagination";

const CategoryContainer = ({
  brandName,
  currentPage,
  totalPages,
  isLoading,
  itemsPerPage,
  handleItemsPerPageChange,
  pageSlug,
  mainTitle,
}) => {
  const { brands } = brandName;
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-center dark:text-white">
        {mainTitle}
      </h1>
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
            <option value={12}>12</option>
            <option value={24}>24</option>
            <option value={32}>32</option>
          </select>
        </div>
      </div>
      {isLoading ? (
        <div className="flex justify-end items-center">
          <BeatLoader className="my-12" color="#4B5563" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-6 gap-4">
            {brands.map((brand) => (
              <div className="max-w-xs rounded overflow-hidden shadow-lg">
                <div className="bg-gray-400 h-40 flex justify-center items-center text-white text-4xl font-bold">
                  {brand.brandName.charAt(0)}
                </div>
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2 text-black dark:text-white">
                    <h2
                      className="lg:text-lg xl:text-lg text-sm font-bold mb-2 lg:w-48 xl:w-48 text-black dark:text-white"
                      title={
                        brand.brandName.length > 8 ? brand.brandName : null
                      }
                    >
                      {brand.brandName.length > 8
                        ? brand.brandName.slice(0, 8) + "..."
                        : brand.brandName}
                    </h2>
                  </div>
                  <Link
                    href={`/brand/${brand.brandName.toLowerCase()}`}
                    className="block text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                  >
                    View
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            pageSlug={pageSlug}
          />
        </>
      )}
    </div>
  );
};

export default CategoryContainer;
