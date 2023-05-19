import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { BeatLoader } from "react-spinners";
import cookie from "cookie";
import dotenv from "dotenv";
import { NextSeo } from "next-seo";
import Container from "@/components/common/container/Container";
dotenv.config();
const apiKey = process.env.API_KEY;
const Index = ({ gadgetsData }) => {
  const [gadgets, setGadgets] = useState(gadgetsData.gadgets);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(gadgetsData.total_pages);
  const [totalCount, setTotalCount] = useState(gadgetsData.total_count);
  const [itemsPerPage, setItemsPerPage] = useState(16);
  const [minPrice, setMinPrice] = useState("default");
  const [maxPrice, setMaxPrice] = useState("default");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const handleFetchData = async () => {
    setIsLoading(true);

    try {
      const response = await axios.get(
        `https://specificationsbd.vercel.app/api/v1/gadgets/category?&show=all&page=${currentPage}&limit=${itemsPerPage}&minPrice=${minPrice}&maxPrice=${maxPrice}`
      );

      setGadgets(response.data.gadgets);
      setTotalPages(response.data.total_pages);
      setTotalCount(response.data.total_count);
    } catch (error) {
      console.error(error);
    }

    setIsLoading(false);
  };
  useEffect(() => {
    handleFetchData();
  }, [currentPage, itemsPerPage]);

  useEffect(() => {
    const { id } = router.query;
    if (id) {
      setCurrentPage(parseInt(id));
    }
  }, [router.query]);
  useEffect(() => {
    const cookies = cookie.parse(document.cookie);
    const defaultItemsPerPage = parseInt(cookies.itemsPerPage) || 16;
    setItemsPerPage(defaultItemsPerPage);
  }, []);

  const handleItemsPerPageChange = (event) => {
    const value = parseInt(event.target.value);
    setItemsPerPage(value);
    document.cookie = `itemsPerPage=${value}`;
    router.reload();
  };
  const handlePrice = (minPrice, maxPrice) => {
    setMinPrice(minPrice);
    setMaxPrice(maxPrice);
    document.cookie = `minPrice=${minPrice}`;
    document.cookie = `maxPrice=${maxPrice}`;
    router.reload();
  };

  const handlePriceFilter = (event) => {
    event.preventDefault();
    handlePrice(minPrice, maxPrice);
  };
  return (
    <div className="container mx-auto py-4">
      <NextSeo
        title={
          currentPage > 1
            ? `Gadgets Specifications - Page ${currentPage}  | Mobile Specifications, Price | Smart Watch Specifications, Price in Bangladesh`
            : `Mobile Specifications, Price | Smart Watch Specifications, Price in Bangladesh`
        }
        description="Find the latest mobile, smart watch specifications and prices in Bangladesh. Compare deals and stay updated on the latest mobile trends and tech."
      />
      {isLoading ? (
        <div className="flex justify-end items-center">
          <BeatLoader className="my-12" color="#4B5563" />
        </div>
      ) : (
        <>
          <Container
            key={currentPage}
            gadgetsData={gadgetsData}
            currentPage={currentPage}
            totalPages={totalPages}
            isLoading={isLoading}
            itemsPerPage={itemsPerPage}
            handlePrice={handlePrice}
            setMinPrice={setMinPrice}
            setMaxPrice={setMaxPrice}
            minPrice={minPrice}
            maxPrice={maxPrice}
            handlePriceFilter={handlePriceFilter}
            handleItemsPerPageChange={handleItemsPerPageChange}
            pageSlug="/page"
            mainTitle="Gadgets Price And Specifications"
          />
        </>
      )}
    </div>
  );
};

export async function getServerSideProps(context) {
  const id = 1;

  try {
    const cookies = cookie.parse(context.req.headers.cookie || "");
    const itemsPerPage = cookies.itemsPerPage || "16";
    const minPrice = cookies.minPrice || "default";
    const maxPrice = cookies.maxPrice || "default";

    const response = await axios.get(
      `https://specificationsbd.vercel.app/api/v1/gadgets/category?apikey=${apiKey}&show=all&&page=${id}&limit=${itemsPerPage}&minPrice=${minPrice}&maxPrice=${maxPrice}`
    );

    return {
      props: {
        gadgetsData: response.data,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        gadgetsData: {},
      },
    };
  }
}
export default Index;
