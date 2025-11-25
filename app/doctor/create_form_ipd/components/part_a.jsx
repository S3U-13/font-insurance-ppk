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
}) {
  return (
    <div className="space-y-4">
      <div className="mt-2 border border-divider rounded-xl p-4 space-y-2">
        <div className="text-center">
          <h1>
            <strong>Admission Notification Form (all cases)</strong>
          </h1>
          <p>
            <strong>Hospital Name</strong> พระปกเกล้า จันทบุรี
          </p>
          <p>
            <strong>Company Name</strong>
          </p>
          <p>
            <strong>Part A</strong>
          </p>
        </div>
        <h1 className="text-md text-center">
          <strong>สำหรับผู้เอาประกัน</strong>
        </h1>
        <p>1.ผู้เอาประกันภัย</p>
        <div className="grid grid-cols-10 gap-2 items-center">
          <Input
            className="col-span-4"
            label="ชื่อ-นามสกุล"
            size="sm"
            variant="bordered"
          />
          <Select
            className="col-span-2"
            label="เพศ"
            size="sm"
            variant="bordered"
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
          />
        </div>
        <div className="grid grid-cols-8 gap-2 items-center">
          <Input
            className="col-span-3"
            label="วัน/เดือน/ปีเกิด"
            size="sm"
            variant="bordered"
          />
          <div className="flex gap-2 items-center col-span-1">
            <Input
              className="col-span-2"
              label="อายุ"
              size="sm"
              variant="bordered"
            />
            <span>ปี</span>
          </div>

          <Input
            className="col-span-1"
            label="เดือน"
            size="sm"
            variant="bordered"
          />

          <Input
            className="col-span-3"
            label="อาชีพ"
            size="sm"
            variant="bordered"
          />
        </div>
        <div className="grid grid-cols-8 gap-2 items-center">
          <Input
            className="col-span-2"
            label="โทรศัพท์มือถือ"
            size="sm"
            variant="bordered"
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
          />
        </div>
        <div className="grid grid-cols-8 gap-2 items-center">
          <Input
            className="col-span-8"
            label="ที่อยู่"
            size="sm"
            variant="bordered"
          />
        </div>
        <p>2.กรมธรรม์</p>
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
        <p>3.สาเหตุของการเรียกร้องครั้งนี้</p>
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
        <p>4.สำหรับการเกิดอุบัติเหตุครั้งนี้ เคยรักษาที่ใดไป </p>
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

      <div className="mt-2 border border-divider rounded-xl p-4 space-y-2">
        <h1 className="text-md text-center">For Hospital</h1>
        <p>1.</p>
        <div className="grid grid-cols-12 gap-2 items-center">
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
            className="col-span-2"
            label="Vital signs : T :"
            size="sm"
            variant="bordered"
          />

          <Input
            className="col-span-2"
            label="P:"
            size="sm"
            variant="bordered"
          />
          <Input
            className="col-span-2"
            label="R:"
            size="sm"
            variant="bordered"
          />
          <Input
            className="col-span-2"
            label="BP:"
            size="sm"
            variant="bordered"
          />
        </div>
        <div className="grid grid-cols-8 gap-2 items-center">
          <h1 className="col-span-8">2.</h1>
          <Input
            className="col-span-8"
            label="Chief complaint and duration :"
            size="sm"
            variant="bordered"
          />
          <h1 className="col-span-8">3.</h1>
          <Textarea
            label="Present illness or cause of injury"
            className="col-span-8"
            variant="bordered"
          />
          <h1 className="col-span-8">4.</h1>
          <Textarea
            label="Physical exam :"
            className="col-span-8"
            variant="bordered"
          />
          <h1 className="col-span-8">5.</h1>
          <Input
            className="col-span-8"
            label="Previous treatment for this illness or injury (Date & Place) :"
            size="sm"
            variant="bordered"
          />
          <h1 className="col-span-8">6.</h1>
          <CheckboxGroup
            label="Is the illness related to : (please tick ☑ if yes) "
            className="col-span-8 "
            size="sm"
            classNames={{ wrapper: "px-6 grid grid-cols-2 gap-2" }}
          >
            {choice2.map((c2) => (
              <Checkbox key={c2.id} value={c2.id}>
                <p className="text-xs ">
                  {c2.id}.{c2.value}
                </p>
              </Checkbox>
            ))}
          </CheckboxGroup>
          <h1 className="col-span-8">7.</h1>
          <Input
            className="col-span-8"
            label="Underlying condition :"
            size="sm"
            variant="bordered"
          />
          <h1 className="col-span-8">8.</h1>
          <Input
            className="col-span-4"
            label="Provisional diagnosis :"
            size="sm"
            variant="bordered"
          />
          <Input
            className="col-span-4"
            label="AdjRW="
            size="sm"
            variant="bordered"
          />
          <h1 className="col-span-8">9.</h1>
          <RadioGroup
            className="col-span-8"
            label="Can the condition be managed under Out Patient basis :"
            variant="bordered"
            orientation="horizontal"
            size="sm"
            classNames={{ wrapper: "pl-2 text-xs", label: "test-xs" }}
          >
            {yesOrNo.map((yon) => (
              <Radio key={yon.id} value={yon.id}>
                {yon.value}
              </Radio>
            ))}
          </RadioGroup>
          <Input
            className="col-span-8"
            label="(If No please provide more information)"
            size="sm"
            variant="bordered"
          />
          <h1 className="col-span-8">10.</h1>
          <Input
            className="col-span-8"
            label="Reasons of admission"
            size="sm"
            variant="bordered"
          />
          <h1 className="col-span-8">11.</h1>
          <Input
            className="col-span-8"
            label="Plan of treatment"
            size="sm"
            variant="bordered"
          />
        </div>
      </div>
    </div>
  );
}
