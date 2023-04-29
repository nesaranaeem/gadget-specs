import Image from "next/image";
import Link from "next/link";
import { TbCurrencyTaka } from "react-icons/tb";
const CommonCard = ({ gadget }) => {
  const lastFiveDigits = gadget._id.slice(-5);

  return (
    <div className="bg-white rounded-lg shadow-lg dark:bg-gray-900 dark:text-white">
      <Image
        src={gadget.imageURL}
        alt={gadget.title}
        className="w-full rounded-t-lg"
        width={500}
        height={500}
      />

      <div className="p-4">
        <h2
          className="lg:text-lg xl:text-lg text-sm font-bold mb-2 lg:w-48 xl:w-48 text-black dark:text-white"
          title={gadget.title.length > 16 ? gadget.title : null}
        >
          {gadget.title.length > 16
            ? gadget.title.slice(0, 16) + "..."
            : gadget.title}
        </h2>

        <p className="text-gray-700 mb-2 dark:text-white">{gadget.brand}</p>
        <p className="text-gray-700 mb-2 font-bold dark:text-white">
          {gadget.price.replace(" (approx)", "") === "0.00 Taka" ? (
            <span className="text-red-600">TBA</span>
          ) : (
            gadget.price.replace(" (approx)", "").replace(".00", "")
          )}
        </p>

        <Link
          href={`/details/${gadget.title
            .replace(/\s+/g, "-")
            .toLowerCase()}-${lastFiveDigits}`}
          className="block text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default CommonCard;
