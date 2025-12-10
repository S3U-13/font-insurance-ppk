"use client";
import { useEffect } from "react";
import ApexCharts from "apexcharts";

export default function Page() {
  useEffect(() => {
    const options = {
      series: [{ data: [10, 40, 25, 60, 30] }],
      dataLabels: {
        enabled: false,
      },
      chart: { type: "area" },
    };

    const chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();

    return () => chart.destroy(); // cleanup เวลาย้ายหน้า
  }, []);

  return <div id="chart" className="w-50 h-10"></div>;
}
