import React, { useState } from "react";
import { OverlayTrigger, Button, Form } from "react-bootstrap";
import { OpenPropover } from "../../helpers/OpenPropover";
import { useSelector, useDispatch } from "react-redux";
import { WarningModal } from "../../helpers/WarningModal";
import { actions as actionsActivitySelected } from "../../../../modules/ActivitySelected/redux/activityRedux";
import { toast } from "react-toastify";
import CircularProgress from "@material-ui/core/CircularProgress";
import "react-toastify/dist/ReactToastify.css";
import GetSectionData from "../../../../helpers/GetSectionDataHelper";
import { HasHelpsCheck } from "../../helpers/HelpsCheck";

function DiagnosisForm() {
  const { form, timer, difficulty } = useSelector((state) => state.activity);
  const [openWarningModal, setOpenWarningModal] = useState(false);
  const [errors, setErrors] = useState({});
  const [warnings, setWarnings] = useState({});
  const buttonSaveText = "Guardar";
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleWarningModal = () => {
    setOpenWarningModal(true);
  };

  const { sectionInfo, sectionIndex } = GetSectionData("D");

  //Map the current activity to the fields in the form.
  const [currentActivityDiagnosis, setCurrentActivity] = useState({
    DiagnosticValue: sectionInfo.fields[0].value,
  });

  const SaveDataForm = (e) => {
    e.preventDefault();
    const { Errors, Warnings } = difficulty === 0 ? findFormErrorsAndWarnings() : { Errors: {}, Warnings: {} };
    if (Object.keys(Errors).length > 0) {
      setErrors(Errors);
    } else {
      dispatch(
        actionsActivitySelected.updateActivity({
          timer: timer,
          ...currentActivityDiagnosis,
          section: "Diagnosis",
          sectionIndex: sectionIndex,
          form: form,
        })
      ).then((response) => {
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
        } else {
          toast.success(response.mssg, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          if (Object.keys(Warnings).length > 0) {
            setWarnings(Warnings);
            handleWarningModal();
          }
        }
      });
    }
    setLoading(false);
  };

  const findFormErrorsAndWarnings = () => {
    const { DiagnosticValue } = currentActivityDiagnosis;
    const Errors = {};
    const Warnings = {};

    if (!DiagnosticValue || DiagnosticValue === "") Warnings.DiagnosticValue = "El diagnóstico del paciente";

    return { Errors, Warnings };
  };

  //This function helps to detect the changes in the fields and update it.
  const handleChange = (name, value) => {
    setCurrentActivity({
      ...currentActivityDiagnosis,
      [name]: value,
    });
    // Check and see if errors exist, and remove them from the error object:
    if (!!errors[name])
      setErrors({
        ...errors,
        [name]: null,
      });
  };
  return (
    <div className="FormOneItem" id="myDiv">
      <div style={{ paddingTop: "15px" }}>
        {difficulty === 0 ? (
          HasHelpsCheck({ id: sectionInfo.fields[0].id, description: sectionInfo.fields[0].description }) ? (
            <OverlayTrigger
              placement="right"
              trigger="focus"
              overlay={OpenPropover({
                id: sectionInfo.fields[0].id,
                name: sectionInfo.fields[0].name,
                description: sectionInfo.fields[0].description,
              })}
              transition={false}
            >
              {({ ...triggerHandler }) => (
                <Button id="buttonTooltips" variant="none" {...triggerHandler} className="d-inline-flex">
                  <h4 className="form-lvl-title">{sectionInfo.fields[0].name}</h4>
                </Button>
              )}
            </OverlayTrigger>
          ) : (
            <h4 className="form-lvl-title">{sectionInfo.fields[0].name}</h4>
          )
        ) : null}
        <Form style={{ width: "100%", paddingBottom: "15px" }}>
          <Form.Group>
            <Form.Control
              className="form-input"
              rows="10"
              name="DiagnosticValue"
              value={currentActivityDiagnosis.DiagnosticValue}
              label="Motivo de consulta"
              as="textarea"
              onChange={(e) => handleChange("DiagnosticValue", e.target.value)}
              isInvalid={!!errors.DiagnosticValue}
            />
            <Form.Control.Feedback className="form-input" type="invalid">
              {errors.DiagnosticValue}
            </Form.Control.Feedback>
          </Form.Group>
          <div className="row align-items-center" style={{ paddingBottom: "15px" }}>
            <div className="col-sm" align="right">
              <Button
                variant="outline-primary"
                style={{ padding: "5px 30px", margin: "0px" }}
                className="button"
                disabled={loading}
                onClick={(e) => SaveDataForm(e)}
              >
                {loading && <CircularProgress size={20} style={{ marginRight: 20 }} />}
                {buttonSaveText}
              </Button>
            </div>
          </div>
        </Form>
        {openWarningModal && <WarningModal handleClose={() => setOpenWarningModal(false)} show={openWarningModal} warnings={warnings} />}
      </div>
    </div>
  );
}

export default DiagnosisForm;
