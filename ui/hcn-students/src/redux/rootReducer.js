import { combineReducers } from "redux";
import { activitySlice } from "../app/modules/ActivitySelected/redux/activityRedux";
import { activitiesSlice } from "../app/modules/Activities/redux/activitiesRedux";
import { announcementSlice } from "../app/modules/Announcements/redux/announcementsRedux";
import { courseSlice } from "../app/modules/Courses/redux/coursesRedux";

import * as auth from "../app/modules/Auth/_redux/authRedux";

export const rootReducer = combineReducers({
  auth: auth.reducer,
  activities: activitiesSlice.reducer,
  course: courseSlice.reducer,
  activity: activitySlice.reducer,
  announcement: announcementSlice.reducer,
});
