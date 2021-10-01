import axios from "axios";
import { BASE_URL, PATH_COURSES } from "../../helpers";

export const getCoursesByStudent = async (studentId) => {
  try {
    return await axios.get(BASE_URL + PATH_COURSES + "students/" + studentId);
  } catch (error) {
    return { success: false, error: "Error: El servidor no ha podido procesar la solicitud. ¡Intente de nuevo!" };
  }
};
