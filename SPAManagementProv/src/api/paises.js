import axios from "axios";
import { API_URL, API_KEY } from "../config";

export const obtenerPaises = async () => {
  try {
    const response = await axios.get(`${API_URL}/Pais/all`, {
      headers: { "X-API-KEY": API_KEY },
    });
    return response.data.data;
  } catch (error) {
    console.error("Error al obtener países:", error);
    return [];
  }
};
