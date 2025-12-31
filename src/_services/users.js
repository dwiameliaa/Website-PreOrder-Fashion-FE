import { API } from "../_api";

export const getUsers = async () => {
  const { data } = await API.get("/users");
  return data.data; 
};

export const showUser = async (id) => {
  try {
    const { data } = await API.get(`/users/${id}`)
    return data.data
  } catch (error) {
    console.log(error);
    throw error
  }
}

export const createUser = async (payload) => {
  const { data } = await API.post("/users", payload);
  return data;
};

export const updateUser = (id, data) => {
  return API.post(`/users/${id}`, data);
};

export const updateProfile = (data) => {
  return API.put("/users/me", data);
};

export const deleteUser = async (id) => {
  await API.delete(`/users/${id}`);
};
