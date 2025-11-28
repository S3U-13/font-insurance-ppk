import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { Chip } from "@heroui/chip";
import React from "react";

export default function page() {
  return (
    <div className="space-y-4">
      <h1 className="mt-4 text-center text-xl font-bold">CHART</h1>
      <div className="bg-gray-100 border border-divider w-full h-195 rounded-lg p-4 grid grid-cols-12 gap-2">
        <div className="col-span-4 grid grid-cols-2 gap-4 h-75">
          <p className="col-span-2">TOTAL</p>
          <Card className="w-60 h-35 bg-gray-50 border border-divider">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start"></CardHeader>
            <CardBody></CardBody>
            <CardFooter></CardFooter>
          </Card>
          <Card className="w-60 h-35 bg-gray-50 border border-divider">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start"></CardHeader>
            <CardBody></CardBody>
            <CardFooter></CardFooter>
          </Card>
          <Card className="w-60 h-35 bg-gray-50 border border-divider">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start"></CardHeader>
            <CardBody></CardBody>
            <CardFooter></CardFooter>
          </Card>
          <Card className="w-60 h-35 bg-gray-50 border border-divider">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start"></CardHeader>
            <CardBody></CardBody>
            <CardFooter></CardFooter>
          </Card>
        </div>
        <div className="col-span-8 ">
          <p className="col-span-2">CHART</p>
          <Card className="bg-gray-50 rounded-xl h-74 mt-4 border border-divider">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start"></CardHeader>
            <CardBody></CardBody>
            <CardFooter></CardFooter>
          </Card>
        </div>
        <div className="col-span-12">
          <Card className="bg-gray-50 rounded-xl h-96 border border-divider">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start"></CardHeader>
            <CardBody></CardBody>
            <CardFooter></CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
