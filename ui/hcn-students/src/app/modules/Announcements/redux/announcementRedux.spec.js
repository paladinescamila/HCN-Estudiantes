import { announcementSlice, initAnnouncementsState, actions } from "./announcementsRedux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import store from "../../../../redux/store";
const announcementsService = require("./announcementsService");

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
describe("announcementRedux", () => {
  let storemock = mockStore([]);
  const actionSetAnnouncements = [{ payload: { listAnnouncements: [], type: "SET_ANNOUNCEMENTS" }, type: "Announcements/setAnnouncements" }];
  const getAnnouncementsServiceMock = jest.spyOn(announcementsService, "getAnnouncementsByCourse");

  beforeEach(() => {
    getAnnouncementsServiceMock.mockImplementationOnce(() => Promise.resolve({}));
    storemock = mockStore([]);
  });
  it("should return the initial state on first run", () => {
    expect(announcementSlice.reducer(undefined, {})).toEqual(initAnnouncementsState);
  });

  it("should call the setAnnouncements action", () => {
    // Arrange
    const announcements = [];

    // Act
    storemock.dispatch(actions.setAnnouncements(announcements));
    const actionsResponse = storemock.getActions();

    // Assert
    expect(actionsResponse).toEqual(actionSetAnnouncements);
  });

  it("should update the announcements when the setAnnouncements function is called", () => {
    // Arrange
    const announcements = [];

    // Act
    store.dispatch(actions.setAnnouncements(announcements));
    const announcementsResponse = store.getState().announcement.listAnnouncements;

    // Assert
    expect(announcementsResponse).toEqual(announcements);
  });

  it("should call the getAnnouncements service", () => {
    // Arrange
    const courseId = 1;

    // Act
    store.dispatch(actions.getAnnouncements(courseId));

    // Assert
    expect(getAnnouncementsServiceMock).toHaveBeenCalledTimes(1);
    expect(getAnnouncementsServiceMock).toHaveBeenCalledWith(courseId);
  });
});
