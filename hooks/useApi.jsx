const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const useApiRequest = () => {
  const apiRequest = async (endpoint, method = "GET", body = null) => {
    // 1️⃣ สร้าง headers
    const headers = { "Content-Type": "application/json" };
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
    return await apiRequest(
      "/api/claims?status=pending,draft,unapproved,s_unapproved",
      "GET"
    );
  };
  const FetchAllFormStatusApproved = async () => {
    return await apiRequest(
      "/api/claims?status=approved,s_approved,s_unapproved",
      "GET"
    );
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
      const data = await apiRequest(
        "/hospital-forms/get",
        "POST",
        payload,
      );
      return data ?? null;
    } catch (err) {
      console.error("pullDataOpd error:", err);
      return null;
    }
  };
  const pdfOpd = async (claimId) => {
    try {
      // const payload = { claimId };
      const data = await apiRequest(
        `/api/claims/${claimId}/opd-pdf`,
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

  const CreateOrderInsuranceOPD = async (value, ) => {
    try {
      const data = await apiRequest("/hospital-forms", "POST", value, );
      return data;
    } catch (err) {
      console.error("CreateOrderInsuranceOPD error:", err);
      return null;
    }
  };
  const EditOrderInsuranceOPD = async (value, hosClaimId, ) => {
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
        "POST"
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
        "POST"
      );
      return data;
    } catch (err) {
      console.error("Approve:", err);
      return null;
    }
  };

  return {
    CreateOrderInsuranceOPD,
    pullDataIpd,
    pullDataOpd,
    pullClaimData,
    FetchAllForm,
    pdfOpd,
    FetchUsers,
    EditOrderInsuranceOPD,
    FetchAllFormStatusApproved,
    ChangeStatus,
    StaffChangeStatus,
  };
};
