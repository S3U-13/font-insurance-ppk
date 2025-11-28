"use client";
import { Checkbox, CheckboxGroup } from "@heroui/checkbox";
import { DatePicker } from "@heroui/date-picker";
import { Input, Textarea } from "@heroui/input";
import { Radio, RadioGroup } from "@heroui/radio";
import { Select, SelectItem } from "@heroui/select";
import { div } from "framer-motion/client";
import React from "react";
import { parseDate, getLocalTimeZone } from "@internationalized/date";
import { TimeInput } from "@heroui/date-input";

export default function FormOPD({ sex, noOrYes, choice2, form }) {
  return (
    <div>
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
      <div className="mt-2 border border-divider rounded-xl p-4 space-y-4">
        <div className="grid grid-cols-10 gap-2 items-center">
          <h2 className="text-gray-700 font-semibold text-base flex items-center gap-2 mb-4 col-span-10">
            <span className="w-1 h-5 bg-violet-500 rounded-full"></span>
            สำหรับผู้เอาประกัน
          </h2>
          <Input
            className="col-span-4"
            label="ชื่อ-นามสกุล"
            size="sm"
            variant="bordered"
          />
          <Select
            className="col-span-1"
            label="เพศ"
            size="sm"
            variant="bordered"
          >
            {sex.map((sex) => (
              <SelectItem key={sex.id} value={sex.value}>
                {sex.name}
              </SelectItem>
            ))}
          </Select>
          <Input
            className="col-span-3"
            label="เลขประจำตัวประชาชน"
            size="sm"
            variant="bordered"
          />
          <form.Field name="patientId">
            {(field) => (
              <Input
                className="col-span-2"
                label="HN"
                size="sm"
                variant="bordered"
                value={field.state.value || ""}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            )}
          </form.Field>
        </div>
        <div className="grid grid-cols-8 gap-2 items-center">
          <Input
            className="col-span-3"
            label="วัน/เดือน/ปีเกิด"
            size="sm"
            variant="bordered"
          />
          <div className="flex gap-1 items-center col-span-1">
            <Input
              className="col-span-2"
              label="อายุ"
              size="sm"
              variant="bordered"
            />
            <span className="text-gray-500">ปี</span>
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
            label="ที่อยู่ปัจจุบัน"
            size="sm"
            variant="bordered"
          />
        </div>
      </div>
      <div className="mt-6 border border-divider rounded-xl p-4 space-y-4">
        <h2 className="text-gray-700 font-semibold text-base flex items-center gap-2 mb-4 col-span-10">
          <span className="w-1 h-5 bg-violet-500 rounded-full"></span>
          กรมธรรม์เลขที่
        </h2>
        <div className="grid grid-cols-12 gap-2 items-center">
          <Input
            className="col-span-12"
            label="กรมธรรม์เลขที่"
            size="sm"
            variant="bordered"
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
            variant="bordered"
          />
          <Input
            className="col-span-3"
            label="กรมธรรม์เลขที่ :"
            size="sm"
            variant="bordered"
          />
          <div className="col-span-5"></div>
          <Input
            className="col-span-4"
            label="บริษัท :"
            size="sm"
            variant="bordered"
          />
          <Input
            className="col-span-3"
            label="กรมธรรม์เลขที่ :"
            size="sm"
            variant="bordered"
          />
        </div>
      </div>

      <div className="mt-6 border border-divider rounded-2xl p-6 space-y-8 bg-white dark:bg-[#0e0e11] shadow-sm">
        <h2 className="text-gray-800 dark:text-gray-100 font-bold text-lg flex items-center gap-3">
          <span className="w-1.5 h-6 bg-violet-500 rounded-full"></span>
          For Hospital
        </h2>

        {/* Section 1: Visit Information */}
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-700 dark:text-gray-200">
            1. Visit Information
          </h3>
          <div className="grid grid-cols-3 gap-2">
            <form.Field name="visitid">
              {(field) => (
                <Input
                  label="Visit id :"
                  size="sm"
                  variant="bordered"
                  type="text"
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
                  variant="bordered"
                  type="text"
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
                  variant="bordered"
                  type="text"
                  value={field.state.value || ""}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              )}
            </form.Field>
          </div>
          <div className="grid grid-cols-12 gap-4 items-end">
            <DatePicker
              className="col-span-2"
              label="Visit date"
              size="sm"
              variant="bordered"
            />
            <TimeInput
              className="col-span-2"
              label="Time"
              size="sm"
              variant="bordered"
            />

            <Input
              className="col-span-2"
              label="T (Temp)"
              size="sm"
              variant="bordered"
            />
            <Input
              className="col-span-2"
              label="P (Pulse)"
              size="sm"
              variant="bordered"
            />
            <Input
              className="col-span-2"
              label="R (Resp.)"
              size="sm"
              variant="bordered"
            />
            <Input
              className="col-span-2"
              label="BP"
              size="sm"
              variant="bordered"
            />
          </div>
        </div>

        {/* Section 2: Chief Complaint */}
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-700 dark:text-gray-200">
            2. Chief Complaint
          </h3>

          <form.Field name="chiefComplaint">
            {(field) => (
              <Input
                className="w-full"
                label="Chief complaint and duration"
                size="sm"
                variant="bordered"
                value={field.state.value || ""}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            )}
          </form.Field>
        </div>

        {/* Section 3: Present Illness */}
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-700 dark:text-gray-200">
            3. Present Illness
          </h3>

          <form.Field name="presentIllness">
            {(field) => (
              <Textarea
                className="w-full"
                label="Present illness or cause of injury"
                variant="bordered"
                value={field.state.value || ""}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            )}
          </form.Field>
        </div>

        {/* Section 4: Accident Details */}
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-700 dark:text-gray-200">
            4. Accident Details
          </h3>

          <div className="grid grid-cols-12 gap-4 items-end">
            <form.Field name="accidentDateTime">
              {(field) => (
                <DatePicker
                  className="col-span-2"
                  label="Date of accident"
                  size="sm"
                  variant="bordered"
                  value={
                    field.state.value ? parseDate(field.state.value) : null
                  }
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              )}
            </form.Field>

            <Input
              className="col-span-2"
              label="Time"
              size="sm"
              variant="bordered"
            />
            <Input
              className="col-span-8"
              label="Place"
              size="sm"
              variant="bordered"
            />
          </div>
        </div>

        {/* Section 5: Physical Exam */}
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-700 dark:text-gray-200">
            5. Physical Examination
          </h3>

          <form.Field name="physicalExam">
            {(field) => (
              <Input
                className="w-full"
                label="Physical exam"
                size="sm"
                variant="bordered"
                value={field.state.value || ""}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            )}
          </form.Field>
        </div>

        {/* Section 6: Related Conditions */}
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-700 dark:text-gray-200">
            6. Related Conditions
          </h3>

          <form.Field name="relatedConditions">
            {(field) => (
              <CheckboxGroup
                label="Is the illness related to:"
                className="px-4 py-3 border border-divider rounded-xl bg-gray-50 dark:bg-[#1c1c1f]"
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
          <h3 className="font-semibold text-gray-700 dark:text-gray-200">
            7. Underlying Condition
          </h3>

          <form.Field name="underlyingCondition">
            {(field) => (
              <Input
                className="w-full"
                label="Underlying condition"
                size="sm"
                variant="bordered"
                value={field.state.value || ""}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            )}
          </form.Field>
        </div>

        {/* Section 8: Diagnosis */}
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-700 dark:text-gray-200">
            8. Diagnosis
          </h3>

          <Input
            className="w-full"
            label="Diagnosis"
            size="sm"
            variant="bordered"
          />
        </div>

        {/* Section 9: Investigation */}
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-700 dark:text-gray-200">
            9. Investigation & Result
          </h3>

          <Input
            className="w-full"
            label="Investigation & Result (Lab, EKG, X-ray, etc.)"
            size="sm"
            variant="bordered"
          />
        </div>

        {/* Section 10: Treatment */}
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-700 dark:text-gray-200">
            10. Plan of Treatment
          </h3>

          <form.Field name="planOfTreatment">
            {(field) => (
              <Input
                className="w-full"
                label="Treatment"
                size="sm"
                variant="bordered"
                value={field.state.value || ""}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            )}
          </form.Field>
        </div>
      </div>
    </div>
  );
}
