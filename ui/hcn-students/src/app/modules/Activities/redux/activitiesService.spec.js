import axios from "axios";
import { BASE_URL, PATH_ACTIVITES } from "../../helpers";
import { getActivitiesByStudentAndCourse, getCompletedActivitiesByStudentAndCourse } from "./activitiesService";

jest.mock("axios");
describe("activitiesService", () => {
  afterEach(() => {
    axios.get.mockClear();
  });
  it("should get the activities of an student", async () => {
    const dataResponse = [
      {
        id: "60980d40fe376339cdceb664",
        name: "Actividad 1",
        activityId: "1",
        studentId: "23",
        description: "Esta data viene del mockable.",
        publishDate: "23-11-2020",
        deadline: "23-11-2021",
        sentDate: "30-02-2021",
        status: "Nueva",
        difficultyLevel: "2",
        sections: ["general info", "anthropometric", "consultation reason", "diagnosis", "treatment", "biochemists"],
      },
    ];
    axios.get.mockImplementationOnce(() => Promise.resolve(dataResponse));

    await expect(getActivitiesByStudentAndCourse(23, 1)).resolves.toEqual(dataResponse);
    expect(axios.get).toHaveBeenCalledWith(BASE_URL + PATH_ACTIVITES + "students/" + 23 + "/courses/" + 1);
  });

  it("should throw an error when a problem occurs", async () => {
    const errorMessage = "404 Error";
    axios.get.mockImplementationOnce(() => Promise.reject(new Error(errorMessage)));

    await expect(getActivitiesByStudentAndCourse(23, 1)).resolves.toEqual({
      error: "Error: El servidor no ha podido procesar la solicitud. ¡Intente de nuevo!",
      success: false,
    });
    expect(axios.get).toHaveBeenCalledWith(BASE_URL + PATH_ACTIVITES + "students/" + 23 + "/courses/" + 1);
  });

  it("should get the completed activities of an student", async () => {
    const dataResponse = [
      {
        id: "60980d40fe376339cdceb664",
        name: "Actividad 1",
        activityId: "1",
        studentId: "23",
        description: "Esta data viene del mockable.",
        publishDate: "23-11-2020",
        deadline: "23-11-2021",
        sentDate: "30-02-2021",
        status: "Finalizada",
        difficultyLevel: "2",
        sections: ["general info", "anthropometric", "consultation reason", "diagnosis", "treatment", "biochemists"],
      },
    ];
    axios.get.mockImplementationOnce(() => Promise.resolve(dataResponse));

    await expect(getCompletedActivitiesByStudentAndCourse(23, 1)).resolves.toEqual(dataResponse);
    expect(axios.get).toHaveBeenCalledWith(BASE_URL + PATH_ACTIVITES + "students/" + 23 + "/courses/" + 1 + "/completed");
  });

  it("should throw an error when a problem occurs", async () => {
    const errorMessage = "404 Error";
    axios.get.mockImplementationOnce(() => Promise.reject(new Error(errorMessage)));

    await expect(getCompletedActivitiesByStudentAndCourse(23, 1)).resolves.toEqual({
      error: "Error: El servidor no ha podido procesar la solicitud. ¡Intente de nuevo!",
      success: false,
    });
    expect(axios.get).toHaveBeenCalledWith(BASE_URL + PATH_ACTIVITES + "students/" + 23 + "/courses/" + 1 + "/completed");
  });
});
