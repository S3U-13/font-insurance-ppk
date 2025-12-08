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

export default function page({ isOpen, onClose, claimData }) {
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
                <div>
                  <p>สำหรับผู้เอาประกัน</p>
                  <p>1.ชื่อขนามสกุล ผู้เอาประกันภัย : </p>
                  <p>{`${claimData?.his?.patient?.prename}${claimData?.his?.patient?.firstname} ${claimData?.his?.patient?.lastname}`}</p>
                  <p>เพศ : </p>
                  <p>ชาย</p>
                  <p>เลขประจำตัวประชาชน : </p>
                  <p>{claimData?.his?.patient?.citizencardno || "-"}</p>
                  <p>วันเดือนปี เกิด : </p>
                  <p>{claimData?.his?.patient?.birthdatetime || "-"}</p>
                  <p>อายุ : </p>
                  <p>{claimData?.his?.patient?.birthdatetime || "-"}</p>
                  <p>ปี : </p>
                  <p>เดือน : </p>
                  <p>{claimData?.his?.patient?.birthdatetime || "-"}</p>
                  <p>อาชีพ : </p>
                  <p>{claimData?.his?.patient?.birthdatetime || "-"}</p>
                  <p>โทรศัพท์มือถือ : </p>
                  <p>{claimData?.his?.patient?.birthdatetime || "-"}</p>
                  <p>โทรศัพท์บ้าน : </p>
                  <p>{claimData?.his?.patient?.birthdatetime || "-"}</p>
                  <p>อีเมล : </p>
                  <p>{claimData?.his?.patient?.birthdatetime || "-"}</p>
                  <p>ที่อยู่ปัจจุบัน : </p>
                  <p>{claimData?.his?.patient?.birthdatetime || "-"}</p>
                  <p>2.กรมธรรม์เลขที่ : </p>
                  <p>{`${claimData?.his?.patient?.prename}${claimData?.his?.patient?.firstname} ${claimData?.his?.patient?.lastname}`}</p>
                  <p>มีกรมธรรม์บริษัท : </p>
                  <p>ชาย</p>
                  <p>เลขประจำตัวประชาชน : </p>
                  <p>{claimData?.his?.patient?.citizencardno || "-"}</p>
                  <p>วันเดือนปี เกิด : </p>
                  <p>{claimData?.his?.patient?.birthdatetime || "-"}</p>
                  <p>อายุ : </p>
                  <p>{claimData?.his?.patient?.birthdatetime || "-"}</p>
                  <p>ปี : </p>
                  <p>เดือน : </p>
                  <p>{claimData?.his?.patient?.birthdatetime || "-"}</p>
                  <p>อาชีพ : </p>
                  <p>{claimData?.his?.patient?.birthdatetime || "-"}</p>
                  <p>โทรศัพท์มือถือ : </p>
                  <p>{claimData?.his?.patient?.birthdatetime || "-"}</p>
                  <p>โทรศัพท์บ้าน : </p>
                  <p>{claimData?.his?.patient?.birthdatetime || "-"}</p>
                  <p>อีเมล : </p>
                  <p>{claimData?.his?.patient?.birthdatetime || "-"}</p>
                  <p>ที่อยู่ปัจจุบัน : </p>
                  <p>{claimData?.his?.patient?.birthdatetime || "-"}</p>
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
