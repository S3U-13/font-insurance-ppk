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
import { Tabs, Tab } from "@heroui/tabs";
import PartA from "./components/part_a";
import PartB from "./components/part_b";
import useHook from "./useHook";

export default function ModalCreateOPD({
  isOpen,
  onClose,
  patData,
  setPatData,
  claimId,
}) {
  const {
    sex,
    choice1,
    sick,
    everOrNever,
    choice2,
    yesOrNo,
    choice3,
    choice4,
    Anaesthesia,
    noOrYes,
    choice5,
    selectTabs,
    handleSelectTabs,
    modalRef,
    form,
    isSubmitting,
    calculateAge,
    formatThaiDateNoTime,
    convertISOToTime,
    formatAddress,
    // getParsed,
    // updateDate,
    // updateTime,
    user,
    signatureCheck,
    openSignDoctor,
    setOpenSignDoctor,
    handleSaveSignatureDoctor,
    signatureDoctor,
    setSignatureDoctor,
    parseDosage,
    formatThaiDateTime,
    dates,
    handleDateTimeForm,
    steps,
    activeStep,
    setActiveStep,
    CanManageOPD,
    temp,
    pulse,
    Resp,
    bp,
    addPastHistoryRow,
    removePastHistoryRow,
    rows,
    selectDiagValue,
    setSelectDiagValue,
    selectRefId,
    setSelectRefId,
    diagList,
    formatThaiDateTimeUTC,
    handleDateTimeClaimBForm,
    // ตัวเเปรร รับค่าวันที่เเละ เวลา
    accident,
    firstSeen,
    injuryDate,
  } = useHook({ patData, setPatData, onClose, claimId, isOpen });

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onOpenChange={onClose}
        size="full"
        classNames={{
          body: "max-h-[calc(90vh-70px)] overflow-y-scroll bg-[#edf7f7] dark:bg-[#0e0e11]",
          header:
            "border-b border-[#b0dddf] dark:border-divider bg-[#d8efef] dark:bg-[#0e0e11]",
          footer:
            "border-t border-[#b0dddf] dark:border-divider bg-[#d8efef] dark:bg-[#0e0e11]",
        }}
      >
        <ModalContent ref={modalRef}>
          {(onClose) => (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                form.handleSubmit();
              }}
            >
              <ModalHeader className="flex flex-col gap-1 text-center ">
                {activeStep === "1" && (
                  <>
                    <h1>
                      <strong>เเบบฟอร์มการเรียกร้องค่าสินไหม</strong>
                    </h1>
                    <p>
                      <strong>Hospital Name</strong> พระปกเกล้า จันทบุรี
                    </p>
                  </>
                )}
                {activeStep === "2" && (
                  <>
                    <h1>
                      <strong>Discharge Notification Form </strong>
                    </h1>
                    <p>
                      <strong>Hospital Name</strong> พระปกเกล้า จันทบุรี
                    </p>
                  </>
                )}
              </ModalHeader>
              <ModalBody>
                <Tabs
                  aria-label="Options"
                  variant="underlined"
                  classNames={{
                    base: "mx-auto border border-[#b0dddf] dark:border-divider rounded-lg bg-[#d8efef] dark:bg-[#0e0e11] text-xl font-bold w-full flex justify-center",
                    tab: "w-60",
                  }}
                  className="sticky top-0 z-50"
                  selectedKey={activeStep}
                  onSelectionChange={(key) => setActiveStep(String(key))}
                >
                  <Tab key="1" title="PART A" disabled={true}>
                    <PartA
                      patData={patData}
                      sex={sex}
                      noOrYes={noOrYes}
                      choice2={choice2}
                      form={form}
                      calculateAge={calculateAge}
                      formatThaiDateNoTime={formatThaiDateNoTime}
                      convertISOToTime={convertISOToTime}
                      formatAddress={formatAddress}
                      // getParsed={getParsed}
                      // updateDate={updateDate}
                      // updateTime={updateTime}
                      user={user}
                      signatureCheck={signatureCheck}
                      openSignDoctor={openSignDoctor}
                      setOpenSignDoctor={setOpenSignDoctor}
                      handleSaveSignatureDoctor={handleSaveSignatureDoctor}
                      signatureDoctor={signatureDoctor}
                      parseDosage={parseDosage}
                      formatThaiDateTime={formatThaiDateTime}
                      dates={dates}
                      handleDateTimeForm={handleDateTimeForm}
                      yesOrNo={yesOrNo}
                      temp={temp}
                      pulse={pulse}
                      Resp={Resp}
                      bp={bp}
                      CanManageOPD={CanManageOPD}
                      // accident เอาไปใช้กับ  component part A
                      accident={accident}
                    />
                  </Tab>
                  {CanManageOPD === "N" && (
                    <Tab key="2" title="PART B" disabled={true}>
                      <PartB
                        patData={patData}
                        sex={sex}
                        form={form}
                        choice3={choice3}
                        choice4={choice4}
                        sick={sick}
                        everOrNever={everOrNever}
                        choice2={choice2}
                        yesOrNo={yesOrNo}
                        Anaesthesia={Anaesthesia}
                        noOrYes={noOrYes}
                        choice5={choice5}
                        calculateAge={calculateAge}
                        formatThaiDateNoTime={formatThaiDateNoTime}
                        formatThaiDateTime={formatThaiDateTime}
                        convertISOToTime={convertISOToTime}
                        formatAddress={formatAddress}
                        temp={temp}
                        pulse={pulse}
                        Resp={Resp}
                        bp={bp}
                        // getParsed={getParsed}
                        // updateDate={updateDate}
                        // updateTime={updateTime}
                        addPastHistoryRow={addPastHistoryRow}
                        removePastHistoryRow={removePastHistoryRow}
                        rows={rows}
                        selectDiagValue={selectDiagValue}
                        setSelectDiagValue={setSelectDiagValue}
                        selectRefId={selectRefId}
                        setSelectRefId={setSelectRefId}
                        diagList={diagList}
                        formatThaiDateTimeUTC={formatThaiDateTimeUTC}
                        dates={dates}
                        handleDateTimeClaimBForm={handleDateTimeClaimBForm}
                        // ส่งตัวเเปร firstSeen injuryDate ไปใช้กับ part B
                        firstSeen={firstSeen}
                        injuryDate={injuryDate}
                      />
                    </Tab>
                  )}
                </Tabs>
              </ModalBody>
              <ModalFooter>
                {CanManageOPD === "N" && (
                  <div className="space-x-2">
                    {" "}
                    <Button
                      variant="flat"
                      onPress={() => {
                        const idx = steps.indexOf(activeStep);
                        if (idx > 0) setActiveStep(steps[idx - 1]); // ย้อนกลับไป step ก่อนหน้า
                        if (steps.indexOf(activeStep) === 0) {
                          onClose();
                        }
                      }}
                      // disable ถ้าอยู่ step แรก
                    >
                      {activeStep === steps[steps.length - 1]
                        ? "กลับ" // ขณะส่งข้อมูล
                        : "ปิด"}
                    </Button>
                    <Button
                      color="primary"
                      onPress={async () => {
                        const idx = steps.indexOf(activeStep);
                        if (idx < steps.length - 1) {
                          // ถ้ายังไม่ถึง step สุดท้าย
                          setActiveStep(steps[idx + 1]);
                        } else {
                          await form.handleSubmit(); // เรียก handleSubmit ของ useForm
                        }
                      }}
                      disabled={isSubmitting} // ป้องกันกดซ้ำ
                    >
                      {isSubmitting
                        ? "กำลังบันทึก..." // ขณะส่งข้อมูล
                        : activeStep === steps[steps.length - 1]
                          ? "บันทึกข้อมูล"
                          : "ถัดไป"}
                    </Button>
                  </div>
                )}
                {["Y", ""].includes(CanManageOPD) && (
                  <div className="space-x-2">
                    <Button
                      variant="flat"
                      onPress={() => {
                        onClose();
                      }}
                      // disable ถ้าอยู่ step แรก
                    >
                      ปิด
                    </Button>
                    <Button
                      color="primary"
                      onPress={async () => {
                        await form.handleSubmit(); // เรียก handleSubmit ของ useForm
                      }}
                      disabled={isSubmitting} // ป้องกันกดซ้ำ
                    >
                      {isSubmitting
                        ? "กำลังบันทึก..." // ขณะส่งข้อมูล
                        : "บันทึกข้อมูล"}
                    </Button>
                  </div>
                )}
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
