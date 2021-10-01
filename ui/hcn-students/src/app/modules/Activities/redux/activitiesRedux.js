import { createSlice } from "@reduxjs/toolkit";
import { getActivitiesByStudentAndCourse, getCompletedActivitiesByStudentAndCourse } from "./activitiesService";

export const initActivitiesState = {
  listActivities: undefined,
};

const actionTypes = {
  get_activities: "GET_ACTIVITIES",
  set_activities: "SET_ACTIVITIES",
};

const setActivities = (listActivities) => (dispatch) => {
  dispatch(activitiesSlice.actions.setActivities({ type: actionTypes.set_activities, listActivities }));
};

const getActivities = (props) => async (dispatch) => {
  const response = await getActivitiesByStudentAndCourse(props.studentId, props.courseId);
  if (response.data) {
    dispatch(
      activitiesSlice.actions.setActivities({
        type: actionTypes.set_activities,
        listActivities: response.data,
      })
    );
  }
  return response;
};

const getCompletedActivities = (props) => async (dispatch) => {
  const response = await getCompletedActivitiesByStudentAndCourse(props.studentId, props.courseId);
  if (response.data) {
    dispatch(
      activitiesSlice.actions.setActivities({
        type: actionTypes.set_activities,
        listActivities: response.data,
      })
    );
  }
  return response;
};

export const actions = {
  getActivities,
  setActivities,
  getCompletedActivities,
};

export const activitiesSlice = createSlice({
  name: "Activities",
  initialState: initActivitiesState,
  reducers: {
    setActivities: (state, action) => {
      const { listActivities } = action.payload;
      state.listActivities = listActivities;
    },
  },
});
