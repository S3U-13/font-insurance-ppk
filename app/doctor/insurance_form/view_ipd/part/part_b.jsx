"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/table";

export default function PartB({
  calculateAge,
  formatAddress,
  formatThaiDateNoTime,
  formatTimeNoDate,
  sortedIds,
  diagMap,
  operMap,
  pastHistoryMap,
  formatThaiDateTime,
  claimData,
  patient_name,
}) {
  return (
    <div className="space-y-4">
      <section className="border border-[#b0dddf] dark:border-divider bg-[#d8efef] dark:bg-[#0e0e11] p-4 rounded-lg space-y-2">
        <h2 className="text-gray-800 dark:text-gray-100 font-bold text-lg flex items-center gap-3 mb-2">
          <span className="w-1.5 h-6 bg-[#27a59b]  dark:bg-violet-500 rounded-full"></span>
          Medical certification
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 text-sm mt-3 bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126] rounded-lg px-4 py-4">
          <p>
            <strong>Patient's name:</strong> <span>{patient_name}</span>
          </p>
          <p>
            <strong>Sex:</strong>{" "}
            <span>{claimData?.his?.patient?.sexName}</span>
          </p>
          <p>
            <strong>Hn:</strong> <span>{claimData?.patientId}</span>
          </p>
          <p>
            <strong>An:</strong>
          </p>
          <p className="col-span-1 lg:col-span-2">
            <strong>Age:</strong>{" "}
            <span>
              {" "}
              {calculateAge(claimData?.his?.patient?.birthdatetime).years ||
                "-"}{" "}
              Year{" "}
              {calculateAge(claimData?.his?.patient?.birthdatetime).months ||
                "-"}{" "}
              Month
            </span>
          </p>

          <p>
            <strong>Admission Date:</strong>{" "}
          </p>
          <p>
            <strong>Time:</strong>{" "}
          </p>
          <p>
            <strong>Discharge Date:</strong>{" "}
          </p>
          <p>
            <strong>Time:</strong>{" "}
          </p>
          <p>
            <strong>Consultation Date:</strong>{" "}
          </p>
        </div>
      </section>
      <section className="border border-[#b0dddf] dark:border-divider bg-[#d8efef] dark:bg-[#0e0e11] p-4 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-2">
        <div className="space-y-2 bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126] rounded-lg p-4">
          <h1 className="text-lg font-semibold">1.For Illness</h1>
          <div className="text-sm space-y-2">
            {" "}
            <p>
              <strong>
                a Date you first saw this patient for this illness:
              </strong>{" "}
              <span>
                {formatThaiDateTime(claimData?.partB?.data?.firstSeenDate)}
              </span>
            </p>
            <p>
              <strong>b Chief complaint and duration of symptom(s):</strong>{" "}
              <span>{claimData?.partB?.data?.firstSeenComplaint ?? "-"}</span>
            </p>
          </div>
        </div>
        <div className="space-y-2 bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126] rounded-lg p-4">
          <h1 className="text-lg font-semibold">2.For Injury</h1>
          <div className="text-sm space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <p>
                <strong>a Date of injury:</strong>{" "}
                <span>
                  {formatThaiDateNoTime(claimData?.partB?.data?.injuryDate)}
                </span>
              </p>
              <p>
                <strong>Time:</strong>{" "}
                <span>
                  {formatTimeNoDate(claimData?.partB?.data?.injuryDate)}
                </span>
              </p>
            </div>

            <p>
              <strong>b Cause of injury:</strong>{" "}
              <span>{claimData?.partB?.data?.injuryCause ?? "-"}</span>
            </p>
            <p>
              <strong>c Details of injury:</strong>{" "}
              <span>{claimData?.partB?.data?.injuryDetails ?? "-"}</span>
            </p>
            <p>
              <strong>d Did you smell alcohol from the patient:</strong>{" "}
              <span>
                {claimData?.partB?.data?.injurySmellAlcohol === "Y"
                  ? "Yes"
                  : claimData?.partB?.data?.injurySmellAlcohol === "N"
                    ? "No"
                    : claimData?.partB?.data?.injurySmellAlcohol === "NK"
                      ? "Not Know"
                      : null}
              </span>
            </p>
            <p>
              <strong> blood alcohol test (if any):</strong>{" "}
              <span>
                {`${claimData?.partB?.data?.injuryBloodAlcoholMg} mg%` || "-"}
              </span>
            </p>
            <p>
              <strong>e Level of consciousness:</strong>{" "}
              <span>{claimData?.partB?.data?.injuryConsciousness ?? "-"}</span>
            </p>
            <p>
              <strong>f Estimated time for recovery:</strong>{" "}
              <span>
                {claimData?.partB?.data?.injuryEstimatedRecovery ?? "-"}
              </span>
            </p>
          </div>
        </div>
      </section>
      <section className="border border-[#b0dddf] dark:border-divider bg-[#d8efef] dark:bg-[#0e0e11] p-4 rounded-lg space-y-2">
        <div className="space-y-2">
          <h1 className="text-lg font-semibold">
            3.Did the patient need to be admitted to hospital?
          </h1>
          <p className="text-sm bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126] px-4 py-2 rounded-md">
            <strong>Yes, indication for admission:</strong>{" "}
            <span>
              {" "}
              {claimData?.partB?.data?.needAdmission === "Y" ? "Yes" : "No"}
            </span>
          </p>
        </div>
        <h1 className="text-lg font-semibold">4.Vital Sign</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-2 py-2">
          <p className="flex items-center gap-2 bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126] rounded-md p-2 px-6">
            <span className="font-bold text-sm">Visit date :</span>{" "}
            <span className="text-sm">
              {formatThaiDateNoTime(
                claimData?.hospitalForm?.visit?.visitdatetime,
              ) || "-"}
            </span>
          </p>
          <p className="flex items-center gap-2 bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126] rounded-md p-2 px-6">
            <span className="font-bold text-sm">Time :</span>{" "}
            <span className="text-sm">
              {`${formatTimeNoDate(claimData?.hospitalForm?.visit?.visitdatetime)} น.` ||
                "-"}
            </span>
          </p>
          <p className="flex items-center gap-2 bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126] rounded-md p-2 px-6">
            <span className="font-bold text-sm">Vital signs: T :</span>{" "}
            <span className="text-sm">
              {claimData?.hospitalForm?.vitalsign?.temperature
                ? `${claimData.hospitalForm?.vitalsign.temperature} °C`
                : "-"}
            </span>
          </p>
          <p className="flex items-center gap-2 bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126] rounded-md p-2 px-6">
            <span className="font-bold text-sm">p :</span>{" "}
            <span className="text-sm">
              {" "}
              {claimData?.hospitalForm?.vitalsign?.pulse
                ? `${claimData.hospitalForm?.vitalsign.pulse} bpm`
                : "-"}
            </span>
          </p>
          <p className="flex items-center gap-2 bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126] rounded-md p-2 px-6">
            <span className="font-bold text-sm">BP :</span>{" "}
            <span className="text-sm">
              {claimData?.hospitalForm?.vitalsign?.bp_systolic &&
              claimData?.hospitalForm?.vitalsign?.bp_diastolic
                ? `${claimData?.hospitalForm.vitalsign.bp_systolic}/${claimData?.hospitalForm.vitalsign.bp_diastolic} mmHg`
                : "-"}
            </span>
          </p>
        </div>
        <div className="space-y-2">
          <h1 className="text-lg font-semibold">
            5.Pertinent Clinical findings (Symptoms & Sign)
          </h1>
          <p className="text-sm bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126] px-4 py-2 rounded-lg">
            {claimData?.partB?.data?.clinicalFindings ?? "-"}
          </p>
        </div>
        <div className="space-y-2">
          <h1 className="text-lg font-semibold">
            6.Investigation & Result(Lab, EKG, X-ray, etc)
          </h1>
          <p className="text-sm bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126] px-4 py-2 rounded-lg">
            {claimData?.partB?.data?.investigations ?? "-"}
          </p>
        </div>
        <div className="space-y-2">
          <h1 className="text-lg font-semibold">7.HIV Test </h1>
          <p className="text-sm bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126] px-4 py-2 rounded-lg">
            {" "}
            <span>
              {claimData?.partB?.data?.hivTestDone === "Y" ? "Yes" : "No"}
            </span>
          </p>
          <p className="text-sm bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126] px-4 py-2 rounded-lg">
            <strong>Result : </strong>
            {""}
            <span>{claimData?.partB?.data?.hivResult ?? "-"}</span>
          </p>
        </div>
        <div className="space-y-2">
          <h1 className="text-lg font-semibold">8.Underlying disease: </h1>
          <p className="text-sm bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126] px-4 py-2 rounded-lg">
            {claimData?.partB?.data?.underlyingDisease ?? "-"}
          </p>
        </div>
        <div className="space-y-3">
          <h1 className="text-lg font-semibold">9.Diagnosis : </h1>
          <Table>
            <TableHeader>
              <TableColumn>Diagnosis</TableColumn>
              <TableColumn className="text-center">ICD10-TM</TableColumn>
            </TableHeader>
            <TableBody emptyContent={"ไม่มีข้อมูล"}>
              {diagMap?.map((d) => (
                <TableRow key={d.refId}>
                  <TableCell>{d.detail}</TableCell>
                  <TableCell className="text-center">{d.code}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="space-y-2">
          <h1 className="text-lg font-semibold">10.Treatment : </h1>
          <p className="text-sm bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126] px-4 py-2 rounded-lg">
            {claimData?.partB?.data?.treatment ?? "-"}
          </p>
        </div>
        <div className="space-y-3">
          <h1 className="text-lg font-semibold">11.Surgery/Operation : </h1>
          {operMap.length > 0 ? (
            operMap.map((o) => (
              <div
                className="flex item-center gap-2 text-sm bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126] px-4 py-2 rounded-lg"
                key={o?.opernoteId}
              >
                <p>
                  <strong>Surgery/Operation:</strong> <span>{o?.postopdx}</span>
                </p>{" "}
                <p>
                  <strong>ICD9-CM:</strong> <span>{o?.code}</span>
                </p>{" "}
                <p>
                  <strong>Date performed:</strong>{" "}
                  <span>{o?.editdatetime}</span>
                </p>
              </div>
            ))
          ) : (
            <div>
              <p className="text-sm text-center bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126] px-4 py-2 rounded-lg">
                ไม่มีข้อมูล Surgery/Operation
              </p>
            </div>
          )}
        </div>
        <div className="flex gap-2 bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126] px-4 py-2 rounded-lg">
          <p>
            <strong>Anaesthesia :</strong>{" "}
            <span>{claimData?.partB?.data?.anaesthesiaType ?? "-"}</span>
          </p>
          {claimData?.partB?.data?.anaesthesiaType === "Others" && (
            <p>
              :{" "}
              <span>
                {claimData?.partB?.data?.anaesthesiaTypeOthers ?? "-"}
              </span>
            </p>
          )}
        </div>
        <div className="space-y-2">
          <h1 className="text-lg font-semibold">12.Pathological report : </h1>
          <p className="text-sm bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126] px-4 py-2 rounded-lg">
            {claimData?.partB?.data?.pathological_report ?? "-"}
          </p>
        </div>
        <div className="space-y-2">
          <h1 className="text-lg font-semibold">
            13.Complications (if any) :{" "}
          </h1>
          <p className="text-sm bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126] px-4 py-2 rounded-lg">
            {claimData?.partB?.data?.complications ?? "-"}
          </p>
        </div>
        <div className="space-y-2">
          <h1 className="text-lg font-semibold">
            14.Is the illness related to alcohol, drug abuse or addiction
          </h1>
          <div className="flex items-center gap-2 text-sm bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126] px-4 py-2 rounded-lg">
            <p>
              {claimData?.partB?.data?.relatedToAlcoholDrug === "Y"
                ? "Yes"
                : "No"}
            </p>
            <p>
              <strong>please specify :</strong>{" "}
              {claimData?.partB?.data?.detailRelatedToAlcoholDrug ?? "-"}
            </p>
          </div>
        </div>
        <div className="space-y-2">
          <h1 className="text-lg font-semibold">15.For female </h1>
          <div className="space-y-2">
            <div className="flex gap-2 text-sm bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126] px-4 py-2 rounded-lg">
              <p>
                <strong>Is the patient pregnant:</strong>{" "}
                {claimData?.partB?.data?.isPregnant === "Y" ? "Yes" : "No"}
              </p>
              {claimData?.partB?.data?.isPregnant === "Y" && (
                <p>
                  <strong> gestational age :</strong>{" "}
                  <span>
                    {" "}
                    {claimData?.partB?.data?.gestationalAgeWeeks ?? "-"}
                  </span>{" "}
                  weeks
                </p>
              )}
            </div>
            <div className="flex gap-2 text-sm bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126] px-4 py-2 rounded-lg">
              <p>
                <strong>Was the treatment related to infertility:</strong>{" "}
                <span>
                  {" "}
                  {claimData?.partB?.data?.relatedToInfertility == "Y"
                    ? "Yes"
                    : "No"}
                </span>
              </p>
              {claimData?.partB?.data?.relatedToInfertility == "Y" && (
                <p>
                  <strong> please specify:</strong>{" "}
                  <span>
                    {" "}
                    {claimData?.partB?.data?.detailRelatedToInfertility ??
                      "-"}{" "}
                  </span>
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <h1 className="text-lg font-semibold">
            16.Has patient ever been treatment by another doctor before :
          </h1>
          <div className="flex items-center gap-2 text-sm bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126] px-4 py-2 rounded-lg">
            <span>
              {" "}
              {claimData?.partB?.data?.treatedByOtherDoctor === "Y"
                ? "Yes"
                : "No"}
            </span>
            {claimData?.partB?.data?.treatedByOtherDoctor === "Y" && (
              <>
                <strong> please give name and address</strong>{" "}
                {claimData?.partB?.data?.otherDoctorName ?? "-"} address{" "}
                {claimData?.partB?.data?.otherDoctorAddress ?? "-"}
              </>
            )}
          </div>
        </div>
        <div className="space-y-2">
          <h1 className="text-lg font-semibold">
            17.Was the illness/injury contributed to or influenced by any of the
            following :
          </h1>
          <div className="text-sm bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126] px-4 py-2 rounded-lg space-y-2">
            <p>
              <strong> a Physical defects/congenital anomaly:</strong>{" "}
              <span>
                {claimData?.partB?.data?.hasPhysicalDefect === "Y"
                  ? "Yes"
                  : "No"}
              </span>
            </p>
            <p>
              <strong>b Degenerative change:</strong>{" "}
              <span>
                {claimData?.partB?.data?.hasDegeneration === "Y" ? "Yes" : "No"}
              </span>
            </p>
          </div>
        </div>
        <div className="space-y-3">
          <h1 className="text-lg font-semibold">
            18.Others past medical history :
          </h1>
          <Table>
            <TableHeader>
              <TableColumn>Date</TableColumn>
              <TableColumn>Sign & Symptoms</TableColumn>
              <TableColumn>Diagnosis</TableColumn>
              <TableColumn>treatment</TableColumn>
              <TableColumn>Hospital</TableColumn>
            </TableHeader>
            <TableBody emptyContent={"ไม่มีข้อมูล"}>
              {pastHistoryMap.map((i) => (
                <TableRow key={i.id}>
                  <TableCell>{formatThaiDateNoTime(i.itemDate)}</TableCell>
                  <TableCell>{i.signsAndSymptoms}</TableCell>
                  <TableCell>{i.diagnosis}</TableCell>
                  <TableCell>{i.treatment}</TableCell>
                  <TableCell>{i.hospital}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="space-y-2">
          <h1 className="text-lg font-semibold">
            19.Others comments about the injury / illness :{" "}
          </h1>
          <p className="text-sm bg-[#edf7f7] dark:bg-[#212126] border border-[#b0dddf] dark:border-[#212126] p-4 rounded-lg">
            {claimData?.partB?.data?.otherComments ?? "-"}
          </p>
        </div>
      </section>
    </div>
  );
}
