import { addToast } from "@heroui/toast";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const useApiRequest = () => {
  const apiRequest = async (endpoint, method = "GET", body = null) => {
    // 1️⃣ สร้าง headers
    const secretKeyApi = process.env.NEXT_PUBLIC_SECRETKEYAPI;
    const headers = {
      "Content-Type": "application/json",
      "x-api-secret": secretKeyApi,
    };
    const options = {
      method,
      headers,
      credentials: "include", // ส่ง cookie HttpOnly อัตโนมัติ
    };

    if (body && method !== "GET") {
      options.body = JSON.stringify(body);
    }

    try {
      const res = await fetch(`${API_URL}${endpoint}`, options);
      // อ่าน response เป็น text ก่อน
      const text = await res.text();
      let data = null;

      if (text) {
        try {
          data = JSON.parse(text);
        } catch (err) {
          console.error("Failed to parse JSON:", err, text);
        }
      }

      // log status code ถ้า error
      if (!res.ok) {
        console.warn(`API ${method} ${endpoint} returned status ${res.status}`);
        if (res.status === 409) {
          addToast({
            title: "เตือน",
            description: data.error,
            color: "warning",
            variant: "flat",
          });
        }

        return null;
      }

      return data;
    } catch (error) {
      console.error("API error:", error);
      return null;
    }
  };

  // ดึงข้อมูลฟอร์มทั้งหมด → cookie จะถูกส่งให้ server
  const FetchAllForm = async () => {
    return await apiRequest("/api/claims", "GET");
  };
  const FetchAllFormStatusApproved = async () => {
    return await apiRequest("/api/claims?status=draft", "GET");
  };

  const pullDataIpd = async (hn, visitId) => {
    try {
      const payload = { hn, visitId };
      const data = await apiRequest("/hospital-forms/get", "POST", payload);
      return data ?? null;
    } catch (err) {
      console.error("pullDataIpd error:", err);
      return null;
    }
  };

  const pullDataOpd = async (hn, patReg) => {
    try {
      const payload = { hn, patReg };
      const data = await apiRequest("/hospital-forms/get", "POST", payload);
      return data ?? null;
    } catch (err) {
      console.error("pullDataOpd error:", err);
      return null;
    }
  };
  const pdfOpd = async (claimId) => {
    try {
      // const payload = { claimId };
      const data = await apiRequest(`/api/claims/${claimId}/opd-pdf`, "POST");
      return data ?? null;
    } catch (error) {
      console.error("base64 error:", error);
      return null;
    }
  };
  const pdfIpdPartA = async (claimId) => {
    try {
      // const payload = { claimId };
      const data = await apiRequest(
        `/api/claims/${claimId}/ipd-pdf`,
        "POST",
      );
      return data ?? null;
    } catch (error) {
      console.error("base64 error:", error);
      return null;
    }
  };
  const pdfIpdPartB = async (claimId) => {
    try {
      // const payload = { claimId };
      const data = await apiRequest(
        `/api/claims/${claimId}/ipd-pdf-partB`,
        "POST",
      );
      return data ?? null;
    } catch (error) {
      console.error("base64 error:", error);
      return null;
    }
  };
  const pullClaimData = async (claimId) => {
    try {
      const data = await apiRequest(`/api/claims/${claimId}`, "GET");

      return data ?? null;
    } catch (err) {
      console.error("pullData error:", err);

      return null;
    }
  };
  const pullClaimPartBData = async (claimId) => {
    try {
      const data = await apiRequest(
        `/discharge-certification-forms/${claimId}/discharge-certification`,
        "GET",
      );

      return data ?? null;
    } catch (err) {
      console.error("pullData error:", err);

      return null;
    }
  };

  const FetchDiag = async (claimId) =>
    apiRequest(
      `/discharge-certification-forms/${claimId}/discharge-certification/his`,
      "GET",
    );

  const CreateOrderInsurancePartA = async (value) => {
    try {
      const data = await apiRequest("/hospital-forms", "POST", value);
      return data;
    } catch (err) {
      console.error("CreateOrderInsuranceOPD error:", err);
      return null;
    }
  };
  const CreateOrderInsurancePartB = async (value, claimId) => {
    try {
      const data = await apiRequest(
        `/discharge-certification-forms/${claimId}/discharge-certification`,
        "POST",
        value,
      );
      return data;
    } catch (err) {
      console.error("CreateOrderInsuranceOPD error:", err);
      return null;
    }
  };
  const EditOrderInsurancePartA = async (value, hosClaimId) => {
    try {
      const data = await apiRequest(
        `/hospital-forms/${hosClaimId}`,
        "PUT",
        value,
      );
      return data;
    } catch (err) {
      console.error("EditOrderInsuranceOPD error:", err);
    }
  };

  const EditOrderInsurancePartB = async (value, claimId) => {
    try {
      const data = await apiRequest(
        `/discharge-certification-forms/${claimId}/discharge-certification`,
        "PATCH",
        value,
      );
      return data;
    } catch (err) {
      console.error("CreateOrderInsuranceOPD error:", err);
      return null;
    }
  };

  const FetchUsers = async () => {
    try {
      return await apiRequest("/api/users", "GET");
    } catch (err) {
      console.error("fetch users error:", err);
      return null;
    }
  };

  const ChangeStatus = async (claimId, changeStatus) => {
    try {
      const data = await apiRequest(
        `/api/claims/${claimId}/${changeStatus}`,
        "POST",
      );
      return data;
    } catch (err) {
      console.error("Approve:", err);
      return null;
    }
  };
  const StaffChangeStatus = async (claimId, changeStatus) => {
    try {
      const data = await apiRequest(
        `/api/claims/${claimId}/${changeStatus}`,
        "POST",
      );
      return data;
    } catch (err) {
      console.error("Approve:", err);
      return null;
    }
  };
  const logoutAPI = () => apiRequest("/auth/logout", "POST");
  const checkToken = () => apiRequest("/auth/checktoken", "GET");

  const searchPatient = (hn) =>
    apiRequest(`/api/claims/visits-for-claim?hn=${hn}`, "GET");

  const getPatRegByVisit = (visitId) =>
    apiRequest(`/api/claims/getpatreg/${visitId}`, "GET");

  const addPatient = (hn, regId) =>
    apiRequest(`/api/claims/from-his-web?hn=${hn}&patregId=${regId}`, "GET");

  return {
    CreateOrderInsurancePartA,
    CreateOrderInsurancePartB,
    pullDataIpd,
    pullDataOpd,
    pullClaimData,
    FetchAllForm,
    pdfOpd,
    pdfIpdPartA,
    pdfIpdPartB,
    FetchUsers,
    FetchAllFormStatusApproved,
    ChangeStatus,
    StaffChangeStatus,
    logoutAPI,
    checkToken,
    pullClaimPartBData,
    searchPatient,
    getPatRegByVisit,
    addPatient,
    EditOrderInsurancePartA,
    EditOrderInsurancePartB,
    FetchDiag,
  };
};
