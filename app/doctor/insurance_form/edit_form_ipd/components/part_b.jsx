"use client";
import { Checkbox, CheckboxGroup } from "@heroui/checkbox";
import { Input, Textarea } from "@heroui/input";
import { Radio, RadioGroup } from "@heroui/radio";
import { Select, SelectItem } from "@heroui/select";
import { NumberInput } from "@heroui/number-input";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/table";
import { DatePicker } from "@heroui/date-picker";
import { DateInput, TimeInput } from "@heroui/date-input";
import { Button } from "@heroui/button";
import { CalendarDate, parseDate } from "@internationalized/date";

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
  patData,
  calculateAge,
  formatThaiDateNoTime,
  convertISOToTime,
  formatAddress,
  claimData,
  form,
  temp,
  pulse,
  Resp,
  bp,
  // getParsed,
  // updateDate,
  // updateTime,
  addPastHistoryRow,
  removePastHistoryRow,
  rows,
  selectDiagValue,
  setSelectDiagValue,
  selectRefId,
  setSelectRefId,
  diagList,
  formatThaiDateTimeUTC,
  getRowKey,
  dates,
  handleDateTimeClaimBForm,
  firstSeen,
  injuryDate,
}) {
  const patient_name = claimData?.his.patient
    ? `${claimData?.his?.patient?.prename}${claimData?.his?.patient?.firstname} ${claimData?.his?.patient?.lastname}`
    : "";

  console.log(claimData);
  // const firstSeenDateParsed = getParsed("partB.firstSeenDate");
  // const injuryDateParsed = getParsed("partB.injuryDate");
  return (
    <div className="space-y-6 px-40 pb-6">
      <h1 className="text-md text-center font-bold">Medical certification</h1>
      <div className="border border-divider p-4 rounded-xl ">
        <h2 className=" font-semibold text-base flex items-center gap-2 mb-4 col-span-10">
          <span className="w-1 h-5 bg-[#27a59b]  dark:bg-violet-500 rounded-full"></span>
          สำหรับผู้เอาประกัน
        </h2>
        <div className="grid grid-cols-10 gap-2 items-center">
          <Input
            className="col-span-2"
            label="Patient's Name :"
            size="sm"
            variant="bordered"
            value={patient_name}
            classNames={{
              inputWrapper:
                "bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126]",
            }}
          />
          <Select
            className="col-span-1"
            label="เพศ"
            size="sm"
            disabled
            classNames={{
              base: "bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126] rounded-lg",
            }}
            selectedKeys={
              claimData?.his?.patient.sex
                ? new Set([String(claimData?.his?.patient.sex)])
                : new Set()
            }
            onSelectionChange={(keys) => {
              const selected = Array.from(keys)[0];
              setclaimData((prev) => ({
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
            className="col-span-2"
            label="HN :"
            size="sm"
            variant="bordered"
            value={claimData?.patientId || ""}
            classNames={{
              inputWrapper:
                "bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126]",
            }}
          />
          <Input
            className="col-span-2"
            label="AN :"
            size="sm"
            variant="bordered"
            value={claimData?.an || ""}
            classNames={{
              inputWrapper:
                "bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126]",
            }}
          />
          <Input
            className="col-span-1"
            label="Age :"
            size="sm"
            variant="bordered"
            value={`${calculateAge(claimData?.his?.patient?.birthdatetime).years || ""} ปี`}
            classNames={{
              inputWrapper:
                "bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126]",
            }}
          />
          <Input
            className="col-span-2"
            label="Month(s) :"
            size="sm"
            variant="bordered"
            value={`${calculateAge(claimData?.his?.patient?.birthdatetime).months || ""} เดือน`}
            classNames={{
              inputWrapper:
                "bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126]",
            }}
          />
          <Input
            className="col-span-2"
            label="Admission Date :"
            size="sm"
            variant="bordered"
            classNames={{
              inputWrapper:
                "bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126]",
            }}
          />
          <Input
            className="col-span-2"
            label="Time :"
            size="sm"
            variant="bordered"
            classNames={{
              inputWrapper:
                "bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126]",
            }}
          />
          <Input
            className="col-span-2"
            label="Discharge Date :"
            size="sm"
            variant="bordered"
            classNames={{
              inputWrapper:
                "bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126]",
            }}
          />
          <Input
            className="col-span-2"
            label="Time :"
            size="sm"
            variant="bordered"
            classNames={{
              inputWrapper:
                "bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126]",
            }}
          />
          <Input
            className="col-span-2"
            label="Consultation Date :"
            size="sm"
            variant="bordered"
            classNames={{
              inputWrapper:
                "bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126]",
            }}
          />
        </div>
      </div>

      <div className="grid grid-cols-8 gap-2 items-center">
        <div className="col-span-4 border border-divider p-4 space-y-2 rounded-xl h-full">
          <h2 className=" text-base flex items-center gap-2 mb-4">
            <span className="w-1 h-5 bg-[#27a59b]  dark:bg-violet-500 rounded-full"></span>
            1. For Illness
          </h2>
          <h1 className="text-sm">
            a) Date you first saw this patient for this illness :
          </h1>
          <div className="col-span-4 flex items-center gap-2">
            {/* Date */}
            <DatePicker
              label="Date"
              size="sm"
              variant="flat"
              classNames={{
                inputWrapper:
                  "bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126]",
              }}
              value={firstSeen.date}
              onChange={firstSeen.onDateChange}
            />

            {/* Time */}
            <TimeInput
              label="Time"
              size="sm"
              variant="flat"
              classNames={{
                inputWrapper:
                  "bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126]",
              }}
              value={firstSeen.time}
              onChange={firstSeen.onTimeChange}
            />
          </div>
          <h2 className="col-span-3 text-sm pt-2">
            b) Chief complaint and duration of symptom(s) :
          </h2>
          <form.Field name="partB.firstSeenComplaint">
            {(field) => (
              <Textarea
                label=""
                variant="bordered"
                value={field.state.value ?? ""}
                onChange={(e) => field.handleChange(e.target.value)}
                classNames={{
                  inputWrapper:
                    "bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126]",
                }}
              />
            )}
          </form.Field>
        </div>
        <div className="col-span-4 border border-divider p-4 space-y-2 rounded-xl grid grid-cols-3 gap-2">
          <h2 className=" text-base flex items-center gap-2 mb-4 col-span-3">
            <span className="w-1 h-5 bg-[#27a59b]  dark:bg-violet-500 rounded-full "></span>
            2. For Injury
          </h2>

          <h2 className="col-span-3 text-sm">a) Date of Injury : </h2>

          <DatePicker
            className="col-span-2"
            label="Date"
            size="sm"
            variant="bordered"
            classNames={{
              inputWrapper:
                "bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126]",
            }}
            value={injuryDate.date}
            onChange={injuryDate.onDateChange}
          />

          <TimeInput
            label="Time"
            size="sm"
            variant="flat"
            classNames={{
              inputWrapper:
                "bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126]",
            }}
            value={injuryDate.time}
            onChange={injuryDate.onTimeChange}
          />

          <form.Field name="partB.injuryCause">
            {(field) => (
              <Input
                className="col-span-3"
                label="b) Cause of injury :"
                labelPlacement="outside-top"
                size="md"
                radius="sm"
                variant="bordered"
                classNames={{
                  label: "text-sm",
                  inputWrapper:
                    "bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126]",
                }}
                value={field.state.value ?? ""}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            )}
          </form.Field>
          <form.Field name="partB.injuryDetails">
            {(field) => (
              <Input
                className="col-span-3"
                label="c) Detail of injury "
                size="md"
                radius="sm"
                labelPlacement="outside-top"
                variant="bordered"
                classNames={{
                  label: "text-sm",
                  inputWrapper:
                    "bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126]",
                }}
                value={field.state.value ?? ""}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            )}
          </form.Field>

          <form.Field name="partB.injurySmellAlcohol">
            {(field) => (
              <RadioGroup
                className="col-span-3"
                classNames={{ label: "text-sm text-black dark:white" }}
                label="d) Did you smell alcohol from the patient?"
                value={field.state.value ?? ""}
                onChange={(e) => field.handleChange(e.target.value)}
              >
                {choice3.map((c3) => (
                  <Radio key={c3.id} value={String(c3.value)}>
                    {c3.name}
                  </Radio>
                ))}
                {["NK", "Y"].includes(field.state.value) && (
                  <form.Field name="partB.injuryBloodAlcoholMg">
                    {(field) => (
                      <NumberInput
                        className="col-span-3"
                        label="blood alcohol test (if any) ="
                        size="sm"
                        variant="bordered"
                        value={field.state.value ?? null}
                        onChange={(value) => {
                          if (value == null) {
                            field.handleChange(null);
                            return;
                          }

                          field.handleChange(Math.max(0, value));
                        }}
                        classNames={{
                          inputWrapper:
                            "bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126]",
                        }}
                      />
                    )}
                  </form.Field>
                )}
              </RadioGroup>
            )}
          </form.Field>

          <form.Field name="partB.injuryConsciousness">
            {(field) => (
              <RadioGroup
                className="col-span-3"
                label="e) Level of consciousness"
                classNames={{
                  label: "text-sm text-black dark:white",
                  wrapper: "grid grid-cols-3 gap-2",
                }}
                value={field.state.value ?? ""}
                onChange={(e) => field.handleChange(e.target.value)}
              >
                {choice4.map((c4) => (
                  <Radio key={c4.id} value={String(c4.value)}>
                    {c4.value}
                  </Radio>
                ))}
              </RadioGroup>
            )}
          </form.Field>

          <form.Field name="partB.injuryEstimatedRecovery">
            {(field) => (
              <Input
                className="col-span-3"
                label="f) Estimated time for recovery :"
                labelPlacement="outside-top"
                variant="bordered"
                radius="sm"
                classNames={{
                  label: "text-sm",
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
      <div className="grid grid-cols-8 gap-2 items-center border border-divider rounded-xl  p-4 space-y-2">
        <h2 className=" text-base flex items-center gap-2  col-span-8">
          <span className="w-1 h-5 bg-[#27a59b]  dark:bg-violet-500 rounded-full "></span>
          3. Did the patient need to be admitted to hospital?
        </h2>
        <form.Field name="partB.needAdmission">
          {(field) => (
            <RadioGroup
              className="col-span-8"
              orientation="horizontal"
              value={field.state.value ?? ""}
              onChange={(e) => field.handleChange(e.target.value)}
            >
              {yesOrNo.map((yon) => (
                <Radio key={yon.id} value={String(yon.value)}>
                  {yon.name}
                </Radio>
              ))}
              {field.state.value === "Y" && (
                <form.Field name="partB.indicationForAdmission">
                  {(field) => (
                    <Textarea
                      className="col-span-8"
                      label="indication for admission"
                      size="sm"
                      variant="bordered"
                      value={field.state.value ?? ""}
                      onChange={(e) => field.handleChange(e.target.value)}
                      classNames={{
                        inputWrapper:
                          "bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126]",
                      }}
                    />
                  )}
                </form.Field>
              )}
            </RadioGroup>
          )}
        </form.Field>
        <h2 className=" text-base flex items-center gap-2 col-span-8">
          <span className="w-1 h-5 bg-[#27a59b]  dark:bg-violet-500 rounded-full "></span>
          4. Vital signs
        </h2>
        <Input
          className="col-span-2"
          label="T"
          size="sm"
          variant="bordered"
          value={temp}
          disabled
          classNames={{
            inputWrapper:
              "bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126]",
          }}
        />
        <Input
          className="col-span-2"
          label="P"
          size="sm"
          variant="bordered"
          value={pulse}
          disabled
          classNames={{
            inputWrapper:
              "bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126]",
          }}
        />
        <Input
          className="col-span-2"
          label="R"
          size="sm"
          variant="bordered"
          value={Resp}
          disabled
          classNames={{
            inputWrapper:
              "bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126]",
          }}
        />
        <Input
          className="col-span-2"
          label="BP"
          size="sm"
          variant="bordered"
          value={bp}
          disabled
          classNames={{
            inputWrapper:
              "bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126]",
          }}
        />
        <h2 className=" text-base flex items-center gap-2  col-span-8">
          <span className="w-1 h-5 bg-[#27a59b]  dark:bg-violet-500 rounded-full "></span>
          5.Pertinent Clinical findings (Symptoms & Signs)
        </h2>
        <form.Field name="partB.clinicalFindings">
          {(field) => (
            <Input
              className="col-span-8"
              label="Pertinent Clinical findings (Symptoms & Signs)"
              size="sm"
              variant="bordered"
              value={field.state.value ?? ""}
              onChange={(e) => field.handleChange(e.target.value)}
              classNames={{
                inputWrapper:
                  "bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126]",
              }}
            />
          )}
        </form.Field>
        <h2 className=" text-base flex items-center gap-2  col-span-8">
          <span className="w-1 h-5 bg-[#27a59b]  dark:bg-violet-500 rounded-full "></span>
          6.Investigation & Result (Lab, ENG, X-ray, etc.)
        </h2>
        <form.Field name="partB.investigations">
          {(field) => (
            <Input
              className="col-span-8"
              label="Investigation & Result (Lab, ENG, X-ray, etc.)"
              size="sm"
              variant="bordered"
              value={field.state.value ?? ""}
              onChange={(e) => field.handleChange(e.target.value)}
              classNames={{
                inputWrapper:
                  "bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126]",
              }}
            />
          )}
        </form.Field>
        <h2 className="text-base flex items-center gap-2 col-span-8">
          <span className="w-1 h-5 bg-[#27a59b]  dark:bg-violet-500 rounded-full "></span>
          7. HIV Test
        </h2>
        <form.Field name="partB.hivTestDone">
          {(field) => (
            <RadioGroup
              className="col-span-8 "
              orientation="horizontal"
              value={field.state.value ?? ""}
              onChange={(e) => field.handleChange(e.target.value)}
            >
              {yesOrNo.map((yon) => (
                <Radio key={yon.id} value={String(yon.value)}>
                  {yon.name}
                </Radio>
              ))}
              {field.state.value === "Y" && (
                <div className="flex gap-2 items-center">
                  <form.Field name="partB.hivResult">
                    {(field) => (
                      <Input
                        label="Result :"
                        size="sm"
                        variant="bordered"
                        value={field.state.value ?? ""}
                        onChange={(e) => field.handleChange(e.target.value)}
                        classNames={{
                          inputWrapper:
                            "bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126]",
                        }}
                      />
                    )}
                  </form.Field>
                  {/* <form.Field>
          {(field) => ( */}
                  <Input
                    label="Date performed :"
                    size="sm"
                    variant="bordered"
                    classNames={{
                      inputWrapper:
                        "bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126]",
                    }}
                  />
                  {/* )}
        </form.Field> */}
                </div>
              )}
            </RadioGroup>
          )}
        </form.Field>
        <h2 className=" text-base flex items-center gap-2 col-span-8">
          <span className="w-1 h-5 bg-[#27a59b]  dark:bg-violet-500 rounded-full "></span>
          8.Underlying disease
        </h2>{" "}
        <form.Field name="partB.underlyingDisease">
          {(field) => (
            <Input
              className="col-span-8"
              label="Underlying disease :"
              size="sm"
              variant="bordered"
              value={field.state.value ?? ""}
              onChange={(e) => field.handleChange(e.target.value)}
              classNames={{
                inputWrapper:
                  "bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126]",
              }}
            />
          )}
        </form.Field>
        <h2 className=" text-base flex items-center gap-2 col-span-8">
          <span className="w-1 h-5 bg-[#27a59b]  dark:bg-violet-500 rounded-full "></span>
          9.Diagnosis
        </h2>{" "}
        <div className="col-span-8">
          <Table
            aria-label="past history table"
            selectionMode="multiple"
            selectedKeys={selectRefId}
            onSelectionChange={(keys) => {
              setSelectRefId(keys);

              const data = diagList ?? [];

              const selected =
                keys === "all"
                  ? data
                  : data.filter((d) => keys.has(getRowKey(d)));

              setSelectDiagValue(selected);
            }}
            isStriped
          >
            <TableHeader>
              <TableColumn>Diag Type</TableColumn>
              <TableColumn>Detail</TableColumn>
              <TableColumn>Date</TableColumn>
              <TableColumn>Source</TableColumn>
              <TableColumn>Code</TableColumn>
            </TableHeader>
            <TableBody>
              {diagList.map((diag, index) => (
                <TableRow
                  key={
                    diag?.source === "icd10" ? diag?.refId : diag?.opernoteId
                  }
                >
                  <TableCell>{diag?.diag_type}</TableCell>
                  <TableCell>
                    {diag?.source === "icd10" ? diag.detail : diag.postopdx}
                  </TableCell>
                  <TableCell>
                    {formatThaiDateTimeUTC(diag?.editdatetime)}
                  </TableCell>
                  <TableCell>{diag?.source}</TableCell>
                  <TableCell>{diag?.code}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="col-span-8">
          {selectDiagValue.filter((i) => i.source === "icd10").length > 0 ? (
            selectDiagValue
              .filter((i) => i.source === "icd10")
              .map((item, index) => (
                <div className="grid grid-cols-5 gap-x-2 space-y-2" key={index}>
                  <Input
                    className="col-span-3"
                    label={`Diagnosis ${index + 1} :`}
                    size="sm"
                    variant="bordered"
                    value={item?.detail ?? ""}
                    classNames={{
                      inputWrapper:
                        "bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126]",
                    }}
                  />
                  <Input
                    className="col-span-2"
                    label="ICD10-TM :"
                    size="sm"
                    variant="bordered"
                    value={item?.code ?? ""}
                    classNames={{
                      inputWrapper:
                        "bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126]",
                    }}
                  />
                </div>
              ))
          ) : (
            <div className="col-span-8 border border-divider p-2.5 rounded-lg">
              <h1 className="text-center text-md text-gray-600">
                กรุณาเลือกข้อมูลที่ เป็น icd 10 ที่ข้อ 9.Diagnosis
              </h1>
            </div>
          )}
        </div>
        <h2 className=" text-base flex items-center gap-2 col-span-8">
          <span className="w-1 h-5 bg-[#27a59b]  dark:bg-violet-500 rounded-full "></span>
          10. Treatment
        </h2>{" "}
        <form.Field name="partB.treatment">
          {(field) => (
            <Input
              className="col-span-8"
              label="Treatment :"
              size="sm"
              variant="bordered"
              value={field.state.value ?? ""}
              onChange={(e) => field.handleChange(e.target.value)}
              classNames={{
                inputWrapper:
                  "bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126]",
              }}
            />
          )}
        </form.Field>
        <h2 className=" text-base flex items-center gap-2 col-span-8">
          <span className="w-1 h-5 bg-[#27a59b]  dark:bg-violet-500 rounded-full "></span>
          11.Surgery/Operation
        </h2>{" "}
        {selectDiagValue.filter((i) => i.source === "icd9").length > 0 ? (
          selectDiagValue
            .filter((i) => i.source === "icd9")
            .map((item, index) => (
              <div
                className="col-span-8 grid grid-cols-8 gap-2 space-y-2"
                key={index}
              >
                <Input
                  className="col-span-5"
                  label="Surgery/Operation :"
                  size="sm"
                  variant="bordered"
                  classNames={{
                    inputWrapper:
                      "bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126]",
                  }}
                  value={item?.postopdx ?? ""}
                />
                <Input
                  className="col-span-1"
                  label="ICD9-CM :"
                  size="sm"
                  variant="bordered"
                  classNames={{
                    inputWrapper:
                      "bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126]",
                  }}
                  value={item?.code ?? ""}
                />
                <Input
                  className="col-span-2"
                  label="Date performed :"
                  size="sm"
                  variant="bordered"
                  classNames={{
                    inputWrapper:
                      "bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126]",
                  }}
                  value={formatThaiDateNoTime(item?.editdatetime ?? "")}
                />
              </div>
            ))
        ) : (
          <div className="col-span-8 border border-divider p-2.5 rounded-lg">
            <h1 className="text-center text-md text-gray-600">
              กรุณาเลือกข้อมูลที่ เป็น icd 9 ที่ข้อ 9.Diagnosis
            </h1>
          </div>
        )}
        <form.Field name="partB.anaesthesiaType">
          {(field) => (
            <RadioGroup
              label="Anaesthesia Type"
              className="col-span-8"
              classNames={{ label: "text-black dark:text-white" }}
              value={field.state.value ?? ""}
              onChange={(e) => field.handleChange(e.target.value)}
            >
              {Anaesthesia.map((At) => (
                <div className="flex gap-2 items-center" key={At.id}>
                  <Radio value={String(At.value)}>{At.value}</Radio>
                  {String(At.value) === "Others" &&
                    field.state.value === "Others" && (
                      <form.Field name="partB.anaesthesiaTypeOthers">
                        {(field) => (
                          <Input
                            className="col-span-8"
                            label="Other :"
                            size="sm"
                            variant="bordered"
                            value={field.state.value ?? ""}
                            onChange={(e) => field.handleChange(e.target.value)}
                          />
                        )}
                      </form.Field>
                    )}
                </div>
              ))}
            </RadioGroup>
          )}
        </form.Field>
        <h2 className=" text-base flex items-center gap-2 mb-4 col-span-8">
          <span className="w-1 h-5 bg-[#27a59b]  dark:bg-violet-500 rounded-full "></span>
          12.Pathological report
        </h2>{" "}
        <form.Field name="partB.pathological_report">
          {(field) => (
            <Input
              className="col-span-8"
              label="Pathological report :"
              size="sm"
              variant="bordered"
              value={field.state.value ?? ""}
              onChange={(e) => field.handleChange(e.target.value)}
              classNames={{
                inputWrapper:
                  "bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126]",
              }}
            />
          )}
        </form.Field>
        <h2 className=" text-base flex items-center gap-2 col-span-8">
          <span className="w-1 h-5 bg-[#27a59b]  dark:bg-violet-500 rounded-full "></span>
          13.Complications (if any)
        </h2>
        <form.Field name="partB.complications">
          {(field) => (
            <Input
              className="col-span-8"
              label="Complications (if any) :"
              size="sm"
              variant="bordered"
              value={field.state.value ?? ""}
              onChange={(e) => field.handleChange(e.target.value)}
              classNames={{
                inputWrapper:
                  "bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126]",
              }}
            />
          )}
        </form.Field>
        <div className="col-span-8 flex items-center gap-2">
          <h2 className=" text-base flex items-center gap-2 col-span-8">
            <span className="w-1 h-5 bg-[#27a59b]  dark:bg-violet-500 rounded-full "></span>
            14.Is the illness related tp alcohol, drug abuse or addiction?
          </h2>{" "}
          <form.Field name="partB.relatedToAlcoholDrug">
            {(field) => (
              <RadioGroup
                orientation="horizontal"
                value={field.state.value ?? ""}
                onChange={(e) => field.handleChange(e.target.value)}
              >
                {noOrYes.map((noy) => (
                  <div className="flex gap-2 items-center" key={noy.id}>
                    <Radio value={String(noy.value)}>{noy.name}</Radio>
                    {String(noy.value) === "Y" && field.state.value === "Y" && (
                      <form.Field name="partB.detailRelatedToAlcoholDrug">
                        {(field) => (
                          <Input
                            className="w-120"
                            label="please specify"
                            size="sm"
                            variant="bordered"
                            value={field.state.value ?? ""}
                            onChange={(e) => field.handleChange(e.target.value)}
                            classNames={{
                              inputWrapper:
                                "bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126]",
                            }}
                          />
                        )}
                      </form.Field>
                    )}
                  </div>
                ))}
              </RadioGroup>
            )}
          </form.Field>
        </div>
        <div className="col-span-8 flex items-center gap-2">
          <h2 className=" text-base flex items-center gap-2 col-span-8">
            <span className="w-1 h-5 bg-[#27a59b]  dark:bg-violet-500 rounded-full "></span>
            15.For Female: Is the patient pregnant?
          </h2>
          <form.Field name="partB.isPregnant">
            {(field) => (
              <RadioGroup
                orientation="horizontal"
                value={field.state.value ?? ""}
                onChange={(e) => field.handleChange(e.target.value)}
              >
                {noOrYes.map((noy) => (
                  <div className="flex items-center gap-2" key={noy.id}>
                    <Radio value={String(noy.value)}>{noy.name}</Radio>
                    {String(noy.value) === "Y" && field.state.value === "Y" && (
                      <form.Field name="partB.gestationalAgeWeeks">
                        {(field) => (
                          <NumberInput
                            min={0}
                            max={50}
                            className=""
                            label="gestational age (week)"
                            size="sm"
                            variant="bordered"
                            value={field.state.value}
                            onChange={(value) => {
                              if (value == null) {
                                field.handleChange(null);
                                return;
                              }

                              field.handleChange(Math.max(0, value));
                            }}
                            classNames={{
                              inputWrapper:
                                "bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126]",
                            }}
                          />
                        )}
                      </form.Field>
                    )}
                  </div>
                ))}
              </RadioGroup>
            )}
          </form.Field>
        </div>
        <div className="col-span-8 flex items-center gap-2 text-sm">
          <p className="pl-31 text-base">
            Was the treatment related to Infertility?
          </p>
          <form.Field name="partB.relatedToInfertility">
            {(field) => (
              <RadioGroup
                orientation="horizontal"
                value={field.state.value ?? ""}
                onChange={(e) => field.handleChange(e.target.value)}
              >
                {noOrYes.map((noy) => (
                  <div className="flex items-center gap-2" key={noy.id}>
                    <Radio value={String(noy.value)}>{noy.name}</Radio>
                    {String(noy.value) === "Y" && field.state.value === "Y" && (
                      <form.Field name="partB.detailRelatedToInfertility">
                        {(field) => (
                          <Input
                            className="w-140"
                            label="please specify"
                            size="sm"
                            variant="bordered"
                            value={field.state.value ?? ""}
                            onChange={(e) => field.handleChange(e.target.value)}
                            classNames={{
                              inputWrapper:
                                "bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126]",
                            }}
                          />
                        )}
                      </form.Field>
                    )}
                  </div>
                ))}
              </RadioGroup>
            )}
          </form.Field>
        </div>
        <div className="col-span-8 flex items-center gap-2">
          <h2 className=" text-base flex items-center gap-2 col-span-8">
            <span className="w-1 h-5 bg-[#27a59b]  dark:bg-violet-500 rounded-full "></span>
            16.Has patient ever been treated by another doctor before?
          </h2>
          <form.Field name="partB.treatedByOtherDoctor">
            {(field) => (
              <RadioGroup
                orientation="horizontal"
                value={field.state.value ?? ""}
                onChange={(e) => field.handleChange(e.target.value)}
              >
                {noOrYes.map((noy) => (
                  <div className="flex items-center gap-2" key={noy.id}>
                    <Radio value={String(noy.value)}>{noy.name}</Radio>
                    {String(noy.value) === "Y" && field.state.value === "Y" && (
                      <div className="flex items-center gap-2">
                        <form.Field name="partB.otherDoctorName">
                          {(field) => (
                            <Input
                              className=""
                              label="please give name"
                              size="sm"
                              variant="bordered"
                              value={field.state.value ?? ""}
                              onChange={(e) =>
                                field.handleChange(e.target.value)
                              }
                              classNames={{
                                inputWrapper:
                                  "bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126]",
                              }}
                            />
                          )}
                        </form.Field>
                        <form.Field name="partB.otherDoctorAddress">
                          {(field) => (
                            <Input
                              className=""
                              label="please give address"
                              size="sm"
                              variant="bordered"
                              value={field.state.value ?? ""}
                              onChange={(e) =>
                                field.handleChange(e.target.value)
                              }
                              classNames={{
                                inputWrapper:
                                  "bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126]",
                              }}
                            />
                          )}
                        </form.Field>
                      </div>
                    )}
                  </div>
                ))}
              </RadioGroup>
            )}
          </form.Field>
        </div>
        <h2 className=" text-base flex items-center gap-2 col-span-8">
          <span className="w-1 h-5 bg-[#27a59b]  dark:bg-violet-500 rounded-full "></span>
          17.Was the illness/injury contributed to or Influenced by any of the
          following
        </h2>
        <div className="col-span-8 pl-8 space-y-2">
          <form.Field name="partB.hasPhysicalDefect">
            {(field) => (
              <RadioGroup
                label="a) Physical defects/congenital anomaly"
                classNames={{
                  label: "text-black dark:text-white",
                  wrapper: "pl-4",
                }}
                size="md"
                orientation="horizontal"
                value={field.state.value ?? ""}
                onChange={(e) => field.handleChange(e.target.value)}
              >
                {noOrYes.map((noy) => (
                  <Radio key={noy.id} value={String(noy.value)}>
                    {noy.name}
                  </Radio>
                ))}
              </RadioGroup>
            )}
          </form.Field>
          <form.Field name="partB.hasDegeneration">
            {(field) => (
              <RadioGroup
                label="b) Degenerative change(s)"
                classNames={{
                  label: "text-black dark:text-white",
                  wrapper: "pl-4",
                }}
                size="md"
                orientation="horizontal"
                value={field.state.value ?? ""}
                onChange={(e) => field.handleChange(e.target.value)}
              >
                {noOrYes.map((noy) => (
                  <Radio key={noy.id} value={String(noy.value)}>
                    {noy.name}
                  </Radio>
                ))}
              </RadioGroup>
            )}
          </form.Field>
        </div>
        <h2 className=" text-base flex items-center gap-2 mb-4 col-span-8">
          <span className="w-1 h-5 bg-[#27a59b]  dark:bg-violet-500 rounded-full "></span>
          18.Other past medical i history
        </h2>
        <div className="col-span-8 space-y-2">
          <Table aria-label="past history table">
            <TableHeader>
              <TableColumn>Date</TableColumn>
              <TableColumn>Sign & Symptoms</TableColumn>
              <TableColumn>Diagnosis</TableColumn>
              <TableColumn>Treatment</TableColumn>
              <TableColumn>Hospital</TableColumn>
              <TableColumn className="text-right">Action</TableColumn>
            </TableHeader>

            <TableBody>
              {rows.map((_, index) => (
                <TableRow key={rows.id}>
                  <TableCell>
                    <form.Field
                      name={`partB.pastHistoryItems.${index}.itemDate`}
                    >
                      {(field) => (
                        <DatePicker
                          size="sm"
                          variant="bordered"
                          value={
                            field.state.value
                              ? parseDate(field.state.value.split("T")[0])
                              : null
                          }
                          onChange={(d) => {
                            field.handleChange(d ? d.toString() : null);
                          }}
                        />
                      )}
                    </form.Field>
                  </TableCell>

                  <TableCell>
                    <form.Field
                      name={`partB.pastHistoryItems.${index}.signsAndSymptoms`}
                    >
                      {(field) => (
                        <Input
                          size="sm"
                          variant="bordered"
                          value={field.state.value ?? ""}
                          onChange={(e) => field.handleChange(e.target.value)}
                        />
                      )}
                    </form.Field>
                  </TableCell>

                  <TableCell>
                    <form.Field
                      name={`partB.pastHistoryItems.${index}.diagnosis`}
                    >
                      {(field) => (
                        <Input
                          size="sm"
                          variant="bordered"
                          value={field.state.value ?? ""}
                          onChange={(e) => field.handleChange(e.target.value)}
                        />
                      )}
                    </form.Field>
                  </TableCell>

                  <TableCell>
                    <form.Field
                      name={`partB.pastHistoryItems.${index}.treatment`}
                    >
                      {(field) => (
                        <Input
                          size="sm"
                          variant="bordered"
                          value={field.state.value ?? ""}
                          onChange={(e) => field.handleChange(e.target.value)}
                        />
                      )}
                    </form.Field>
                  </TableCell>

                  <TableCell>
                    <form.Field
                      name={`partB.pastHistoryItems.${index}.hospital`}
                    >
                      {(field) => (
                        <Input
                          size="sm"
                          variant="bordered"
                          value={field.state.value ?? ""}
                          onChange={(e) => field.handleChange(e.target.value)}
                        />
                      )}
                    </form.Field>
                  </TableCell>

                  <TableCell className="flex justify-end">
                    <Button
                      className=""
                      color="danger"
                      size="sm"
                      radius="full"
                      onPress={() => removePastHistoryRow(index)}
                      isIconOnly
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 12h14"
                        />
                      </svg>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex justify-end pr-7">
            <Button
              size="sm"
              radius="full"
              color="primary"
              onPress={addPastHistoryRow}
              isIconOnly
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </Button>
          </div>
        </div>
        <h2 className=" text-base flex items-center gap-2 mb-4 col-span-8">
          <span className="w-1 h-5 bg-[#27a59b]  dark:bg-violet-500 rounded-full "></span>
          19.Other comments about the injury / illness
        </h2>
        <form.Field name="partB.otherComments">
          {(field) => (
            <Textarea
              className="col-span-8"
              variant="bordered"
              value={field.state.value ?? ""}
              onChange={(e) => field.handleChange(e.target.value)}
              classNames={{
                inputWrapper:
                  "bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126]",
              }}
            />
          )}
        </form.Field>
        <DatePicker
          label="DATE"
          variant="flat"
          locale="th-TH-u-ca-buddhist"
          className="w-50"
          size="sm"
          value={dates.dateTimeClaimBForm ?? null}
          onChange={handleDateTimeClaimBForm}
          withinPortal={false}
          classNames={{
            inputWrapper:
              "bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126]",
          }}
        />
      </div>
    </div>
  );
}
