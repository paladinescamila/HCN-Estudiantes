import axios from "axios";
import { BASE_URL, PATH_ANNOUNCEMENTS } from "../../helpers";

export const getAnnouncementsByCourse = async (courseId) => {
  try {
    return await axios.get(BASE_URL + PATH_ANNOUNCEMENTS + "courses/" + courseId);
  } catch (error) {
    return { success: false, error: "Error: El servidor no ha podido procesar la solicitud. ¡Intente de nuevo!" };
  }
};
