import React, { useState, useEffect } from "react";
import axios from "axios";

import { PropagateLoader } from "react-spinners";
import { getBrands } from "@/utils/api";
import Link from "next/link";

const ListGroup = ({ items }) => {
  return (
    <ul className="w-72 divide-y divide-gray-200 dark:divide-gray-600">
      {items.map((item) => (
        <li
          key={item.brandName}
          className="py-4 px-2 dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
        >
          <Link
            href={`/brands/${item.brandName.toLowerCase()}`}
            className="block"
          >
            <p className="text-lg font-medium text-gray-900 dark:text-white">
              {item.brandName}
            </p>
          </Link>
        </li>
      ))}
    </ul>
  );
};

const LeftSide = () => {
  const [loading, setLoading] = useState(true);
  const [brands, setBrands] = useState([]);
  const [totalBrands, setTotalBrands] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(`${getBrands}`);
      if (result.data.status) {
        setBrands(result.data.brands);
        setTotalBrands(result.data.total_count);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div style={{ borderLeft: "3px solid #FF8C00" }}>
      <h2 className="py-4 text-xl font-bold px-2 dark:bg-gray-800 dark:text-white">
        Total Brands: {totalBrands}
      </h2>
      {loading ? (
        <div className="sweet-loading">
          <PropagateLoader className="w-full" size={8} color={"#FF8C00"} />
        </div>
      ) : (
        brands && (
          <>
            <ListGroup items={brands} />
            <Link
              href={`/brands`}
              className="block py-4 px-2 dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <p className="font-bold text-lg text-gray-900 dark:text-white">
                View All
              </p>
            </Link>
          </>
        )
      )}
    </div>
  );
};

export default LeftSide;
