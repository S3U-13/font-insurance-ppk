"use client";
import React, { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";
import { useTheme } from "next-themes";

export default function ColumnChart() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  // 🎨 theme colors
  const colors = isDark
    ? ["#60a5fa", "#34d399", "#fbbf24"]
    : ["#60a5fa", "#34d399", "#fbbf24"];
  const textColor = isDark ? "#e5e7eb" : "#1f2937";
  const gridColor = isDark ? "#18181b" : "#edf7f7";

  useEffect(() => {
    if (!chartRef.current || !resolvedTheme) return;

    const options = {
      theme: {
        mode: resolvedTheme, // ✅ dark / light
      },

      colors,

      title: {
        text: "(chart example)",
        align: "center",
        style: {
          fontSize: "18px",
          fontWeight: 600,
          color: textColor,
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
        background: gridColor,
      },

      plotOptions: {
        bar: {
          columnWidth: "65%",
          borderRadius: 6,
        },
      },

      dataLabels: {
        enabled: true,
        style: {
          // colors: [textColor],
          fontSize: "11px",
        },
      },

      grid: {
        // borderColor: gridColor,
        strokeDashArray: 4,
        show: true, // เปิด grid
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
        labels: {
          style: {
            colors: textColor,
          },
        },
      },

      yaxis: {
        labels: {
          style: {
            colors: textColor,
          },
        },
      },

      tooltip: {
        theme: resolvedTheme,
        y: {
          formatter: (val) => `$ ${val} thousands`,
        },
      },
    };

    // 🔥 destroy แล้วสร้างใหม่ (ชัวร์สุดสำหรับ theme)
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    chartInstance.current = new ApexCharts(chartRef.current, options);
    chartInstance.current.render();

    return () => {
      chartInstance.current?.destroy();
    };
  }, [resolvedTheme]); // ✅ สำคัญมาก

  return <div ref={chartRef} />;
}
