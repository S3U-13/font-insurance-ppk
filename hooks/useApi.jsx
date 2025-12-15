const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const useApiRequest = () => {
  const apiRequest = async (
    endpoint,
    method = "GET",
    body = null,
    token = null
  ) => {
    // 1️⃣ สร้าง headers
    const headers = { "Content-Type": "application/json" };
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

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
  const FetchAllForm = async (token = null) => {
    return await apiRequest(
      "/api/claims?status=pending,draft",
      "GET",
      null,
      token
    );
  };

  const pullDataIpd = async (hn, visitId, token = null) => {
    try {
      const payload = { hn, visitId };
      const data = await apiRequest(
        "/hospital-forms/get",
        "POST",
        payload,
        token
      );
      return data ?? null;
    } catch (err) {
      console.error("pullDataIpd error:", err);
      return null;
    }
  };
  const pullDataOpd = async (hn, patReg, token = null) => {
    try {
      const payload = { hn, patReg };
      const data = await apiRequest(
        "/hospital-forms/get",
        "POST",
        payload,
        token
      );
      return data ?? null;
    } catch (err) {
      console.error("pullDataOpd error:", err);
      return null;
    }
  };
  const pdfOpd = async (claimId, token = null) => {
    try {
      // const payload = { claimId };
      const data = await apiRequest(
        `/api/claims/${claimId}/opd-pdf`,
        "POST",
        token
      );
      return data ?? null;
    } catch (error) {
      console.error("base64 error:", error);
      return null;
    }
  };
  const pullClaimData = async (selectID, setClaimData, token = null) => {
    try {
      const data = await apiRequest(`/api/claims/${selectID}`, "GET", token);
      setClaimData(data || null);
      return data;
    } catch (err) {
      console.error("pullData error:", err);
      setClaimData(null);
      return null;
    }
  };

  const CreateOrderInsuranceOPD = async (value, token = null) => {
    try {
      const data = await apiRequest("/hospital-forms", "POST", value, token);
      return data;
    } catch (err) {
      console.error("CreateOrderInsuranceOPD error:", err);
      return null;
    }
  };

  const FetchUsers = async (token = null) => {
    try {
      return await apiRequest("/api/users", "GET", token);
    } catch (err) {
      console.error("fetch users error:", err);
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
  };
};
