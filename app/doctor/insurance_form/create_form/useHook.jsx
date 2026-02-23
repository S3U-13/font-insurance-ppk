"use client";
import React, { useEffect, useState, useMemo, useRef } from "react";
import { useApiRequest } from "@/hooks/useApi";
import { useForm, useStore } from "@tanstack/react-form";
import {
  today,
  parseDate,
  getLocalTimeZone,
  parseAbsoluteToLocal,
  CalendarDate,
  Time,
} from "@internationalized/date";
import { useAuth } from "@/context/AuthContext";

import * as z from "zod";
import { addToast } from "@heroui/toast";

export default function useHook({
  patData,
  setPatData,
  onClose,
  claimId,
  isOpen,
}) {
  const { CreateOrderInsurancePartA, CreateOrderInsurancePartB } =
    useApiRequest();
  const { user } = useAuth();
  const [openSignDoctor, setOpenSignDoctor] = useState(false);
  const [signatureDoctor, setSignatureDoctor] = useState(null);
  const modalRef = useRef(null);
  const steps = ["1", "2"];
  const [activeStep, setActiveStep] = useState("1");

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
    signatureCheck: null,
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

  const defaultValues = {
    partA: partAField(),
    partB: partBField(),
  };

  const partASchema = z.object({
    signatureCheck: z.coerce.number().nullable(),
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
    datetimeForm: z.date().nullable(),
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
    gestationalAgeWeeks: z.coerce.number().min(0).nullable(),

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
    dateTimeClaimBForm: z.date().nullable(),
  });

  const validationSchema = z.object({
    partA: partASchema,
    partB: partBSchema,
  });

  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (value) => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    if (CanManageOPD === "") {
      addToast({
        title: "เตือน",
        description: "กรุณาระบุ Out Patient basis !",
        color: "warning",
        variant: "flat",
      });
    }
    try {
      let data;

      if (CanManageOPD === "Y") {
        data = await CreateOrderInsurancePartA(value.partA);
      } else if (CanManageOPD === "N") {
        const [partA, partB] = await Promise.all([
          CreateOrderInsurancePartA(value.partA),
          CreateOrderInsurancePartB(value.partB, claimId),
        ]);
        data = { partA, partB };
      }
      if (!data) return;
      if (data) {
        addToast({
          title: "สำเร็จ",
          description: "เพิ่มข้อมูลสำเร็จ",
          color: "success",
          variant: "flat",
          promise: new Promise((resolve) =>
            setTimeout(() => {
              setLoading(false);
              resolve(true);
            }, 1500),
          ),
        });
        onClose();
        form.reset();
        setActiveStep("1");
        resetDateTimeFields();
      } else if (!data) {
        addToast({
          title: "ผิดพลาด",
          description: "ไม่สามารถบันทึกข้อมูลได้",
          color: "danger",
          variant: "flat",
        });
      }
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

  const form = useForm({
    defaultValues,
    onSubmit: async ({ value }) => {
      try {
        const validatedData = validationSchema.parse(value);
        // console.log("submit value", validatedData);
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

  const drugText = `
การสั่งยา
${patData?.drug
  ?.map(
    (item) =>
      `${item.servicename} สั่งยา ${item.requestqty} เม็ด จ่ายยา ${item.serviceqty} เม็ด`,
  )
  .join("\n")}`;

  const diagnosis =
    patData?.diagnosis?.map((item) => item.diagtext).join("\n") || "";

  useEffect(() => {
    if (!patData) return;

    // ตัวอย่าง: ใช้ค่าจาก patData.map
    form.setFieldValue("partA.patientId", patData?.pat?.hn || "");
    form.setFieldValue("partA.visitid", patData?.patvisitid || "");
    form.setFieldValue("partA.vitalsignId", patData?.vitalsign?.[0]?.id || "");
    form.setFieldValue(
      "partA.chiefComplaint",
      patData?.chief_complaint_and_duration || "",
    );
    form.setFieldValue("partA.presentIllness", patData?.presentIllness || "");
    form.setFieldValue(
      "partA.underlyingCondition",
      patData?.underlyingcondition || "",
    );
    form.setFieldValue("partA.physicalExam", patData?.physicalExam || "");
    form.setFieldValue("partA.treatment", drugText || "");
    form.setFieldValue("partA.claimId", claimId || "");
    if (["Y", ""].includes(CanManageOPD)) {
      form.setFieldValue("partA.diagnosis", diagnosis || "");
      form.setFieldValue("partA.treatment", patData?.treatment || "");
    } else if (CanManageOPD === "N") {
      form.setFieldValue("partA.diagnosis", "");
      form.setFieldValue("partA.treatment", "");
    }

    // form.setFieldValue("signatureCheck", "1");
    // เติมค่าฟิลด์อื่น ๆ ตามที่มี
  }, [patData, CanManageOPD]);

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

  // โหลดค่า accidentDateTime จาก backend (จาก patData)

  // รวม Date + Time → ISO8601
  // const buildISO = (d, t) => {
  //   if (!d || !t) return null;

  //   return `${d.year}-${String(d.month).padStart(2, "0")}-${String(
  //     d.day,
  //   ).padStart(2, "0")}T${String(t.hour).padStart(2, "0")}:${String(
  //     t.minute,
  //   ).padStart(2, "0")}:00Z`;
  // };

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

  // useEffect(() => {
  //   if (!patData) return;

  //   if (patData?.hospitalForm?.accidentDateTime) {
  //     form.setFieldValue(
  //       "partA.accidentDateTime",
  //       patData.hospitalForm.accidentDateTime,
  //     );
  //   }

  //   if (patData?.partB?.data?.firstSeenDate) {
  //     form.setFieldValue(
  //       "partB.firstSeenDate",
  //       patData.partB.data.firstSeenDate,
  //     );
  //   }

  //   if (patData?.partB?.data?.injuryDate) {
  //     form.setFieldValue("partB.injuryDate", patData.partB.data.injuryDate);
  //   }
  // }, [patData, form]);

  //helper กลาง รับค่า date time field

  const combineDateTime = (date, time) => {
    if (!date || !time) return null;

    const d = new Date(
      date.year,
      date.month - 1,
      date.day,
      time.hour + 7,
      time.minute,
      0,
    );

    return d.toISOString(); // 👈 ตัวนี้สำคัญ
  };
  // ทำ hook จัดการ

  const useDateTimeField = (form, fieldName) => {
    const [date, setDate] = useState(null);
    const [time, setTime] = useState(null);

    const update = (newDate, newTime) => {
      const finalDate = newDate ?? date;
      const finalTime = newTime ?? time;

      const iso = combineDateTime(finalDate, finalTime);
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

  const buildBangkokDate = (calendarDate) => {
    if (!calendarDate) return null;

    const now = new Date();
    const bangkok = new Date(
      now.toLocaleString("en-US", { timeZone: "Asia/Bangkok" }),
    );

    return new Date(
      Date.UTC(
        calendarDate.year,
        calendarDate.month - 1,
        calendarDate.day,
        bangkok.getHours(),
        bangkok.getMinutes(),
        bangkok.getSeconds(),
      ),
    );
  };

  const [dates, setDates] = useState(() => {
    const partA = form.getFieldValue("partA.datetimeForm");
    const partB = form.getFieldValue("partB.dateTimeClaimBForm");

    return {
      datetimeForm: partA
        ? parseDate(partA.toISOString().split("T")[0])
        : today(getLocalTimeZone()),

      dateTimeClaimBForm: partB
        ? parseDate(partB.toISOString().split("T")[0])
        : today(getLocalTimeZone()),
    };
  });
  useEffect(() => {
    if (isOpen) {
      const defaultDate = today(getLocalTimeZone());

      setDates({
        datetimeForm: defaultDate,
        dateTimeClaimBForm: defaultDate,
      });

      form.setFieldValue("partA.datetimeForm", buildBangkokDate(defaultDate));

      form.setFieldValue(
        "partB.dateTimeClaimBForm",
        buildBangkokDate(defaultDate),
      );
    }
  }, [isOpen]);

  useEffect(() => {
    const partA = form.getFieldValue("partA.datetimeForm");
    const partB = form.getFieldValue("partB.dateTimeClaimBForm");

    if (!partA) {
      const date = buildBangkokDate(dates.datetimeForm);
      form.setFieldValue("partA.datetimeForm", date);
    }

    if (!partB) {
      const date = buildBangkokDate(dates.dateTimeClaimBForm);
      form.setFieldValue("partB.dateTimeClaimBForm", date);
    }
  }, []);

  const handleDateChange = (key, fieldPath) => (dateValue) => {
    setDates((prev) => ({
      ...prev,
      [key]: dateValue ?? today(getLocalTimeZone()),
    }));

    if (!dateValue) {
      form.setFieldValue(fieldPath, null);
      return;
    }

    const bangkokDate = buildBangkokDate(dateValue);
    form.setFieldValue(fieldPath, bangkokDate);
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

  const temp = patData?.vitalsign?.[0]?.temperature
    ? `${patData.vitalsign[0]?.temperature} °C`
    : "";
  const pulse = patData?.vitalsign?.[0]?.pulse
    ? `${patData.vitalsign[0].pulse} bpm`
    : "";
  const Resp = patData?.vitalsign?.[0]?.respiration
    ? `${patData.vitalsign[0].respiration} /min`
    : "";
  const systolic = patData?.vitalsign?.[0]?.bp_systolic ?? "";
  const diastolic = patData?.vitalsign?.[0]?.bp_diastolic ?? "";

  const bp = systolic && diastolic ? `${systolic}/${diastolic} mmHg` : "";

  const [selectDiagValue, setSelectDiagValue] = useState([]);
  const [selectRefId, setSelectRefId] = useState([]);

  // useEffect(() => {
  //   const items = claimData?.partB?.data?.pastHistoryItems;
  //   if (!items) return;

  //   const mapped = items.map((i) => ({
  //     id: i.id, // 🔥 สำคัญมาก ใช้เป็น key
  //     itemDate: i.itemDate ?? null, // ✅ string
  //     signsAndSymptoms: i.signsAndSymptoms ?? "",
  //     diagnosis: i.diagnosis ?? "",
  //     treatment: i.treatment ?? "",
  //     hospital: i.hospital ?? "",
  //   }));

  //   form.setFieldValue("partB.pastHistoryItems", mapped);
  // }, [claimData]);

  const diagList = useMemo(() => {
    const icd10 = (patData?.data?.icd10 ?? []).map((i, idx) => ({
      ...i,
      refId: i.refId,
      source: "icd10",
    }));

    const icd9 =
      patData?.data?.oper?.flatMap((op) =>
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
          starttime: op.starttime,
        })),
      ) ?? [];

    return [...icd10, ...icd9];
  }, [patData]);

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
    steps,
    activeStep,
    setActiveStep,
    CanManageOPD,
    temp,
    pulse,
    Resp,
    bp,
    addPastHistoryRow,
    removePastHistoryRow,
    rows,
    selectDiagValue,
    setSelectDiagValue,
    selectRefId,
    setSelectRefId,
    diagList,
    formatThaiDateTimeUTC,
    handleDateTimeClaimBForm,
    //ตัวเเปรวันที่
    accident,
    firstSeen,
    injuryDate,
  };
}
