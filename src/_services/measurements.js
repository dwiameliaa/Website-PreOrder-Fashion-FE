import { API } from "../_api";

export const getMeasurement = async () => {
  const { data } = await API.get("/measurements", {
    headers: {
      "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
    }
  })
  return data.data
}

export const createMeasurement = async (data) => {
  try {
    const response = await API.post("/measurements", data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        "Content-Type": "multipart/form-data"
      }
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const showMeasurement = async (id) => {
  try {
    const { data } = await API.get(`/measurements/${id}`)
    return data.data
  } catch (error) {
    console.log(error);
    throw error
  }
}

export const updateMeasurement = async (id, data) => {
  try {
    const response = await API.post(
      `/measurements/${id}?_method=PUT`,
      data,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};


export const updateMeasurementStatus = async (id, data) => {
  try {
    const response = await API.put(`/measurements/${id}`, data); // ganti post → put
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};


// export const updateTOrderStatus = async (transactionId, status) => {
//   const token = localStorage.getItem("accessToken"); // Ambil token dari localStorage
//   console.log("🔑 Token yang dikirim:", token);

//   try {
//     console.log("📦 Mengupdate transaksi:", transactionId, "ke status:", status);
//     const response = await API.put(
//       `/measurements/${transactionId}/status`,
//       { status },
//       {
//         headers: {
//           Authorization: `Bearer ${token}`, // Kirim token di header
//         },
//       }
//     );

//     console.log("✅ Respons update:", response.data);
//     return response.data;
//   } catch (error) {
//     console.error("❌ Error updating transaction:", error.response?.data || error);
//     throw error;
//   }
// };

export const deleteMeasurement = async (id) => {
  try {
    const response = await API.delete(`/measurements/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
