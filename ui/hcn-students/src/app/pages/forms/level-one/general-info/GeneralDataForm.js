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
import { errorMessages, dateLower, isNum } from "../../shared/aids/Aids";

export function GeneralDataForm() {
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

  //Map the current form to the fields in the form.
  const [currentActivityGeneral, setCurrentActivity] = useState({
    ValuationDateValue: sectionInfo.fields[0].subfields[0].value,
    MedicalRecordNumberValue: sectionInfo.fields[0].subfields[1].value,
    EntryDateValue: sectionInfo.fields[0].subfields[2].value,
    RoomValue: sectionInfo.fields[0].subfields[3].value,
  });

  const SaveDataForm = (e) => {
    e.preventDefault();
    setLoading(true);
    const { Errors, Warnings } = findFormErrorsAndWarnings();
    if (Object.keys(Errors).length > 0) {
      setErrors(Errors);
    } else {
      dispatch(
        actionsActivitySelected.updateActivity({
          timer: timer,
          ...currentActivityGeneral,
          section: "HCNData",
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
    const { ValuationDateValue, MedicalRecordNumberValue, EntryDateValue, RoomValue } = currentActivityGeneral;
    const Errors = {};
    const Warnings = {};

    if (!ValuationDateValue || ValuationDateValue === "") Warnings.ValuationDateValue = "La fecha de valoración";
    else if (dateLower(ValuationDateValue)) Errors.ValuationDateValue = errorMessages.dateLower;

    if (!MedicalRecordNumberValue || MedicalRecordNumberValue === "") Warnings.MedicalRecordNumberValue = "El número de la historia clínica";
    else if (isNum(MedicalRecordNumberValue)) Errors.MedicalRecordNumberValue = errorMessages.number;

    if (!EntryDateValue || EntryDateValue === "") Warnings.EntryDateValue = "La fecha de ingreso";
    else if (dateLower(EntryDateValue)) Errors.EntryDateValue = errorMessages.dateLower;

    if (!RoomValue || RoomValue === "") Warnings.RoomValue = "La habitación";

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
          {HasHelpsCheck({ id: sectionInfo.fields[0].subfields[0].id, description: sectionInfo.fields[0].subfields[0].description, type: "text" }) ? (
            <OverlayTrigger
              placement="right"
              trigger="focus"
              overlay={OpenPropover({
                id: sectionInfo.fields[0].subfields[0].id,
                name: sectionInfo.fields[0].subfields[0].name,
                description: sectionInfo.fields[0].subfields[0].description,
              })}
              transition={false}
            >
              {({ ...triggerHandler }) => (
                <Button id="buttonTooltips" variant="none" {...triggerHandler} className="d-inline-flex">
                  <h4 className="form-lvl-title">{sectionInfo.fields[0].subfields[0].name}</h4>
                </Button>
              )}
            </OverlayTrigger>
          ) : (
            <h4 className="form-lvl-title">{sectionInfo.fields[0].subfields[0].name}</h4>
          )}
          <Form.Control
            className="form-input"
            name="ValuationDateValue"
            onChange={(e) => handleChange("ValuationDateValue", e.target.value)}
            value={currentActivityGeneral.ValuationDateValue}
            label="Actual"
            type="date"
            isInvalid={!!errors.ValuationDateValue}
          />
          <Form.Control.Feedback className="form-input" type="invalid">
            {errors.ValuationDateValue}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          {HasHelpsCheck({ id: sectionInfo.fields[0].subfields[1].id, description: sectionInfo.fields[0].subfields[1].description, type: "text" }) ? (
            <OverlayTrigger
              placement="right"
              trigger="focus"
              overlay={OpenPropover({
                id: sectionInfo.fields[0].subfields[1].id,
                name: sectionInfo.fields[0].subfields[1].name,
                description: sectionInfo.fields[0].subfields[1].description,
              })}
              transition={false}
            >
              {({ ...triggerHandler }) => (
                <Button id="buttonTooltips" variant="none" {...triggerHandler} className="d-inline-flex">
                  <h4 className="form-lvl-title">{sectionInfo.fields[0].subfields[1].name}</h4>
                </Button>
              )}
            </OverlayTrigger>
          ) : (
            <h4 className="form-lvl-title">{sectionInfo.fields[0].subfields[1].name}</h4>
          )}
          <Form.Control
            className="form-input"
            name="MedicalRecordNumberValue"
            value={currentActivityGeneral.MedicalRecordNumberValue}
            label="Usual"
            type="text"
            onChange={(e) => handleChange("MedicalRecordNumberValue", e.target.value)}
            isInvalid={!!errors.MedicalRecordNumberValue}
          />
          <Form.Control.Feedback className="form-input" type="invalid">
            {errors.MedicalRecordNumberValue}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          {HasHelpsCheck({ id: sectionInfo.fields[0].subfields[2].id, description: sectionInfo.fields[0].subfields[2].description, type: "text" }) ? (
            <OverlayTrigger
              placement="right"
              trigger="focus"
              overlay={OpenPropover({
                id: sectionInfo.fields[0].subfields[2].id,
                name: sectionInfo.fields[0].subfields[2].name,
                description: sectionInfo.fields[0].subfields[2].description,
              })}
              transition={false}
            >
              {({ ...triggerHandler }) => (
                <Button id="buttonTooltips" variant="none" {...triggerHandler} className="d-inline-flex">
                  <h4 className="form-lvl-title">{sectionInfo.fields[0].subfields[2].name}</h4>
                </Button>
              )}
            </OverlayTrigger>
          ) : (
            <h4 className="form-lvl-title">{sectionInfo.fields[0].subfields[2].name}</h4>
          )}
          <Form.Control
            className="form-input"
            name="EntryDateValue"
            value={currentActivityGeneral.EntryDateValue}
            label="Usual"
            type="date"
            onChange={(e) => handleChange("EntryDateValue", e.target.value)}
            isInvalid={!!errors.EntryDateValue}
          />
          <Form.Control.Feedback className="form-input" type="invalid">
            {errors.EntryDateValue}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          {HasHelpsCheck({ id: sectionInfo.fields[0].subfields[3].id, description: sectionInfo.fields[0].subfields[3].description, type: "text" }) ? (
            <OverlayTrigger
              placement="right"
              trigger="focus"
              overlay={OpenPropover({
                id: sectionInfo.fields[0].subfields[3].id,
                name: sectionInfo.fields[0].subfields[3].name,
                description: sectionInfo.fields[0].subfields[3].description,
              })}
              transition={false}
            >
              {({ ...triggerHandler }) => (
                <Button id="buttonTooltips" variant="none" {...triggerHandler} className="d-inline-flex">
                  <h4 className="form-lvl-title">{sectionInfo.fields[0].subfields[3].name}</h4>
                </Button>
              )}
            </OverlayTrigger>
          ) : (
            <h4 className="form-lvl-title">{sectionInfo.fields[0].subfields[3].name}</h4>
          )}
          <Form.Control
            className="form-input"
            name="RoomValue"
            value={currentActivityGeneral.RoomValue}
            label="Referencia"
            type="text"
            onChange={(e) => handleChange("RoomValue", e.target.value)}
            isInvalid={!!errors.RoomValue}
          />
          <Form.Control.Feedback className="form-input" type="invalid">
            {errors.RoomValue}
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
