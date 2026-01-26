"use client";
import React, { useEffect, useState, useRef } from "react";
import { useApiRequest } from "@/hooks/useApi";
import { useForm } from "@tanstack/react-form";
import {
  Time,
  today,
  parseDate,
  getLocalTimeZone,
} from "@internationalized/date";
import { useAuth } from "@/context/AuthContext";

import * as z from "zod";
import { addToast } from "@heroui/toast";

export default function useHook({ patData, setPatData, onClose, claimId }) {
  const { user } = useAuth();
  const [openSignDoctor, setOpenSignDoctor] = useState(false);
  const [signatureDoctor, setSignatureDoctor] = useState(null);

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
  const [noOrYes, setNoOrYes] = useState([
    {
      id: 1,
      value: "ไม่มี",
    },
    {
      id: 2,
      value: "มี",
    },
  ]);
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

  const { CreateOrderInsuranceOPD } = useApiRequest();

  const initialField = () => ({
    patientId: null,
    claimId: null,
    visitid: null,
    vitalsignId: null,
    chiefComplaint: "",
    presentIllness: "",
    physicalExam: "",
    accidentDateTime: null,
    accidentPlace: "",
    underlyingCondition: "",
    diagnosis: "",
    adjRW: "",
    manageOPDNote: "",
    treatment: "",
    investigations: "",
    relatedConditions: [],
    signatureCheck: null,
    datetimeForm: null,
  });

  const [field, setField] = useState(initialField());

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

  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = async (value) => {
    if (isSubmitting) return;
    try {
      const data = await CreateOrderInsuranceOPD(value);
      setPatData(null);
      form.reset();
      onClose();
      if ((data.status = 200)) {
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
      }
    } catch (err) {
      console.error();
    } finally {
      setIsSubmitting(false);
    }
  };

  const defaultValues = initialField();

  const validationSchema = z.object({
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
    underlyingCondition: z.string().optional(),
    diagnosis: z.string().optional(),
    adjRW: z.string().optional(),
    treatment: z.string().optional(),
    investigations: z.string().optional(),
    relatedConditions: z.array(z.coerce.number()).nullable(),
    datetimeForm: z.date().nullable(),
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
    form.setFieldValue("patientId", patData?.pat?.hn || "");
    form.setFieldValue("visitid", patData?.patvisitid || "");
    form.setFieldValue("vitalsignId", patData?.vitalsign?.[0]?.id || "");
    form.setFieldValue(
      "chiefComplaint",
      patData?.chief_complaint_and_duration || "",
    );
    form.setFieldValue("presentIllness", patData?.presentIllness || "");
    form.setFieldValue(
      "underlyingCondition",
      patData?.underlyingcondition || "",
    );
    form.setFieldValue("physicalExam", patData?.physicalExam || "");
    form.setFieldValue("treatment", drugText || "");
    form.setFieldValue("claimId", claimId || "");
    form.setFieldValue("diagnosis", diagnosis || "");
    form.setFieldValue("treatment", patData?.treatment || "");
    // form.setFieldValue("signatureCheck", "1");
    // เติมค่าฟิลด์อื่น ๆ ตามที่มี
  }, [patData]);
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

  const [accidentDate, setAccidentDate] = useState(null); // {year, month, day}
  const [accidentTime, setAccidentTime] = useState(null); // Time object

  // โหลดค่า accidentDateTime จาก backend (จาก patData)
  useEffect(() => {
    if (!patData?.accidentDateTime) return;

    const dt = new Date(patData.accidentDateTime);

    const year = dt.getUTCFullYear();
    const month = dt.getUTCMonth() + 1;
    const day = dt.getUTCDate();
    const hour = dt.getUTCHours();
    const minute = dt.getUTCMinutes();

    setAccidentDate({ year, month, day });
    setAccidentTime(new Time(hour, minute));
  }, [patData]);

  // รวม Date + Time → ISO8601
  const buildISO = (d, t) => {
    if (!d || !t) return null; // <-- ป้องกัน error

    return `${d.year}-${String(d.month).padStart(2, "0")}-${String(
      d.day,
    ).padStart(2, "0")}T${String(t.hour).padStart(2, "0")}:${String(
      t.minute,
    ).padStart(2, "0")}:00Z`;
  };

  // อัปเดตฟอร์มเมื่อเลือกวันที่
  const handleAccidentDateChange = (d) => {
    setAccidentDate(d);
    if (!accidentTime) return; // ป้องกัน null

    const iso = buildISO(d, accidentTime);
    if (iso) form.setFieldValue("accidentDateTime", iso);
  };

  // อัปเดตฟอร์มเมื่อเลือกเวลา
  const handleAccidentTimeChange = (t) => {
    setAccidentTime(t);
    if (accidentDate) {
      const iso = buildISO(accidentDate, t);
      form.setFieldValue("accidentDateTime", iso);
    }
  };

  const [date, setDate] = useState({
    datetimeForm: field.datetimeForm
      ? parseDate(field.datetimeForm) // ISO → CalendarDate
      : today(getLocalTimeZone()),
  });

  const getBangkokTimeParts = () => {
    const now = new Date();
    const bangkok = new Date(
      now.toLocaleString("en-US", { timeZone: "Asia/Bangkok" }),
    );

    return {
      hours: bangkok.getHours(),
      minutes: bangkok.getMinutes(),
      seconds: bangkok.getSeconds(),
    };
  };

  useEffect(() => {
    if (!date.datetimeForm) {
      setDate({ datetimeForm: today(getLocalTimeZone()) });
      return;
    }

    const { hours, minutes, seconds } = getBangkokTimeParts();

    const bangkokDate = new Date(
      Date.UTC(
        date.datetimeForm.year,
        date.datetimeForm.month - 1,
        date.datetimeForm.day,
        hours - 7,
        minutes,
        seconds,
      ),
    );

    form.setFieldValue("datetimeForm", bangkokDate);
  }, [date.datetimeForm]);

  const handleDateTimeForm = (fieldName) => (date) => {
    setDate((prev) => ({
      ...prev,
      [fieldName]: date ?? today(getLocalTimeZone()),
    }));

    if (!date) {
      form.setFieldValue(fieldName, null);
      return;
    }

    const { hours, minutes, seconds } = getBangkokTimeParts();

    // สร้าง Date แบบ Bangkok
    const bangkokDate = new Date(
      Date.UTC(
        date.year,
        date.month - 1,
        date.day,
        hours - 7,
        minutes,
        seconds,
      ),
    );

    form.setFieldValue(fieldName, bangkokDate);
  };

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

  return {
    sex,
    noOrYes,
    choice2,
    form,
    isSubmitting,
    formatThaiDateNoTime,
    calculateAge,
    convertISOToTime,
    formatAddress,
    accidentTime,
    setAccidentTime,
    accidentDate,
    setAccidentDate,
    handleAccidentDateChange,
    handleAccidentTimeChange,
    user,
    signatureCheck,
    openSignDoctor,
    setOpenSignDoctor,
    handleSaveSignatureDoctor,
    signatureDoctor,
    parseDosage,
    formatThaiDateTime,
    date,
    setDate,
    handleDateTimeForm,
  };
}
