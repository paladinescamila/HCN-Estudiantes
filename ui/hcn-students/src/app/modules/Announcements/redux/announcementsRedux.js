import { createSlice } from "@reduxjs/toolkit";
import { getAnnouncementsByCourse } from "./announcementsService";

export const initAnnouncementsState = {
  listAnnouncements: undefined,
};

const actionTypes = {
  get_announcements: "GET_ANNOUNCEMENTS",
  set_announcements: "SET_ANNOUNCEMENTS",
};

const setAnnouncements = (listAnnouncements) => (dispatch) => {
  dispatch(announcementSlice.actions.setAnnouncements({ type: actionTypes.set_announcements, listAnnouncements }));
};

const getAnnouncements = (courseId) => async (dispatch) => {
  const response = await getAnnouncementsByCourse(courseId);
  if (response.data) {
    dispatch(
      announcementSlice.actions.setAnnouncements({
        type: actionTypes.set_announcements,
        listAnnouncements: response.data,
      })
    );
  }
  return response;
};

export const actions = {
  getAnnouncements,
  setAnnouncements,
};

export const announcementSlice = createSlice({
  name: "Announcements",
  initialState: initAnnouncementsState,
  reducers: {
    setAnnouncements: (state, action) => {
      const { listAnnouncements } = action.payload;
      state.listAnnouncements = listAnnouncements;
    },
  },
});
