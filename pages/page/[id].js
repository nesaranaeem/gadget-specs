import { useRouter } from "next/router";
import useSWR from "swr";
import { useState, useEffect } from "react";
import CommonCard from "@/components/cards/common/CommonCard";
import { allGadgets } from "@/utils/api";
import { BeatLoader } from "react-spinners";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function LatestGadgets() {
  const router = useRouter();
  const [itemsPerPage, setItemsPerPage] = useState(16);
  const maxPageNumbersToShow = 5;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const { id } = router.query;
    if (id) {
      setCurrentPage(parseInt(id));
    }
  }, [router.query]);

  const { data, error, isLoading } = useSWR(
    `${allGadgets}page=${currentPage}&limit=${itemsPerPage}`,
    fetcher
  );

  const gadgets = data?.gadgets || [];
  const totalItems = data?.total_count || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  console.log(gadgets);
  if (error) return <div>Failed to load gadgets</div>;
  if (!data && isLoading)
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <BeatLoader color="#4B5563" />
      </div>
    );

  const handlePageChange = (pageNumber) => {
    router.push(`/page/${pageNumber}`);
    setCurrentPage(pageNumber);
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(parseInt(event.target.value));
    router.push("/page/1");
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
    <div className="container mx-auto py-2">
      <h1 className="text-2xl font-bold mb-4 text-center dark:text-white">
        Latest Items
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {gadgets.map((gadget) => (
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
      </div>
    </div>
  );
}
