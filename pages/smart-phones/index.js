import { useRouter } from "next/router";
import useSWR from "swr";
import { useState, useEffect } from "react";
import CommonCard from "@/components/cards/common/CommonCard";
import { allGadgets, smartPhones, smartWatches } from "@/utils/api";
import { BeatLoader } from "react-spinners";
import Head from "next/head";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Index() {
  const router = useRouter();
  const [itemsPerPage, setItemsPerPage] = useState(16);
  const maxPageNumbersToShow = 5;

  // Extract the page number from the URL or default to 1
  const currentPage = parseInt(router.query.page) || 1;

  useEffect(() => {
    const storedItemsPerPage = localStorage.getItem("itemsPerPage");
    if (storedItemsPerPage) {
      setItemsPerPage(parseInt(storedItemsPerPage));
    }
  }, []);

  const { data, error, isLoading } = useSWR(
    `${smartPhones}?page=${currentPage}&limit=${itemsPerPage}`,
    fetcher
  );

  const gadgets = data?.gadgets || [];
  const totalItems = data?.total_count || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (error) return <div>Failed to load gadgets</div>;
  if (!data && isLoading)
    return (
      <div className="flex justify-end items-center">
        <BeatLoader className="my-12" color="#4B5563" />
      </div>
    );

  const handlePageChange = (pageNumber) => {
    router.push(`/smart-phones/${pageNumber}`);
  };

  const handleItemsPerPageChange = (event) => {
    const value = parseInt(event.target.value);
    setItemsPerPage(value);
    localStorage.setItem("itemsPerPage", value);
    router.push("/smart-phones");
  };

  const paginatedGadgets = gadgets.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const pageNumbers = [];

  if (totalPages <= maxPageNumbersToShow) {
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  } else {
    const halfMaxPageNumbersToShow = Math.floor(maxPageNumbersToShow / 2);
    let startPageNumber;
    let endPageNumber;

    if (currentPage - halfMaxPageNumbersToShow <= 0) {
      startPageNumber = 1;
      endPageNumber = maxPageNumbersToShow;
    } else if (currentPage + halfMaxPageNumbersToShow >= totalPages) {
      startPageNumber = totalPages - maxPageNumbersToShow + 1;
      endPageNumber = totalPages;
    } else {
      startPageNumber = currentPage - halfMaxPageNumbersToShow;
      endPageNumber = currentPage + halfMaxPageNumbersToShow;
    }

    for (let i = startPageNumber; i <= endPageNumber; i++) {
      pageNumbers.push(i);
    }
  }

  return (
    <>
      <Head>
        <title>Smart Watches Specs | Price</title>
      </Head>
      <div className="container mx-auto py-2">
        <h1 className="text-2xl font-bold mb-4 text-center dark:text-white">
          Latest Items
        </h1>
        <div className="flex justify-center pb-4">
          <div className="ml-3">
            <label htmlFor="itemsPerPage" className="font-medium mr-2">
              Items per page:
            </label>
            <select
              id="itemsPerPage"
              name="itemsPerPage"
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              className="border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="8">8</option>
              <option value="16">16</option>
              <option value="24">24</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {paginatedGadgets.map((gadget) => (
            <CommonCard key={gadget._id} gadget={gadget} />
          ))}
        </div>
        <div className="flex justify-center items-center mt-4">
          <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              className={`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium ${
                currentPage === 1
                  ? "text-gray-500 cursor-not-allowed"
                  : "text-indigo-600 hover:bg-indigo-50 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              }`}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            {pageNumbers.map((pageNumber) => {
              const isActive = pageNumber === currentPage;

              return (
                <button
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                  className={`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium ${
                    isActive
                      ? "text-indigo-600 bg-indigo-100"
                      : "text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                  }`}
                >
                  {pageNumber}
                </button>
              );
            })}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              className={`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium ${
                currentPage === totalPages
                  ? "text-gray-500 cursor-not-allowed"
                  : "text-indigo-600 hover:bg-indigo-50 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              }`}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </nav>
          {/* code */}
        </div>
      </div>
    </>
  );
}
