"use client";
import { Checkbox, CheckboxGroup } from "@heroui/checkbox";
import { DatePicker } from "@heroui/date-picker";
import { Input, Textarea } from "@heroui/input";
import { Radio, RadioGroup } from "@heroui/radio";
import { Select, SelectItem } from "@heroui/select";
import { Snippet } from "@heroui/snippet";
import React, { useState, useRef } from "react";
import {
  today,
  parseDate,
  getLocalTimeZone,
  parseAbsoluteToLocal,
} from "@internationalized/date";
import { DateInput, TimeInput } from "@heroui/date-input";
import ModalDoctorSignature from "../doctor-signature/page";
import { Button } from "@heroui/button";
import { useTheme } from "next-themes";
import { Edit3, Check, Copy } from "@deemlol/next-icons";

export default function FormOPD({
  sex,
  noOrYes,
  choice2,
  form,
  patData,
  setPatData,
  calculateAge,
  formatThaiDateNoTime,
  convertISOToTime,
  formatAddress,
  accidentTime,
  setAccidentTime,
  accidentDate,
  setAccidentDate,
  handleAccidentDateChange,
  handleAccidentTimeChange,
  user,
  signatureCheck,
  openSignDoctor,
  setOpenSignDoctor,
  handleSaveSignatureDoctor,
  signatureDoctor,
  setSignatureDoctor,
  parseDosage,
  formatThaiDateTime,
  date,
  setDate,
  handleDateTimeForm,
}) {
  return (
    <div className="px-40 pb-6">
      <ModalDoctorSignature
        isOpen={openSignDoctor}
        onClose={() => {
          setOpenSignDoctor(false);
        }}
        onSave={handleSaveSignatureDoctor}
      />
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
      <div className="mt-2 border border-[#b0dddf] dark:border-divider  bg-[#d8efef] dark:bg-[#18181B] rounded-xl p-4 space-y-4">
        <div className="grid grid-cols-10 gap-2 items-center">
          <h2 className=" font-semibold text-base flex items-center gap-2 mb-4 col-span-10">
            <span className="w-1 h-5 bg-[#27a59b]  dark:bg-violet-500 rounded-full"></span>
            สำหรับผู้เอาประกัน
          </h2>
          <Input
            className="col-span-4"
            label="ชื่อ-นามสกุล"
            value={`${patData?.pat?.prename || ""}${patData?.pat?.firstname || ""} ${patData?.pat?.lastname || ""}`}
            size="sm"
            variant="flat"
            classNames={{
              inputWrapper:
                "bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126]",
            }}
            disabled
          />
          <Select
            className="col-span-1"
            label="เพศ"
            size="sm"
            variant="flat"
            classNames={{
              base: "bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126] rounded-lg",
            }}
            disabled
            selectedKeys={
              patData?.pat?.sex ? new Set([String(patData.pat.sex)]) : new Set()
            }
            onSelectionChange={(keys) => {
              const selected = Array.from(keys)[0];
              setPatData((prev) => ({
                ...prev,
                pat: {
                  ...prev.pat,
                  sex: selected ? Number(selected) : null,
                },
              }));
            }}
          >
            {sex.map((item) => (
              <SelectItem
                key={String(item.value)} // ต้องเป็น string
                value={String(item.value)} // ต้องเป็น string
              >
                {item.name}
              </SelectItem>
            ))}
          </Select>
          <Input
            className="col-span-3"
            label="เลขประจำตัวประชาชน"
            size="sm"
            value={patData?.pat?.citizencardno || ""}
            variant="flat"
            classNames={{
              inputWrapper:
                "bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126]",
            }}
            disabled
          />
          <form.Field name="patientId">
            {(field) => (
              <Input
                className="col-span-2"
                label="HN"
                size="sm"
                variant="flat"
                classNames={{
                  inputWrapper:
                    "bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126]",
                }}
                disabled
                value={field.state.value || ""}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            )}
          </form.Field>
        </div>
        <div className="grid grid-cols-8 gap-2 items-center">
          <Input
            disabled
            className="col-span-3"
            label="วัน/เดือน/ปีเกิด"
            size="sm"
            variant="flat"
            classNames={{
              inputWrapper:
                "bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126]",
            }}
            value={formatThaiDateNoTime(patData?.pat?.birthdatetime || "")}
          />

          <Input
            className="col-span-1"
            label="อายุ"
            size="sm"
            variant="flat"
            classNames={{
              inputWrapper:
                "bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126]",
            }}
            disabled
            value={`${calculateAge(patData?.pat?.birthdatetime).years || ""} ปี`}
          />

          <Input
            className="col-span-1"
            label="เดือน"
            size="sm"
            variant="flat"
            classNames={{
              inputWrapper:
                "bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126]",
            }}
            value={`${calculateAge(patData?.pat?.birthdatetime).months || ""} เดือน`}
            disabled
          />

          <Input
            className="col-span-3"
            label="อาชีพ"
            size="sm"
            variant="flat"
            classNames={{
              inputWrapper:
                "bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126]",
            }}
            value={patData?.pat?.occupationName || ""}
            disabled
          />
        </div>
        <div className="grid grid-cols-8 gap-2 items-center">
          <Input
            className="col-span-2"
            label="โทรศัพท์มือถือ"
            size="sm"
            variant="flat"
            classNames={{
              inputWrapper:
                "bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126]",
            }}
            value={patData?.pat?.pat_address[0]?.phone ?? "-"}
            disabled
          />
          <Input
            className="col-span-2"
            label="โทรศัพท์บ้าน"
            size="sm"
            variant="flat"
            classNames={{
              inputWrapper:
                "bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126]",
            }}
            disabled
          />

          <Input
            className="col-span-4"
            label="อีเมล"
            size="sm"
            variant="flat"
            classNames={{
              inputWrapper:
                "bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126]",
            }}
            value={patData?.pat?.pat_address[0]?.email ?? "-"}
            disabled
          />
        </div>
        <div className="grid grid-cols-8 gap-2 items-center">
          <Input
            className="col-span-8"
            label="ที่อยู่ปัจจุบัน"
            size="sm"
            variant="flat"
            classNames={{
              inputWrapper:
                "bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126]",
            }}
            value={formatAddress(patData?.pat?.pat_address)}
            disabled
          />
        </div>
      </div>
      {/* <div className="mt-6 border border-[#b0dddf] dark:border-divider  bg-[#d8efef] dark:bg-[#18181B] rounded-xl p-4 space-y-4">
        <h2 className=" font-semibold text-base flex items-center gap-2 mb-4 col-span-10">
          <span className="w-1 h-5 bg-[#27a59b]  dark:bg-violet-500 rounded-full"></span>
          กรมธรรม์เลขที่
        </h2>
        <div className="grid grid-cols-12 gap-2 items-center">
          <Input
            className="col-span-12"
            label="กรมธรรม์เลขที่"
            size="sm"
            variant="flat"
            classNames={{
              inputWrapper:
                "bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126]",
            }}
          />
          <div className="col-span-5 flex items-center gap-2">
            <p className="col-span-4">มีกรมธรรม์บริษัทประกันอื่น ๆ หรือไม่</p>
            <RadioGroup
              orientation="horizontal"
              className="col-span-2 "
              size="sm"
              classNames={{ wrapper: "pl-2" }}
            >
              {noOrYes.map((noy) => (
                <Radio key={noy.id} value={noy.id}>
                  {noy.value}
                </Radio>
              ))}
            </RadioGroup>
          </div>

          <Input
            className="col-span-4"
            label="บริษัท :"
            size="sm"
            variant="flat"
            classNames={{
              inputWrapper:
                "bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126]",
            }}
          />
          <Input
            className="col-span-3"
            label="กรมธรรม์เลขที่ :"
            size="sm"
            variant="flat"
            classNames={{
              inputWrapper:
                "bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126]",
            }}
          />
          <div className="col-span-5"></div>
          <Input
            className="col-span-4"
            label="บริษัท :"
            size="sm"
            variant="flat"
            classNames={{
              inputWrapper:
                "bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126]",
            }}
          />
          <Input
            className="col-span-3"
            label="กรมธรรม์เลขที่ :"
            size="sm"
            variant="flat"
            classNames={{
              inputWrapper:
                "bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126]",
            }}
          />
        </div>
      </div> */}

      <div className="mt-6 border border-[#b0dddf] dark:border-divider  bg-[#d8efef] dark:bg-[#18181B] rounded-2xl p-6 space-y-8  shadow-sm">
        <h2 className="text-gray-800 dark:text-gray-100 font-bold text-lg flex items-center gap-3">
          <span className="w-1 h-5 bg-[#27a59b]  dark:bg-violet-500 rounded-full"></span>
          For Hospital
        </h2>

        {/* Section 1: Visit Information */}
        <div className="space-y-4">
          <h3 className="font-semibold  dark:text-white">
            1. Visit Information
          </h3>
          {/* <div className="grid grid-cols-3 gap-2"> */}
          <form.Field name="visitid">
            {(field) => (
              <Input
                label="Visit id :"
                size="sm"
                variant="flat"
                classNames={{
                  inputWrapper:
                    "bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126]",
                }}
                type="hidden"
                value={field.state.value || ""}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            )}
          </form.Field>
          <form.Field name="claimId">
            {(field) => (
              <Input
                label="claim id :"
                size="sm"
                variant="flat"
                classNames={{
                  inputWrapper:
                    "bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126]",
                }}
                type="hidden"
                value={field.state.value || ""}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            )}
          </form.Field>
          <form.Field name="vitalsignId">
            {(field) => (
              <Input
                label="vital sign id :"
                size="sm"
                variant="flat"
                classNames={{
                  inputWrapper:
                    "bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126]",
                }}
                type="hidden"
                value={field.state.value || ""}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            )}
          </form.Field>
          {/* </div> */}
          <div className="grid grid-cols-12 gap-4 items-end">
            <DatePicker
              className="col-span-2"
              label="Visit date"
              size="sm"
              variant="flat"
              classNames={{
                inputWrapper:
                  "bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126]",
              }}
              value={
                patData?.visitdatetime
                  ? parseDate(patData?.visitdatetime.split("T")[0])
                  : null
              }
              disabled
            />
            <TimeInput
              className="col-span-2"
              label="Time"
              size="sm"
              variant="flat"
              classNames={{
                inputWrapper:
                  "bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126]",
              }}
              value={
                patData?.visitdatetime
                  ? convertISOToTime(patData.visitdatetime)
                  : null
              }
              disabled
            />

            <Input
              className="col-span-2"
              label="T (Temp)"
              size="sm"
              variant="flat"
              classNames={{
                inputWrapper:
                  "bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126]",
              }}
              value={
                patData?.vitalsign?.[0]?.temperature
                  ? `${patData.vitalsign[0]?.temperature} °C`
                  : ""
              }
              disabled
            />

            <Input
              className="col-span-2"
              label="P (Pulse)"
              size="sm"
              variant="flat"
              classNames={{
                inputWrapper:
                  "bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126]",
              }}
              value={
                patData?.vitalsign?.[0]?.pulse
                  ? `${patData.vitalsign[0].pulse} bpm`
                  : ""
              }
              disabled
            />

            <Input
              className="col-span-2"
              label="R (Resp.)"
              size="sm"
              variant="flat"
              classNames={{
                inputWrapper:
                  "bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126]",
              }}
              value={
                patData?.vitalsign?.[0]?.respiration
                  ? `${patData.vitalsign[0].respiration} /min`
                  : ""
              }
              disabled
            />

            <Input
              className="col-span-2"
              label="BP"
              size="sm"
              variant="flat"
              classNames={{
                inputWrapper:
                  "bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126]",
              }}
              value={
                patData?.vitalsign?.[0]?.bp_systolic &&
                patData?.vitalsign?.[0]?.bp_diastolic
                  ? `${patData.vitalsign[0].bp_systolic}/${patData.vitalsign[0].bp_diastolic} mmHg`
                  : ""
              }
              disabled
            />
          </div>
        </div>

        {/* Section 2: Chief Complaint */}
        <div className="space-y-4">
          <h3 className="font-semibold  dark:text-white">2. Chief Complaint</h3>

          <form.Field name="chiefComplaint">
            {(field) => (
              <Input
                className="w-full"
                label="Chief complaint and duration"
                size="sm"
                variant="flat"
                classNames={{
                  inputWrapper:
                    "bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126]",
                }}
                value={field.state.value || ""}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            )}
          </form.Field>
        </div>

        {/* Section 3: Present Illness */}
        <div className="space-y-4">
          <h3 className="font-semibold  dark:text-white">3. Present Illness</h3>

          <form.Field name="presentIllness">
            {(field) => (
              <Textarea
                className="w-full"
                label="Present illness or cause of injury"
                variant="flat"
                classNames={{
                  inputWrapper:
                    "bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126]",
                }}
                value={field.state.value || ""}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            )}
          </form.Field>
        </div>

        {/* Section 4: Accident Details */}
        <div className="space-y-4">
          <h3 className="font-semibold  dark:text-white">
            4. Accident Details
          </h3>

          <div className="grid grid-cols-12 gap-4 items-end">
            <div className="col-span-4 flex items-center gap-2">
              {/* Date */}
              <DatePicker
                label="Date of accident"
                size="sm"
                variant="flat"
                classNames={{
                  inputWrapper:
                    "bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126]",
                }}
                value={accidentDate}
                onChange={handleAccidentDateChange}
              />

              {/* Time */}
              <TimeInput
                label="Time of accident"
                size="sm"
                variant="flat"
                classNames={{
                  inputWrapper:
                    "bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126]",
                }}
                value={accidentTime}
                onChange={handleAccidentTimeChange}
              />
            </div>

            <form.Field name="accidentPlace">
              {(field) => (
                <Input
                  className="col-span-8"
                  label="Place"
                  size="sm"
                  variant="flat"
                  classNames={{
                    inputWrapper:
                      "bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126]",
                  }}
                  value={field.state.value ?? ""}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              )}
            </form.Field>
          </div>
        </div>

        {/* Section 5: Physical Exam */}
        <div className="space-y-4">
          <h3 className="font-semibold  dark:text-white">
            5. Physical Examination
          </h3>

          <form.Field name="physicalExam">
            {(field) => (
              <Input
                className="w-full"
                label="Physical exam"
                size="sm"
                variant="flat"
                classNames={{
                  inputWrapper:
                    "bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126]",
                }}
                value={field.state.value || ""}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            )}
          </form.Field>
        </div>

        {/* Section 6: Related Conditions */}
        <div className="space-y-4">
          <h3 className="font-semibold  dark:text-white">
            6. Related Conditions
          </h3>

          <form.Field name="relatedConditions">
            {(field) => (
              <CheckboxGroup
                label="Is the illness related to:"
                className="px-4 py-3 border border-[#b0dddf] dark:border-divider rounded-lg bg-[#f2fbf9] dark:bg-[#1c1c1f] "
                size="sm"
                value={field.state.value || []}
                onChange={(values) => field.handleChange(values)}
              >
                {choice2.map((c2) => (
                  <Checkbox key={c2.id} value={String(c2.id)}>
                    <span className="text-sm">
                      {c2.id}. {c2.value}
                    </span>
                  </Checkbox>
                ))}
              </CheckboxGroup>
            )}
          </form.Field>
        </div>

        {/* Section 7: Underlying Condition */}
        <div className="space-y-4">
          <h3 className="font-semibold  dark:text-white">
            7. Underlying Condition
          </h3>

          <form.Field name="underlyingCondition">
            {(field) => (
              <Input
                className="w-full"
                label="Underlying condition"
                size="sm"
                variant="flat"
                classNames={{
                  inputWrapper:
                    "bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126]",
                }}
                value={field.state.value || ""}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            )}
          </form.Field>
        </div>

        {/* Section 8: Diagnosis */}
        <div className="space-y-4">
          <h3 className="font-semibold  dark:text-white">8. Diagnosis</h3>
          <form.Field name="diagnosis">
            {(field) => (
              <Textarea
                className="w-full"
                label="Diagnosis"
                size="sm"
                variant="flat"
                classNames={{
                  inputWrapper:
                    "bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126]",
                }}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            )}
          </form.Field>
        </div>

        {/* Section 9: Investigation */}
        <div className="space-y-4">
          <h3 className="font-semibold  dark:text-white">
            9. Investigation & Result
          </h3>
          <div className="grid grid-cols-1 gap-4">
            <div className="border border-[#b0dddf] dark:border-divider bg-[#f2fbf9] dark:bg-[#1c1c1f] p-4 rounded-lg space-y-2">
              <p className="text-md font-bold">Lab</p>
              <div className="border border-divider rounded-lg ">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className=" text-sm">
                      <th className="border-r border-divider text-left py-1 px-2">
                        service name
                      </th>
                      <th className="text-left py-1 px-2">service date time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {patData?.labReports && patData.labReports.length > 0 ? (
                      patData.labReports.map((item, index) => (
                        <tr
                          key={index}
                          className="
            border-t border-divider text-xs
            hover:bg-gray-50 dark:hover:bg-zinc-800
            transition-colors
          "
                        >
                          <td className="border-r border-divider px-3 py-2">
                            {item?.servicename}
                          </td>
                          <td className="px-3 py-2">
                            {formatThaiDateTime(item?.servicedatetime)}
                          </td>
                        </tr>
                      ))
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
                      <th className="border-r border-divider text-left py-1 px-2">
                        service name
                      </th>
                      <th className="text-left py-1 px-2">service date time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {patData?.xrayReports && patData.xrayReports.length > 0 ? (
                      patData.xrayReports.map((item, index) => (
                        <tr
                          key={index}
                          className="
            border-t border-divider text-xs
            hover:bg-gray-50 dark:hover:bg-zinc-800
            transition-colors
          "
                        >
                          <td className="border-r border-divider px-3 py-2">
                            {item?.servicename}
                          </td>
                          <td className="px-3 py-2">
                            {formatThaiDateTime(item?.servicedatetime)}
                          </td>
                        </tr>
                      ))
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
            <form.Field name="investigations">
              {(field) => (
                <Textarea
                  className="w-full"
                  classNames={{
                    label: "text-md font-bold",
                    inputWrapper:
                      "bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126]",
                  }}
                  label="Investigation & Result (Lab, EKG, X-ray, etc.)"
                  radius="sm"
                  variant="flat"
                  maxRows={31}
                  value={field.state.value || ""}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              )}
            </form.Field>
          </div>
        </div>
        {/* Section 10: Treatment */}
        <div className="space-y-4">
          <h3 className="font-semibold  dark:text-white">10.Treatment</h3>
          <div className="grid grid-cols-1 gap-4">
            <div className="border border-[#b0dddf] dark:border-divider bg-[#f2fbf9] dark:bg-[#1c1c1f] p-4 rounded-lg space-y-1">
              <p className="text-md font-bold">Medicine</p>
              <div className="border border-divider rounded-lg">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="text-sm">
                      <th className="border-r border-divider text-left py-1 px-2">
                        Name
                      </th>
                      <th className="border-r border-divider text-left py-1 px-2">
                        Dosage
                      </th>
                      <th className="border-r border-divider text-left py-1 px-2">
                        Dosage UOM
                      </th>
                      <th className="text-left py-1 px-2">Quantity</th>
                    </tr>
                  </thead>

                  <tbody>
                    {Array.isArray(patData?.drug) && patData.drug.length > 0 ? (
                      patData.drug.map((item, index) => {
                        const { dose } = parseDosage(item.itemname);

                        return (
                          <tr
                            key={item.orderItemId ?? index}
                            className="border-t border-divider text-xs
              hover:bg-gray-50 dark:hover:bg-zinc-800
              transition-colors"
                          >
                            <td className="border-r border-divider px-2 py-1">
                              {item.itemname}
                            </td>

                            <td className="border-r border-divider px-2 py-1">
                              {dose || "-"}
                            </td>

                            <td className="border-r border-divider px-2 py-1">
                              {item.useUnitdetail?.engname || "-"}
                            </td>

                            <td className="px-2 py-1">
                              {item?.serviceqty}
                              {""} {item?.payUnitdetail?.engname || item?.payUnitdetail?.thainame || ""}
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
            <form.Field name="treatment">
              {(field) => (
                <Textarea
                  className="w-full"
                  classNames={{
                    label: "text-xl font-bold",
                    inputWrapper:
                      "bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126]",
                  }}
                  label="Treatment"
                  size="sm"
                  variant="flat"
                  maxRows={31}
                  value={field.state.value || ""}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              )}
            </form.Field>
          </div>
        </div>
        <div className="space-y-4  ">
          <h3 className="font-semibold  dark:text-white">
            11.Doctor Signature
          </h3>

          <div className="flex justify-none gap-8 items-start border border-[#b0dddf] dark:border-divider bg-[#f2fbf9] dark:bg-[#1c1c1f] rounded-xl p-4">
            <div className="space-y-2">
              <form.Field name="signatureCheck">
                {(field) => (
                  <RadioGroup
                    className=""
                    label="ต้องการใช้ลายเซ็นในระบบหรือไม่"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    orientation="horizontal"
                    size="sm"
                  >
                    {signatureCheck.map((s) => (
                      <div key={s.id} className="flex items-center gap-2">
                        <Radio value={String(s.id)}>{s.value}</Radio>
                        {String(s.id) === "1" && field.state.value === "1" && (
                          <Input
                            label="Doctor signature"
                            variant="flat"
                            classNames={{
                              inputWrapper:
                                "bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126]",
                            }}
                            size="sm"
                          />
                        )}
                        {String(s.id) === "2" && field.state.value === "2" && (
                          <div className="flex flex-wrap gap-3 items-center">
                            <span className="text-sm flex items-center gap-2 text-gray-600">
                              {!signatureDoctor ? (
                                <span className="text-gray-400">
                                  .............................
                                </span>
                              ) : (
                                <img
                                  src={signatureDoctor}
                                  alt="signature"
                                  className="border border-gray-200 rounded-lg shadow w-[180px] h-[48px] object-contain bg-white"
                                />
                              )}
                            </span>
                            <Button
                              size="md"
                              isIconOnly
                              color="secondary"
                              variant="flat"
                              classNames={{
                                inputWrapper:
                                  "bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126]",
                              }}
                              onPress={() => setOpenSignDoctor(true)}
                            >
                              <Edit3 className="size-5" />
                            </Button>
                          </div>
                        )}
                      </div>
                    ))}
                  </RadioGroup>
                )}
              </form.Field>

              <Input
                label="Physician's name"
                variant="flat"
                classNames={{
                  inputWrapper:
                    "bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126]",
                }}
                size="sm"
                value={`${user.doctorsalutation} ${user.name}`}
                disabled
                readOnly
              />
            </div>
            <div className="space-y-2 pt-8">
              <Input
                label="Medical license No."
                variant="flat"
                classNames={{
                  inputWrapper:
                    "bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126]",
                }}
                size="sm"
              />

              <DatePicker
                label="DATE"
                variant="flat"
                locale="th-TH-u-ca-buddhist"
                size="sm"
                value={date.datetimeForm ?? null}
                onChange={handleDateTimeForm("datetimeForm")}
                withinPortal={false}
                classNames={{
                  inputWrapper:
                    "bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126]",
                }}
              />
            </div>
            <div className="space-y-2 pt-8">
              <Input
                label="Specialty"
                variant="flat"
                classNames={{
                  inputWrapper:
                    "bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126]",
                }}
                size="sm"
              />
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="text-xs text-center font-semibold  dark:text-white">
            Remark : Doctor who issue this report must be a doctor who is
            licensed to practice medicine and correctly registered by the Thai
            Medical Council
          </h3>
        </div>
      </div>
    </div>
  );
}
