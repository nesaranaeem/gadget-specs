import CommonCard from "@/components/cards/common/CommonCard";
import axios from "axios";
import { BeatLoader } from "react-spinners";
import { Fragment, useState } from "react";
import dotenv from "dotenv";
import { NextSeo } from "next-seo";
import Image from "next/image";
import RelatedCard from "@/components/cards/related/RelatedCard";
import Link from "next/link";
dotenv.config();
const apiKey = process.env.API_KEY;
const Id = ({ details, dataLoaded }) => {
  const data = details.data[0];
  const [relatedData, setRelatedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchRelatedData = async () => {
    const response = await fetch(
      `https://specificationsbd.vercel.app/api/v1/gadgets?brandName=${data.brand}&page=1&limit=8`
    );
    const result = await response.json();
    setRelatedData(result.data);
    setLoading(false);
  };
  console.log(relatedData);
  function formatGadgetTitle(title) {
    // Replace hyphens with spaces
    const formattedTitle = title.replace(/-/g, " ");

    // Capitalize first letter of each word
    const words = formattedTitle.split(" ");
    const capitalizedWords = words.map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    });
    const finalTitle = capitalizedWords.join(" ");

    return finalTitle;
  }
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

          <div className="flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold dark:text-white">{data.title}</h1>
            <Image
              src={data.imageURL}
              alt={data.title}
              width={500}
              height={500}
            />
            <div
              className="mt-5 text-lg
               dark:text-white"
            >
              <div className="text-center">
                <h1 className="text-lg font-medium text-gray-900 dark:text-white">
                  {data.title}
                </h1>
                By:{" "}
                <span className="uppercase text-black dark:text-white">
                  {" "}
                  {data.brand}
                </span>
                <p className="gray-400 whitespace-normal text-black dark:text-gray-400">
                  {data?.title} {data.category} Price starts from{" "}
                  <span className="font-bold">
                    {data.price?.replace(" (approx)", "") === "0.00 Taka" ? (
                      <span className="text-red-600">TBA</span>
                    ) : (
                      data.price?.replace(" (approx)", "").replace(".00", "")
                    )}
                  </span>
                  .
                </p>
              </div>
            </div>
          </div>
          <div className="container mx-auto my-10">
            <table className="w-full table-fixed border-collapse border border-gray-400">
              <thead>
                <tr className="bg-gray-200 dark:bg-gray-800 text-black dark:text-white">
                  <th
                    className="w-2/4 p-2 border border-gray-400 text-black dark:bg-gray-800
               dark:text-white"
                  >
                    Specification
                  </th>
                  <th className="w-2/4 p-2 border border-gray-400 text-black dark:bg-gray-800 dark:text-white">
                    Details
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* Render the rows dynamically */}
                {data.specifications?.map((spec, index) => (
                  <Fragment key={index}>
                    {/* Loop through each key in the current object and render a cell with the corresponding value */}
                    {Object.keys(spec)?.map((key, index) => (
                      <tr
                        key={index}
                        className={
                          (index + 1) % 2 === 0 ? "bg-gray-100" : "bg-white"
                        }
                      >
                        <td className="p-4 border border-gray-400 dark:bg-gray-800 text-black dark:text-white">
                          {formatGadgetTitle(key)}
                        </td>
                        <td className="p-4 border border-gray-400 dark:bg-gray-800 text-black dark:text-white text-justify">
                          {spec[key]}
                        </td>
                      </tr>
                    ))}
                  </Fragment>
                ))}
              </tbody>
            </table>
            <div>
              <div className="text-center">
                <h4 className="my-4 text-xl font-extrabold leading-none tracking-tight text-gray-900 md:text-xl lg:text-xl dark:text-white">
                  More By
                  <mark className="px-2 text-white bg-blue-600 rounded dark:bg-blue-500">
                    {data.brand}
                  </mark>{" "}
                </h4>
              </div>

              {loading ? (
                <p>loading</p>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4">
                  {relatedData?.map((gadget) => (
                    <RelatedCard key={gadget._id} gadget={gadget} />
                  ))}
                </div>
              )}
            </div>
            <p className="my-2 dark:text-white text-justify p-3">
              It is impossible to guarantee that the information above is
              entirely correct. When analyzing data, mistakes or inaccuracies
              are always a possibility. Typically, we get information from
              dependable sites like the websites of manufacturers. We kindly
              request that you report us if you come across any errors or false
              information in our content.
            </p>
          </div>
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
