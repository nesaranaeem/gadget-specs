import useSWR from "swr";
import { useState } from "react";
import CommonCard from "@/components/cards/common/CommonCard";
import { allGadgets } from "@/utils/api";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function LatestGadgets() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(16);

  const { data, error } = useSWR(
    `${allGadgets}page=${currentPage}&limit=${itemsPerPage}`,
    fetcher
  );

  const gadgets = data?.gadgets || [];
  const totalItems = data?.total_count || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (error) return <div>Failed to load gadgets</div>;
  if (!data) return <div>Loading...</div>;

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(parseInt(event.target.value));
    setCurrentPage(1);
  };

  const paginatedGadgets = gadgets.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="container mx-auto py-2">
      <h1 className="text-2xl font-bold mb-4 text-center ">Gadgets List</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {gadgets.map((gadget) => (
          <CommonCard key={gadget._id} gadget={gadget} />
        ))}
      </div>
    </div>
  );
}
