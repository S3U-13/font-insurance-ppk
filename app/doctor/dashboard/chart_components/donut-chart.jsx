"use client";
import React, { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";
import { useTheme } from "next-themes";

export default function DonutChart() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  // 🎨 theme colors
  const colors = isDark
    ? ["#60a5fa", "#34d399", "#fbbf24", "#ff9c45", "#ff4845"]
    : ["#60a5fa", "#34d399", "#fbbf24", "#ff9c45", "#ff4845"];
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
        offsetY: -5,
        style: {
          fontSize: "18px",
          fontWeight: 600,
          color: textColor,
        },
      },
      series: [45, 55, 41, 17, 15],

      chart: {
        type: "pie",
        background: gridColor,
        offsetY: 20,
        padding: {
          top: 20,
          right: 20,
          bottom: 10,
          left: 20,
        },
      },
      labels: ["Data A", "Data B", "Data C", "Data D", "Data E"],

      legend: {
        show: true,
        position: "bottom", // ⬇️ ไปล่าง
        horizontalAlign: "center",
        fontSize: "13px",
        offsetY: 25,
        labels: {
          colors: textColor,
        },
        itemMargin: {
          vertical: 5, // ระยะห่างบน–ล่าง (แนว column)
        },
      },
    };
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    chartInstance.current = new ApexCharts(chartRef.current, options);
    chartInstance.current.render();

    return () => {
      chartInstance.current?.destroy();
    };
  }, [resolvedTheme]);
  return <div ref={chartRef}></div>;
}
