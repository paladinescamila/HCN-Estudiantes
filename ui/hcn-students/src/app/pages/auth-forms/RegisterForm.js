import React, { useState } from "react";
import { Button, Col, Form, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import "./AuthForms.css";
import { toast } from "react-toastify";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useDispatch } from "react-redux";
import { actions } from "../../modules/Auth/_redux/awsAuthRedux";
import "react-toastify/dist/ReactToastify.css";
import { Icon } from "@material-ui/core";
import { errorMessages, incorrectEmailFormat } from "../forms/shared/aids/Aids";
import { Navbar } from "react-bootstrap";
import { toAbsoluteUrl } from "../../helpers";
import InfoIcon from "@material-ui/icons/Info";

export function RegisterForm() {
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [passwordType, setPasswordType] = useState("password");
  const [confPasswordType, setConfPasswordType] = useState("password");
  const history = useHistory();
  const dispatch = useDispatch();

  const [registerForm, setRegisterForm] = useState({
    NameValue: "",
    LastNameValue: "",
    EmailValue: "",
    ConfirmEmailValue: "",
    PasswordValue: "",
    ConfirmPasswordValue: "",
  });

  //This function helps to detect the changes in the fields and update it.
  const handleChange = (name, value) => {
    setRegisterForm({
      ...registerForm,
      [name]: value,
    });
    // Check and see if errors exist, and remove them from the error object:
    if (!!errors[name])
      setErrors({
        ...errors,
        [name]: null,
      });
  };

  const showHidePassword = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setPasswordType(passwordType === "password" ? "text" : "password");
  };

  const showHideConfPassword = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setConfPasswordType(confPasswordType === "password" ? "text" : "password");
  };

  const findFormErrors = () => {
    const { NameValue, LastNameValue, EmailValue, ConfirmEmailValue, PasswordValue, ConfirmPasswordValue } = registerForm;
    const Errors = {};

    if (!NameValue || NameValue === "") Errors.NameValue = errorMessages.empty;

    if (!LastNameValue || LastNameValue === "") Errors.LastNameValue = errorMessages.empty;

    if (!EmailValue || EmailValue === "") Errors.EmailValue = errorMessages.empty;
    else if (incorrectEmailFormat(EmailValue)) Errors.EmailValue = errorMessages.emailRegex;

    if (!ConfirmEmailValue || ConfirmEmailValue === "") Errors.ConfirmEmailValue = errorMessages.empty;
    else if (incorrectEmailFormat(ConfirmEmailValue)) Errors.ConfirmEmailValue = errorMessages.emailRegex;
    else if (EmailValue !== ConfirmEmailValue) Errors.ConfirmEmailValue = errorMessages.different;

    if (!PasswordValue || PasswordValue === "") Errors.PasswordValue = errorMessages.empty;

    if (!ConfirmPasswordValue || ConfirmPasswordValue === "") Errors.ConfirmPasswordValue = errorMessages.empty;
    else if (PasswordValue !== ConfirmPasswordValue) Errors.ConfirmPasswordValue = errorMessages.different;

    return Errors;
  };

  const SubmitRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    const Errors = findFormErrors();
    if (Object.keys(Errors).length > 0) {
      setErrors(Errors);
      setLoading(false);
    } else {
      try {
        dispatch(
          actions.signUp({
            email: registerForm.EmailValue,
            password: registerForm.PasswordValue,
            attributes: {
              email: registerForm.EmailValue,
              name: registerForm.NameValue,
              family_name: registerForm.LastNameValue,
            },
          })
        ).then((response) => {
          if (!response.success) {
            toast.error(response.error, {
              position: "bottom-right",
              autoClose: 8000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            setLoading(false);
          } else {
            history.push("/confirmation");
          }
        });
      } catch (err) {
        toast.error(err, {
          position: "bottom-right",
          autoClose: 8000,
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
      <div className="auth-inner">
        <div style={{ textAlign: "center" }}>
          <Navbar.Brand>
            <img src={toAbsoluteUrl("/media/logos/logoApp.png")} alt="logoApp" className="navbar--logo-app" />
            <span id="name-app-login" className="mb-0 h5">
              Simulador de HCN's
            </span>
          </Navbar.Brand>
        </div>
        <Form className="auth-form">
          <h3>Registro</h3>
          <div className="row">
            <Form.Group as={Col} sm={6}>
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                required
                className="auth-form-input"
                type="text"
                placeholder="Ingrese su nombre"
                name="NameValue"
                value={registerForm.NameValue}
                onChange={(e) => handleChange("NameValue", e.target.value)}
                isInvalid={!!errors.NameValue}
              />
              <Form.Control.Feedback className="auth-form-input" type="invalid">
                {errors.NameValue}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} sm={6}>
              <Form.Label>Apellido</Form.Label>
              <Form.Control
                className="auth-form-input"
                type="text"
                placeholder="Ingrese su apellido"
                name="LastNameValue"
                value={registerForm.LastNameValue}
                onChange={(e) => handleChange("LastNameValue", e.target.value)}
                isInvalid={!!errors.LastNameValue}
              />
              <Form.Control.Feedback className="auth-form-input" type="invalid">
                {errors.LastNameValue}
              </Form.Control.Feedback>
            </Form.Group>
          </div>

          <Row>
            <Form.Group as={Col} sm={6}>
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
                type="email"
                placeholder="Ingrese el correo"
                name="EmailValue"
                value={registerForm.EmailValue}
                onChange={(e) => handleChange("EmailValue", e.target.value)}
                isInvalid={!!errors.EmailValue}
              />
              <Form.Control.Feedback className="auth-form-input" type="invalid">
                {errors.EmailValue}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} sm={6}>
              <Form.Label>Confirmación del correo</Form.Label>
              <Form.Control
                className="auth-form-input"
                type="email"
                placeholder="Ingrese el correo"
                name="ConfirmEmailValue"
                value={registerForm.ConfirmEmailValue}
                onChange={(e) => handleChange("ConfirmEmailValue", e.target.value)}
                isInvalid={!!errors.ConfirmEmailValue}
              />
              <Form.Control.Feedback className="auth-form-input" type="invalid">
                {errors.ConfirmEmailValue}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>

          <div className="row">
            <Form.Group as={Col} sm={6}>
              <OverlayTrigger
                placement="right"
                overlay={
                  <Tooltip id="button-tooltip-2">
                    La contraseña debe tener: mínimo 6 cáracteres y al menos un número, una mayúscula y un carácter especial
                  </Tooltip>
                }
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
                    <Form.Label>Contraseña</Form.Label>

                    <InfoIcon className="auth-forms-icons" ref={ref} style={{ verticalAlign: "middle" }} />
                  </div>
                )}
              </OverlayTrigger>
              <div className="pass-content">
                <div className="pass-field">
                  <Form.Control
                    className="auth-form-input"
                    type={passwordType}
                    placeholder="Ingrese la contraseña"
                    name="PasswordValue"
                    value={registerForm.PasswordValue}
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

            <Form.Group as={Col} sm={6}>
              <Form.Label>Confirmación de la contraseña</Form.Label>
              <div className="pass-content">
                <div className="pass-field">
                  <Form.Control
                    className="auth-form-input"
                    type={confPasswordType}
                    placeholder="Ingrese la contraseña"
                    name="ConfirmPasswordValue"
                    value={registerForm.ConfirmPasswordValue}
                    onChange={(e) => handleChange("ConfirmPasswordValue", e.target.value)}
                    isInvalid={!!errors.ConfirmPasswordValue}
                  />
                </div>
                <Icon className="password-show" onClick={(e) => showHideConfPassword(e)} align="right">
                  {confPasswordType === "text" ? "visibility_off_icon" : "visibility_icon"}
                </Icon>
              </div>
              <Form.Control.Feedback className="auth-form-input" type="invalid">
                {errors.ConfirmPasswordValue}
              </Form.Control.Feedback>
            </Form.Group>
          </div>
          <Button type="submit" className="btn btn-dark btn-lg btn-block btn-account" disabled={loading} onClick={(e) => SubmitRegister(e)}>
            {loading && <CircularProgress size={20} style={{ marginRight: 20 }} />}
            Crear cuenta
          </Button>
          <p className="forgot-password text-right">
            ¿Ya tiene una cuenta? <a href="/sign-in">Inicie sesión</a>
          </p>
        </Form>
        <div className="col-sm p-0 mb-1 pr-2" align="right">
          <img src={toAbsoluteUrl("/media/logos/logoPuj-Negro.png")} alt="logoPuj" className="navbar--logo-puj" />
        </div>
      </div>
    </div>
  );
}
