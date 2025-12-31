import { useJwt } from "react-jwt";
import { API } from "../_api";

export const login = async ({ email, password }) => {
  try {
    const { data } = await API.post('/login', { email, password });
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const register = async ({ email, password, name, address, phone }) => {
  try {
    const { data } = await API.post('/register', { email, password, name, address, phone });
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// export const logout = async({ token }) => {
//   try {
//     const { data } = await API.post('/logout', { token }, {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem('accessToken')}`
//       }
//     })

//     localStorage.removeItem('accessToken')
//     return data
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// }


export const logout = async () => {
  const token = localStorage.getItem('accessToken');

  try {
    // hanya kirim header Authorization, body tidak perlu
    await API.post('/logout', null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    // kalau token sudah expired atau invalid (401), tetap lanjut hapus token
    if (error.response && error.response.status === 401) {
      console.warn('Token sudah tidak valid, lanjut logout lokal saja');
    } else {
      console.error('Logout error:', error);
    }
  } finally {
    // pastikan token dihapus apapun hasilnya
    localStorage.removeItem('accessToken');
  }
};

export const changePassword = (data) => {
  return API.post("/change-password", data);
};






// fitur untuk mengecek apakah tokennya masih valid
export const useDecodeToken = (token) => {
  const { decodedToken, isExpired } = useJwt(token);

  try {
    if (isExpired) {
      return {
        success: false,
        message: "Token Expired",
        data: null,
      }
    }

    return {
      success: true,
      message: "Token valid",
      data: decodedToken,
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
      data: null,
    }
  }
}