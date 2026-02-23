"use client";
import React from "react";

export default function PartA({
  calculateAge,
  formatAddress,
  formatThaiDateNoTime,
  formatTimeNoDate,
  sortedIds,
  claimData,
  patient_name,
  formatThaiDateTime,
}) {
  return (
    <div className=" space-y-6 ">
      <section className=" p-6 rounded-xl border border-[#b0dddf] dark:border-divider bg-[#d8efef] dark:bg-[#0e0e11]">
        <h2 className="text-gray-800 dark:text-gray-100 font-bold text-lg flex items-center gap-3 mb-2">
          <span className="w-1.5 h-6 bg-[#27a59b]  dark:bg-violet-500 rounded-full"></span>
          สำหรับผู้เอาประกัน
        </h2>
        <div className="flex items-center justify-between">
          {" "}
          <p className="text-md font-bold col-span-2">ผู้เอาประกันภัย : </p>
          <p className="text-md col-span-2">
            <strong>Claim Date : </strong>
            {""}
            {formatThaiDateTime(claimData?.hospitalForm?.datetimeForm)}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-3 bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126] rounded-lg px-4 py-2">
          <p className="flex items-center gap-2  text-sm ">
            <span className="font-bold">ชื่อ-นามสกุล :</span>{" "}
            <span>{patient_name}</span>
          </p>

          <p className="flex item-center gap-2">
            <span className="font-bold">เพศ :</span> <span>ชาย</span>
          </p>

          <p className="flex items-center gap-2  text-sm ">
            <span className="font-bold">เลขประจำตัวประชาชน :</span>
            <span>{claimData?.his?.patient?.citizencardno || "-"}</span>
          </p>

          <p className="flex items-center gap-2  text-sm">
            <span className="font-bold">วันเดือนปี เกิด :</span>
            <span>
              {" "}
              {formatThaiDateNoTime(
                claimData?.his?.patient?.birthdatetime || "-",
              )}
            </span>
          </p>

          <p className="flex items-center gap-2  text-sm ">
            <span className="font-bold">อายุ :</span>

            <span>
              {" "}
              {calculateAge(claimData?.his?.patient?.birthdatetime).years ||
                "-"}{" "}
              ปี{" "}
              {calculateAge(claimData?.his?.patient?.birthdatetime).months ||
                "-"}{" "}
              เดือน
            </span>
          </p>

          <p className="flex items-center gap-2  text-sm">
            <span className="font-bold">อาชีพ :</span>

            <span>{claimData?.his?.patient?.occupationName || "-"}</span>
          </p>

          <p className="flex items-center gap-2  text-sm ">
            <span className="font-bold">โทรศัพท์มือถือ :</span>

            <span>{claimData?.his?.patient?.pat_address[0]?.phone || "-"}</span>
          </p>

          <p className="flex items-center gap-2  text-sm">
            <span className="font-bold">โทรศัพท์บ้าน :</span>

            <span>{claimData?.his?.patient?.tel || "-"}</span>
          </p>

          <p className="flex items-center gap-2  text-sm ">
            <span className="font-bold">อีเมล :</span>

            <span>{claimData?.his?.patient?.pat_address[0]?.email || "-"}</span>
          </p>

          <p className="flex items-center gap-2  text-sm col-span-2 ">
            <span className="font-bold">ที่อยู่ปัจจุบัน :</span>
            <span>
              {formatAddress(claimData?.his?.patient?.pat_address) || "-"}
            </span>
          </p>
        </div>

        {/* <div className="mt-3 ">
                      <p className="text-md font-bold">กรมธรรม์เลขที่ : </p>
                      <div className="flex gap-2 text-sm pl-4 space-y-4">
                        <p className="font-bold">
                          มีกรมธรรม์บริษัทประกันอื่น ๆ หรือไม่ :{" "}
                        </p>
                        <p>มี</p>
                        <div className="grid grid-cols-1 gap-2 ">
                          <div className="flex items-center gap-2  text-sm">
                            <p>
                              <span className="font-bold">1. บริษัท :</span>{" "}
                              <span>A company</span>{" "}
                            </p>

                            <p>
                              <span className="font-bold">
                                กรมธรรม์เลขที่ :
                              </span>{" "}
                              <span>A112457</span>
                            </p>
                          </div>
                          <div className="flex items-center gap-2  text-sm">
                            <p>
                              <span className="font-bold">2. บริษัท :</span>{" "}
                              <span>B company</span>
                            </p>

                            <p>
                              <span className="font-bold">
                                กรมธรรม์เลขที่ :
                              </span>{" "}
                              <span>B554123</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div> */}
      </section>

      <section className="p-6 rounded-xl border border-[#b0dddf] dark:border-divider bg-[#d8efef] dark:bg-[#0e0e11]">
        <h2 className="text-gray-800 dark:text-gray-100 font-bold text-lg flex items-center gap-3 mb-3">
          <span className="w-1.5 h-6 bg-[#27a59b]  dark:bg-violet-500 rounded-full"></span>
          For Hospital
        </h2>
        <div className="space-y-3">
          <h1 className="text-lg font-semibold">1.Vital Sign</h1>
          <div className="grid grid-cols-5 gap-2 ">
            <p className="flex items-center gap-2 bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126] rounded-md p-2 px-6">
              <span className="font-bold text-md">Visit date :</span>{" "}
              <span className="text-sm">
                {formatThaiDateNoTime(
                  claimData?.hospitalForm?.visit?.visitdatetime,
                ) || "-"}
              </span>
            </p>
            <p className="flex items-center gap-2 bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126] rounded-md p-2 px-6">
              <span className="font-bold text-md">Time :</span>{" "}
              <span className="text-sm">
                {`${formatTimeNoDate(claimData?.hospitalForm?.visit?.visitdatetime)} น.` ||
                  "-"}
              </span>
            </p>
            <p className="flex items-center gap-2 bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126] rounded-md p-2 px-6">
              <span className="font-bold text-md">Vital signs: T :</span>{" "}
              <span className="text-sm">
                {claimData?.hospitalForm?.vitalsign?.temperature
                  ? `${claimData.hospitalForm?.vitalsign.temperature} °C`
                  : "-"}
              </span>
            </p>
            <p className="flex items-center gap-2 bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126] rounded-md p-2 px-6">
              <span className="font-bold text-md">p :</span>{" "}
              <span className="text-sm">
                {" "}
                {claimData?.hospitalForm?.vitalsign?.pulse
                  ? `${claimData.hospitalForm?.vitalsign.pulse} bpm`
                  : "-"}
              </span>
            </p>
            <p className="flex items-center gap-2 bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126] rounded-md p-2 px-6">
              <span className="font-bold text-md">BP :</span>{" "}
              <span className="text-sm">
                {claimData?.hospitalForm?.vitalsign?.bp_systolic &&
                claimData?.hospitalForm?.vitalsign?.bp_diastolic
                  ? `${claimData?.hospitalForm.vitalsign.bp_systolic}/${claimData?.hospitalForm.vitalsign.bp_diastolic} mmHg`
                  : "-"}
              </span>
            </p>
          </div>
          <div className="-">
            <span className="font-bold text-lg ">
              2.Chief complaint and duration :
            </span>

            <div className="bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126] px-4 py-2 rounded-lg mt-2">
              <span className="text-sm w text-justify whitespace-pre-line">
                {claimData?.hospitalForm?.chiefComplaint || "-"}
              </span>
            </div>
          </div>
          <div className="-">
            <span className="font-bold text-md">
              3.Present illness or cause of injury :
            </span>
            <div className="bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126] px-4 py-2 rounded-lg mt-2">
              <span className="text-sm w text-justify whitespace-pre-line">
                {claimData?.hospitalForm?.presentIllness || "-"}
              </span>
            </div>
          </div>
          <div className="grid grid-cols-6 gap-2">
            <h1 className="col-span-6 font-bold text-md">
              4.An accident; Date of accident :
            </h1>
            <div className="col-span-2 bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126] px-4 py-2 rounded-lg">
              {" "}
              <span className="font-bold text-md">Date : </span>{" "}
              <span className="text-sm">
                {formatThaiDateNoTime(
                  claimData?.hospitalForm?.accidentDateTime,
                ) || "-"}
              </span>{" "}
              <span className="font-bold text-md">Time : </span>{" "}
              <span className="text-sm">
                {" "}
                {`${formatTimeNoDate(
                  claimData?.hospitalForm?.accidentDateTime,
                )} น.` || "-"}
              </span>
            </div>
            <div className="col-span-4 bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126] px-4 py-2 rounded-lg">
              <span className="font-bold text-md">Place :</span>
              <span className="text-sm">
                {" "}
                {claimData?.hospitalForm?.accidentPlace || "-"}
              </span>
            </div>
          </div>

          <p className="flex items-center gap-2 ">
            <span className="font-bold text-md">5.Physical exam :</span>
          </p>

          <p className="text-sm bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126] px-4 py-2 rounded-lg">
            {" "}
            {claimData?.hospitalForm?.physicalExam || "-"}
          </p>
          <p className="flex items-center gap-2 ">
            <span className="font-bold text-md">
              6.Previous treatment for this illness of injury (Date & Place):
            </span>
          </p>
          <p className="text-sm w-full bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126] px-4 py-2 rounded-lg">
            {" "}
            {claimData?.hospitalForm?.previousTx || "-"}
          </p>
          <div className="">
            <h1 className="font-bold text-md">
              7.Is the illness related to (please tick ☒ if yes) :
            </h1>{" "}
            <div className="px-4 py-2 bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126] rounded-lg mt-2 space-y-1">
              {sortedIds.map((item) => (
                <p className="text-sm" key={item.id}>
                  {item.id}. {item.type}
                </p>
              ))}
            </div>
          </div>
          <p className="font-bold text-md">8.Underlying condition :</p>
          <p className="text-sm bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126] px-4 py-2 rounded-lg">
            {claimData?.hospitalForm?.underlyingCondition || "-"}
          </p>
          <p className="font-bold text-md">9.Provisional diagnosis :</p>
          <p className="w-full text-sm bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126] px-4 py-2 rounded-lg">
            {claimData?.hospitalForm?.provisionalDx || "-"}
          </p>

          <p className="font-bold text-md">adjRW :</p>
          <p className="w-full text-sm bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126] px-4 py-2 rounded-lg">
            {claimData?.hospitalForm?.adjRW || "-"}
          </p>

          <h1 className="font-bold text-md">
            10.Investigation & Result(Lab, EKG, X - ray, etc) :
          </h1>
          <p className="w-full text-sm bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126] px-4 py-2 rounded-lg">
            {claimData?.hospitalForm?.investigations || "-"}
          </p>

          <p className="font-bold text-md">
            11.Can the condition be managed under Out Patient basis :
          </p>
          <p className="w-full text-sm bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126] px-4 py-2 rounded-lg">
            {claimData?.hospitalForm?.canManageOPD === "Y" ? "Yes" : "No"}
          </p>

          <h1 className="font-bold text-md">
            (If No please provide more information) :
          </h1>
          <p className="text-sm bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126] px-4 py-2 rounded-lg">
            {claimData?.hospitalForm?.manageOPDNote || "-"}
          </p>

          <h1 className="font-bold text-md">Reasons of admission :</h1>
          <p className="text-sm bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126] px-4 py-2 rounded-lg">
            {claimData?.hospitalForm?.reasonsOfAdmission || "-"}
          </p>

          <h1 className="font-bold text-md">12.Plan Of Treatment</h1>

          <p className="whitespace-pre-wrap text-sm bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126] px-4 py-2 rounded-lg ">
            {claimData?.hospitalForm?.planOfTreatment || "-"}
          </p>
        </div>
      </section>
    </div>
  );
}
