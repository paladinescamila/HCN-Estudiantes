import Amplify, { Auth } from "aws-amplify";
import { confirmAccountAWS, signInAWS, signUpAWS } from "./awsAuthService";
import { COGNITO } from "../../../config/aws-config";

Amplify.configure({
  aws_cognito_region: COGNITO.REGION,
  aws_user_pools_id: COGNITO.USER_POOL_ID,
  aws_user_pools_web_client_id: COGNITO.APP_CLIENT_ID,
});

describe("awsAuthService", () => {
  it("should successfully sign in", async () => {
    const responseData = {
      accesToken: {
        jwtToken:
          "eyJraWQiOiJ1VjNpM1ZCVTZWU1dxZmNSUkFCVTFxbkJmNGlUaHRvaWVva3F5WmJSN1pBPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJkZjk5YWI1ZS1lYzlmLTRmOGItOGRmYS1hYTE1ZWU5OGUzNTAiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLWVhc3QtMi5hbWF6b25hd3MuY29tXC91cy1lYXN0LTJfREVsUjBYZnYyIiwiY29nbml0bzp1c2VybmFtZSI6ImRmOTlhYjVlLWVjOWYtNGY4Yi04ZGZhLWFhMTVlZTk4ZTM1MCIsImF1ZCI6IjRkbDRoYXY2cWlydGl2bnJjcWVma2c1a2dlIiwiZXZlbnRfaWQiOiI0MTBiNmViNy1jOGIwLTQ2ZWUtYjY1MC1mZmQ3YzdlNWMwM2IiLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTYyMTkwNjczNiwibmFtZSI6IlZlcsOzbmljYSIsImV4cCI6MTYyMTkxMDMzNiwiaWF0IjoxNjIxOTA2NzM2LCJmYW1pbHlfbmFtZSI6IlRvZmnDsW8iLCJlbWFpbCI6InZlcm9uaWNhdG9maW5vQGphdmVyaWFuYWNhbGkuZWR1LmNvIn0.G1c9suerInU7U5CRiRKAs3jkD-S986qnKpPjjNOz--N46BPyaFQyh4KjB9_UOVfW6emieicRwBfu60N1m0GxTlW9fRVt6xrhMuCQGtHnfR95zg-8TLx54bDDSAKVdNOUtK3ts6Qbv9MBKMtNmCTUOfrwL5RCKJREtwo7QDpd2L-KgzQ4D1LphQQYyTUiy5NG1h2kKSaezQT2ENQ_EA38Qy3lvXjJV4yZjGCTFsJ3OsAjTXa3yRopzjpC5ZFhCrNRQImkXimgggPkox5VO45vWVVqcR-zTp2EZIKENRGjCnXNj5eMNnpoPyMfR4QmAmqLYVECHS3ZlreI1sx1tw92Mw",
      },
      username: "df99ab5e-ec9f-4f8b-8dfa-aa15ee98e350",
      attributes: {
        name: "Veronica",
        family_name: "Tofino",
      },
    };

    Auth.signIn = jest.fn().mockImplementation(() => Promise.resolve(responseData));

    await expect(signInAWS("veronica@gmail.com", "123454")).resolves.toEqual({ success: true, user: responseData });
    expect(Auth.signIn).toHaveBeenCalledWith("veronica@gmail.com", "123454");
  });

  it("should throw an error when a problem occurs with the sign in", async () => {
    const errorMessage = "Login or password does not match";
    Auth.signIn = jest.fn().mockImplementation(() => Promise.reject(new Error(errorMessage)));

    await expect(signInAWS("veronica@gmail.com", "123454")).resolves.toEqual({
      error: errorMessage,
      success: false,
    });
    expect(Auth.signIn).toHaveBeenCalledWith("veronica@gmail.com", "123454");
  });

  it("should successfully sign up", async () => {
    const responseData = [];
    const attributes = { name: "Veronica", family_name: "Tofino", email: "veronica@gmail.com" };
    Auth.signUp = jest.fn().mockImplementation(() => Promise.resolve(responseData));

    await expect(signUpAWS("veronica@gmail.com", "123454", attributes)).resolves.toEqual({ success: true, error: null });
    expect(Auth.signUp).toHaveBeenCalledWith({
      username: "veronica@gmail.com",
      password: "123454",
      attributes: attributes,
    });
  });

  it("should throw an error when a problem occurs with the sign up", async () => {
    const errorMessage = "The email already exists.";
    const attributes = { name: "Veronica", family_name: "Tofino", email: "veronica@gmail.com" };
    Auth.signUp = jest.fn().mockImplementation(() => Promise.reject(new Error(errorMessage)));

    await expect(signUpAWS("veronica@gmail.com", "123454", attributes)).resolves.toEqual({
      error: errorMessage,
      success: false,
    });
    expect(Auth.signUp).toHaveBeenCalledWith({
      username: "veronica@gmail.com",
      password: "123454",
      attributes: attributes,
    });
  });

  it("should successfully confirm the account", async () => {
    const responseData = [];

    Auth.confirmSignUp = jest.fn().mockImplementation(() => Promise.resolve(responseData));

    await expect(confirmAccountAWS("veronica@gmail.com", "123454")).resolves.toEqual({ success: true, error: null });
    expect(Auth.confirmSignUp).toHaveBeenCalledWith("veronica@gmail.com", "123454");
  });

  it("should throw an error when a problem occurs with the sign in", async () => {
    const errorMessage = "The code is incorrect";
    Auth.confirmSignUp = jest.fn().mockImplementation(() => Promise.reject(new Error(errorMessage)));

    await expect(confirmAccountAWS("veronica@gmail.com", "123454")).resolves.toEqual({
      error: errorMessage,
      success: false,
    });
    expect(Auth.confirmSignUp).toHaveBeenCalledWith("veronica@gmail.com", "123454");
  });
});
