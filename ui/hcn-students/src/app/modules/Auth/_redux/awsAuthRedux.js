import { createSlice } from "@reduxjs/toolkit";
import { signInAWS, signUpAWS, confirmAccountAWS } from "./awsAuthService";
import { actions as authActions } from "./authRedux";

export const initAwsAuthState = {};

const signIn = (props) => async (dispatch) => {
  const response = await signInAWS(props.email, props.password);
  if (response.success) {
    dispatch(
      authActions.login(
        response.user.signInUserSession.accessToken.jwtToken,
        response.user.username,
        response.user.attributes.name + " " + response.user.attributes.family_name,
        response.user.attributes.email
      )
    );
  }
  return response;
};

const signUp = (props) => async () => {
  return await signUpAWS(props.email, props.password, props.attributes);
};

const confirmAccount = (props) => async () => {
  return await confirmAccountAWS(props.email, props.code);
};

export const actions = {
  signIn,
  signUp,
  confirmAccount,
};

export const awsAuthSlice = createSlice({
  name: "AWS-Auth",
  initialState: initAwsAuthState,
  reducers: {},
});
