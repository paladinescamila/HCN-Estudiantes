import { Auth } from "aws-amplify";

export const signInAWS = async (email, password) => {
  try {
    const user = await Auth.signIn(email, password);
    return { success: true, user: user };
  } catch (err) {
    return { success: false, error: err.message };
  }
};

export const signUpAWS = async (email, password, attributes) => {
  try {
    await Auth.signUp({
      username: email,
      password: password,
      attributes: attributes,
    });
    return { success: true, error: null };
  } catch (err) {
    return { success: false, error: err.message };
  }
};
export const confirmAccountAWS = async (email, password) => {
  try {
    await Auth.confirmSignUp(email, password);
    return { success: true, error: null };
  } catch (err) {
    return { success: false, error: err.message };
  }
};
