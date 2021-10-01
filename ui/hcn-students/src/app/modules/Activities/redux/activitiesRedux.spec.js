import { activitiesSlice, initActivitiesState, actions } from "./activitiesRedux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import store from "../../../../redux/store";
const activitiesService = require("./activitiesService");

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
describe("activitiesRedux", () => {
  let storemock = mockStore([]);
  const actionSetActivities = [{ payload: { listActivities: [], type: "SET_ACTIVITIES" }, type: "Activities/setActivities" }];
  const getActivitiesServiceMock = jest.spyOn(activitiesService, "getActivitiesByStudentAndCourse");
  const getCompletedActivitiesServiceMock = jest.spyOn(activitiesService, "getCompletedActivitiesByStudentAndCourse");

  beforeEach(() => {
    storemock = mockStore([]);
    getActivitiesServiceMock.mockImplementation(() =>
      Promise.resolve({
        data: [
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
        ],
      })
    );
    getCompletedActivitiesServiceMock.mockImplementation(() => Promise.resolve({ data: [] }));
  });

  afterEach(() => {
    getActivitiesServiceMock.mockClear();
    getCompletedActivitiesServiceMock.mockClear();
  });
  it("should return the initial state on first run", () => {
    expect(activitiesSlice.reducer(undefined, {})).toEqual(initActivitiesState);
  });

  it("should call the setActivities action", () => {
    // Arrange
    const activities = [];

    // Act
    storemock.dispatch(actions.setActivities(activities));
    const actionsResponse = storemock.getActions();

    // Assert
    expect(actionsResponse).toEqual(actionSetActivities);
  });

  it("should update the activites when the setActivities function is called", () => {
    // Arrange
    const activities = [];

    // Act
    store.dispatch(actions.setActivities(activities));
    const activitiesResponse = store.getState().activities.listActivities;

    // Assert
    expect(activitiesResponse).toEqual(activities);
  });

  it("should call the getActivitiesByStudentAndCourse service", () => {
    // Arrange
    const studentId = 23;
    const courseId = 1;

    // Act
    store.dispatch(actions.getActivities({ studentId: studentId, courseId: courseId }));

    // Assert
    expect(getActivitiesServiceMock).toHaveBeenCalledWith(studentId, courseId);
    expect(getActivitiesServiceMock).toHaveBeenCalledTimes(1);
  });

  // it.only("should call the setActivities action when the getActivities function is called", () => {
  //   // Act
  //   storemock.dispatch(actions.getActivities({ studentId: 1, courseId: 1 }));
  //   const actionsResponse = storemock.getActions();

  //   // Assert
  //   expect(actionsResponse).toEqual(actionSetActivities);
  // });

  // it.only("should update the list of activities when the getActivities function is called", () => {
  //   // Arrange
  //   const activities = [];
  //   // Act
  //   store.dispatch(actions.getActivities({ studentId: 1, courseId: 1 }));
  //   const activitiesResponse = store.getState().activities.listActivities;

  //   // Assert
  //   expect(activitiesResponse).toEqual(activities);
  // });

  it("should call the getCompletedActivitiesByStudentAndCourse service", () => {
    // Arrange
    const studentId = 23;
    const courseId = 1;

    // Act
    store.dispatch(actions.getCompletedActivities({ studentId: studentId, courseId: courseId }));

    // Assert
    expect(getCompletedActivitiesServiceMock).toHaveBeenCalledWith(studentId, courseId);
    expect(getCompletedActivitiesServiceMock).toHaveBeenCalledTimes(1);
  });

  // it("should call the setActivities action when the getCompletedActivities function is called", () => {
  //   // Act
  //   storemock.dispatch(actions.getCompletedActivities({ studentId: 1, courseId: 1 }));
  //   const actionsResponse = storemock.getActions();

  //   // Assert
  //   expect(actionsResponse).toEqual(actionSetActivities);
  // });
});
