import axios from "axios";
import { BASE_URL, PATH_COURSES } from "../../helpers";
import { getCoursesByStudent } from "./coursesService";

jest.mock("axios");
describe("coursesService", () => {
  afterEach(() => {
    axios.get.mockClear();
  });
  it("should bring the courses of an student", async () => {
    //Arrange
    const responseData = [];
    const userId = 1;

    //Act
    axios.get.mockImplementationOnce(() => Promise.resolve(responseData));

    //Assert
    await expect(getCoursesByStudent(userId)).resolves.toEqual(responseData);
    expect(axios.get).toHaveBeenCalledWith(BASE_URL + PATH_COURSES + "students/" + userId);
  });

  it("should throw an error when a problem occurs getting the courses", async () => {
    //Arrange
    const errorMessage = "404 Error";
    const userId = 1;
    axios.get.mockImplementationOnce(() => Promise.reject(new Error(errorMessage)));

    //Act
    await expect(getCoursesByStudent(userId)).resolves.toEqual({
      error: "Error: El servidor no ha podido procesar la solicitud. ¡Intente de nuevo!",
      success: false,
    });

    //Assert
    expect(axios.get).toHaveBeenCalledWith(BASE_URL + PATH_COURSES + "students/" + userId);
  });
});
