import {actividadesModel} from "../models/actividadesModel.js";

const obtenerActividades = async (req, res) => {
  try {
    const actividades = await actividadesModel.obtenerActividades();
    res.status(200).json(actividades);
  } catch (error) {
    console.error("Error al obtener las actividades:", error);
    res.status(500).json({ error: "Error al obtener las actividades" });
  }
}

export const actividadesController = {
  obtenerActividades,
};