"use client";
import { Checkbox, CheckboxGroup } from "@heroui/checkbox";
import { Input, Textarea } from "@heroui/input";
import { Radio, RadioGroup } from "@heroui/radio";
import { Select, SelectItem } from "@heroui/select";

import React from "react";

export default function page({
  sex,
  choice1,
  sick,
  everOrNever,
  choice2,
  yesOrNo,
  patData,
  calculateAge,
  formatThaiDateNoTime,
  convertISOToTime,
  formatAddress,
}) {
  return (
    <div className="space-y-3 ">
      <div className=" border border-divider rounded-xl p-4 space-y-2 mb-6">
        <h2 className="text-gray-700 font-semibold text-base flex items-center gap-2 mb-4 col-span-10">
          <span className="w-1 h-5 bg-violet-500 rounded-full"></span>
          สำหรับผู้เอาประกัน
        </h2>
        <div className="grid grid-cols-10 gap-2 items-center">
          <Input
            className="col-span-4"
            label="ชื่อ-นามสกุล"
            size="sm"
            value={`${patData?.pat?.prename || ""}${patData?.pat?.firstname || ""} ${patData?.pat?.lastname || ""}`}
            variant="bordered"
          />
          <Select
            className="col-span-2"
            label="เพศ"
            size="sm"
            variant="bordered"
            selectedKeys={
              patData?.pat?.sex ? new Set([String(patData.pat.sex)]) : new Set()
            }
          >
            {sex.map((sex) => (
              <SelectItem key={sex.id} value={sex.id}>
                {sex.value}
              </SelectItem>
            ))}
          </Select>
          <Input
            className="col-span-4"
            label="เลขประจำตัวประชาชน"
            size="sm"
            variant="bordered"
            value={patData?.pat?.citizencardno || ""}
          />
        </div>
        <div className="grid grid-cols-8 gap-2 items-center">
          <Input
            className="col-span-3"
            label="วัน/เดือน/ปีเกิด"
            size="sm"
            variant="bordered"
            value={formatThaiDateNoTime(patData?.pat?.birthdatetime || "")}
          />
          <div className="flex gap-2 items-center col-span-1">
            <Input
              className="col-span-2"
              label="อายุ"
              size="sm"
              variant="bordered"
              value={`${calculateAge(patData?.pat?.birthdatetime).years || ""} ปี`}
            />
          </div>

          <Input
            className="col-span-1"
            label="เดือน"
            size="sm"
            variant="bordered"
            value={`${calculateAge(patData?.pat?.birthdatetime).months || ""} เดือน`}
          />

          <Input
            className="col-span-3"
            label="อาชีพ"
            size="sm"
            variant="bordered"
            value={patData?.pat?.occupationName || ""}
          />
        </div>
        <div className="grid grid-cols-8 gap-2 items-center">
          <Input
            className="col-span-2"
            label="โทรศัพท์มือถือ"
            size="sm"
            variant="bordered"
            value={patData?.pat?.pat_address[0]?.phone ?? "-"}
          />
          <Input
            className="col-span-2"
            label="โทรศัพท์บ้าน"
            size="sm"
            variant="bordered"
          />

          <Input
            className="col-span-4"
            label="อีเมล"
            size="sm"
            variant="bordered"
            value={patData?.pat?.pat_address[0]?.email ?? "-"}
          />
        </div>
        <div className="grid grid-cols-8 gap-2 items-center">
          <Input
            className="col-span-8"
            label="ที่อยู่"
            size="sm"
            variant="bordered"
            value={formatAddress(patData?.pat?.pat_address)}
          />
        </div>
      </div>
      <div className=" border border-divider rounded-xl p-4 space-y-2">
        <h2 className="text-gray-700 font-semibold text-base flex items-center gap-2 mb-4 col-span-10">
          <span className="w-1 h-5 bg-violet-500 rounded-full"></span>
          กรมธรรม์
        </h2>
        <div className="grid grid-cols-8 gap-2 items-center">
          <Input
            className="col-span-4"
            label="กรมธรรม์เลขที่"
            size="sm"
            variant="bordered"
          />

          <Input
            className="col-span-4"
            label="ใบรับรองเลขที่ (ถ้ามี)"
            size="sm"
            variant="bordered"
          />
        </div>

        <div className="flex items-center gap-2 col-span-4 pl-2">
          <div className="flex items-center gap-2 w-[1100px]">
            <p>มีกรมธรรม์บริษัทประกันอื่น ๆ หรือไม่</p>
            <RadioGroup
              orientation="horizontal"
              size="sm"
              classNames={{ wrapper: "pl-2 text-xs" }}
            >
              {choice1.map((c1) => (
                <Radio key={c1.id} value={c1.id}>
                  {c1.value}
                </Radio>
              ))}
            </RadioGroup>
          </div>
          <Input
            className=""
            label="กรมธรรม์เลขที่"
            size="sm"
            variant="bordered"
          />
          <Input
            className=""
            label="ใบรับรองเลขที่ (ถ้ามี)"
            size="sm"
            variant="bordered"
          />
        </div>
        <hr className="border-b-1 border-divider mt-4" />
        <h2 className="text-gray-700 font-semibold text-base flex items-center gap-2 mb-4 col-span-10 mt-4">
          <span className="w-1 h-5 bg-violet-500 rounded-full"></span>
          สาเหตุของการเรียกร้องครั้งนี้
        </h2>

        <div className="grid grid-cols-8 gap-2 items-center">
          <CheckboxGroup
            className="col-span-2"
            size="sm"
            classNames={{ wrapper: "pl-2 text-xs" }}
          >
            {sick.map((s) => (
              <Checkbox key={s.id} value={s.id}>
                {s.value}
              </Checkbox>
            ))}
          </CheckboxGroup>

          <Input
            className="col-span-3"
            label="อาการ"
            size="sm"
            variant="bordered"
          />
          <Input
            className="col-span-3"
            label="ระยะเวลาของอาการก่อนที่ จะเข้าการรักษาครั้งนี้"
            size="sm"
            variant="bordered"
          />
          <Input
            className="col-span-4"
            label="สถานพยาบาลที่เคยรักษาก่อนที่จะเข้าการรักษาครั้งนี้"
            size="sm"
            variant="bordered"
          />
          <Input
            className="col-span-4"
            label="วันที่เข้าการรักษา"
            size="sm"
            variant="bordered"
          />
          <Input
            className="col-span-2"
            label="วันที่ได้รับบาดเจ็บ"
            size="sm"
            variant="bordered"
          />
          <Input
            className="col-span-2"
            label="เวลา"
            size="sm"
            variant="bordered"
          />
          <Input
            className="col-span-4"
            label="สถานที่เกิดเหตุ"
            size="sm"
            variant="bordered"
          />
          <Input
            className="col-span-8"
            label="สาเหตุของการบาดเจ็บ"
            size="sm"
            variant="bordered"
          />
        </div>
        <hr className="border-b-1 border-divider mt-4" />
        <h2 className="text-gray-700 font-semibold text-base flex items-center gap-2 mb-4 col-span-10 mt-4">
          <span className="w-1 h-5 bg-violet-500 rounded-full"></span>
          สำหรับการเกิดอุบัติเหตุครั้งนี้ เคยรักษาที่ใดไป
        </h2>
        <div className="grid grid-cols-8 gap-2 items-center">
          <CheckboxGroup
            className="col-span-2"
            label="เคยรักษาที่ใดหรือไม่"
            size="sm"
            classNames={{ wrapper: "pl-2 text-xs", label: "test-xs" }}
          >
            {everOrNever.map((ron) => (
              <Checkbox key={ron.id} value={ron.id}>
                {ron.value}
              </Checkbox>
            ))}
          </CheckboxGroup>

          <Input
            className="col-span-3"
            label="เคยรักษาที่"
            size="sm"
            variant="bordered"
          />
          <Input
            className="col-span-3"
            label="เมื่อ"
            size="sm"
            variant="bordered"
          />
          <div className="col-span-8 flex items-center gap-2">
            <Input
              label="โดยชำระเงินเองหรือใช้สิทธิค่ารักษาผ่านโรงพยาบาลไปเเล้วเป็นเงิน"
              size="sm"
              variant="bordered"
            />
            <span>บาท</span>
          </div>
        </div>
      </div>

      <div className="mt-4 bg-white border border-divider rounded-xl p-6 space-y-6 shadow-sm">
        {/* Title */}
        <div className="flex items-center gap-2">
          <div className="w-1 h-6 bg-violet-600 rounded-full" />
          <h1 className="text-lg font-semibold text-gray-800">For Hospital</h1>
        </div>

        {/* 1. Visit */}
        <div>
          <p className="text-sm font-medium text-gray-500 mb-2">
            1. Visit Information
          </p>
          <div className="grid grid-cols-12 gap-4 items-center">
            <Input
              className="col-span-2"
              label="Visit date :"
              size="sm"
              variant="bordered"
            />
            <Input
              className="col-span-2"
              label="Time :"
              size="sm"
              variant="bordered"
            />

            <Input
              label="T :"
              size="sm"
              variant="bordered"
              className="col-span-2"
            />
            <Input
              label="P :"
              size="sm"
              variant="bordered"
              className="col-span-2"
            />
            <Input
              label="R :"
              size="sm"
              variant="bordered"
              className="col-span-2"
            />
            <Input
              label="BP :"
              size="sm"
              variant="bordered"
              className="col-span-2"
            />
          </div>
        </div>

        {/* 2. Chief complaint */}
        <div>
          <p className="text-sm font-medium text-gray-500 mb-2">
            2. Chief Complaint
          </p>
          <Input
            className="col-span-8"
            label="Chief complaint and duration :"
            size="sm"
            variant="bordered"
          />
        </div>

        {/* 3. Present illness */}
        <div>
          <p className="text-sm font-medium text-gray-500 mb-2">
            3. Present Illness
          </p>
          <Textarea
            label="Present illness or cause of injury"
            variant="bordered"
          />
        </div>

        {/* 4. Physical exam */}
        <div>
          <p className="text-sm font-medium text-gray-500 mb-2">
            4. Physical Exam
          </p>
          <Textarea label="Physical exam :" variant="bordered" />
        </div>

        {/* 5. Previous treatment */}
        <div>
          <p className="text-sm font-medium text-gray-500 mb-2">
            5. Previous Treatment
          </p>
          <Input
            label="Previous treatment for this illness or injury (Date & Place) :"
            size="sm"
            variant="bordered"
          />
        </div>

        {/* 6. Illness related */}
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-700 dark:text-gray-200">
            6. Related Conditions
          </h3>

          {/* <form.Field name="relatedConditions">
            {(field) => ( */}
          <CheckboxGroup
            label="Is the illness related to:"
            className="px-4 py-3 border border-divider rounded-xl bg-gray-50 dark:bg-[#1c1c1f]"
            size="sm"
            // value={field.state.value || []}
            // onChange={(values) => field.handleChange(values)}
          >
            {choice2.map((c2) => (
              <Checkbox key={c2.id} value={String(c2.id)}>
                <span className="text-sm">
                  {c2.id}. {c2.value}
                </span>
              </Checkbox>
            ))}
          </CheckboxGroup>
          {/* )}
          </form.Field> */}
        </div>

        {/* 7. Underlying condition */}
        <div>
          <p className="text-sm font-medium text-gray-500 mb-2">
            7. Underlying Condition
          </p>
          <Input label="Underlying condition :" size="sm" variant="bordered" />
        </div>

        {/* 8. Diagnosis */}
        <div>
          <p className="text-sm font-medium text-gray-500 mb-2">8. Diagnosis</p>
          <div className="grid grid-cols-8 gap-4">
            <Input
              className="col-span-4"
              label="Provisional diagnosis :"
              size="sm"
              variant="bordered"
            />
            <Input
              className="col-span-4"
              label="AdjRW ="
              size="sm"
              variant="bordered"
            />
          </div>
        </div>

        {/* 9. OPD or not */}
        <div>
          <p className="text-sm font-medium text-gray-500 mb-2">
            9. OPD Management
          </p>
          <RadioGroup
            orientation="horizontal"
            size="sm"
            classNames={{ wrapper: "pl-2 text-xs" }}
          >
            {yesOrNo.map((yon) => (
              <Radio key={yon.id} value={yon.id}>
                {yon.value}
              </Radio>
            ))}
          </RadioGroup>
          <Input
            className="mt-2"
            label="(If No please provide more information)"
            size="sm"
            variant="bordered"
          />
        </div>

        {/* 10. Reason of admission */}
        <div>
          <p className="text-sm font-medium text-gray-500 mb-2">
            10. Reason of Admission
          </p>
          <Input label="Reasons of admission" size="sm" variant="bordered" />
        </div>

        {/* 11. Plan of treatment */}
        <div>
          <p className="text-sm font-medium text-gray-500 mb-2">
            11. Plan of Treatment
          </p>
          <Input label="Plan of treatment" size="sm" variant="bordered" />
        </div>
      </div>
    </div>
  );
}
