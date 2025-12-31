import { API } from "../_api"

export const getProducts = async () => {
  const { data } = await API.get("/products")
  return data.data
}

export const createProduct = async (formData) => {
  try {
    const response = await API.post("/products", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const showProduct = async (id) => {
  try {
    const { data } = await API.get(`/products/${id}`)
    return data.data
  } catch (error) {
    console.log(error);
    throw error
  }
}

export const updateProduct = async (id, data) => {
  try {
    const response = await API.post(`/products/${id}`, data)
    return response.data
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const deleteProduct = async (id) => {
  try {
    await API.delete(`/products/${id}`)
  } catch (error) {
    console.log(error)
    throw error
  }
}
