import axios from "axios";
import { API_URL, API_KEY } from "../config";

const api = axios.create({
  baseURL: `${API_URL}/Proveedor`,
  headers: { "X-API-KEY": API_KEY },
});

export const obtenerProveedores = async () => {
  try {
    const response = await api.get("/all");
    return response.data;
  } catch (error) {
    console.error("Error al obtener proveedores:", error);
    throw error;
  }
};

export const crearProveedor = async (data) => {
  try {
    const response = await api.post("/create", data);
    return response.data;
  } catch (error) {
    console.error("Error al crear proveedor:", error);
    throw error;
  }
};

export const actualizarProveedor = async (data) => {
    try {
      const response = await api.post("/update", data);
      return response.data;
    } catch (error) {
      console.error("Error al crear proveedor:", error);
      throw error;
    }
  };

export const eliminarProveedor = async (id) => {
    try {
      const response = await api.post(`/delete?id=${id}`);
      return response.data;
    } catch (error) {
      console.error("Error al eliminar proveedor:", error);
      throw error;
    }
  };