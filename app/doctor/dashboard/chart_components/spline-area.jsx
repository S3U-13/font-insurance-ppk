"use client";
import React, { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";
import { useTheme } from "next-themes";

export default function SplineArea() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const colors = isDark ? ["#60a5fa", "#34d399"] : ["#60a5fa", "#34d399"];
  const textColor = isDark ? "#e5e7eb" : "#1f2937";
  const gridColor = isDark ? "#18181b" : "#edf7f7";

  useEffect(() => {
    if (!chartRef.current || !resolvedTheme) return;

    const options = {
      theme: {
        mode: resolvedTheme, // ✅ dark / light
      },

      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.4,
          opacityTo: 0.05,
        },
      },

      title: {
        text: "(chart example)",
        align: "center", // 'left' | 'center' | 'right'

        style: {
          color: textColor,
          fontSize: "20px",
          fontWeight: "bold",
        },
      },

      colors,

      series: [
        {
          name: "OPD",
          data: [31, 40, 28, 54, 42, 51, 49],
        },
        {
          name: "IPD",
          data: [60, 81, 50, 104, 100, 108, 100],
        },
      ],
      chart: {
        type: "area",
        background: gridColor,
        height: 311,
        // padding: {
        //   top: 10,
        //   right: 20,
        //   bottom: 10,
        //   left: 20,
        // },
        // animations: {
        //   enabled: true,
        //   speed: 800,
        //   animateGradually: {
        //     enabled: true,
        //     delay: 150,
        //   },
        //   dynamicAnimation: {
        //     enabled: true,
        //     speed: 350,
        //   },
        // },
      },
      dataLabels: {
        enabled: false,
      },
      grid: {
        strokeDashArray: 4,
        show: true,
        xaxis: {
          lines: {
            show: true, // ❌ ไม่เอาเส้นตั้ง
          },
        },
        yaxis: {
          lines: {
            show: false, // ✅ เอาเส้นนอน
          },
        },
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        type: "datetime",

        categories: [
          "2025-12-13T00:00:00.000Z",
          "2025-12-14T01:30:00.000Z",
          "2025-12-15T02:30:00.000Z",
          "2025-12-16T03:30:00.000Z",
          "2025-12-17T04:30:00.000Z",
          "2025-12-18T05:30:00.000Z",
          "2025-12-19T06:30:00.000Z",
        ],
        labels: {
          offsetY: 10, // + ลง, - ขึ้น
          style: {
            colors: textColor,
            fontSize: "12px",
          },
        },
      },
      tooltip: {
        x: {
          format: "dd MMM yyyy",
        },
        style: {
          fontSize: "12px",
          colors: textColor,
        },
        theme: resolvedTheme,
      },
      //   xaxis: {
      //     labels: { show: false }, // ❌ ปิด label x
      //     axisBorder: { show: false }, // ❌ ปิดเส้น x
      //     axisTicks: { show: false }, // ❌ ปิดขีด x
      //   },
      yaxis: {
        labels: {
          show: true,
          style: {
            colors: textColor,
          },
        }, // ❌ ปิด label y
        axisBorder: { show: false }, // ❌ ปิดเส้น y
      },

      legend: {
        show: true,
        position: "bottom",
        offsetY: 30,

        labels: {
          colors: textColor,
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
