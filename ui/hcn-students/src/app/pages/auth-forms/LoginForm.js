import React, { useState } from "react";
import { Button, Form, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import "./AuthForms.css";
import { actions } from "../../modules/Auth/_redux/awsAuthRedux";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import CircularProgress from "@material-ui/core/CircularProgress";
import Icon from "@material-ui/core/Icon";
import { toAbsoluteUrl } from "../../helpers";
import "react-toastify/dist/ReactToastify.css";
import { Navbar } from "react-bootstrap";
import { errorMessages, incorrectEmailFormat } from "../forms/shared/aids/Aids";
import InfoIcon from "@material-ui/icons/Info";

export function LoginForm() {
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [passwordType, setPasswordType] = useState("password");
  const history = useHistory();
  const dispatch = useDispatch();

  const [loginForm, setLoginForm] = useState({
    EmailValue: "",
    PasswordValue: "",
  });

  //This function helps to detect the changes in the fields and update it.
  const handleChange = (name, value) => {
    setLoginForm({
      ...loginForm,
      [name]: value,
    });
    // Check and see if errors exist, and remove them from the error object:
    if (!!errors[name])
      setErrors({
        ...errors,
        [name]: null,
      });
  };

  const findFormErrors = () => {
    const { EmailValue, PasswordValue } = loginForm;
    const Errors = {};

    if (!EmailValue || EmailValue === "") Errors.EmailValue = errorMessages.empty;
    else if (incorrectEmailFormat(EmailValue)) Errors.EmailValue = errorMessages.emailRegex;

    if (!PasswordValue || PasswordValue === "") Errors.PasswordValue = errorMessages.empty;
    return Errors;
  };

  const showHidePassword = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setPasswordType(passwordType === "password" ? "text" : "password");
  };

  const SubmitLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const Errors = findFormErrors();
    if (Object.keys(Errors).length > 0) {
      setErrors(Errors);
      setLoading(false);
    } else {
      try {
        dispatch(actions.signIn({ email: loginForm.EmailValue, password: loginForm.PasswordValue })).then((response) => {
          if (!response.success) {
            toast.error(response.error, {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            setLoading(false);
          } else {
            history.push("/");
          }
        });
      } catch (err) {
        toast.error(err, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setLoading(false);
      }
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-inner-login">
        <div style={{ textAlign: "center" }}>
          <Navbar.Brand>
            <img src={toAbsoluteUrl("/media/logos/logoApp.png")} alt="logoApp" className="navbar--logo-app" />
            <span id="name-app-login" className="mb-0 h5">
              Simulador de HCN's
            </span>
          </Navbar.Brand>
        </div>
        <Form className="auth-form">
          <h3>Inicio de sesión</h3>

          <Form.Group>
            <OverlayTrigger
              placement="right"
              overlay={<Tooltip id="button-tooltip-2">Sólo se aceptan correos con el formato @javerianacali.edu.co</Tooltip>}
              transition={false}
            >
              {({ ref, ...triggerHandler }) => (
                <div
                  variant="none"
                  style={{
                    background: "transparent",
                    border: "none",
                  }}
                  {...triggerHandler}
                  className="d-inline-flex align-items-center"
                >
                  <Form.Label>Correo</Form.Label>

                  <InfoIcon className="auth-forms-icons" ref={ref} style={{ verticalAlign: "middle" }} />
                </div>
              )}
            </OverlayTrigger>
            <Form.Control
              className="auth-form-input"
              type={"email"}
              placeholder="Ingrese el correo"
              name="EmailValue"
              value={loginForm.EmailValue}
              onChange={(e) => handleChange("EmailValue", e.target.value)}
              isInvalid={!!errors.EmailValue}
            />
            <Form.Control.Feedback className="auth-form-input" type="invalid">
              {errors.EmailValue}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Label>Contraseña</Form.Label>
            <div className="pass-content">
              <div className="pass-field">
                <Form.Control
                  className="auth-form-input"
                  type={passwordType}
                  placeholder="Ingrese la contraseña"
                  name="PasswordValue"
                  value={loginForm.PasswordValue}
                  onChange={(e) => handleChange("PasswordValue", e.target.value)}
                  isInvalid={!!errors.PasswordValue}
                />
              </div>
              <Icon className="password-show" onClick={(e) => showHidePassword(e)} align="right">
                {passwordType === "text" ? "visibility_off_icon" : "visibility_icon"}
              </Icon>
            </div>
            <Form.Control.Feedback className="auth-form-input" type="invalid">
              {errors.PasswordValue}
            </Form.Control.Feedback>
          </Form.Group>

          <Button type="submit" className="btn btn-dark btn-lg btn-block btn-account" disabled={loading} onClick={(e) => SubmitLogin(e)}>
            {loading && <CircularProgress size={20} style={{ marginRight: 20 }} />}
            Ingresar
          </Button>
          <p className="forgot-password text-right">
            Crear una <a href="/sign-up">cuenta</a>
          </p>
        </Form>
        <div className="col-sm p-0 mb-1 pr-2" align="right">
          <img src={toAbsoluteUrl("/media/logos/logoPuj-Negro.png")} alt="logoPuj" className="navbar--logo-puj" />
        </div>
      </div>
    </div>
  );
}
