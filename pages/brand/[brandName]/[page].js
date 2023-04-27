import { useRouter } from "next/router";
import Gadgets from "../[brandName]";

export async function getServerSideProps(context) {
  const brandName = context.params.brandName;
  const page = context.params.page;
  const limit = 10; // You can change the limit to any value you want

  const apiRes = await fetch(
    `https://specificationsbd.vercel.app/api/v1/gadgets?apikey=nesar4623&brandName=${brandName}&page=${page}&limit=${limit}`
  );
  const data = await apiRes.json();

  return {
    props: {
      gadgets: data.data,
      brandName,
      currentPage: parseInt(page),
      totalPages: data.total_pages,
    },
  };
}

export default Gadgets;
