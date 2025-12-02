const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const useApiRequest = () => {
  const apiRequest = async (endpoint, method = "GET", body = null) => {
    const headers = {
      "Content-Type": "application/json",
    };

    const options = { method, headers };
    if (body && method !== "GET") options.body = JSON.stringify(body);

    try {
      const res = await fetch(`${API_URL}${endpoint}`, options);
      const data = await res.json();
      return data;
    } catch (error) {
      console.error;
    }
  };
  const FetchAllForm = () => apiRequest("/api/claims", "GET");
  const pullData = async (hn, setPatData) => {
    try {
      const payload = { hn: hn }; // ชัดเจน & ปลอดภัย
      const data = await apiRequest(`/hospital-forms/get`, "POST", payload);

      if (!data) {
        console.warn("⚠ ไม่มีข้อมูลจาก API");
      }
      return data;
    } catch (err) {
      console.error("pullData error:", err);
      setPatData(null);
    }
  };
  const CreateOrderInsuranceOPD = async (value) => {
    try {
      const data = await apiRequest(`/hospital-forms`, "POST", value);

      return data;
    } catch (err) {
      console.error(err);
    }
  };
  return { CreateOrderInsuranceOPD, pullData, FetchAllForm };
};
