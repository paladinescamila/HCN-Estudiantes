import axios from "axios";
import { BASE_URL, PATH_ACTIVITES } from "../../helpers";

export const getActivitiesByStudentAndCourse = async (studentId, courseId) => {
  try {
    return await axios.get(BASE_URL + PATH_ACTIVITES + "students/" + studentId + "/courses/" + courseId);
  } catch (error) {
    return { success: false, error: "Error: El servidor no ha podido procesar la solicitud. ¡Intente de nuevo!" };
  }
};

export const getCompletedActivitiesByStudentAndCourse = async (studentId, courseId) => {
  try {
    return await axios.get(BASE_URL + PATH_ACTIVITES + "students/" + studentId + "/courses/" + courseId + "/completed");
  } catch (error) {
    return { success: false, error: "Error: El servidor no ha podido procesar la solicitud. ¡Intente de nuevo!" };
  }
};
