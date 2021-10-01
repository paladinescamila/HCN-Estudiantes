import { createSlice } from "@reduxjs/toolkit";
import { getCoursesByStudent } from "./coursesService";

export const initCoursesState = {
  listCourses: undefined,
  currentCourse: undefined,
};

const actionTypes = {
  get_courses: "GET_COURSES",
  set_courses: "SET_COURSES",
  set_current_course: "SET_CURRENT_COURSE",
};

const setCourses = (listCourses) => (dispatch) => {
  dispatch(courseSlice.actions.setCourses({ type: actionTypes.set_courses, listCourses }));
};

const setCurrentCourse = (props) => (dispatch) => {
  dispatch(courseSlice.actions.setCurrentCourse({ type: actionTypes.set_current_course, currentCourse: props }));
};

const cleanCourses = () => (dispatch) => {
  dispatch(courseSlice.actions.setCourses({ type: actionTypes.set_courses, listCourses: undefined }));
  dispatch(courseSlice.actions.setCurrentCourse({ type: actionTypes.set_courses, currentCourse: undefined }));
};

const getCourses = (studentId) => async (dispatch) => {
  const response = await getCoursesByStudent(studentId);
  if (response.data) {
    dispatch(
      courseSlice.actions.setCourses({
        type: actionTypes.set_courses,
        listCourses: response.data,
      })
    );
  }
  return response;
};

export const actions = {
  getCourses,
  setCourses,
  setCurrentCourse,
  cleanCourses,
};

export const courseSlice = createSlice({
  name: "Courses",
  initialState: initCoursesState,
  reducers: {
    setCourses: (state, action) => {
      const { listCourses } = action.payload;
      state.listCourses = listCourses;
    },
    setCurrentCourse: (state, action) => {
      const { currentCourse } = action.payload;
      state.currentCourse = currentCourse;
    },
  },
});
