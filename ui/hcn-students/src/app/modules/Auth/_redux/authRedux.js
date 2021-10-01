import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

export const actionTypes = {
  Login: "[Login] Action",
  Logout: "[Logout] Action",
};

export const initialAuthState = {
  userId: undefined,
  userName: undefined,
  authToken: undefined,
  userEmail: undefined,
};

export const reducer = persistReducer(
  { storage, key: "v706-auth", whitelist: ["userId", "userName", "authToken", "userEmail"] },
  (state = initialAuthState, action) => {
    switch (action.type) {
      case actionTypes.Login: {
        const { authToken, userId, userName, userEmail } = action.payload;

        return { authToken, userId, userName, userEmail };
      }

      case actionTypes.Logout: {
        // TODO: Change this code. Actions in reducer aren't allowed.
        return initialAuthState;
      }
      default:
        return state;
    }
  }
);

export const actions = {
  login: (authToken, userId, userName, userEmail) => ({ type: actionTypes.Login, payload: { authToken, userId, userName, userEmail } }),
  logout: () => ({ type: actionTypes.Logout }),
};
