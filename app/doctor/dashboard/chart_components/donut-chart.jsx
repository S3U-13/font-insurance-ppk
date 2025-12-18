"use client";
import React, { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";

export default function DonutChart() {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const options = {
      series: [45, 55, 41, 17, 15],
      chart: {
        type: "donut",
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    };
    const chart = new ApexCharts(chartRef.current, options);
    chart.render();

    return () => {
      chart.destroy(); // ✅ cleanup ตอน component unmount
    };
  }, []);
  return <div ref={chartRef}></div>;
}
