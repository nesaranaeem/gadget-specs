import Link from "next/link";
import { TbCurrencyTaka } from "react-icons/tb";
const CommonCard = ({ gadget }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg dark:bg-gray-900 dark:text-white">
      <img
        src={gadget.imageURL}
        alt={gadget.title}
        className="w-full rounded-t-lg"
      />
      <div className="p-4">
        <h2 className="text-lg font-bold mb-2 w-48">{gadget.title}</h2>
        <p className="text-gray-700 mb-2">{gadget.brand}</p>
        <p className="text-gray-700 mb-2">
          {gadget.price.replace(" (approx)", "")}
        </p>
        <Link
          href={`/gadgets/${gadget._id}`}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg block text-center"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default CommonCard;
