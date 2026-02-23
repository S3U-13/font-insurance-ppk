"use client";
import React from "react";
import { Button } from "@heroui/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/modal";

import useHook from "./useHook";

export default function ModalViewOPD({ isOpen, onClose, claimData }) {
  const {
    calculateAge,
    formatAddress,
    formatThaiDateNoTime,
    formatTimeNoDate,
    sortedIds,
    parseDosage,
    formatThaiDateTime,
  } = useHook({ claimData });
  return (
    <div>
      <Modal
        isOpen={isOpen}
        onOpenChange={onClose}
        size="full"
        classNames={{
          body: "max-h-[calc(90vh-70px)] overflow-y-scroll bg-[#edf7f7] dark:bg-[#0e0e11] px-60",
          header:
            "border-b border-[#b0dddf] dark:border-divider bg-[#d8efef] dark:bg-[#0e0e11]",
          footer:
            "border-t border-[#b0dddf] dark:border-divider bg-[#d8efef] dark:bg-[#0e0e11]",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h1 className="text-center">
                  <strong>ดูข้อมูลการเคลม</strong>
                </h1>
                <h1 className="text-center">
                  <strong>
                    เเบบฟอร์มการเรียกร้องค่าสินไหมกรณีผู้ป่วยนอก Outpatient
                    (OPD) and Accident Claim Form
                  </strong>
                </h1>
              </ModalHeader>
              <ModalBody>
                <div className="text-center pt-2">
                  <p>
                    <strong>Hospital Name</strong> พระปกเกล้า จันทบุรี
                  </p>
                  <p>
                    <strong>Company Name</strong>
                  </p>
                </div>
                <p>
                  <strong>Part A</strong>
                </p>
                <div className=" space-y-6 ">
                  <section className=" p-6 rounded-xl border border-[#b0dddf] dark:border-divider bg-[#d8efef] dark:bg-[#0e0e11]">
                    <div className="flex items-center justify-between">
                      {" "}
                      <p className="text-md font-bold col-span-2">
                        ผู้เอาประกันภัย :{" "}
                      </p>
                      <p className="text-md col-span-2">
                        <strong>Claim Date : </strong>
                        {""}
                        {formatThaiDateTime(
                          claimData?.hospitalForm?.datetimeForm,
                        )}
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-3 bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126] rounded-lg px-4 py-2">
                      <p className="flex items-center gap-2  text-sm ">
                        <span className="font-bold">ชื่อ-นามสกุล :</span>{" "}
                        <span>{`${claimData?.his?.patient?.prename}${claimData?.his?.patient?.firstname} ${claimData?.his?.patient?.lastname}`}</span>
                      </p>

                      <p className="flex item-center gap-2">
                        <span className="font-bold">เพศ :</span>{" "}
                        <span>ชาย</span>
                      </p>

                      <p className="flex items-center gap-2  text-sm ">
                        <span className="font-bold">เลขประจำตัวประชาชน :</span>
                        <span>
                          {claimData?.his?.patient?.citizencardno || "-"}
                        </span>
                      </p>

                      <p className="flex items-center gap-2  text-sm">
                        <span className="font-bold">วันเดือนปี เกิด :</span>
                        <span>
                          {" "}
                          {formatThaiDateNoTime(
                            claimData?.his?.patient?.birthdatetime || "-",
                          )}
                        </span>
                      </p>

                      <p className="flex items-center gap-2  text-sm ">
                        <span className="font-bold">อายุ :</span>

                        <span>
                          {" "}
                          {calculateAge(claimData?.his?.patient?.birthdatetime)
                            .years || "-"}{" "}
                          ปี{" "}
                          {calculateAge(claimData?.his?.patient?.birthdatetime)
                            .months || "-"}{" "}
                          เดือน
                        </span>
                      </p>

                      <p className="flex items-center gap-2  text-sm">
                        <span className="font-bold">อาชีพ :</span>

                        <span>
                          {claimData?.his?.patient?.occupationName || "-"}
                        </span>
                      </p>

                      <p className="flex items-center gap-2  text-sm ">
                        <span className="font-bold">โทรศัพท์มือถือ :</span>

                        <span>
                          {claimData?.his?.patient?.pat_address[0]?.phone ||
                            "-"}
                        </span>
                      </p>

                      <p className="flex items-center gap-2  text-sm">
                        <span className="font-bold">โทรศัพท์บ้าน :</span>

                        <span>{claimData?.his?.patient?.tel || "-"}</span>
                      </p>

                      <p className="flex items-center gap-2  text-sm ">
                        <span className="font-bold">อีเมล :</span>

                        <span>
                          {claimData?.his?.patient?.pat_address[0]?.email ||
                            "-"}
                        </span>
                      </p>

                      <p className="flex items-center gap-2  text-sm col-span-2 ">
                        <span className="font-bold">ที่อยู่ปัจจุบัน :</span>
                        <span>
                          {formatAddress(
                            claimData?.his?.patient?.pat_address,
                          ) || "-"}
                        </span>
                      </p>
                    </div>

                    {/* <div className="mt-3 ">
                      <p className="text-md font-bold">กรมธรรม์เลขที่ : </p>
                      <div className="flex gap-2 text-sm pl-4 space-y-4">
                        <p className="font-bold">
                          มีกรมธรรม์บริษัทประกันอื่น ๆ หรือไม่ :{" "}
                        </p>
                        <p>มี</p>
                        <div className="grid grid-cols-1 gap-2 ">
                          <div className="flex items-center gap-2  text-sm">
                            <p>
                              <span className="font-bold">1. บริษัท :</span>{" "}
                              <span>A company</span>{" "}
                            </p>

                            <p>
                              <span className="font-bold">
                                กรมธรรม์เลขที่ :
                              </span>{" "}
                              <span>A112457</span>
                            </p>
                          </div>
                          <div className="flex items-center gap-2  text-sm">
                            <p>
                              <span className="font-bold">2. บริษัท :</span>{" "}
                              <span>B company</span>
                            </p>

                            <p>
                              <span className="font-bold">
                                กรมธรรม์เลขที่ :
                              </span>{" "}
                              <span>B554123</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div> */}
                  </section>

                  <section className="p-6 rounded-xl border border-[#b0dddf] dark:border-divider bg-[#d8efef] dark:bg-[#0e0e11]">
                    <h2 className="text-gray-800 dark:text-gray-100 font-bold text-lg flex items-center gap-3 mb-3">
                      <span className="w-1.5 h-6 bg-[#27a59b]  dark:bg-violet-500 rounded-full"></span>
                      For Hospital
                    </h2>
                    <div className="space-y-3">
                      <h1 className="text-lg font-semibold">1.Vital Sign</h1>
                      <div className="grid grid-cols-5 gap-2 ">
                        <p className="flex items-center gap-2 bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126] rounded-md p-2 px-6">
                          <span className="font-bold text-md">
                            Visit date :
                          </span>{" "}
                          <span className="text-sm">
                            {formatThaiDateNoTime(
                              claimData?.hospitalForm?.visit?.visitdatetime,
                            ) || "-"}
                          </span>
                        </p>
                        <p className="flex items-center gap-2 bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126] rounded-md p-2 px-6">
                          <span className="font-bold text-md">Time :</span>{" "}
                          <span className="text-sm">
                            {`${formatTimeNoDate(claimData?.hospitalForm?.visit?.visitdatetime)} น.` ||
                              "-"}
                          </span>
                        </p>
                        <p className="flex items-center gap-2 bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126] rounded-md p-2 px-6">
                          <span className="font-bold text-md">
                            Vital signs: T :
                          </span>{" "}
                          <span className="text-sm">
                            {claimData?.hospitalForm?.vitalsign?.temperature
                              ? `${claimData.hospitalForm?.vitalsign.temperature} °C`
                              : "-"}
                          </span>
                        </p>
                        <p className="flex items-center gap-2 bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126] rounded-md p-2 px-6">
                          <span className="font-bold text-md">p :</span>{" "}
                          <span className="text-sm">
                            {" "}
                            {claimData?.hospitalForm?.vitalsign?.pulse
                              ? `${claimData.hospitalForm?.vitalsign.pulse} bpm`
                              : "-"}
                          </span>
                        </p>
                        <p className="flex items-center gap-2 bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126] rounded-md p-2 px-6">
                          <span className="font-bold text-md">BP :</span>{" "}
                          <span className="text-sm">
                            {claimData?.hospitalForm?.vitalsign?.bp_systolic &&
                            claimData?.hospitalForm?.vitalsign?.bp_diastolic
                              ? `${claimData?.hospitalForm.vitalsign.bp_systolic}/${claimData?.hospitalForm.vitalsign.bp_diastolic} mmHg`
                              : "-"}
                          </span>
                        </p>
                      </div>
                      <div className="-">
                        <span className="font-bold text-lg ">
                          2.Chief complaint and duration :
                        </span>

                        <div className="bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126] px-4 py-2 rounded-lg mt-2">
                          <span className="text-sm w text-justify whitespace-pre-line">
                            {claimData?.hospitalForm?.chiefComplaint || "-"}
                          </span>
                        </div>
                      </div>
                      <div className="-">
                        <span className="font-bold text-md">
                          3.Present illness or cause of injury :
                        </span>
                        <div className="bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126] px-4 py-2 rounded-lg mt-2">
                          <span className="text-sm w text-justify whitespace-pre-line">
                            {claimData?.hospitalForm?.presentIllness || "-"}
                          </span>
                        </div>
                      </div>
                      <div className="grid grid-cols-6 gap-2">
                        <h1 className="col-span-6 font-bold text-md">
                          4.An accident; Date of accident :
                        </h1>
                        <div className="col-span-2 bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126] px-4 py-2 rounded-lg">
                          {" "}
                          <span className="font-bold text-md">
                            Date :{" "}
                          </span>{" "}
                          <span className="text-sm">
                            {formatThaiDateNoTime(
                              claimData?.hospitalForm?.accidentDateTime,
                            ) || "-"}
                          </span>{" "}
                          <span className="font-bold text-md">Time : </span>{" "}
                          <span className="text-sm">
                            {" "}
                            {`${formatTimeNoDate(
                              claimData?.hospitalForm?.accidentDateTime,
                            )} น.` || "-"}
                          </span>
                        </div>
                        <div className="col-span-4 bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126] px-4 py-2 rounded-lg">
                          <span className="font-bold text-md">Place :</span>
                          <span className="text-sm">
                            {" "}
                            {claimData?.hospitalForm?.accidentPlace || "-"}
                          </span>
                        </div>
                      </div>

                      <p className="flex items-center gap-2 ">
                        <span className="font-bold text-md">
                          5.Physical exam :
                        </span>
                      </p>

                      <p className="text-sm bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126] px-4 py-2 rounded-lg">
                        {" "}
                        {claimData?.hospitalForm?.physicalExam || "-"}
                      </p>

                      <div className="">
                        <h1 className="font-bold text-md">
                          6.Is the illness related to (please tick ☒ if yes) :
                        </h1>{" "}
                        <div className="px-4 py-2 bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126] rounded-lg mt-2 space-y-1">
                          {sortedIds.length > 0 ? (
                            sortedIds.map((item) => (
                              <p className="text-sm" key={item.id}>
                                {item.id}. {item.type}
                              </p>
                            ))
                          ) : (
                            <p className="text-center py-10">ไม่มีข้อมูล</p>
                          )}
                        </div>
                      </div>
                      <p className="font-bold text-md">
                        7.Underlying condition :
                      </p>
                      <p className="text-sm bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126] px-4 py-2 rounded-lg">
                        {claimData?.hospitalForm?.underlyingCondition || "-"}
                      </p>
                      <p className="font-bold text-md">8.Diagnosis :</p>
                      <p className="w-full text-sm bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126] px-4 py-2 rounded-lg">
                        {claimData?.hospitalForm?.diagnosis || "-"}
                      </p>

                      <h1 className="font-bold text-md">
                        9.Investigation & Result(Lab, EKG, X - ray, etc) :
                      </h1>
                      <div className="border border-[#b0dddf] dark:border-divider bg-[#f2fbf9] dark:bg-[#1c1c1f] p-4 rounded-lg space-y-2">
                        <p className="text-md font-bold">Lab</p>
                        <div className="border border-divider rounded-lg">
                          <table className="w-full border-collapse">
                            <thead>
                              <tr className=" text-sm">
                                <th className="border-r border-divider text-left px-4 py-2">
                                  service name
                                </th>
                                <th className="text-left px-4 py-2">
                                  service date time
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {claimData?.rawdata?.labReports &&
                              claimData?.rawdata?.labReports.length > 0 ? (
                                claimData?.rawdata?.labReports.map(
                                  (item, index) => {
                                    return (
                                      <tr
                                        key={index}
                                        className="border-t border-divider text-xs
            hover:bg-gray-50 dark:hover:bg-zinc-800
            transition-colors"
                                      >
                                        <td className="border-r border-divider px-2 py-1">
                                          {item?.servicename}
                                        </td>
                                        <td className=" px-2 py-1">
                                          {formatThaiDateTime(
                                            item?.servicedatetime,
                                          )}
                                        </td>
                                      </tr>
                                    );
                                  },
                                )
                              ) : (
                                <tr className="border-t border-divider text-xs">
                                  <td
                                    colSpan={2}
                                    className="px-3 py-4 text-center text-gray-400"
                                  >
                                    ไม่มีข้อมูล
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <div className="border border-[#b0dddf] dark:border-divider bg-[#f2fbf9] dark:bg-[#1c1c1f] p-4 rounded-lg space-y-2">
                        <p className="text-md font-bold">X-ray</p>
                        <div className="border border-divider rounded-lg ">
                          <table className=" w-full border-collapse">
                            <thead>
                              <tr className="text-sm">
                                <th className="border-r border-divider text-left px-4 py-2">
                                  service name
                                </th>
                                <th className="text-left px-4 py-2">
                                  service date time
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {claimData?.rawdata?.xrayReports &&
                              claimData?.rawdata?.xrayReports.length > 0 ? (
                                claimData?.rawdata?.xrayReports.map(
                                  (item, index) => {
                                    return (
                                      <tr
                                        key={index}
                                        className="border-t border-divider text-xs
            hover:bg-gray-50 dark:hover:bg-zinc-800
            transition-colors"
                                      >
                                        <td className="border-r border-divider px-2 py-1">
                                          {item?.servicename}
                                        </td>
                                        <td className="px-2 py-1">
                                          {formatThaiDateTime(
                                            item?.servicedatetime,
                                          )}
                                        </td>
                                      </tr>
                                    );
                                  },
                                )
                              ) : (
                                <tr className="border-t border-divider text-xs">
                                  <td
                                    colSpan={2}
                                    className="px-3 py-4 text-center text-gray-400"
                                  >
                                    ไม่มีข้อมูล
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <p className="w-full text-sm bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126] px-4 py-2 rounded-lg">
                        {claimData?.hospitalForm?.investigations || "-"}
                      </p>

                      <p className="font-bold text-md">
                        10.Can the condition be managed under Out Patient basis
                        :
                      </p>
                      <p className="w-full text-sm bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126] px-4 py-2 rounded-lg">
                        {claimData?.hospitalForm?.canManageOPD === "Y"
                          ? "Yes"
                          : "No"}
                      </p>

                      <h1 className="font-bold text-md">11. Treatment</h1>

                      <div className="border border-[#b0dddf] dark:border-divider bg-[#f2fbf9] dark:bg-[#1c1c1f] p-4 rounded-lg space-y-1">
                        <p className="text-md font-bold">Medicine</p>
                        <div className="border border-divider rounded-lg">
                          <table className="w-full border-collapse">
                            <thead>
                              <tr className="text-sm">
                                <th className="border-r border-divider text-left px-4 py-2">
                                  Name
                                </th>
                                <th className="border-r border-divider text-left px-4 py-2">
                                  Dosage
                                </th>
                                <th className="border-r border-divider text-left px-4 py-2">
                                  Dosage UOM
                                </th>
                                <th className=" text-left px-4 py-2">
                                  Quantity
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {Array.isArray(claimData?.rawdata?.drugs) &&
                              claimData?.rawdata?.drugs.length > 0 ? (
                                claimData?.rawdata?.drugs.map((item, index) => {
                                  const { dose } = parseDosage(item.itemname);

                                  return (
                                    <tr
                                      key={item.orderItemId ?? index}
                                      className="border-t border-divider text-xs
              hover:bg-gray-50 dark:hover:bg-zinc-800
              transition-colors"
                                    >
                                      <td className="border-r border-divider px-2 py-1">
                                        {item?.itemname}
                                      </td>

                                      <td className="border-r border-divider px-2 py-1">
                                        {dose || "-"}
                                      </td>

                                      <td className="border-r border-divider px-2 py-1">
                                        {item?.useUnitdetail?.engname || "-"}
                                      </td>

                                      <td className="px-2 py-1">
                                        {item?.serviceqty}
                                        {""} {item?.payUnitdetail?.engname}
                                      </td>
                                    </tr>
                                  );
                                })
                              ) : (
                                <tr className="border-t border-divider text-xs">
                                  <td
                                    colSpan={5}
                                    className="px-3 py-4 text-center text-gray-400"
                                  >
                                    ไม่มีข้อมูล
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      <p className="whitespace-pre-wrap text-sm bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126] px-4 py-2 rounded-lg ">
                        {claimData?.hospitalForm?.treatment || "-"}
                      </p>
                    </div>
                  </section>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="default" variant="flat" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
