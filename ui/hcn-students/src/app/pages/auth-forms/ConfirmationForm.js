import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import "./AuthForms.css";
import { toast } from "react-toastify";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useDispatch } from "react-redux";
import { actions } from "../../modules/Auth/_redux/awsAuthRedux";
import "react-toastify/dist/ReactToastify.css";

export function ConfirmationForm() {
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const emailRegex = new RegExp("^[a-zA-Z0-9._-]+@javerianacali.edu.co$");
  const dispatch = useDispatch();

  const [confirmationForm, setConfirmationForm] = useState({
    EmailValue: "",
    CodeValue: "",
  });

  //This function helps to detect the changes in the fields and update it.
  const handleChange = (name, value) => {
    setConfirmationForm({
      ...confirmationForm,
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
    const { EmailValue, CodeValue } = confirmationForm;
    const errors = {
      num: "Este campo sólo recibe valores númericos",
      emailRegex: "El email no cumple con el formato '@javerianacali.edu.co'",
      empty: "Este campo no puede ser vacío",
    };
    const Errors = {};
    if (!EmailValue || EmailValue === "") Errors.EmailValue = errors.empty;
    else if (!emailRegex.test(EmailValue)) Errors.EmailValue = errors.emailRegex;

    if (!CodeValue || CodeValue === "") Errors.CodeValue = errors.empty;
    else if (isNaN(CodeValue)) Errors.CodeValue = errors.num;

    return Errors;
  };

  const SubmitConfirmation = async (e) => {
    e.preventDefault();
    setLoading(true);
    const Errors = findFormErrors();
    if (Object.keys(Errors).length > 0) {
      setErrors(Errors);
      setLoading(false);
    } else {
      try {
        dispatch(actions.confirmAccount({ email: confirmationForm.EmailValue, code: confirmationForm.CodeValue })).then((response) => {
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
      <div className="auth-inner">
        <Form>
          <h3>Verificación de la cuenta</h3>

          <Form.Group>
            <Form.Label>Correo</Form.Label>
            <Form.Control
              className="auth-form-input"
              type="email"
              placeholder="Ingrese el correo"
              name="EmailValue"
              value={confirmationForm.EmailValue}
              onChange={(e) => handleChange("EmailValue", e.target.value)}
              isInvalid={!!errors.EmailValue}
            />
            <Form.Control.Feedback className="auth-form-input" type="invalid">
              {errors.EmailValue}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Label>Código de verificación</Form.Label>
            <Form.Control
              className="auth-form-input"
              type="text"
              placeholder="Ingrese el código de verificación"
              name="CodeValue"
              value={confirmationForm.CodeValue}
              onChange={(e) => handleChange("CodeValue", e.target.value)}
              isInvalid={!!errors.CodeValue}
            />
            <Form.Text className="form-input" muted>
              Escriba el código de verificación enviado al correo con el que se registró.
            </Form.Text>
            <Form.Control.Feedback className="auth-form-input" type="invalid">
              {errors.CodeValue}
            </Form.Control.Feedback>
          </Form.Group>

          <Button type="submit" className="btn btn-dark btn-lg btn-block btn-account" disabled={loading} onClick={(e) => SubmitConfirmation(e)}>
            {loading && <CircularProgress size={20} style={{ marginRight: 20 }} />}
            Verificar la cuenta
          </Button>
          <p className="forgot-password text-right">
            Crear una <a href="/sign-up">cuenta</a>
          </p>
        </Form>
      </div>
    </div>
  );
}
