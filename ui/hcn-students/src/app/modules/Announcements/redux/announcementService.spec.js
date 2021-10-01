import axios from "axios";
import { BASE_URL, PATH_ANNOUNCEMENTS } from "../../helpers";
import { getAnnouncementsByCourse } from "./announcementsService";

jest.mock("axios");
describe("announcementsService", () => {
  afterEach(() => {
    axios.get.mockClear();
  });
  it("should bring the announcements of a course", async () => {
    const responseDate = [];

    axios.get.mockImplementationOnce(() => Promise.resolve(responseDate));

    await expect(getAnnouncementsByCourse(1)).resolves.toEqual(responseDate);
    expect(axios.get).toHaveBeenCalledWith(BASE_URL + PATH_ANNOUNCEMENTS + "courses/" + 1);
  });

  it("should throw an error when a problem occurs getting the announcements", async () => {
    const errorMessage = "404 Error";
    axios.get.mockImplementationOnce(() => Promise.reject(new Error(errorMessage)));

    await expect(getAnnouncementsByCourse(1)).resolves.toEqual({
      error: "Error: El servidor no ha podido procesar la solicitud. ¡Intente de nuevo!",
      success: false,
    });
    expect(axios.get).toHaveBeenCalledWith(BASE_URL + PATH_ANNOUNCEMENTS + "courses/" + 1);
  });
});
