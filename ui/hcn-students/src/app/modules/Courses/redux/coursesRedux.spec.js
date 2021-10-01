import { courseSlice, initCoursesState, actions } from "./coursesRedux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import store from "../../../../redux/store";
const coursesService = require("./coursesService");

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
describe("courseRedux", () => {
  let storemock = mockStore([]);
  const getCoursesServiceMock = jest.spyOn(coursesService, "getCoursesByStudent");

  beforeEach(() => {
    getCoursesServiceMock.mockImplementationOnce(() => Promise.resolve([]));
    storemock = mockStore([]);
  });
  it("should return the initial state on first run", () => {
    expect(courseSlice.reducer(undefined, {})).toEqual(initCoursesState);
  });

  it("should call the setCourses action", () => {
    // Arrange
    const courses = [];
    const actionSetCourses = [{ payload: { listCourses: [], type: "SET_COURSES" }, type: "Courses/setCourses" }];

    // Act
    storemock.dispatch(actions.setCourses(courses));
    const actionsResponse = storemock.getActions();

    // Assert
    expect(actionsResponse).toEqual(actionSetCourses);
  });

  it("should update the courses when the setCourses function is called", () => {
    // Arrange
    const courses = [];

    // Act
    store.dispatch(actions.setCourses(courses));
    const coursesResponse = store.getState().course.listCourses;

    // Assert
    expect(coursesResponse).toEqual(courses);
  });

  it("should call the setCurrentCourse action", () => {
    // Arrange
    const course = { id: "123", name: "Introducción a la resolución de HCNs" };
    const actionSetCurrentCourse = [
      {
        payload: { currentCourse: course, type: "SET_CURRENT_COURSE" },
        type: "Courses/setCurrentCourse",
      },
    ];

    // Act
    storemock.dispatch(actions.setCurrentCourse(course));
    const actionsResponse = storemock.getActions();

    // Assert
    expect(actionsResponse).toEqual(actionSetCurrentCourse);
  });

  it("should update the current course when the setCurrentCourse function is called", () => {
    // Arrange
    const course = { id: "123", name: "Introducción a la resolución de HCNs" };

    // Act
    store.dispatch(actions.setCurrentCourse(course));
    const coursesResponse = store.getState().course.currentCourse;

    // Assert
    expect(coursesResponse).toEqual(course);
  });

  it("should call the getCourses service", () => {
    // Arrange
    const courseId = 1;

    // Act
    store.dispatch(actions.getCourses(courseId));

    // Assert
    expect(getCoursesServiceMock).toHaveBeenCalledTimes(1);
    expect(getCoursesServiceMock).toHaveBeenCalledWith(courseId);
  });
});
