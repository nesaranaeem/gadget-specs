import CommonCard from "@/components/cards/common/CommonCard";
import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { BeatLoader } from "react-spinners";
import cookie from "cookie";
import dotenv from "dotenv";
import { NextSeo } from "next-seo";
dotenv.config();
const apiKey = process.env.API_KEY;
const Gadgets = ({ gadgetsData }) => {
  const [gadgets, setGadgets] = useState(gadgetsData.gadgets);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(gadgetsData.total_pages);
  const [totalCount, setTotalCount] = useState(gadgetsData.total_count);
  const [itemsPerPage, setItemsPerPage] = useState(16);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const handleFetchData = async () => {
    setIsLoading(true);

    try {
      const response = await axios.get(
        `https://specificationsbd.vercel.app/api/v1/gadgets/category?&show=smartWatch&page=${currentPage}&limit=${itemsPerPage}`
      );

      setGadgets(response.data.gadgets);
      setTotalPages(response.data.total_pages);
      setTotalCount(response.data.total_count);
    } catch (error) {
      console.error(error);
    }

    setIsLoading(false);
  };
  useEffect(() => {
    handleFetchData();
  }, [currentPage, itemsPerPage]);

  useEffect(() => {
    const { id } = router.query;
    if (id) {
      setCurrentPage(parseInt(id));
    }
  }, [router.query]);
  useEffect(() => {
    const cookies = cookie.parse(document.cookie);
    const defaultItemsPerPage = parseInt(cookies.itemsPerPage) || 16;
    setItemsPerPage(defaultItemsPerPage);
  }, []);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  /* 
  
  Paginations
  
  */
  // Calculate the starting page number of the current set of pages
  const startPage = Math.max(currentPage - 2, 1);

  // Calculate the ending page number of the current set of pages
  const endPage = Math.min(startPage + 4, totalPages);

  // Create an array of page numbers for the current set of pages
  const pageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  // Determine if there are previous pages
  const hasPrevious = startPage > 1;

  // Determine if there are next pages
  const hasNext = endPage < totalPages;

  // Create an array for the pagination buttons
  const paginationButtons = [];

  // Add previous button
  if (hasPrevious) {
    paginationButtons.push({ page: startPage - 1, label: "Previous" });
  }

  // Add page number buttons
  for (let i = 0; i < pageNumbers.length; i++) {
    paginationButtons.push({ page: pageNumbers[i], label: pageNumbers[i] });
  }

  // Add next button
  if (hasNext) {
    paginationButtons.push({ page: endPage + 1, label: "Next" });
  }

  const handleItemsPerPageChange = (event) => {
    const value = parseInt(event.target.value);
    setItemsPerPage(value);
    document.cookie = `itemsPerPage=${value}`;
    router.reload();
  };

  return (
    <div className="container mx-auto py-4">
      <NextSeo
        title={
          currentPage > 1
            ? `Smart Watches Specifications - Page ${currentPage}  | Price In Bangladesh`
            : `Smart Watches Specifications | Price In Bangladesh`
        }
        description="Smart Watches Specifications And Price In Bangladesh 2023"
      />
      {isLoading ? (
        <div className="flex justify-end items-center">
          <BeatLoader className="my-12" color="#4B5563" />
        </div>
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-4 text-center dark:text-white">
            Smart Watches Details
          </h1>
          <div className="flex justify-center pb-4">
            <div className="ml-3">
              <label
                htmlFor="itemsPerPage"
                className="font-medium mr-2 dark:text-white"
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
            {gadgetsData.gadgets.map((gadget) => (
              <CommonCard key={gadget._id} gadget={gadget} />
            ))}
          </div>
          <div className="flex justify-center items-center mt-4">
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
              <div className="flex">
                {paginationButtons.map((button) => (
                  <Link
                    href={`/smart-watches/${button.page}`}
                    key={button.label}
                    className={`px-4 py-2 mr-1 rounded-md text-white ${
                      currentPage === button.page
                        ? "bg-blue-100 cursor-not-allowed"
                        : "bg-blue-500 hover:bg-blue-700"
                    }`}
                  >
                    {button.label}
                  </Link>
                ))}
              </div>
            </nav>
          </div>
        </>
      )}
    </div>
  );
};

export async function getServerSideProps(context) {
  const id = 1;

  try {
    const cookies = cookie.parse(context.req.headers.cookie || "");
    const itemsPerPage = cookies.itemsPerPage || "16";

    const response = await axios.get(
      `https://specificationsbd.vercel.app/api/v1/gadgets/category?apikey=${apiKey}&show=smartWatch&page=${id}&limit=${itemsPerPage}`
    );

    return {
      props: {
        gadgetsData: response.data,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        gadgetsData: {},
      },
    };
  }
}
export default Gadgets;
