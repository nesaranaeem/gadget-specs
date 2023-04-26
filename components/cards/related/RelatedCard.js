import Image from "next/image";

const RelatedCard = ({ gadget }) => {
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
        <h2 className="lg:text-lg xl:text-lg text-sm font-bold mb-2 lg:w-48 xl:w-48 dark:text-white">
          {gadget.title}
        </h2>
        <p className="text-gray-700 mb-2 dark:text-white">{gadget.brand}</p>
        <p className="text-gray-700 mb-2 font-bold dark:text-white">
          {gadget.price.replace(" (approx)", "") === "0.00 Taka" ? (
            <span className="text-red-600">TBA</span>
          ) : (
            gadget.price.replace(" (approx)", "").replace(".00", "")
          )}
        </p>

        <a
          href={`/details/${gadget.title
            .replace(/\s+/g, "-")
            .toLowerCase()}-${lastFiveDigits}`}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg block text-center"
        >
          View Details
        </a>
      </div>
    </div>
  );
};

export default RelatedCard;
