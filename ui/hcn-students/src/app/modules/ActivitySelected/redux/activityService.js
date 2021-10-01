import axios from "axios";
import { BASE_URL, PATH_ACTIVITES, PATH_FORMS } from "../../helpers";

export const getFormFromActivity = async (activityId) => {
  try {
    const response = await axios.get(BASE_URL + PATH_ACTIVITES + activityId + "/form");
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: "Error: El servidor no ha podido procesar la solicitud. ¡Intente de nuevo!" };
  }
};

export const updateActivitySection = async (formId, form, timer_difference_seconds) => {
  try {
    await axios.put(BASE_URL + PATH_FORMS + formId, { form: form, timer: timer_difference_seconds });
    return { success: true, mssg: "Sección actualizada con éxito" };
  } catch (error) {
    return { success: false, error: "Error: El servidor no ha podido procesar la solicitud. ¡Intente de nuevo!" };
  }
};

export const updateActivityTime = async (activityId, timer_difference_seconds) => {
  try {
    await axios.put(BASE_URL + PATH_ACTIVITES + activityId + "/timer", { Id: activityId, Timer: timer_difference_seconds });
    return { success: true, mssg: "" };
  } catch (error) {
    return { success: false, error: "Error: El servidor no ha podido procesar la solicitud. ¡Intente de nuevo!" };
  }
};

export const sendActivity = async (activityId, data, timer_difference_seconds) => {
  try {
    const response = await axios.post(BASE_URL + PATH_ACTIVITES + activityId + "/end", { EndActivity: data, Timer: timer_difference_seconds });
    return { success: true, mssg: "Actividad enviada con éxito", timer: response.data.timer };
  } catch (error) {
    return { success: false, error: "Error: El servidor no ha podido procesar la solicitud. ¡Intente de nuevo!" };
  }
};
