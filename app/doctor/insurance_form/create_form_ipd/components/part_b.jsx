"use client";
import { Checkbox, CheckboxGroup } from "@heroui/checkbox";
import { Input, Textarea } from "@heroui/input";
import { Radio, RadioGroup } from "@heroui/radio";
import { Select, SelectItem } from "@heroui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/table";
import { DatePicker } from "@heroui/date-picker";

import React from "react";

export default function page({
  sex,
  choice3,
  sick,
  everOrNever,
  choice2,
  yesOrNo,
  choice4,
  Anaesthesia,
  noOrYes,
  choice5,
}) {
  return (
    <div>
      <div className="border border-divider rounded-xl p-4 space-y-2">
        <h1 className="text-md text-center font-bold">Medical certification</h1>
        <div className="border border-divider p-4 rounded-xl ">
          <h2 className="text-gray-700 font-semibold text-base flex items-center gap-2 mb-4 col-span-10">
            <span className="w-1 h-5 bg-violet-500 rounded-full"></span>
            สำหรับผู้เอาประกัน
          </h2>
          <div className="grid grid-cols-10 gap-2 items-center">
            <Input
              className="col-span-2"
              label="Patient's Name :"
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
                <SelectItem key={sex.id} value={sex.id}>
                  {sex.value}
                </SelectItem>
              ))}
            </Select>
            <Input
              className="col-span-2"
              label="HN :"
              size="sm"
              variant="bordered"
            />
            <Input
              className="col-span-2"
              label="AN :"
              size="sm"
              variant="bordered"
            />
            <Input
              className="col-span-1"
              label="Age :"
              size="sm"
              variant="bordered"
            />
            <Input
              className="col-span-2"
              label="Month(s) :"
              size="sm"
              variant="bordered"
            />
            <Input
              className="col-span-2"
              label="Admission Date :"
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
              label="Discharge Date :"
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
              label="Consultation Date :"
              size="sm"
              variant="bordered"
            />
          </div>
        </div>

        <div className="grid grid-cols-8 gap-2 items-center">
          <div className="col-span-4 border border-divider p-4 space-y-2 rounded-xl h-full">
            <h2 className="text-gray-700 text-base flex items-center gap-2 mb-4">
              <span className="w-1 h-5 bg-violet-500 rounded-full"></span>
              1. For Illness
            </h2>
            <Textarea
              label="a) Date you first saw this patient for this illness :"
              variant="bordered"
            />
            <Textarea
              label="b) Chief complaint and duration of symptom(s) :"
              variant="bordered"
            />
          </div>
          <div className="col-span-4 border border-divider p-4 space-y-2 rounded-xl grid grid-cols-3 gap-2">
            <h2 className="text-gray-700 text-base flex items-center gap-2 mb-4 col-span-3">
              <span className="w-1 h-5 bg-violet-500 rounded-full "></span>
              2. For Injury
            </h2>
            <Input
              className="col-span-2"
              label="a) Date of Injury :"
              size="sm"
              variant="bordered"
            />
            <Input
              className="col-span-1"
              label="Time :"
              size="sm"
              variant="bordered"
            />
            <Input
              className="col-span-3"
              label="b) Cause of injury "
              size="sm"
              variant="bordered"
            />
            <Input
              className="col-span-3"
              label="c) Detail of injury "
              size="sm"
              variant="bordered"
            />
            <RadioGroup
              className="col-span-3"
              label="d) Did you snell alcohol from the patient?"
            >
              {choice3.map((c3) => (
                <Radio key={c3.id} value={c3.id}>
                  {c3.value}
                </Radio>
              ))}
            </RadioGroup>
            <Input
              className="col-span-3"
              label="blood alcohol test (if any) ="
              size="sm"
              variant="bordered"
            />
            <RadioGroup
              className="col-span-3"
              label="e) Lecel of consciousness"
              classNames={{ wrapper: "grid grid-cols-3 gap-2" }}
            >
              {choice4.map((c4) => (
                <Radio key={c4.id} value={c4.id}>
                  {c4.value}
                </Radio>
              ))}
            </RadioGroup>
            <Textarea
              className="col-span-3"
              label="b) Chief complaint and duration of symptom(s) :"
              variant="bordered"
            />
          </div>
        </div>
        <div className="grid grid-cols-8 gap-2 items-center border border-divider rounded-xl  p-4">
          <h2 className="text-gray-700 text-base flex items-center gap-2 mb-4 col-span-8">
            <span className="w-1 h-5 bg-violet-500 rounded-full "></span>
            3. Did the patient need to be admitted to hospital?
          </h2>
          <RadioGroup className="col-span-8" orientation="horizontal">
            {yesOrNo.map((yon) => (
              <Radio key={yon.id} value={yon.id}>
                {yon.value}
              </Radio>
            ))}
          </RadioGroup>
          <Textarea
            className="col-span-8"
            label="indication for admission"
            size="sm"
            variant="bordered"
          />
          <h2 className="text-gray-700 text-base flex items-center gap-2 mb-4 col-span-8">
            <span className="w-1 h-5 bg-violet-500 rounded-full "></span>
            4. Vital signs
          </h2>
          <Input
            className="col-span-2"
            label="T"
            size="sm"
            variant="bordered"
          />
          <Input
            className="col-span-2"
            label="P"
            size="sm"
            variant="bordered"
          />
          <Input
            className="col-span-2"
            label="R"
            size="sm"
            variant="bordered"
          />
          <Input
            className="col-span-2"
            label="BP"
            size="sm"
            variant="bordered"
          />
          <h2 className="text-gray-700 text-base flex items-center gap-2 mb-4 col-span-8">
            <span className="w-1 h-5 bg-violet-500 rounded-full "></span>
            5.Pertinent Clinical findings (Symptoms & Signs)
          </h2>
          <Input
            className="col-span-8"
            label="Pertinent Clinical findings (Symptoms & Signs)"
            size="sm"
            variant="bordered"
          />{" "}
          <h2 className="text-gray-700 text-base flex items-center gap-2 mb-4 col-span-8">
            <span className="w-1 h-5 bg-violet-500 rounded-full "></span>
            6.Investigation & Result (Lab, ENG, X-ray, etc.)
          </h2>{" "}
          <Input
            className="col-span-8"
            label="Investigation & Result (Lab, ENG, X-ray, etc.)"
            size="sm"
            variant="bordered"
          />
          <h2 className="text-gray-700 text-base flex items-center gap-2 mb-4 col-span-8">
            <span className="w-1 h-5 bg-violet-500 rounded-full "></span>
            7. HIV Test
          </h2>{" "}
          <RadioGroup className="col-span-2" orientation="horizontal">
            {yesOrNo.map((yon) => (
              <Radio key={yon.id} value={yon.id}>
                {yon.value}
              </Radio>
            ))}
          </RadioGroup>
          <Input
            className="col-span-3"
            label="Result :"
            size="sm"
            variant="bordered"
          />
          <Input
            className="col-span-3"
            label="Date performed :"
            size="sm"
            variant="bordered"
          />
          <h2 className="text-gray-700 text-base flex items-center gap-2 mb-4 col-span-8">
            <span className="w-1 h-5 bg-violet-500 rounded-full "></span>
            8.Underlying disease
          </h2>{" "}
          <Input
            className="col-span-8"
            label="Underlying disease :"
            size="sm"
            variant="bordered"
          />
          <h2 className="text-gray-700 text-base flex items-center gap-2 mb-4 col-span-8">
            <span className="w-1 h-5 bg-violet-500 rounded-full "></span>
            9.Diagnosis
          </h2>{" "}
          <div className="col-span-5 grid grid-cols-5 gap-2">
            <Input
              className="col-span-3"
              label="Diagnosis 1 :"
              size="sm"
              variant="bordered"
            />
            <Input
              className="col-span-2"
              label="ICD10-TM :"
              size="sm"
              variant="bordered"
            />
            <Input
              className="col-span-3"
              label="Diagnosis 2 :"
              size="sm"
              variant="bordered"
            />
            <Input
              className="col-span-2"
              label="ICD10-TM :"
              size="sm"
              variant="bordered"
            />
            <Input
              className="col-span-3"
              label="Diagnosis 3 :"
              size="sm"
              variant="bordered"
            />
            <Input
              className="col-span-2"
              label="ICD10-TM :"
              size="sm"
              variant="bordered"
            />
          </div>
          <div className="col-span-3 grid grid-cols-2 gap-2 h-full p-2 border border-divider rounded-lg">
            <Input
              className="col-span-1"
              size="lg"
              variant="bordered"
              radius="md"
              classNames={{ inputWrapper: "h-full" }}
            />
            <Input
              className="col-span-1"
              size="lg"
              variant="bordered"
              radius="md"
              classNames={{ inputWrapper: "h-full" }}
            />
            <Input
              className="col-span-1"
              size="lg"
              variant="bordered"
              radius="md"
              classNames={{ inputWrapper: "h-full" }}
            />
            <Input
              className="col-span-1"
              size="lg"
              variant="bordered"
              radius="md"
              classNames={{ inputWrapper: "h-full" }}
            />
          </div>
          <h2 className="text-gray-700 text-base flex items-center gap-2 mb-4 col-span-8">
            <span className="w-1 h-5 bg-violet-500 rounded-full "></span>
            10. Treatment
          </h2>{" "}
          <Input
            className="col-span-8"
            label="Treatment :"
            size="sm"
            variant="bordered"
          />
          <h2 className="text-gray-700 text-base flex items-center gap-2 mb-4 col-span-8">
            <span className="w-1 h-5 bg-violet-500 rounded-full "></span>
            11.Surgery/Operation
          </h2>{" "}
          <Input
            className="col-span-6"
            label="Surgery/Operation :"
            size="sm"
            variant="bordered"
          />
          <Input
            className="col-span-1"
            label="ICD9-CM :"
            size="sm"
            variant="bordered"
          />
          <Input
            className="col-span-1"
            label="Date performed :"
            size="sm"
            variant="bordered"
          />
          <RadioGroup label="Anaesthesia Type" className="col-span-8">
            {Anaesthesia.map((At) => (
              <Radio key={At.id} value={At.id}>
                {At.value}
              </Radio>
            ))}
          </RadioGroup>
          <Input
            className="col-span-8"
            label="Other :"
            size="sm"
            variant="bordered"
          />
          <h2 className="text-gray-700 text-base flex items-center gap-2 mb-4 col-span-8">
            <span className="w-1 h-5 bg-violet-500 rounded-full "></span>
            12.Pathological report
          </h2>{" "}
          <Input
            className="col-span-8"
            label="Pathological report :"
            size="sm"
            variant="bordered"
          />
          <h2 className="text-gray-700 text-base flex items-center gap-2 mb-4 col-span-8">
            <span className="w-1 h-5 bg-violet-500 rounded-full "></span>
            13.Complications (if any)
          </h2>{" "}
          <Input
            className="col-span-8"
            label="Complications (if any) :"
            size="sm"
            variant="bordered"
          />
          <div className="col-span-5 flex items-center gap-2">
            <h2 className="text-gray-700 text-base flex items-center gap-2 mb-4 col-span-8">
              <span className="w-1 h-5 bg-violet-500 rounded-full "></span>
              14.Is the illness related tp alcohol, drug abuse or addiction?
            </h2>{" "}
            <RadioGroup orientation="horizontal">
              {noOrYes.map((noy) => (
                <Radio key={noy.id} value={noy.id}>
                  {noy.value}
                </Radio>
              ))}
            </RadioGroup>
          </div>
          <Input
            className="col-span-3"
            label="please specify"
            size="sm"
            variant="bordered"
          />
          <div className="col-span-5 flex items-center gap-2">
            <h2 className="text-gray-700 text-base flex items-center gap-2 col-span-8">
              <span className="w-1 h-5 bg-violet-500 rounded-full "></span>
              15.For Female: Is the patient pregnant?
            </h2>

            <RadioGroup orientation="horizontal">
              {noOrYes.map((noy) => (
                <Radio key={noy.id} value={noy.id}>
                  {noy.value}
                </Radio>
              ))}
            </RadioGroup>
          </div>
          <Input
            className="col-span-3"
            label="gestational age"
            size="sm"
            variant="bordered"
          />
          <div className="col-span-1"></div>
          <div className="col-span-4 flex items-center gap-2 text-sm">
            <p>Was the treatment related to Infertility?</p>
            <RadioGroup orientation="horizontal">
              {noOrYes.map((noy) => (
                <Radio key={noy.id} value={noy.id}>
                  {noy.value}
                </Radio>
              ))}
            </RadioGroup>
          </div>
          <Input
            className="col-span-3"
            label="please specify"
            size="sm"
            variant="bordered"
          />
          <div className="col-span-5 flex items-center gap-2">
            <h2 className="text-gray-700 text-base flex items-center gap-2 mb-4 col-span-8">
              <span className="w-1 h-5 bg-violet-500 rounded-full "></span>
              16.Has patient ever been treated by another doctor before?
            </h2>
            <RadioGroup orientation="horizontal">
              {noOrYes.map((noy) => (
                <Radio key={noy.id} value={noy.id}>
                  {noy.value}
                </Radio>
              ))}
            </RadioGroup>
          </div>
          <Input
            className="col-span-3"
            label="please give name and address"
            size="sm"
            variant="bordered"
          />
          <h2 className="text-gray-700 text-base flex items-center gap-2 mb-4 col-span-8">
            <span className="w-1 h-5 bg-violet-500 rounded-full "></span>
            17.Was the illness/injury contributed to or Influenced by any of the
            following
          </h2>
          <RadioGroup className="col-span-8">
            {choice5.map((c5) => (
              <Radio key={c5.id} value={c5.id}>
                {c5.value}
              </Radio>
            ))}
          </RadioGroup>
          <RadioGroup className="col-span-8" orientation="horizontal">
            {noOrYes.map((noy) => (
              <Radio key={noy.id} value={noy.id}>
                {noy.value}
              </Radio>
            ))}
          </RadioGroup>
          <h2 className="text-gray-700 text-base flex items-center gap-2 mb-4 col-span-8">
            <span className="w-1 h-5 bg-violet-500 rounded-full "></span>
            18.Other past medical i history
          </h2>
          <div className="col-span-8">
            <Table aria-label="Example static collection table">
              <TableHeader>
                <TableColumn>Date</TableColumn>
                <TableColumn>Sign & Symptoms</TableColumn>
                <TableColumn>Diagnosis</TableColumn>
                <TableColumn>Treatment</TableColumn>
                <TableColumn>Hospital</TableColumn>
              </TableHeader>
              <TableBody>
                <TableRow key="1">
                  <TableCell>
                    <DatePicker size="sm" variant="bordered" />
                  </TableCell>
                  <TableCell>
                    <Input size="sm" variant="bordered" />
                  </TableCell>
                  <TableCell>
                    <Input size="sm" variant="bordered" />
                  </TableCell>
                  <TableCell>
                    <Input size="sm" variant="bordered" />
                  </TableCell>
                  <TableCell>
                    <Input size="sm" variant="bordered" />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          <h2 className="text-gray-700 text-base flex items-center gap-2 mb-4 col-span-8">
            <span className="w-1 h-5 bg-violet-500 rounded-full "></span>
            19.Other comments about the injury / illness
          </h2>        
          <Textarea className="col-span-8" variant="bordered" />
        </div>
      </div>
    </div>
  );
}
