import CommonCard from "@/components/cards/common/CommonCard";
import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { BeatLoader } from "react-spinners";
import cookie from "cookie";
import dotenv from "dotenv";
import { NextSeo } from "next-seo";
import Container from "@/components/common/container/Container";
dotenv.config();
const apiKey = process.env.API_KEY;
const Index = ({ gadgetsData, brandName, id }) => {
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
        `https://specificationsbd.vercel.app/api/v1/gadgets?brandName=${brandName}?&page=${currentPage}&limit=${itemsPerPage}`
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
    if (id) {
      setCurrentPage(parseInt(id));
    }
  }, [router.query]);
  useEffect(() => {
    const cookies = cookie.parse(document.cookie);
    const defaultItemsPerPage = parseInt(cookies.itemsPerPage) || 16;
    setItemsPerPage(defaultItemsPerPage);
  }, []);

  const handleItemsPerPageChange = (event) => {
    const value = parseInt(event.target.value);
    setItemsPerPage(value);
    document.cookie = `itemsPerPage=${value}`;
    router.reload();
  };
  const formattedBrandName =
    brandName.charAt(0).toUpperCase() + brandName.slice(1).replace("-", " ");
  return (
    <div className="container mx-auto py-4">
      <NextSeo
        title={
          currentPage > 1
            ? ` ${formattedBrandName} Gadgets Specifications - Page ${currentPage}  | Mobile Specifications, Price | Smart Watch Specifications, Price in Bangladesh`
            : `${formattedBrandName} Mobile Specifications, Price | Smart Watch Specifications, Price in Bangladesh`
        }
        description={`Find the latest mobile, smart watch specifications and prices of ${formattedBrandName} in Bangladesh. Compare deals and stay updated on the latest mobile trends and tech.`}
      />
      {isLoading ? (
        <div className="flex justify-end items-center">
          <BeatLoader className="my-12" color="#4B5563" />
        </div>
      ) : (
        <>
          <nav
            className="flex my-2 px-5 py-3 text-gray-700 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
            aria-label="Breadcrumb"
          >
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <Link
                  href="/"
                  className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
                >
                  <svg
                    aria-hidden="true"
                    className="w-4 h-4 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                  </svg>
                  Home
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <svg
                    aria-hidden="true"
                    className="w-6 h-6 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <Link
                    href={`/brands`}
                    className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white"
                  >
                    Brands
                  </Link>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <svg
                    aria-hidden="true"
                    className="w-6 h-6 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <Link
                    href={`/brand/${brandName.toLowerCase().replace(" ", "")}`}
                    className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white"
                  >
                    {formattedBrandName}
                  </Link>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <svg
                    aria-hidden="true"
                    className="w-6 h-6 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">
                    Page {currentPage}
                  </span>
                </div>
              </li>
            </ol>
          </nav>
          <Container
            key={currentPage}
            gadgetsData={gadgetsData}
            currentPage={currentPage}
            totalPages={totalPages}
            isLoading={isLoading}
            itemsPerPage={itemsPerPage}
            handleItemsPerPageChange={handleItemsPerPageChange}
            pageSlug={`brand/${brandName}`}
            mainTitle={`${formattedBrandName} Gadgets Price And Specifications`}
          />
        </>
      )}
    </div>
  );
};

export async function getServerSideProps(context) {
  const id = context.params.page;
  const brandName = context.params.brandName;
  try {
    const cookies = cookie.parse(context.req.headers.cookie || "");
    const itemsPerPage = cookies.itemsPerPage || "16";

    const response = await axios.get(
      `https://specificationsbd.vercel.app/api/v1/gadgets?brandName=${brandName}?&apikey=${apiKey}&page=${id}&limit=${itemsPerPage}`
    );

    return {
      props: {
        gadgetsData: response.data,
        total_count: response.data.total_count,
        brandName,
        id,
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
export default Index;
