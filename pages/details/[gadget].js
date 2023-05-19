import axios from "axios";
import { BeatLoader } from "react-spinners";
import { useState } from "react";
import dotenv from "dotenv";
import { NextSeo } from "next-seo";
import Link from "next/link";
import Details from "@/components/common/details/Details";
dotenv.config();
const apiKey = process.env.API_KEY;
const Id = ({ details, dataLoaded }) => {
  const data = details.data[0];
  const [relatedData, setRelatedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchRelatedData = async () => {
    const response = await fetch(
      `https://specificationsbd.vercel.app/api/v1/gadgets?brandName=${data.brand}&page=1&limit=8&minPrice=default&maxPrice=default`
    );
    const result = await response.json();
    setRelatedData(result.gadgets);
    setLoading(false);
  };
  fetchRelatedData();
  return (
    <>
      {dataLoaded ? (
        <>
          <NextSeo
            title={`${data.title} Price Specification | Price In Bangladesh`}
            description={`${data.title} ${data.category} is by ${data.brand}. know full details`}
          />
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
                    href={`/brand/${data.brand.toLowerCase().replace(" ", "")}`}
                    className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white"
                  >
                    {data.brand}
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
                    {data.title}
                  </span>
                </div>
              </li>
            </ol>
          </nav>

          <Details
            key={data._id}
            data={data}
            relatedData={relatedData}
            loading={loading}
          />
        </>
      ) : (
        <div className="flex justify-end items-center">
          <BeatLoader className="my-12" color="#4B5563" />
        </div>
      )}
    </>
  );
};

export async function getServerSideProps(context) {
  const { gadget } = context.query;
  const lastFiveDigits = gadget.slice(-5);

  let dataLoaded = false; // Initialize dataLoaded to false

  try {
    const response = await axios.get(
      `https://specificationsbd.vercel.app/api/v1/gadgets/details?apikey=${apiKey}&id=${lastFiveDigits}`
    );

    dataLoaded = true; // Set dataLoaded to true if data is successfully fetched

    return {
      props: {
        details: response.data,
        dataLoaded: dataLoaded, // Pass dataLoaded as a prop
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        gadgetsData: {},
        dataLoaded: dataLoaded, // Pass dataLoaded as a prop
      },
    };
  }
}
export default Id;
