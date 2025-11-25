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
      <div>
        <div className="mt-2 border border-divider rounded-xl p-4 space-y-2">
          <div className="text-center">
            <h1>
              <strong>Discharge Notification Form</strong>
            </h1>
            <p>
              <strong>Hospital Name</strong>
            </p>
            <p>
              <strong>Part B</strong>
            </p>
          </div>
          <h1 className="text-md text-center">Medical certification</h1>
          <p>1.ผู้เอาประกันภัย</p>
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
          <div className="grid grid-cols-8 gap-2 items-center">
            <div className="col-span-4 border border-divider p-4 space-y-2 rounded-xl h-full">
              <p>1. For Illness</p>
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
              <p className="col-span-3">2. For Injury</p>
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
          <div className="grid grid-cols-8 gap-2 items-center">
            <p className="col-span-8">
              3. Did the patient need to be admitted to hospital?
            </p>
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
            <Input
              className="col-span-2"
              label="4. Vital signs : T"
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
            <Input
              className="col-span-8"
              label="5. Pertinent Clinical findings (Symptoms & Signs)"
              size="sm"
              variant="bordered"
            />
            <Input
              className="col-span-8"
              label="6. Investigation & Result (Lab, ENG, X-ray, etc.)"
              size="sm"
              variant="bordered"
            />
            <p className="col-span-8">7. HIV Test</p>
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
            <Input
              className="col-span-8"
              label="8. Underlying disease :"
              size="sm"
              variant="bordered"
            />
            <p className="col-span-8">9. Diagnosis</p>
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
            <p className="col-span-8">10. Treatment</p>
            <Input
              className="col-span-8"
              label="Treatment :"
              size="sm"
              variant="bordered"
            />
            <p className="col-span-8">11.</p>
            <Input
              className="col-span-6"
              label="11.Surgery/Operation :"
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
            <Input
              className="col-span-8"
              label="12.Pathological report :"
              size="sm"
              variant="bordered"
            />
            <Input
              className="col-span-8"
              label="13.Complications (if any) :"
              size="sm"
              variant="bordered"
            />
            <div className="col-span-5 flex items-center gap-2">
              <p>
                14.Is the illness related tp alcohol, drug abuse or addiction?
              </p>
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
              <p>15.For Female: Is the patient pregnant?</p>
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
            <div className="col-span-4 flex items-center gap-2">
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
              <p>16.Has patient ever been treated by another doctor before?</p>
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
            <p className="col-span-8">
              17.Was the illness/injury contributed to or Influenced by any of
              the following
            </p>
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
            <p className="col-span-8">18.Other past medical i history</p>
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
            <p className="col-span-8">
              19.Other comments about the injury / illness
            </p>
            <Textarea className="col-span-8" variant="bordered" />
          </div>
        </div>
      </div>
    </div>
  );
}
