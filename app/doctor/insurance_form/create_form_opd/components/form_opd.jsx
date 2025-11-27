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
      <div className="text-center">
        <h1>
          <strong>
            เเบบฟอร์มการเรียกร้องค่าสินไหมกรณีผู้ป่วยนอก Outpatient (OPD) and
            Accident Claim Form
          </strong>
        </h1>
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
        <h1 className="text-md text-center">สำหรับผู้เอาประกัน</h1>
        <p>1.ผู้เอาประกันภัย</p>
        <div className="grid grid-cols-10 gap-2 items-center">
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
        <p>2.กรมธรรม์เลขที่</p>
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

      <div className="mt-6 border border-divider rounded-xl p-4 space-y-2">
        <h1 className="text-md text-center">For Hospital</h1>
        <form.Field name="visitid">
          {(field) => (
            <Input
              className="col-span-2"
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
              className="col-span-2"
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
              className="col-span-2"
              label="vital sign id :"
              size="sm"
              variant="bordered"
              type="text"
              value={field.state.value || ""}
              onChange={(e) => field.handleChange(e.target.value)}
            />
          )}
        </form.Field>

        <p>1.</p>
        <div className="grid grid-cols-12 gap-2 items-center">
          <DatePicker
            label="Visit date"
            className="col-span-2"
            size="sm"
            variant="bordered"
          />

          <TimeInput
            label="Time :"
            size="sm"
            className="col-span-2"
            variant="bordered"
            radius="sm"
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
          <form.Field name="chiefComplaint">
            {(field) => (
              <Input
                className="col-span-8"
                label="Chief complaint and duration :"
                size="sm"
                variant="bordered"
                value={field.state.value || ""}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            )}
          </form.Field>

          <h1 className="col-span-8">3.</h1>
          <form.Field name="presentIllness">
            {(field) => (
              <Textarea
                label="Present illness or cause of injury"
                className="col-span-8"
                variant="bordered"
                value={field.state.value || ""}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            )}
          </form.Field>
          <h1 className="col-span-8">4.</h1>
          <form.Field name="accidentDateTime">
            {(field) => (
              <DatePicker
                className="col-span-3"
                label="An accident; Date of accident :"
                size="sm"
                variant="bordered"
                value={field.state.value ? parseDate(field.state.value) : null}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            )}
          </form.Field>

          <Input
            className="col-span-5"
            label="Time :"
            size="sm"
            variant="bordered"
          />
          <Input
            className="col-span-8"
            label="Place :"
            size="sm"
            variant="bordered"
          />
          <h1 className="col-span-8">5.</h1>
          <form.Field name="physicalExam">
            {(field) => (
              <Input
                className="col-span-8"
                label="Physical exam :"
                size="sm"
                variant="bordered"
                value={field.state.value || ""}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            )}
          </form.Field>
          <h1 className="col-span-8">6.</h1>
          <form.Field name="relatedConditions">
            {(field) => (
              <CheckboxGroup
                label="Is the illness related to : (please tick ☑ if yes)"
                className="col-span-8"
                size="sm"
                classNames={{ wrapper: "px-6 grid grid-cols-2 gap-2" }}
                value={field.state.value || []}
                onChange={(values) => {
                  field.handleChange(values); // <-- อัปเดต array ให้ zod form
                }}
              >
                {choice2.map((c2) => (
                  <Checkbox key={c2.id} value={String(c2.id)}>
                    <p className="text-xs">
                      {c2.id}. {c2.value}
                    </p>
                  </Checkbox>
                ))}
              </CheckboxGroup>
            )}
          </form.Field>

          <h1 className="col-span-8">7.</h1>
          <form.Field name="underlyingCondition">
            {(field) => (
              <Input
                className="col-span-8"
                label="Underlying condition :"
                size="sm"
                variant="bordered"
                value={field.state.value || ""}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            )}
          </form.Field>
          <h1 className="col-span-8">8.</h1>
          {/* <form.Field name="relatedConditions">
            {(field) => ( */}
          <Input
            className="col-span-4"
            label="Diagnosis :"
            size="sm"
            variant="bordered"
            // value={field.state.value || ""}
            // onChange={(e) => field.handleChange(e.target.value)}
          />
          {/* )}
          </form.Field> */}
          <h1 className="col-span-8">9.</h1>
          {/* <form.Field name="relatedConditions">
            {(field) => ( */}
          <Input
            className="col-span-8"
            label="Investigation & Result (Lab, EKG, X-ray, etc.)"
            size="sm"
            variant="bordered"
            // value={field.state.value || ""}
            // onChange={(e) => field.handleChange(e.target.value)}
          />
          {/* )}
          </form.Field> */}
          <h1 className="col-span-8">10.</h1>
          <form.Field name="planOfTreatment">
            {(field) => (
              <Input
                className="col-span-8"
                label="treatment"
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
