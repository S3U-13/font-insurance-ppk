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

export default function page({ isOpen, onClose, claimData }) {
  const {
    calculateAge,
    formatAddress,
    formatThaiDateNoTime,
    formatTimeNoDate,
    sortedIds,
  } = useHook({ claimData });
  return (
    <div>
      <Modal
        isOpen={isOpen}
        onOpenChange={onClose}
        size="5xl"
        classNames={{
          body: "max-h-[calc(80vh-50px)] overflow-y-scroll",
          header: "border-b border-divider",
          footer: "border-t border-divider",
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
                  <section className=" p-6 rounded-xl border border-divider">
                    <h2 className="text-gray-800 dark:text-gray-100 font-bold text-lg flex items-center gap-3 mb-2">
                      <span className="w-1.5 h-6 bg-violet-500 rounded-full"></span>
                      สำหรับผู้เอาประกัน
                    </h2>
                    <p className="text-md font-bold col-span-2">
                      ผู้เอาประกันภัย :{" "}
                    </p>
                    <div className="grid grid-cols-2 gap-2 mt-3 bg-gray-100 dark:bg-[#0e0e11] rounded-lg px-4 py-2">
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
                            claimData?.his?.patient?.birthdatetime || "-"
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
                          {claimData?.his?.patient?.occupation || "-"}
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
                            claimData?.his?.patient?.pat_address
                          ) || "-"}
                        </span>
                      </p>
                    </div>

                    <div className="mt-3 ">
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
                    </div>
                  </section>

                  <section className="p-6 rounded-xl border border-divider">
                    <h2 className="text-gray-800 dark:text-gray-100 font-bold text-lg flex items-center gap-3 mb-3">
                      <span className="w-1.5 h-6 bg-violet-500 rounded-full"></span>
                      For Hospital
                    </h2>
                    <div className="space-y-3">
                      <div className="flex gap-4 items-center ">
                        <p className="flex items-center gap-2 ">
                          <span className="font-bold text-md">
                            Visit date :
                          </span>{" "}
                          <span className="text-sm">
                            {formatThaiDateNoTime(
                              claimData?.hospitalForm?.visit?.visitdatetime
                            ) || ""}
                          </span>
                        </p>
                        <p className="flex items-center gap-2 ">
                          <span className="font-bold text-md">Time :</span>{" "}
                          <span className="text-sm">
                            {`${formatTimeNoDate(claimData?.hospitalForm?.visit?.visitdatetime)} น.` ||
                              ""}
                          </span>
                        </p>
                        <p className="flex items-center gap-2 ">
                          <span className="font-bold text-md">
                            Vital signs: T :
                          </span>{" "}
                          <span className="text-sm">
                            {claimData?.hospitalForm?.vitalsign?.temperature
                              ? `${claimData.hospitalForm?.vitalsign.temperature} °C`
                              : ""}
                          </span>
                        </p>
                        <p className="flex items-center gap-2 ">
                          <span className="font-bold text-md">p :</span>{" "}
                          <span className="text-sm">
                            {" "}
                            {claimData?.hospitalForm?.vitalsign?.pulse
                              ? `${claimData.hospitalForm?.vitalsign.pulse} bpm`
                              : ""}
                          </span>
                        </p>
                        <p className="flex items-center gap-2 ">
                          <span className="font-bold text-md">BP :</span>{" "}
                          <span className="text-sm">
                            {claimData?.hospitalForm?.vitalsign?.bp_systolic &&
                            claimData?.hospitalForm?.vitalsign?.bp_diastolic
                              ? `${claimData?.hospitalForm.vitalsign.bp_systolic}/${claimData?.hospitalForm.vitalsign.bp_diastolic} mmHg`
                              : ""}
                          </span>
                        </p>
                      </div>
                      <p className="flex items-center gap-2 ">
                        <span className="font-bold text-md">
                          Chief complaint and duration :
                        </span>
                        <span className="text-sm">
                          {claimData?.hospitalForm?.chiefComplaint || "-"}
                        </span>
                      </p>
                      <p className="flex items-center gap-2 ">
                        <span className="font-bold text-md">
                          Present illness or cause of injury :
                        </span>
                        <span className="text-sm">
                          {claimData?.hospitalForm?.presentIllness || ""}
                        </span>
                      </p>
                      <div className="flex items-center gap-2">
                        <p className="flex items-center gap-2 ">
                          <span className="font-bold text-md">
                            An accident; Date of accident :
                          </span>
                          <span className="text-sm">
                            {formatThaiDateNoTime(
                              claimData?.hospitalForm?.accidentDateTime
                            ) || ""}
                          </span>
                        </p>
                        <p className="flex items-center gap-2 ">
                          <span className="font-bold text-md">Time : </span>{" "}
                          <span className="text-sm">
                            {" "}
                            {`${formatTimeNoDate(
                              claimData?.hospitalForm?.accidentDateTime
                            )} น.` || ""}
                          </span>
                        </p>
                      </div>

                      <p className="flex items-center gap-2  pl-7">
                        <span className="font-bold text-md">Place :</span>
                        <span className="text-sm">
                          {" "}
                          {claimData?.hospitalForm?.accidentPlace || ""}
                        </span>
                      </p>
                      <p className="flex items-center gap-2 ">
                        <span className="font-bold text-md">
                          Physical exam :
                        </span>
                        <span className="text-sm">
                          {" "}
                          {claimData?.hospitalForm?.physicalExam || ""}
                        </span>
                      </p>
                      <div className="text-sm">
                        <div className="px-4 py-2 bg-gray-50 dark:bg-[#0e0e11] border border-divider rounded-lg mt-2 space-y-1">
                          <span className="font-bold text-md">
                            Is the illness related to (please tick ☒ if yes) :
                          </span>{" "}
                          {sortedIds.map((item) => (
                            <p className="text-sm" key={item.id}>
                              {item.id}. {item.type}
                            </p>
                          ))}
                        </div>
                      </div>
                      <p className="flex items-center gap-2 ">
                        <span className="font-bold text-md">
                          Underlying condition :
                        </span>
                        <span className="text-sm">
                          {claimData?.hospitalForm?.underlyingCondition || ""}
                        </span>
                      </p>
                      <p className="flex items-center gap-2 ">
                        <span className="font-bold text-md">Diagnosis :</span>
                        <span className="text-sm">
                          {claimData?.hospitalForm?.provisionalDx || ""}
                        </span>
                      </p>
                      <p className="flex items-center gap-2 ">
                        <span className="font-bold text-md">
                          Investigation & Result(Lab, EKG, X - ray, etc) :
                        </span>
                        <span className="text-sm">
                          {claimData?.hospitalForm?.investigations || ""}
                        </span>
                      </p>

                      <div className="bg-gray-50 dark:bg-[#0e0e11] border border-divider px-4 py-2 rounded-lg mt-2">
                        <p className="font-bold text-md pb-2">Treatment</p>
                        <p className="whitespace-pre-wrap text-sm">
                          {claimData?.hospitalForm?.planOfTreatment || ""}
                        </p>
                      </div>
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
