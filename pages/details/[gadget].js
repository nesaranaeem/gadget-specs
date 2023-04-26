import RelatedCard from "@/components/cards/related/RelatedCard";
import { gadgetByBrand, getDetails } from "@/utils/api";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
function GadgetPage({ gadget }) {
  const router = useRouter();
  if (router.isFallback) {
    return (
      <div className="flex justify-end items-center">
        <BeatLoader className="my-12" color="#4B5563" />
      </div>
    );
  }

  // Format gadget title for display
  function decodeGadgetParam(gadget) {
    return decodeURIComponent(gadget);
  }
  const decodedGadget = decodeGadgetParam(gadget);

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
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [relatedData, setRelatedData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await fetch(`${getDetails}${gadget}`);
    const result = await response.json();
    setData(result.data[0]);
    setLoading(false);
  };
  const fetchRelatedData = async () => {
    const response = await fetch(
      `${gadgetByBrand}${data.brand}&page=1&limit=8`
    );
    const result = await response.json();
    setRelatedData(result.data);
    setLoading(false);
  };
  function formatGadgetTitle(title) {
    // Return title as is if it has 4 or fewer characters
    if (title.length <= 4) {
      return title;
    }

    // Replace hyphens with spaces
    const formattedTitle = title.replace(/-/g, " ");

    // Insert space before every capitalized letter except the first one
    const spacedTitle = formattedTitle.replace(/([A-Z])/g, " $1");

    // Insert space before every number that is not followed by four digits
    const spacedNumbers = spacedTitle.replace(/(\d+)(?!\d{4})/g, " $1");

    // Capitalize first letter of each word
    const words = spacedNumbers.split(" ");
    const capitalizedWords = words.map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    });
    const finalTitle = capitalizedWords.join(" ");

    return finalTitle;
  }
  fetchRelatedData();
  return (
    <>
      {loading ? (
        <div className="flex justify-end items-center">
          <BeatLoader className="my-12" color="#4B5563" />
        </div>
      ) : (
        <>
          <Head>
            <title>
              {data.title} {data.category} Price & Specs BD
            </title>
          </Head>
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
                <p class="gray-400 whitespace-normal text-black dark:text-gray-400">
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
                <h4 class="my-4 text-xl font-extrabold leading-none tracking-tight text-gray-900 md:text-xl lg:text-xl dark:text-white">
                  More By
                  <mark class="px-2 text-white bg-blue-600 rounded dark:bg-blue-500">
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
      )}
    </>
  );
}
export async function getServerSideProps(context) {
  const { gadget } = context.query;
  return {
    props: { gadget },
  };
}

export default GadgetPage;
