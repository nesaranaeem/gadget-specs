import Link from "next/link";

const Pagination = ({ currentPage, totalPages, pageSlug }) => {
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
    paginationButtons.push({ page: startPage - 1, label: "..." });
  }

  // Add page number buttons
  for (let i = 0; i < pageNumbers.length; i++) {
    paginationButtons.push({ page: pageNumbers[i], label: pageNumbers[i] });
  }

  // Add next button
  if (hasNext) {
    paginationButtons.push({ page: endPage + 1, label: "..." });
  }
  return (
    <>
      <div className="flex justify-center items-center mt-4">
        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
          <div className="flex">
            {paginationButtons.map((button) => (
              <Link
                href={`/${pageSlug}/${button.page}`}
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
  );
};

export default Pagination;
