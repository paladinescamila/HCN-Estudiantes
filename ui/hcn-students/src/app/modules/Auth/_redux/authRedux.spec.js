import { reducer, initialAuthState, actions } from "./authRedux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import store from "../../../../redux/store";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
describe("authRedux", () => {
  let storemock = mockStore([]);

  beforeEach(() => {
    storemock = mockStore([]);
  });

  it("should return the initial state on first run", () => {
    expect(reducer(undefined, {})).toEqual(initialAuthState);
  });

  it("should call the Login action", () => {
    // Arrange
    const authToken = "2";
    const userId = "1";
    const userName = "Lorena Diaz";
    const userEmail = "ldiaz@email.com";
    const actionLogin = [{ payload: { authToken: authToken, userEmail: userEmail, userId: userId, userName: userName }, type: "[Login] Action" }];

    // Act
    storemock.dispatch(actions.login(authToken, userId, userName, userEmail));
    const actionsResponse = storemock.getActions();

    // Assert
    expect(actionsResponse).toEqual(actionLogin);
  });

  it("should update the user info when the Login function is called", () => {
    // Arrange
    const authToken = "2";
    const userId = "1";
    const userName = "Lorena Diaz";
    const userEmail = "ldiaz@email.com";

    // Act
    store.dispatch(actions.login(authToken, userId, userName, userEmail));
    const authResponse = store.getState().auth;

    // Assert
    expect(authResponse.authToken).toEqual(authToken);
    expect(authResponse.userId).toEqual(userId);
    expect(authResponse.userName).toEqual(userName);
    expect(authResponse.userEmail).toEqual(userEmail);
  });

  it("should update the user info to the init state when the Logout function is called", () => {
    // Act
    store.dispatch(actions.logout());
    const authResponse = store.getState().auth;

    // Assert
    expect(authResponse.authToken).toEqual(undefined);
    expect(authResponse.userId).toEqual(undefined);
    expect(authResponse.userName).toEqual(undefined);
    expect(authResponse.userEmail).toEqual(undefined);
  });

  it("should call the Logout action", () => {
    // Arrange
    const actionLogout = [{ type: "[Logout] Action" }];

    // Act
    storemock.dispatch(actions.logout());
    const actionsResponse = storemock.getActions();

    // Assert
    expect(actionsResponse).toEqual(actionLogout);
  });
});
