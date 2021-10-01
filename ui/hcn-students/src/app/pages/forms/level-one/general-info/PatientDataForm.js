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
import { dateLower, errorMessages, incorrectAgeFormat, incorrectNameFormat, isNum } from "../../shared/aids/Aids";

export function PatientDataForm() {
  const { form, timer } = useSelector((state) => state.activity);
  const [openWarningModal, setOpenWarningModal] = useState(false);
  const [errors, setErrors] = useState({});
  const [warnings, setWarnings] = useState({});
  const buttonSaveText = "Guardar";
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleWarningModal = () => {
    setOpenWarningModal(true);
  };

  const { sectionInfo, sectionIndex } = GetSectionData("G");

  //Map the current activity to the fields in the form.
  const [currentActivityGeneral, setCurrentActivity] = useState({
    FullNameValue: sectionInfo.fields[1].subfields[0].value,
    BirthDateValue: sectionInfo.fields[1].subfields[1].value,
    GenderValue: sectionInfo.fields[1].subfields[2].value,
    SexValue: sectionInfo.fields[1].subfields[3].value,
    AgeValue: sectionInfo.fields[1].subfields[4].value,
    SPEValue: sectionInfo.fields[1].subfields[5].value,
    PhoneValue: sectionInfo.fields[1].subfields[6].value,
    OccupationValue: sectionInfo.fields[1].subfields[7].value,
    CivilStatusValue: sectionInfo.fields[1].subfields[8].value,
  });

  const SaveDataForm = (e) => {
    e.preventDefault();
    const { Errors, Warnings } = findFormErrorsAndWarnings();
    if (Object.keys(Errors).length > 0) {
      setErrors(Errors);
    } else {
      dispatch(
        actionsActivitySelected.updateActivity({
          timer: timer,
          ...currentActivityGeneral,
          section: "PatientData",
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
    const Errors = {};
    const Warnings = {};

    if (!currentActivityGeneral.BirthDateValue || currentActivityGeneral.BirthDateValue === "") Warnings.BirthDateValue = "La fecha de nacimiento";
    else if (dateLower(currentActivityGeneral.BirthDateValue)) Errors.BirthDateValue = errorMessages.dateLower;

    if (!currentActivityGeneral.AgeValue || currentActivityGeneral.AgeValue === "") Warnings.AgeValue = "La edad";
    else if (incorrectAgeFormat(currentActivityGeneral.AgeValue)) Errors.AgeValue = errorMessages.formatRegex + " años o meses";

    if (!currentActivityGeneral.PhoneValue || currentActivityGeneral.PhoneValue === "") Warnings.PhoneValue = "El teléfono";
    else if (isNum(currentActivityGeneral.PhoneValue)) Errors.PhoneValue = errorMessages.number;

    if (!currentActivityGeneral.FullNameValue || currentActivityGeneral.FullNameValue === "") Warnings.FullNameValue = "El nombre completo";
    else if (incorrectNameFormat(currentActivityGeneral.FullNameValue)) Errors.FullNameValue = errorMessages.name;

    if (!currentActivityGeneral.GenderValue || currentActivityGeneral.GenderValue === "") Warnings.GenderValue = "El género";

    if (!currentActivityGeneral.SexValue || currentActivityGeneral.SexValue === "") Warnings.SexValue = "El sexo";
    else if (!(currentActivityGeneral.SexValue === "Femenino" || currentActivityGeneral.SexValue === "Masculino"))
      Errors.SexValue = errorMessages.sex;

    if (!currentActivityGeneral.SPEValue || currentActivityGeneral.SPEValue === "") Warnings.SPEValue = "La EPS";

    if (!currentActivityGeneral.OccupationValue || currentActivityGeneral.OccupationValue === "") Warnings.OccupationValue = "La ocupación";

    if (!currentActivityGeneral.CivilStatusValue || currentActivityGeneral.CivilStatusValue === "") Warnings.CivilStatusValue = "El estado civil";

    return { Errors, Warnings };
  };

  //This function helps to detect the changes in the fields and update it.
  const handleChange = (name, value) => {
    setCurrentActivity({
      ...currentActivityGeneral,
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
    <div style={{ paddingTop: "15px" }}>
      <Form style={{ width: "100%", paddingBottom: "15px" }}>
        <Form.Group>
          {HasHelpsCheck({ id: sectionInfo.fields[1].subfields[0].id, description: sectionInfo.fields[1].subfields[0].description, type: "text" }) ? (
            <OverlayTrigger
              placement="right"
              trigger="focus"
              overlay={OpenPropover({
                id: sectionInfo.fields[1].subfields[0].id,
                name: sectionInfo.fields[1].subfields[0].name,
                description: sectionInfo.fields[1].subfields[0].description,
              })}
              transition={false}
            >
              {({ ...triggerHandler }) => (
                <Button id="buttonTooltips" variant="none" {...triggerHandler} className="d-inline-flex">
                  <h4 className="form-lvl-title">{sectionInfo.fields[1].subfields[0].name}</h4>
                </Button>
              )}
            </OverlayTrigger>
          ) : (
            <h4 className="form-lvl-title">{sectionInfo.fields[1].subfields[0].name}</h4>
          )}
          <Form.Control
            className="form-input"
            name="FullNameValue"
            onChange={(e) => handleChange("FullNameValue", e.target.value)}
            value={currentActivityGeneral.FullNameValue}
            label="Actual"
            type="text"
            isInvalid={!!errors.FullNameValue}
          />
          <Form.Control.Feedback className="form-input" type="invalid">
            {errors.FullNameValue}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          {HasHelpsCheck({ id: sectionInfo.fields[1].subfields[1].id, description: sectionInfo.fields[1].subfields[1].description, type: "text" }) ? (
            <OverlayTrigger
              placement="right"
              trigger="focus"
              overlay={OpenPropover({
                id: sectionInfo.fields[1].subfields[1].id,
                name: sectionInfo.fields[1].subfields[1].name,
                description: sectionInfo.fields[1].subfields[1].description,
              })}
              transition={false}
            >
              {({ ...triggerHandler }) => (
                <Button id="buttonTooltips" variant="none" {...triggerHandler} className="d-inline-flex">
                  <h4 className="form-lvl-title">{sectionInfo.fields[1].subfields[1].name}</h4>
                </Button>
              )}
            </OverlayTrigger>
          ) : (
            <h4 className="form-lvl-title">{sectionInfo.fields[1].subfields[1].name}</h4>
          )}
          <Form.Control
            className="form-input"
            name="BirthDateValue"
            value={currentActivityGeneral.BirthDateValue}
            label="Usual"
            type="date"
            onChange={(e) => handleChange("BirthDateValue", e.target.value)}
            isInvalid={!!errors.BirthDateValue}
          />
          <Form.Control.Feedback className="form-input" type="invalid">
            {errors.BirthDateValue}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          {HasHelpsCheck({ id: sectionInfo.fields[1].subfields[2].id, description: sectionInfo.fields[1].subfields[2].description, type: "text" }) ? (
            <OverlayTrigger
              placement="right"
              trigger="focus"
              overlay={OpenPropover({
                id: sectionInfo.fields[1].subfields[2].id,
                name: sectionInfo.fields[1].subfields[2].name,
                description: sectionInfo.fields[1].subfields[2].description,
              })}
              transition={false}
            >
              {({ ...triggerHandler }) => (
                <Button id="buttonTooltips" variant="none" {...triggerHandler} className="d-inline-flex">
                  <h4 className="form-lvl-title">{sectionInfo.fields[1].subfields[2].name}</h4>
                </Button>
              )}
            </OverlayTrigger>
          ) : (
            <h4 className="form-lvl-title">{sectionInfo.fields[1].subfields[2].name}</h4>
          )}
          <Form.Control
            as="select"
            className="form-input"
            name="GenderValue"
            value={currentActivityGeneral.GenderValue}
            label="Usual"
            type="select"
            onChange={(e) => handleChange("GenderValue", e.target.value)}
            isInvalid={!!errors.GenderValue}
          >
            <option value="">Seleccione una opción</option>
            <option value="Femenino">Femenino</option>
            <option value="Masculino">Masculino</option>
            <option value="Otro">Otro</option>
          </Form.Control>
          <Form.Control.Feedback className="form-input" type="invalid">
            {errors.GenderValue}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          {HasHelpsCheck({ id: sectionInfo.fields[1].subfields[3].id, description: sectionInfo.fields[1].subfields[3].description, type: "text" }) ? (
            <OverlayTrigger
              placement="right"
              trigger="focus"
              overlay={OpenPropover({
                id: sectionInfo.fields[1].subfields[3].id,
                name: sectionInfo.fields[1].subfields[3].name,
                description: sectionInfo.fields[1].subfields[3].description,
              })}
              transition={false}
            >
              {({ ...triggerHandler }) => (
                <Button id="buttonTooltips" variant="none" {...triggerHandler} className="d-inline-flex">
                  <h4 className="form-lvl-title">{sectionInfo.fields[1].subfields[3].name}</h4>
                </Button>
              )}
            </OverlayTrigger>
          ) : (
            <h4 className="form-lvl-title">{sectionInfo.fields[1].subfields[3].name}</h4>
          )}
          <Form.Control
            as="select"
            className="form-input-select"
            name="SexValue"
            value={currentActivityGeneral.SexValue}
            label="Referencia"
            type="select"
            onChange={(e) => handleChange("SexValue", e.target.value)}
            isInvalid={!!errors.SexValue}
          >
            <option value="">Seleccione una opción</option>
            <option value="Femenino">Femenino</option>
            <option value="Masculino">Masculino</option>
          </Form.Control>
          <Form.Control.Feedback className="form-input" type="invalid">
            {errors.SexValue}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          {HasHelpsCheck({ id: sectionInfo.fields[1].subfields[4].id, description: sectionInfo.fields[1].subfields[4].description, type: "text" }) ? (
            <OverlayTrigger
              placement="right"
              trigger="focus"
              overlay={OpenPropover({
                id: sectionInfo.fields[1].subfields[4].id,
                name: sectionInfo.fields[1].subfields[4].name,
                description: sectionInfo.fields[1].subfields[4].description,
              })}
              transition={false}
            >
              {({ ...triggerHandler }) => (
                <Button id="buttonTooltips" variant="none" {...triggerHandler} className="d-inline-flex">
                  <h4 className="form-lvl-title">{sectionInfo.fields[1].subfields[4].name}</h4>
                </Button>
              )}
            </OverlayTrigger>
          ) : (
            <h4 className="form-lvl-title">{sectionInfo.fields[1].subfields[4].name}</h4>
          )}
          <Form.Control
            className="form-input"
            name="AgeValue"
            value={currentActivityGeneral.AgeValue}
            label="Referencia"
            type="text"
            onChange={(e) => handleChange("AgeValue", e.target.value)}
            isInvalid={!!errors.AgeValue}
          />
          <Form.Control.Feedback className="form-input" type="invalid">
            {errors.AgeValue}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          {HasHelpsCheck({ id: sectionInfo.fields[1].subfields[5].id, description: sectionInfo.fields[1].subfields[5].description, type: "text" }) ? (
            <OverlayTrigger
              placement="right"
              trigger="focus"
              overlay={OpenPropover({
                id: sectionInfo.fields[1].subfields[5].id,
                name: sectionInfo.fields[1].subfields[5].name,
                description: sectionInfo.fields[1].subfields[5].description,
              })}
              transition={false}
            >
              {({ ...triggerHandler }) => (
                <Button id="buttonTooltips" variant="none" {...triggerHandler} className="d-inline-flex">
                  <h4 className="form-lvl-title">{sectionInfo.fields[1].subfields[5].name}</h4>
                </Button>
              )}
            </OverlayTrigger>
          ) : (
            <h4 className="form-lvl-title">{sectionInfo.fields[1].subfields[5].name}</h4>
          )}
          <Form.Control
            className="form-input"
            name="SPEValue"
            value={currentActivityGeneral.SPEValue}
            label="Referencia"
            type="text"
            onChange={(e) => handleChange("SPEValue", e.target.value)}
            isInvalid={!!errors.SPEValue}
          />
          <Form.Control.Feedback className="form-input" type="invalid">
            {errors.SPEValue}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          {HasHelpsCheck({ id: sectionInfo.fields[1].subfields[6].id, description: sectionInfo.fields[1].subfields[6].description, type: "text" }) ? (
            <OverlayTrigger
              placement="right"
              trigger="focus"
              overlay={OpenPropover({
                id: sectionInfo.fields[1].subfields[6].id,
                name: sectionInfo.fields[1].subfields[6].name,
                description: sectionInfo.fields[1].subfields[6].description,
              })}
              transition={false}
            >
              {({ ...triggerHandler }) => (
                <Button id="buttonTooltips" variant="none" {...triggerHandler} className="d-inline-flex">
                  <h4 className="form-lvl-title">{sectionInfo.fields[1].subfields[6].name}</h4>
                </Button>
              )}
            </OverlayTrigger>
          ) : (
            <h4 className="form-lvl-title">{sectionInfo.fields[1].subfields[6].name}</h4>
          )}
          <Form.Control
            className="form-input"
            name="PhoneValue"
            value={currentActivityGeneral.PhoneValue}
            label="Referencia"
            type="text"
            onChange={(e) => handleChange("PhoneValue", e.target.value)}
            isInvalid={!!errors.PhoneValue}
          />
          <Form.Control.Feedback className="form-input" type="invalid">
            {errors.PhoneValue}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          {HasHelpsCheck({ id: sectionInfo.fields[1].subfields[7].id, description: sectionInfo.fields[1].subfields[7].description, type: "text" }) ? (
            <OverlayTrigger
              placement="right"
              trigger="focus"
              overlay={OpenPropover({
                id: sectionInfo.fields[1].subfields[7].id,
                name: sectionInfo.fields[1].subfields[7].name,
                description: sectionInfo.fields[1].subfields[7].description,
              })}
              transition={false}
            >
              {({ ...triggerHandler }) => (
                <Button id="buttonTooltips" variant="none" {...triggerHandler} className="d-inline-flex">
                  <h4 className="form-lvl-title">{sectionInfo.fields[1].subfields[7].name}</h4>
                </Button>
              )}
            </OverlayTrigger>
          ) : (
            <h4 className="form-lvl-title">{sectionInfo.fields[1].subfields[7].name}</h4>
          )}
          <Form.Control
            className="form-input"
            name="OccupationValue"
            value={currentActivityGeneral.OccupationValue}
            label="Referencia"
            type="text"
            onChange={(e) => handleChange("OccupationValue", e.target.value)}
            isInvalid={!!errors.OccupationValue}
          />
          <Form.Control.Feedback className="form-input" type="invalid">
            {errors.OccupationValue}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          {HasHelpsCheck({ id: sectionInfo.fields[1].subfields[8].id, description: sectionInfo.fields[1].subfields[8].description, type: "text" }) ? (
            <OverlayTrigger
              placement="right"
              trigger="focus"
              overlay={OpenPropover({
                id: sectionInfo.fields[1].subfields[8].id,
                name: sectionInfo.fields[1].subfields[8].name,
                description: sectionInfo.fields[1].subfields[8].description,
              })}
              transition={false}
            >
              {({ ...triggerHandler }) => (
                <Button id="buttonTooltips" variant="none" {...triggerHandler} className="d-inline-flex">
                  <h4 className="form-lvl-title">{sectionInfo.fields[1].subfields[8].name}</h4>
                </Button>
              )}
            </OverlayTrigger>
          ) : (
            <h4 className="form-lvl-title">{sectionInfo.fields[1].subfields[8].name}</h4>
          )}
          <Form.Control
            className="form-input"
            name="CivilStatusValue"
            value={currentActivityGeneral.CivilStatusValue}
            label="Referencia"
            type="text"
            onChange={(e) => handleChange("CivilStatusValue", e.target.value)}
            isInvalid={!!errors.CivilStatusValue}
          />
          <Form.Control.Feedback className="form-input" type="invalid">
            {errors.CivilStatusValue}
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
  );
}
