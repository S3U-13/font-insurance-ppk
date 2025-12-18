"use client";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { Chip } from "@heroui/chip";
import React from "react";
import AreaCountByYear from "./chart_components/area-count-all-order-by-year"; // ✅ ปรับชื่อให้ถูก
import ColumnChart from "./chart_components/column-charts"; // ✅ ปรับชื่อให้ถูก
import DonutChart from "./chart_components/donut-chart"; // ✅ ปรับชื่อให้ถูก

export default function page() {
  return (
    <div className="space-y-4">
      <h1 className="mt-4 text-center text-xl font-bold">CHART</h1>
      <div className="bg-gray-100 border border-divider w-full h-195 rounded-lg p-4 grid grid-cols-12 gap-4">
        <div className="col-span-4 grid grid-cols-2 gap-4 h-75">
          <p className="col-span-2">TOTAL</p>
          <Card className="w-60 h-35 bg-gray-50 border border-divider">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
              <h1>จำนวนรายการที่ทำ ปี</h1>
            </CardHeader>
            <CardBody>
              <div className="flex justify-between items-center gap-2">
                <div>
                  <h1>1000</h1> <span>รายการ</span>
                </div>

                <div className="bg-[#f0f9ff] p-2 rounded-full border border-[#74d4ff]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-6 text-[#00bcff]"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.502 6h7.128A3.375 3.375 0 0 1 18 9.375v9.375a3 3 0 0 0 3-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 0 0-.673-.05A3 3 0 0 0 15 1.5h-1.5a3 3 0 0 0-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6ZM13.5 3A1.5 1.5 0 0 0 12 4.5h4.5A1.5 1.5 0 0 0 15 3h-1.5Z"
                      clipRule="evenodd"
                    />
                    <path
                      fillRule="evenodd"
                      d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625V9.375ZM6 12a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V12Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM6 15a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V15Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM6 18a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V18Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </CardBody>
            <CardFooter>
              <div className="w-50px">{/* <AreaCountByYear /> */}</div>
            </CardFooter>
          </Card>
          <Card className="w-60 h-35 bg-gray-50 border border-divider">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
              รายการที่เคลมสำเร็จ ปี
            </CardHeader>
            <CardBody>
              <div className="flex items-center justify-between gap-2">
                <div>
                  <h1>800</h1> <span>รายการ</span>
                </div>
                <div className="bg-[#dcfce7] p-1.5 rounded-full border border-[#7bf1a8]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-7 text-[#05df72]"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </CardBody>
            <CardFooter></CardFooter>
          </Card>
          <Card className="w-60 h-35 bg-gray-50 border border-divider">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
              จำนวนรายการที่ทำ IPD ปี
            </CardHeader>
            <CardBody>
              {" "}
              <div className="flex items-center justify-between gap-2">
                <div>
                  <h1>500</h1> <span>รายการ</span>
                </div>
                <div className="bg-[#ffedd4] p-2 rounded-full border border-[#ffb86a]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-6 text-[#ff8904]"
                  >
                    <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
                    <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
                  </svg>
                </div>
              </div>
            </CardBody>
            <CardFooter></CardFooter>
          </Card>
          <Card className="w-60 h-35 bg-gray-50 border border-divider">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
              จำนวนรายการที่ทำ OPD ปี
            </CardHeader>
            <CardBody>
              {" "}
              <div className="flex items-center justify-between gap-2">
                <div>
                  <h1>500</h1> <span>รายการ</span>
                </div>

                <div className="bg-[#ffe4e6] p-2 rounded-full border border-[#ffa1ad]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-6 text-[#ff637e]"
                  >
                    <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                  </svg>
                </div>
              </div>
            </CardBody>
            <CardFooter></CardFooter>
          </Card>
        </div>
        <div className="col-span-8 ">
          <p className="col-span-2">CHART</p>
          <Card className="bg-gray-50 rounded-xl h-74 mt-4 border border-divider">
            <CardBody>
              <ColumnChart />
            </CardBody>
          </Card>
        </div>
        <div className="col-span-4">
          <Card className="bg-gray-50 rounded-xl h-96 border border-divider">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start"></CardHeader>
            <CardBody>
              <div className="w-100 h-100 pt-8">
                <DonutChart />
              </div>
            </CardBody>
            <CardFooter></CardFooter>
          </Card>
        </div>
        <div className="col-span-8">
          <Card className="bg-gray-50 rounded-xl h-96 border border-divider">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start"></CardHeader>
            <CardBody>
              <div className="w-100 h-100 pt-8"></div>
            </CardBody>
            <CardFooter></CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
