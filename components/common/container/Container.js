import CommonCard from "@/components/cards/common/CommonCard";
import { NextSeo } from "next-seo";
import Link from "next/link";
import { BeatLoader } from "react-spinners";
import Pagination from "../pagination/Pagination";

const Container = ({
  gadgetsData,
  currentPage,
  totalPages,
  pageSlug,
  itemsPerPage,
  handleItemsPerPageChange,
  mainTitle,
}) => {
  return (
    <>
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
            className="border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value={8}>8</option>
            <option value={16}>16</option>
            <option value={24}>24</option>
          </select>
        </div>
      </div>
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
