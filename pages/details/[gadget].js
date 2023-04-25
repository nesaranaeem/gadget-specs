import { getDetails } from "@/utils/api";
import { useRouter } from "next/router";
import { Fragment } from "react";

function GadgetPage({ data, gadget }) {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
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

  const formattedGadgetTitle = formatGadgetTitle(decodedGadget);

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold">{data.data.title}</h1>
        <img src={data.data.imageURL} alt={data.data.title} />
        <p className="mt-5 text-lg">{data.data.price}</p>
      </div>
      <div className="container mx-auto my-10">
        <table className="w-full table-fixed border-collapse border border-gray-400">
          <thead>
            <tr className="bg-gray-200">
              <th className="w-2/4 p-2 border border-gray-400">
                Specification
              </th>
              <th className="w-2/4 p-2 border border-gray-400">Details</th>
            </tr>
          </thead>
          <tbody>
            {/* Render the rows dynamically */}
            {data.data.specifications.map((spec, index) => (
              <Fragment key={index}>
                {/* Loop through each key in the current object and render a cell with the corresponding value */}
                {Object.keys(spec).map((key, index) => (
                  <tr
                    key={index}
                    className={
                      (index + 1) % 2 === 0 ? "bg-gray-100" : "bg-white"
                    }
                  >
                    <td className="p-2 border border-gray-400">{key}</td>
                    <td className="p-2 border border-gray-400">{spec[key]}</td>
                  </tr>
                ))}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const { gadget } = context.query;

  // Format gadget title for API call
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
  const formattedGadgetTitle = formatGadgetTitle(decodedGadget);

  const res = await fetch(
    `${getDetails}${encodeURIComponent(formattedGadgetTitle)}`
  );
  const data = await res.json();

  return {
    props: { data, gadget },
  };
}

export default GadgetPage;
