import React, { useState, useEffect } from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Chart, Bar } from "react-chartjs-2";
import { css } from "@emotion/react";
import { ScaleLoader } from "react-spinners";
const Statistics = () => {
  const [allBrands, setAllBrands] = useState(0);
  const [smartPhones, setSmartphones] = useState(0);
  const [smartWatches, setSmartWatches] = useState(0);
  const [allGadgets, setAllGadgets] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // Call the first API to get the allRoutes count
    fetch("https://specificationsbd.vercel.app/api/v1/gadgets/brands")
      .then((response) => response.json())
      .then((data) => {
        setAllBrands(data.total_count);
        setIsLoading(false);
      });

    // Call the second API to get the bus count
    fetch(
      "https://specificationsbd.vercel.app/api/v1/gadgets/category?show=smartPhone"
    )
      .then((response) => response.json())
      .then((data) => {
        setSmartphones(data.total_count);
        setIsLoading(false);
      });
    fetch(
      "https://specificationsbd.vercel.app/api/v1/gadgets/category?show=smartWatch"
    )
      .then((response) => response.json())
      .then((data) => {
        setSmartWatches(data.total_count);
        setIsLoading(false);
      });
    fetch(
      "https://specificationsbd.vercel.app/api/v1/gadgets/category?show=all"
    )
      .then((response) => response.json())
      .then((data) => {
        setAllGadgets(data.total_count);
        setIsLoading(false);
      });
  });

  const data = {
    labels: ["All Brands", "Smart Phones", "Smart Watches", "All Gadgets"],
    datasets: [
      {
        label: "Total",
        data: [allBrands, smartPhones, smartWatches, allGadgets],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };
  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;
  return (
    <div>
      <div className="mx-auto w-full flex justify-center items-center">
        <h2 className="text-center my-2">Total Statistics</h2>
        {isLoading ? (
          <>
            <div className="flex items-center justify-center p-12">
              <ScaleLoader
                css={override}
                size={150}
                color={"#123abc"}
                loading={isLoading}
              />
            </div>
          </>
        ) : (
          <>
            <Bar data={data} options={options} />
          </>
        )}
      </div>
    </div>
  );
};

export default Statistics;
