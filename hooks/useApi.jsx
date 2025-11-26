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
  const FetchAllForm = () => apiRequest("/hospital-forms", "GET");
  const CreateOrderInsuranceOPD = async (value) => {
    try {
      const data = await apiRequest(`/hospital-forms`, "POST", value);
      return data;
    } catch (err) {
      console.error(err);
    }
  };
  return { CreateOrderInsuranceOPD, FetchAllForm };
};
