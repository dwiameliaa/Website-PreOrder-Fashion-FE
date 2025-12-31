import { API } from "../_api";

export const getOrder = async () => {
  const { data } = await API.get("/orders", {
    headers: {
      "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
    }
  })
  return data.data
}

export const createOrder = async (data) => {
  try {
    const response = await API.post("/orders", data, {
      headers: { // karena yang bisa mengakses orders hanya yg sudah login
        "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
      }
    })
    return response.data
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const showOrder = async (id) => {
  try {
    const { data } = await API.get(`/orders/${id}`)
    return data.data
  } catch (error) {
    console.log(error);
    throw error
  }
}

export const updateOrder = async (id, data) => {
  try {
    const response = await API.put(`/orders/${id}`, data)
    return response.data
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const deleteOrder = async (id) => {
  try {
    const response = await API.delete(`/orders/${id}`, {
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
