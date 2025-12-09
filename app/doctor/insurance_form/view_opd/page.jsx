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
  } = useHook();
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
                <div className="border border-divider rounded-xl p-4 bg-gray-50 space-y-6 ">
                  <section className="grid grid-cols-2 gap-2 p-6 bg-white shadow-xl rounded-xl border border-divider">
                    <h2 className="text-gray-800 dark:text-gray-100 font-bold text-lg flex items-center gap-3 col-span-2 mb-3">
                      <span className="w-1.5 h-6 bg-violet-500 rounded-full"></span>
                      สำหรับผู้เอาประกัน
                    </h2>
                    <p className="text-md font-bold col-span-2">
                      1.ผู้เอาประกันภัย :{" "}
                    </p>
                    <p className="flex items-center gap-2 text-sm text-sm pl-4">
                      <span className="font-bold">ชื่อ-นามสกุล :</span>{" "}
                      <span>{`${claimData?.his?.patient?.prename}${claimData?.his?.patient?.firstname} ${claimData?.his?.patient?.lastname}`}</span>
                    </p>

                    <p className="flex item-center gap-2">
                      <span className="font-bold">เพศ :</span> <span>ชาย</span>
                    </p>

                    <p className="flex items-center gap-2 text-sm text-sm pl-4">
                      <span className="font-bold">เลขประจำตัวประชาชน :</span>
                      <span>
                        {claimData?.his?.patient?.citizencardno || "-"}
                      </span>
                    </p>

                    <p className="flex items-center gap-2 text-sm text-sm">
                      <span className="font-bold">วันเดือนปี เกิด :</span>
                      <span>
                        {" "}
                        {formatThaiDateNoTime(
                          claimData?.his?.patient?.birthdatetime || "-"
                        )}
                      </span>
                    </p>

                    <p className="flex items-center gap-2 text-sm text-sm pl-4">
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

                    <p className="flex items-center gap-2 text-sm text-sm">
                      <span className="font-bold">อาชีพ :</span>

                      <span>{claimData?.his?.patient?.occupation || "-"}</span>
                    </p>

                    <p className="flex items-center gap-2 text-sm text-sm pl-4">
                      <span className="font-bold">โทรศัพท์มือถือ :</span>

                      <span>
                        {claimData?.his?.patient?.pat_address[0]?.phone || "-"}
                      </span>
                    </p>

                    <p className="flex items-center gap-2 text-sm text-sm">
                      <span className="font-bold">โทรศัพท์บ้าน :</span>

                      <span>{claimData?.his?.patient?.tel || "-"}</span>
                    </p>

                    <p className="flex items-center gap-2 text-sm text-sm pl-4">
                      <span className="font-bold">อีเมล :</span>

                      <span>
                        {claimData?.his?.patient?.pat_address[0]?.email || "-"}
                      </span>
                    </p>

                    <p className="flex items-center gap-2 text-sm text-sm col-span-2 pl-4">
                      <span className="font-bold">ที่อยู่ปัจจุบัน :</span>
                      <span>
                        {formatAddress(claimData?.his?.patient?.pat_address) ||
                          "-"}
                      </span>
                    </p>

                    <div className="border-b border-divider col-span-2 pb-2 " />
                    <div className="col-span-2">
                      <p className="text-md font-bold">2.กรมธรรม์เลขที่ : </p>
                      <div className="flex gap-2 text-sm pl-4">
                        <p className="font-bold">
                          มีกรมธรรม์บริษัทประกันอื่น ๆ หรือไม่ :{" "}
                        </p>
                        <p>มี</p>
                        <div className="grid grid-cols-1 gap-2 ">
                          <div className="flex items-center gap-2 text-sm text-sm">
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
                          <div className="flex items-center gap-2 text-sm text-sm">
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

                  <section className="p-6 bg-white shadow-xl rounded-xl border border-divider">
                    <h2 className="text-gray-800 dark:text-gray-100 font-bold text-lg flex items-center gap-3 col-span-2 mb-5">
                      <span className="w-1.5 h-6 bg-violet-500 rounded-full"></span>
                      For Hospital
                    </h2>
                    <div className="space-y-2 px-5">
                      <div className="grid grid-cols-5 gap-2">
                        <p className="flex items-center gap-2 text-sm ">
                          <span className="font-bold">1. Visit date :</span>{" "}
                          <span></span>
                        </p>
                        <p className="flex items-center gap-2 text-sm">
                          <span className="font-bold">Time :</span>{" "}
                          <span></span>
                        </p>
                        <p className="flex items-center gap-2 text-sm">
                          <span className="font-bold">Vital signs: T :</span>{" "}
                          <span></span>
                        </p>
                        <p className="flex items-center gap-2 text-sm">
                          <span className="font-bold">p :</span> <span></span>
                        </p>
                        <p className="flex items-center gap-2 text-sm">
                          <span className="font-bold">BP :</span> <span></span>
                        </p>
                      </div>
                      <p className="flex items-center gap-2 text-sm">
                        <span className="font-bold">
                          2. Chief complaint and duration :
                        </span>
                        <span>
                          {claimData?.hospitalForm?.chiefComplaint || "-"}
                        </span>
                      </p>
                      <p className="flex items-center gap-2 text-sm">
                        <span className="font-bold">
                          3. Present illness or cause of injury :
                        </span>
                        <span>
                          {claimData?.hospitalForm?.presentIllness || ""}
                        </span>
                      </p>
                      <div className="flex items-center gap-2">
                        <p className="flex items-center gap-2 text-sm">
                          <span className="font-bold">
                            4. An accident; Date of accident :
                          </span>
                          <span>
                            {formatThaiDateNoTime(
                              claimData?.hospitalForm?.accidentDateTime
                            ) || ""}
                          </span>
                        </p>
                        <p className="flex items-center gap-2 text-sm">
                          <span className="font-bold">Time : </span>{" "}
                          <span>
                            {" "}
                            {`${formatTimeNoDate(
                              claimData?.hospitalForm?.accidentDateTime
                            )} น.` || ""}
                          </span>
                        </p>
                      </div>

                      <p className="flex items-center gap-2 text-sm pl-5">
                        <span className="font-bold">Place :</span>
                        <span>
                          {" "}
                          {claimData?.hospitalForm?.accidentPlace || ""}
                        </span>
                      </p>
                      <p className="flex items-center gap-2 text-sm">
                        <span className="font-bold">5. Physical exam :</span>
                        <span>
                          {" "}
                          {claimData?.hospitalForm?.physicalExam || ""}
                        </span>
                      </p>
                      <p className="flex items-center gap-2 text-sm">
                        <span className="font-bold">
                          6. Is the illness related to (please tick ☒ if yes) :
                        </span>{" "}
                        <span>
                          {claimData?.hospitalForm?.relatedConditionIds}
                        </span>
                      </p>
                      <p className="flex items-center gap-2 text-sm">
                        <span className="font-bold">
                          7. Underlying condition :
                        </span>
                        <span>
                          {claimData?.hospitalForm?.underlyingCondition || ""}
                        </span>
                      </p>
                      <p className="flex items-center gap-2 text-sm">
                        <span className="font-bold">8. Diagnosis :</span>
                        <span>
                          {claimData?.hospitalForm?.provisionalDx || ""}
                        </span>
                      </p>
                      <p className="flex items-center gap-2 text-sm">
                        <span className="font-bold">
                          9. Investigation & Result(Lab, EKG, X - ray, etc) :
                        </span>
                        <span>
                          {claimData?.hospitalForm?.investigations || ""}
                        </span>
                      </p>
                      <p className="flex items-center gap-2 text-sm">
                        <span className="font-bold">10. Treatment :</span>
                        <span>
                          {claimData?.hospitalForm?.planOfTreatment || ""}
                        </span>
                      </p>
                    </div>
                  </section>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
