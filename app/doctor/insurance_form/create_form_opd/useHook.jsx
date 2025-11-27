"use client";
import React, { useState } from "react";
import { useApiRequest } from "../../../../hooks/useApi";
import { useForm } from "@tanstack/react-form";

import * as z from "zod";

export default function useHook() {
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
  const { CreateOrderInsuranceOPD } = useApiRequest();

  const initialField = () => ({
    patientId: null,
    claimId: null,
    visitid: null,
    vitalsignid: null,
    chiefComplaint: "",
    presentIllness: "",
    physicalExam: "",
    accidentDateTime: null,
    underlyingCondition: "",
    provisionalDx: "",
    adjRW: "",
    manageOPDNote: "",
    planOfTreatment: "",
    physicianid: 1001,
    approvebyphysician: null,
    signatureid: 5001,
    createdByUserId: 1,
    updatedByUserId: 1,
    relatedConditions: [],
  });

  const [field, setField] = useState(initialField());

  const handleChange = (e) => {
    const { name, value } = e.target;
    setField((prev) => ({
      ...prev,
      [name]: value,
    }));

    form.setValue(name, value);
    form.setFieldValue(
      "relatedConditions",
      [...relatedConditions].sort((a, b) => a - b)
    );
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = async (value) => {
    if (isSubmitting) return;
    try {
      await CreateOrderInsuranceOPD(value);
      form.reset();
    } catch (err) {
      console.error();
    } finally {
      setIsSubmitting(false);
    }
  };

  const defaultValues = initialField();

  const validationSchema = z.object({
    patientId: z.coerce.number().nullable(),
    claimId: z.coerce.number().nullable(),
    visitid: z.coerce.number().nullable(),
    vitalsignid: z.coerce.number().nullable(),
    chiefComplaint: z.string().optional(),
    presentIllness: z.string().optional(),
    physicalExam: z.string().optional(),

    accidentDateTime: z.string().nullable(),
    underlyingCondition: z.string().optional(),
    provisionalDx: z.string().optional(),
    adjRW: z.string().optional(),
    planOfTreatment: z.string().optional(),
    relatedConditions: z.array(z.coerce.number()).nullable(),
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

  return {
    sex,
    noOrYes,
    choice2,
    form,
    isSubmitting,
  };
}
