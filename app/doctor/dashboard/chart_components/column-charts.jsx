"use client";
import React, { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";

export default function ColumnChart() {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const options = {
      title: {
        text: "(chart example)",
        align: "center", // 'left' | 'center' | 'right'
        style: {
          fontSize: "20px",
          fontWeight: "bold",
        },
      },
      series: [
        { name: "Net Profit", data: [44, 55, 57, 56, 61, 58, 63, 60, 66] },
        { name: "Revenue", data: [76, 85, 101, 98, 87, 105, 91, 114, 94] },
        { name: "Free Cash Flow", data: [35, 41, 36, 26, 45, 48, 52, 53, 41] },
      ],
      chart: {
        type: "bar",
        height: 255,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "70%",
          borderRadius: 5,
          borderRadiusApplication: "end",
        },
      },
      dataLabels: { enabled: true },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      xaxis: {
        categories: [
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
        ],
      },
      yaxis: {
        // title: { text: "$ (thousands)" },
      },
      fill: { opacity: 1 },
      tooltip: {
        y: {
          formatter: (val) => `$ ${val} thousands`,
        },
      },
    };

    const chart = new ApexCharts(chartRef.current, options);
    chart.render();

    return () => {
      chart.destroy(); // ✅ cleanup ตอน component unmount
    };
  }, []);

  return <div ref={chartRef} />;
}
