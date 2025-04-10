import axios from "axios";
import { API_URL, API_KEY } from "../config";

export const buscarEnScraping = async (query) => {
  try {
    const response = await axios.get(`${API_URL}/scraping/search?query=${encodeURIComponent(query)}`, {
      headers: { "X-API-KEY": API_KEY },
    });
    return response.data.data;
  } catch (error) {
    console.error("Error al realizar la búsqueda en la API de scraping:", error);
    throw error;
  }
};
