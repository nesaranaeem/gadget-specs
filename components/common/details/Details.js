import RelatedCard from "@/components/cards/related/RelatedCard";
import Image from "next/image";
import { Fragment } from "react";

const Details = ({ data, relatedData, loading }) => {
  function formatGadgetTitle(title) {
    // Replace hyphens with spaces
    const formattedTitle = title.replace(/-/g, " ");

    // Add space before each capital letter combined with a small letter
    const finalTitle = formattedTitle.replace(/([a-z])([A-Z])/g, "$1 $2");

    // Add space before any alphabet followed by a number
    const newFinalTitle = finalTitle.replace(/([a-zA-Z])(\d)/g, "$1 $2");

    // Capitalize first letter of each word
    const words = newFinalTitle.split(" ");
    const capitalizedWords = words.map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    });

    return capitalizedWords.join(" ");
  }
  function formatSpecValue(value) {
    const trimmedValue = value.trim().replace(/\s+/g, " ");

    if (trimmedValue.includes("|")) {
      const items = trimmedValue.split("|");
      const formattedItems = items.map((item) => {
        return (
          <li className="font-medium" key={item}>
            {item.trim()}
          </li>
        );
      });
      return <>{formattedItems}</>;
    } else {
      return trimmedValue;
    }
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold dark:text-white">{data.title}</h1>
        <Image src={data.imageURL} alt={data.title} width={500} height={500} />
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
                      {formatSpecValue(spec[key])}
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
          It is impossible to guarantee that the information above is entirely
          correct. When analyzing data, mistakes or inaccuracies are always a
          possibility. Typically, we get information from dependable sites like
          the websites of manufacturers. We kindly request that you report us if
          you come across any errors or false information in our content.
        </p>
      </div>
    </>
  );
};

export default Details;
