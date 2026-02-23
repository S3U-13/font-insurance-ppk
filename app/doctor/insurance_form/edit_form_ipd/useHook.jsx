"use client";
import React, { useEffect, useState, useRef, useMemo } from "react";
import { useApiRequest } from "@/hooks/useApi";
import { useForm, useStore } from "@tanstack/react-form";
import {
  CalendarDate,
  Time,
  today,
  parseDate,
  parseTime,
  getLocalTimeZone,
  toCalendarDate,
} from "@internationalized/date";

import * as z from "zod";
import { addToast } from "@heroui/toast";
import { useAuth } from "@/context/AuthContext";

// export const parseISOToDateTime = (iso) => {
//   if (!iso) return null;

//   const d = new Date(iso);
//   if (isNaN(d)) return null;

//   return {
//     date: new CalendarDate(
//       d.getUTCFullYear(),
//       d.getUTCMonth() + 1,
//       d.getUTCDate(),
//     ),
//     time: new Time(d.getUTCHours(), d.getUTCMinutes()),
//   };
// };

export default function useHook({
  onClose,
  claimData,
  selectID,
  isOpen,
  setClaimData,
  claimId,
}) {
  const [choice1, setChoice1] = useState([
    {
      id: 1,
      value: "มี",
    },
    {
      id: 2,
      value: "ไม่มี",
    },
  ]);
  const [sick, setSick] = useState([
    {
      id: 1,
      value: "เจ็บป่วย",
    },
    {
      id: 2,
      value: "บาดเจ็บ",
    },
  ]);
  const [everOrNever, setEverOrNever] = useState([
    {
      id: 1,
      value: "ไม่เคยรักษา",
    },
    {
      id: 2,
      value: "เคยรักษา",
    },
  ]);

  const [choice3, setChoice3] = useState([
    {
      id: 1,
      value: "N",
      name: "No",
    },
    {
      id: 2,
      value: "NK",
      name: "Not Know",
    },
    {
      id: 3,
      value: "Y",
      name: "Yes",
    },
  ]);
  const [choice4, setChoice4] = useState([
    {
      id: 1,
      value: "Normal",
    },
    {
      id: 2,
      value: "Confusion",
    },
    {
      id: 3,
      value: "Drowsiness",
    },
    {
      id: 4,
      value: "Semi-coma",
    },
    {
      id: 5,
      value: "Coma",
    },
  ]);
  const [Anaesthesia, setAnaesthesia] = useState([
    {
      id: 1,
      value: "General Anaesthesia",
    },
    {
      id: 2,
      value: "Spinal Anaesthesia",
    },
    {
      id: 3,
      value: "Local Anaesthesia",
    },
    {
      id: 4,
      value: "Others",
    },
  ]);
  const [choice5, setChoice5] = useState([
    {
      id: 1,
      value: "a) Physical defects/congenital anomaly",
    },
    {
      id: 2,
      value: "b) Degenerative change(s)",
    },
  ]);

  const [selectTabs, setSelectTabs] = useState(1);

  const handleSelectTabs = (id) => {
    setSelectTabs(id);
  };

  const { user } = useAuth();
  const [openSignDoctor, setOpenSignDoctor] = useState(false);
  const [signatureDoctor, setSignatureDoctor] = useState(null);
  const modalRef = useRef();
  const [sex, setSex] = useState([
    {
      id: 1,
      value: 1,
      name: "ชาย",
    },
    {
      id: 2,
      value: 2,
      name: "หญิง",
    },
  ]);
  const noOrYes = [
    {
      id: 1,
      value: "N",
      name: "No",
    },
    {
      id: 2,
      value: "Y",
      name: "Yes",
    },
  ];
  const [choice2, setChoice2] = useState([
    {
      id: 1,
      value:
        "Pregnancy / Childbirth / Infertility / Caesarean section / Miscarriage",
    },
    {
      id: 2,
      value: "Congenital / Hereditary disease",
    },
    {
      id: 3,
      value: "Nervous / Mental / Emotional / Sleeping disorder",
    },
    {
      id: 4,
      value: "Influence of Drugs / Alcohol",
    },
    {
      id: 5,
      value: "Cosmetic reason / Dental care / Refractive errors correction",
    },
    {
      id: 6,
      value: "AIDS",
    },
  ]);

  const signatureCheck = [
    {
      id: 1,
      value: "ใช้",
    },
    {
      id: 2,
      value: "ไม่ใช้",
    },
  ];

  const yesOrNo = [
    {
      id: 1,
      value: "Y",
      name: "Yes",
    },
    {
      id: 2,
      value: "N",
      name: "No",
    },
  ];

  const { EditOrderInsurancePartA, EditOrderInsurancePartB } = useApiRequest();

  const partAField = () => ({
    patientId: null,
    claimId: null,
    visitid: null,
    vitalsignId: null,
    chiefComplaint: "",
    presentIllness: "",
    physicalExam: "",
    accidentDateTime: null,
    accidentPlace: "",
    previousTx: "",
    provisionalDx: "",
    underlyingCondition: "",
    diagnosis: "",
    adjRW: "",
    treatment: "",
    planOfTreatment: "",
    investigations: "",
    relatedConditions: [],
    datetimeForm: null,
    canManageOPD: "",
    manageOPDNote: "",
    reasonsOfAdmission: "",
  });

  const partBField = () => ({
    firstSeenDate: null,
    firstSeenComplaint: "",

    injuryDate: null,
    injuryCause: "",
    injuryDetails: "",
    injurySmellAlcohol: "",
    injuryBloodAlcoholMg: null,
    injuryConsciousness: "",
    injuryEstimatedRecovery: "",

    needAdmission: "",
    indicationForAdmission: "",
    clinicalFindings: "",
    investigations: "",
    hivTestDone: "",
    hivResult: "",

    underlyingDisease: "",
    treatment: "",
    anaesthesiaType: "",
    anaesthesiaTypeOthers: "",
    pathological_report: "",
    complications: "",

    relatedToAlcoholDrug: "",
    detailRelatedToAlcoholDrug: "",

    isPregnant: "",
    gestationalAgeWeeks: null,

    relatedToInfertility: "",
    detailRelatedToInfertility: "",

    treatedByOtherDoctor: "",

    otherDoctorName: "",
    otherDoctorAddress: "",

    hasPhysicalDefect: "",
    hasDegeneration: "",

    otherPastHistoryNote: "",
    otherComments: "",

    pastHistoryItems: [],

    selections: [],

    dateTimeClaimBForm: null,
  });

  const [field, setField] = useState({
    partA: partAField(),
    partB: partBField(),
  });

  const hosClaimId = selectID;

  const [relatedConditions, setRelatedConditions] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // อัปเดต field
    setField((prev) => ({
      ...prev,
      [name]: value,
    }));

    form.setValue(name, value);

    // 🟣 จัดเรียงและตั้งค่าลงฟอร์มจาก state ล่าสุด
    setRelatedConditions((prev) => {
      const sorted = [...prev].sort((a, b) => a - b);
      form.setFieldValue("relatedConditions", sorted);
      return sorted;
    });
  };
  const steps = ["1", "2"];
  const [activeStep, setActiveStep] = useState("1");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleSubmit = async (value) => {
    if (isSubmitting) return;

    setIsSubmitting(true); // ✅ สำคัญมาก

    try {
      let data;
      const [partA, partB] = await Promise.all([
        EditOrderInsurancePartA(value.partA, hosClaimId),
        EditOrderInsurancePartB(value.partB, claimId),
      ]);
      data = { partA, partB };
      // setPatData(null);

      if (data) {
        addToast({
          title: "สำเร็จ",
          description: "เเก้ไขข้อมูลสำเร็จ",
          color: "success",
          variant: "flat",
          promise: new Promise((resolve) =>
            setTimeout(() => {
              setLoading(false);
              resolve(true);
            }, 1500),
          ),
        });
      } else if (!data) {
        addToast({
          title: "ผิดพลาด",
          description: "ไม่สามารถเเก้ไขข้อมูลได้",
          color: "danger",
          variant: "flat",
        });
      }
      onClose();
      form.reset();
      setActiveStep("1");
      resetDateTimeFields();
    } catch (err) {
      console.error("handleSubmit error:", err);

      addToast({
        title: "error",
        description: "error",
        color: "danger",
        variant: "flat",
      });
    } finally {
      setIsSubmitting(false); // ✅ ปลดล็อกเสมอ
    }
  };

  const defaultValues = {
    partA: partAField(),
    partB: partBField(),
  };

  const partASchema = z.object({
    patientId: z.coerce.number().nullable(),
    claimId: z.coerce.number().nullable(),
    visitid: z.coerce.number().nullable(),
    vitalsignId: z.coerce.number().nullable(),
    chiefComplaint: z.string().optional(),
    presentIllness: z.string().optional(),
    physicalExam: z.string().optional(),
    accidentDateTime: z.string().nullable(),
    accidentPlace: z.string().optional(),
    previousTx: z.string().optional(),
    provisionalDx: z.string().optional(),
    underlyingCondition: z.string().optional(),
    diagnosis: z.string().optional(),
    adjRW: z.string().optional(),
    treatment: z.string().optional(),
    planOfTreatment: z.string().optional(),
    investigations: z.string().optional(),
    relatedConditions: z.array(z.coerce.number()).nullable(),
    datetimeForm: z.string().nullable(),
    canManageOPD: z.string().optional(),
    manageOPDNote: z.string().optional(),
    reasonsOfAdmission: z.string().optional(),
  });

  const partBSchema = z.object({
    firstSeenDate: z.string().nullable(),
    firstSeenComplaint: z.string().optional(),

    injuryDate: z.string().nullable(),
    injuryCause: z.string().optional(),
    injuryDetails: z.string().optional(),
    injurySmellAlcohol: z.string().optional(),
    injuryBloodAlcoholMg: z.number().nullable(),
    injuryConsciousness: z.string().optional(),
    injuryEstimatedRecovery: z.string().optional(),

    needAdmission: z.string().optional(),
    indicationForAdmission: z.string().optional(),
    clinicalFindings: z.string().optional(),
    investigations: z.string().optional(),
    hivTestDone: z.string().optional(),
    hivResult: z.string().optional(),

    underlyingDisease: z.string().optional(),
    treatment: z.string().optional(),
    anaesthesiaType: z.string().optional(),
    anaesthesiaTypeOthers: z.string().optional(),
    pathological_report: z.string().optional(),
    complications: z.string().optional(),

    relatedToAlcoholDrug: z.string().optional(),
    detailRelatedToAlcoholDrug: z.string().optional(),

    isPregnant: z.string().optional(),
    gestationalAgeWeeks: z.coerce.number().nullable(),

    relatedToInfertility: z.string().optional(),
    detailRelatedToInfertility: z.string().optional(),

    treatedByOtherDoctor: z.string().optional(),
    otherDoctorName: z.string().optional(),
    otherDoctorAddress: z.string().optional(),

    hasPhysicalDefect: z.string().optional(),
    hasDegeneration: z.string().optional(),

    otherPastHistoryNote: z.string().optional(),
    otherComments: z.string().optional(),

    pastHistoryItems: z.array(
      z.object({
        itemDate: z.string().nullable(),
        signsAndSymptoms: z.string().optional(),
        diagnosis: z.string().optional(),
        treatment: z.string().optional(),
        hospital: z.string().optional(),
      }),
    ),
    selections: z.array(
      z.object({
        itemType: z.string(),
        itemId: z.string(),
      }),
    ),
    dateTimeClaimBForm: z.string().nullable(),
  });

  const validationSchema = z.object({
    partA: partASchema,
    partB: partBSchema,
  });

  const form = useForm({
    defaultValues,
    onSubmit: async ({ value }) => {
      try {
        const validatedData = validationSchema.parse(value);
        await handleSubmit(validatedData);
      } catch (error) {
        console.error("Validation of Submit error:", error);

        if (error.errors) {
          console.table(error.errors);
        }
      }
    },
  });

  const CanManageOPD = useStore(
    form.store,
    (state) => state.values.partA.canManageOPD,
  );
  useEffect(() => {
    if (CanManageOPD !== "N" && activeStep === "2") {
      setActiveStep("1");
    }
  }, [CanManageOPD]);

  const parseDateTable = (iso) => {
    if (!iso) return null;
    const d = new Date(iso);
    return new CalendarDate(
      d.getUTCFullYear(),
      d.getUTCMonth() + 1,
      d.getUTCDate(),
    );
  };

  useEffect(() => {
    const items = claimData?.partB?.data?.pastHistoryItems;
    if (!items) return;

    const mapped = items.map((i) => ({
      id: i.id, // 🔥 สำคัญมาก ใช้เป็น key
      itemDate: i.itemDate ?? null, // ✅ string
      signsAndSymptoms: i.signsAndSymptoms ?? "",
      diagnosis: i.diagnosis ?? "",
      treatment: i.treatment ?? "",
      hospital: i.hospital ?? "",
    }));

    form.setFieldValue("partB.pastHistoryItems", mapped);
  }, [claimData]);

  const addPastHistoryRow = () => {
    const current = form.getFieldValue("partB.pastHistoryItems") ?? [];

    form.setFieldValue("partB.pastHistoryItems", [
      ...current,
      {
        itemDate: null,
        signsAndSymptoms: "",
        diagnosis: "",
        treatment: "",
        hospital: "",
      },
    ]);
  };

  const removePastHistoryRow = (index) => {
    const current = form.getFieldValue("partB.pastHistoryItems") ?? [];

    form.setFieldValue(
      "partB.pastHistoryItems",
      current.filter((_, i) => i !== index),
    );
  };

  const rowCount = useStore(
    form.store,
    (state) => state.values.partB?.pastHistoryItems?.length ?? 0,
  );

  const rows = Array.from({ length: rowCount });

  // รวม Date + Time → ISO8601
  const buildISO = (d, t = null) => {
    if (!d) return null;

    const year = d.year;
    const month = String(d.month).padStart(2, "0");
    const day = String(d.day).padStart(2, "0");

    const hour = String(t?.hour ?? 0).padStart(2, "0");
    const minute = String(t?.minute ?? 0).padStart(2, "0");

    return `${year}-${month}-${day}T${hour}:${minute}:00Z`;
  };

  const payload = {
    ...form.state.values,
    partB: {
      ...form.state.values.partB,
      pastHistoryItems: form.state.values.partB.pastHistoryItems?.map((i) => ({
        ...i,
        itemDate: buildISO(i.itemDate),
      })),
    },
  };

  partBSchema.parse(payload.partB);

  // อัปเดตฟอร์มเมื่อเลือกวันที่
  // const getParsed = (field) => {
  //   const iso = form.getFieldValue(field);
  //   return parseISOToDateTime(iso); // { date, time } | null
  // };

  // const updateDate = (field, date) => {
  //   const parsed = getParsed(field);
  //   const time = parsed?.time ?? new Time(0, 0);
  //   if (!date) return;

  //   const iso = buildISO(date, time);
  //   if (iso) form.setFieldValue(field, iso);
  // };

  // const updateTime = (field, time) => {
  //   const parsed = getParsed(field);
  //   const date = parsed?.date;
  //   if (!date || !time) return;

  //   const iso = buildISO(date, time);
  //   if (iso) form.setFieldValue(field, iso);
  // };

  useEffect(() => {
    if (!claimData) return;

    form.setFieldValue(
      "partA.accidentDateTime",
      claimData?.hospitalForm?.accidentDateTime,
    );

    form.setFieldValue(
      "partB.firstSeenDate",
      claimData?.partB?.data?.firstSeenDate,
    );

    form.setFieldValue("partB.injuryDate", claimData?.partB?.data?.injuryDate);
  }, [claimData]);

  const parseISOToUTC = (iso) => {
    if (!iso) return { date: null, time: null };

    const d = new Date(iso);

    const dateStr = `${d.getUTCFullYear()}-${String(
      d.getUTCMonth() + 1,
    ).padStart(2, "0")}-${String(d.getUTCDate()).padStart(2, "0")}`;

    const timeStr = `${String(d.getUTCHours()).padStart(2, "0")}:${String(
      d.getUTCMinutes(),
    ).padStart(2, "0")}`;

    return {
      date: parseDate(dateStr), // ✅ ต้องเป็น object ของ lib
      time: parseTime(timeStr), // ✅ ต้องเป็น object ของ lib
    };
  };

  const combineDateTimeUTC = (date, time) => {
    if (!date || !time) return null;

    const utc = Date.UTC(
      date.year,
      date.month - 1,
      date.day,
      time.hour,
      time.minute,
      0,
    );

    return new Date(utc).toISOString();
  };
  // ทำ hook จัดการ

  const useDateTimeField = (form, fieldName) => {
    const value = useStore(form.store, (state) => {
      const keys = fieldName.split(".");
      let current = state.values;

      for (let k of keys) {
        current = current?.[k];
      }

      return current;
    });

    const [date, setDate] = useState(null);
    const [time, setTime] = useState(null);

    // ✅ parse จาก form → state (ใช้ UTC)
    useEffect(() => {
      if (!value) {
        setDate(null);
        setTime(null);
        return;
      }

      const parsed = parseISOToUTC(value); // 🔥 แก้ตรงนี้
      setDate(parsed.date);
      setTime(parsed.time);
    }, [value]);

    // ✅ update form
    const update = (newDate, newTime) => {
      const finalDate = newDate ?? date;
      const finalTime = newTime ?? time;

      if (!finalDate || !finalTime) return;

      const iso = combineDateTimeUTC(finalDate, finalTime); // 🔥 แก้ตรงนี้
      form.setFieldValue(fieldName, iso);
    };

    const onDateChange = (d) => {
      setDate(d);
      update(d, null);
    };

    const onTimeChange = (t) => {
      setTime(t);
      update(null, t);
    };

    const reset = () => {
      setDate(null);
      setTime(null);
      form.setFieldValue(fieldName, null);
    };

    return { date, time, reset, onDateChange, onTimeChange };
  };

  // กำหนด ตัวเเปรร ของ field วันที่ เเละ เวลา

  const accident = useDateTimeField(form, "partA.accidentDateTime");
  const firstSeen = useDateTimeField(form, "partB.firstSeenDate");
  const injuryDate = useDateTimeField(form, "partB.injuryDate");

  const resetDateTimeFields = () => {
    accident.reset();
    firstSeen.reset();
    injuryDate.reset();

    form.setFieldValue("partA.accidentDateTime", null);
    form.setFieldValue("partB.firstSeenDate", null);
    form.setFieldValue("partB.injuryDate", null);
  };

  useEffect(() => {
    if (!claimData) return;

    form.setFieldValue("partA.patientId", claimData?.patientId || null);
    form.setFieldValue("partA.visitid", claimData?.visitId || null);
    form.setFieldValue(
      "partA.vitalsignId",
      claimData?.hospitalForm?.vitalsignId || "",
    );
    form.setFieldValue(
      "partA.chiefComplaint",
      claimData?.hospitalForm?.chiefComplaint || "",
    );
    form.setFieldValue(
      "partA.presentIllness",
      claimData?.hospitalForm?.presentIllness || "",
    );
    form.setFieldValue(
      "partA.accidentPlace",
      claimData?.hospitalForm?.accidentPlace || "",
    );
    form.setFieldValue(
      "partA.physicalExam",
      claimData?.hospitalForm?.physicalExam || "",
    );
    form.setFieldValue(
      "partA.previousTx",
      claimData?.hospitalForm?.previousTx || "",
    );
    form.setFieldValue(
      "partA.relatedConditions",
      claimData?.hospitalForm?.relatedConditionIds
        ? claimData.hospitalForm.relatedConditionIds.map(String)
        : [],
    );
    form.setFieldValue(
      "partA.underlyingCondition",
      claimData?.hospitalForm?.underlyingCondition || "",
    );

    form.setFieldValue("partA.claimId", claimData.id || "");
    form.setFieldValue(
      "partA.provisionalDx",
      claimData?.hospitalForm?.provisionalDx || "",
    );
    form.setFieldValue("partA.adjRW", claimData?.hospitalForm?.adjRW || "");
    form.setFieldValue(
      "partA.investigations",
      claimData?.hospitalForm?.investigations || "",
    );
    form.setFieldValue(
      "partA.canManageOPD",
      claimData?.hospitalForm?.canManageOPD || "",
    );
    form.setFieldValue(
      "partA.manageOPDNote",
      claimData?.hospitalForm?.manageOPDNote || "",
    );
    form.setFieldValue(
      "partA.reasonsOfAdmission",
      claimData?.hospitalForm?.reasonsOfAdmission || "",
    );
    form.setFieldValue(
      "partA.planOfTreatment",
      claimData?.hospitalForm?.planOfTreatment || "",
    );
    form.setFieldValue(
      "partB.firstSeenComplaint",
      claimData?.partB?.data?.firstSeenComplaint || "",
    );
    form.setFieldValue(
      "partB.injuryCause",
      claimData?.partB?.data?.injuryCause || "",
    );
    form.setFieldValue(
      "partB.injuryDetails",
      claimData?.partB?.data?.injuryDetails || "",
    );
    form.setFieldValue(
      "partB.injurySmellAlcohol",
      claimData?.partB?.data?.injurySmellAlcohol || "",
    );
    form.setFieldValue(
      "partB.injuryBloodAlcoholMg",
      Number(claimData?.partB?.data?.injuryBloodAlcoholMg) ?? "",
    );
    form.setFieldValue(
      "partB.injuryConsciousness",
      claimData?.partB?.data?.injuryConsciousness || "",
    );
    form.setFieldValue(
      "partB.injuryEstimatedRecovery",
      claimData?.partB?.data?.injuryEstimatedRecovery || "",
    );
    form.setFieldValue(
      "partB.needAdmission",
      claimData?.partB?.data?.needAdmission || "",
    );
    form.setFieldValue(
      "partB.indicationForAdmission",
      claimData?.partB?.data?.indicationForAdmission || "",
    );
    form.setFieldValue(
      "partB.clinicalFindings",
      claimData?.partB?.data?.clinicalFindings || "",
    );
    form.setFieldValue(
      "partB.investigations",
      claimData?.partB?.data?.investigations || "",
    );
    form.setFieldValue(
      "partB.hivTestDone",
      claimData?.partB?.data?.hivTestDone || "",
    );
    form.setFieldValue(
      "partB.hivResult",
      claimData?.partB?.data?.hivResult || "",
    );
    form.setFieldValue(
      "partB.underlyingDisease",
      claimData?.partB?.data?.underlyingDisease || "",
    );
    form.setFieldValue(
      "partB.treatment",
      claimData?.partB?.data?.treatment || "",
    );
    form.setFieldValue(
      "partB.anaesthesiaType",
      claimData?.partB?.data?.anaesthesiaType || "",
    );
    form.setFieldValue(
      "partB.anaesthesiaTypeOthers",
      claimData?.partB?.data?.anaesthesiaTypeOthers || "",
    );
    form.setFieldValue(
      "partB.pathological_report",
      claimData?.partB?.data?.pathological_report || "",
    );
    form.setFieldValue(
      "partB.complications",
      claimData?.partB?.data?.complications || "",
    );
    form.setFieldValue(
      "partB.relatedToAlcoholDrug",
      claimData?.partB?.data?.relatedToAlcoholDrug || "",
    );
    form.setFieldValue(
      "partB.detailRelatedToAlcoholDrug",
      claimData?.partB?.data?.detailRelatedToAlcoholDrug || "",
    );
    form.setFieldValue(
      "partB.isPregnant",
      claimData?.partB?.data?.isPregnant || "",
    );
    form.setFieldValue(
      "partB.gestationalAgeWeeks",
      claimData?.partB?.data?.gestationalAgeWeeks || "",
    );
    form.setFieldValue(
      "partB.relatedToInfertility",
      claimData?.partB?.data?.relatedToInfertility || "",
    );
    form.setFieldValue(
      "partB.detailRelatedToInfertility",
      claimData?.partB?.data?.detailRelatedToInfertility || "",
    );
    form.setFieldValue(
      "partB.treatedByOtherDoctor",
      claimData?.partB?.data?.treatedByOtherDoctor || "",
    );
    form.setFieldValue(
      "partB.otherDoctorName",
      claimData?.partB?.data?.otherDoctorName || "",
    );
    form.setFieldValue(
      "partB.otherDoctorAddress",
      claimData?.partB?.data?.otherDoctorAddress || "",
    );
    form.setFieldValue(
      "partB.hasPhysicalDefect",
      claimData?.partB?.data?.hasPhysicalDefect || "",
    );
    form.setFieldValue(
      "partB.hasDegeneration",
      claimData?.partB?.data?.hasDegeneration || "",
    );
    form.setFieldValue(
      "partB.otherComments",
      claimData?.partB?.data?.otherComments || "",
    );
  }, [claimData]);

  const formatThaiDateNoTime = (isoString) => {
    if (!isoString) return "";

    const date = new Date(isoString);

    return new Intl.DateTimeFormat("th-TH", {
      timeZone: "Asia/Bangkok",
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(date);
  };

  const calculateAge = (birthdate) => {
    if (!birthdate) return "";

    const birth = new Date(birthdate);
    const today = new Date();

    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

    // ถ้ายังไม่ถึงวันเกิดของเดือนนี้ → เดือนติดลบ
    if (days < 0) {
      months--;
    }

    // ถ้าเดือนติดลบ → ลดปีลง 1 และเพิ่มเดือนให้กลับมาเป็นบวก
    if (months < 0) {
      years--;
      months += 12;
    }

    return { years, months };
  };

  const convertISOToTime = (isoString) => {
    if (!isoString) return null;

    const d = new Date(isoString);
    return new Time(d.getHours(), d.getMinutes(), d.getSeconds());
  };

  const formatAddress = (pat_address) => {
    if (!pat_address) return "";

    // ถ้าเป็น string แล้ว → คืนค่าเลย
    if (typeof pat_address === "string") return pat_address;

    let address = "";

    if (pat_address[0]?.house) address += `${pat_address[0]?.house}`;
    if (pat_address[0]?.moo) address += ` หมู่ ${pat_address[0]?.moo}`;
    if (pat_address[0]?.soy) address += ` ซอย ${pat_address[0]?.soy}`;
    if (pat_address[0]?.road) address += ` ถนน ${pat_address[0]?.road}`;

    // ใช้รหัสแทน detail (เพราะ detail = null)
    if (pat_address[0]?.tambonName?.detailtext)
      address += ` ต.${pat_address[0]?.tambonName.detailtext}`;
    if (pat_address[0]?.amphurName?.detailtext)
      address += ` อ.${pat_address[0]?.amphurName.detailtext}`;
    if (pat_address[0]?.provinceName?.detailtext)
      address += ` จ.${pat_address[0]?.provinceName.detailtext}`;

    return address.trim();
  };

  const buildBangkokDate = (calendarDate) => {
    if (!calendarDate) return null;

    const now = new Date();

    // 👉 เวลาไทย (UTC+7)
    const bangkokHour = now.getUTCHours() + 7;
    const bangkokMinute = now.getUTCMinutes();
    const bangkokSecond = now.getUTCSeconds();

    const utc = Date.UTC(
      calendarDate.year,
      calendarDate.month - 1,
      calendarDate.day,
      bangkokHour, // 👈 แปลงกลับเป็น UTC
      bangkokMinute,
      bangkokSecond,
    );

    return new Date(utc);
  };

  const parseToCalendarDate = (value) => {
    if (!value) return null;

    const d = new Date(value);

    const dateStr = d.toISOString().split("T")[0];

    return parseDate(dateStr);
  };

  const [dates, setDates] = useState({
    datetimeForm: null,
    dateTimeClaimBForm: null,
  });

  useEffect(() => {
    if (!claimData) return;

    const partA = claimData.hospitalForm?.datetimeForm;
    const partB = claimData.partB?.data?.dateTimeClaimBForm;

    const parsedA = parseToCalendarDate(partA);
    const parsedB = parseToCalendarDate(partB);

    setDates({
      datetimeForm: parsedA,
      dateTimeClaimBForm: parsedB,
    });

    form.setFieldValue("partA.datetimeForm", partA ?? null);
    form.setFieldValue("partB.dateTimeClaimBForm", partB ?? null);
  }, [claimData]);

  const handleDateChange = (key, fieldPath) => (dateValue) => {
    setDates((prev) => ({
      ...prev,
      [key]: dateValue,
    }));

    if (!dateValue) {
      form.setFieldValue(fieldPath, null);
      return;
    }

    const bangkokDate = buildBangkokDate(dateValue);

    form.setFieldValue(fieldPath, bangkokDate.toISOString());
  };

  const handleDateTimeForm = handleDateChange(
    "datetimeForm",
    "partA.datetimeForm",
  );

  const handleDateTimeClaimBForm = handleDateChange(
    "dateTimeClaimBForm",
    "partB.dateTimeClaimBForm",
  );

  const handleSaveSignatureDoctor = (dataUrl) => {
    setSignatureDoctor(dataUrl);
    // console.log("📜 ลายเซ็น:", dataUrl);
    // 👉 สามารถ fetch ไป backend ได้ เช่น:
    // await fetch('/api/upload-signature', { method: 'POST', body: JSON.stringify({ signature: dataUrl }) })
  };

  const parseDosage = (name = "") => {
    const match = name.match(/(\d+)\s*(mg|g|mcg)/i);
    if (!match) return { dose: "-", uom: "-" };

    return {
      dose: match[1],
      uom: match[2],
    };
  };
  const formatThaiDateTime = (isoString) => {
    if (!isoString) return "";

    const date = new Date(isoString);

    return new Intl.DateTimeFormat("th-TH", {
      timeZone: "Asia/Bangkok",
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(date);
  };

  const formatThaiDateTimeUTC = (isoString) => {
    if (!isoString) return "";

    const date = new Date(isoString);

    return new Intl.DateTimeFormat("th-TH", {
      timeZone: "UTC",
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(date);
  };

  const [selectDiagValue, setSelectDiagValue] = useState([]);
  const [selectRefId, setSelectRefId] = useState([]);

  const diagList = useMemo(() => {
    const icd10 = (claimData?.data?.icd10 ?? []).map((i, idx) => ({
      ...i,
      refId: i.refId,
      source: "icd10",
    }));

    const icd9 =
      claimData?.data?.oper?.flatMap((op) =>
        (op.icd9 ?? []).map((i) => ({
          ...i,
          refId: i.refId,
          diag_type: "Operation",
          source: "icd9",
          type: i.type,
          // 🔥 ผูก oper info ตรงนี้
          opernoteId: op.opernoteId,
          orsetid: op.orsetid,
          postopdx: op.postopdx,
          editdatetime: op.editdatetime,
        })),
      ) ?? [];

    return [...icd10, ...icd9];
  }, [claimData]);

  useEffect(() => {
    const diagItem = selectDiagValue;
    if (!diagItem) return;

    const diagMap = diagItem.map((i, index) => ({
      id: index,
      itemType: String(i.type) ?? "",
      itemId:
        i.source === "icd10"
          ? (String(i.refId) ?? "")
          : i.source === "icd9"
            ? (String(i.opernoteId) ?? "")
            : "",
    }));
    form.setFieldValue("partB.selections", diagMap);
  });

  const itemSelections = claimData?.partB?.data?.itemSelections;

  const diagValueByClaimData = useMemo(() => {
    return [
      ...(itemSelections?.icd10 ?? []).map((i) => ({
        itemId: Number(i.refId),
      })),
      ...(itemSelections?.oper ?? []).flatMap((op) => ({
        itemId: Number(op.opernoteId),
      })),
    ];
  }, [itemSelections]);

  useEffect(() => {
    if (!isOpen) {
      form.reset();
      setSelectRefId([]);
      setSelectDiagValue([]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!diagValueByClaimData?.length) return;
    if (!diagList?.length) return;

    const getRowKey = (d) =>
      d.source === "icd10" ? String(d.refId) : String(d.opernoteId);

    const keys = new Set(diagValueByClaimData.map((d) => String(d.itemId)));

    // ⭐ set Table selection
    setSelectRefId(keys);

    // ⭐ set object selection
    const selected = diagList.filter((d) => keys.has(getRowKey(d)));

    setSelectDiagValue(selected);
  }, [diagList, diagValueByClaimData]);

  const getRowKey = (d) =>
    d.source === "icd10" ? String(d.refId) : String(d.opernoteId);

  return {
    sex,
    choice1,
    sick,
    everOrNever,
    choice2,
    yesOrNo,
    choice3,
    choice4,
    Anaesthesia,
    noOrYes,
    choice5,
    selectTabs,
    handleSelectTabs,
    modalRef,
    form,
    isSubmitting,
    calculateAge,
    formatThaiDateNoTime,
    convertISOToTime,
    formatAddress,
    // getParsed,
    // updateDate,
    // updateTime,
    user,
    signatureCheck,
    openSignDoctor,
    setOpenSignDoctor,
    handleSaveSignatureDoctor,
    signatureDoctor,
    setSignatureDoctor,
    parseDosage,
    formatThaiDateTime,
    dates,
    handleDateTimeForm,
    handleDateTimeClaimBForm,
    steps,
    activeStep,
    setActiveStep,
    CanManageOPD,
    addPastHistoryRow,
    removePastHistoryRow,
    rows,
    selectDiagValue,
    setSelectDiagValue,
    selectRefId,
    setSelectRefId,
    diagList,
    formatThaiDateTimeUTC,
    diagValueByClaimData,
    getRowKey,

    accident,
    firstSeen,
    injuryDate,
  };
}
