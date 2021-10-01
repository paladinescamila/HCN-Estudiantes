import { awsAuthSlice, initAwsAuthState, actions } from "./awsAuthRedux";
import store from "../../../../redux/store";
import Amplify, { Auth } from "aws-amplify";
import { COGNITO } from "../../../config/aws-config";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

Amplify.configure({
  aws_cognito_region: COGNITO.REGION,
  aws_user_pools_id: COGNITO.USER_POOL_ID,
  aws_user_pools_web_client_id: COGNITO.APP_CLIENT_ID,
});
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("activitiesRedux", () => {
  let storemock = mockStore([]);
  it("should return the initial state on first run", () => {
    expect(awsAuthSlice.reducer(undefined, {})).toEqual(initAwsAuthState);
  });

  it("should call the signIn service", () => {
    // Arrange
    const errorMessage = "404 Not found";
    const requestBody = { email: "laura@gmail.com", password: "111111" };
    Auth.signIn = jest.fn().mockImplementation(() => Promise.reject(new Error(errorMessage)));

    // Act
    store.dispatch(actions.signIn(requestBody));

    // Assert
    expect(Auth.signIn).toHaveBeenCalledWith(requestBody.email, requestBody.password);
  });

  it("should call the signUp service", () => {
    // Arrange
    const responseData = [];
    const requestBody = {
      email: "luisa@gmail.com",
      password: "111111",
      attributes: { name: "Luisa", family_name: "Pavón", email: "luisa@gmail.com" },
    };
    const responseBody = {
      username: "luisa@gmail.com",
      password: "111111",
      attributes: { name: "Luisa", family_name: "Pavón", email: "luisa@gmail.com" },
    };
    Auth.signUp = jest.fn().mockImplementation(() => Promise.resolve(responseData));

    // Act
    storemock.dispatch(actions.signUp(requestBody));

    // Assert
    expect(Auth.signUp).toHaveBeenCalledWith(responseBody);
  });

  it("should call the confirmAccount service", () => {
    // Arrange
    const responseData = [];
    const requestBody = {
      email: "luisa@gmail.com",
      code: 12132,
    };

    Auth.confirmSignUp = jest.fn().mockImplementation(() => Promise.resolve(responseData));

    // Act
    storemock.dispatch(actions.confirmAccount(requestBody));

    // Assert
    expect(Auth.confirmSignUp).toHaveBeenCalledWith(requestBody.email, requestBody.code);
  });
});
