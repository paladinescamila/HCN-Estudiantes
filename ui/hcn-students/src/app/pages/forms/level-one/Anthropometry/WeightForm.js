import React, { useState } from "react";
import { OverlayTrigger, Button, Form } from "react-bootstrap";
import { OpenPropover } from "../../helpers/OpenPropover";
import { FontAwesomeIcon as Fas } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { DisplayMediaModal } from "../../helpers/ModalMediaHelp";
import { WarningModal } from "../../helpers/WarningModal";
import { actions as actionsActivitySelected } from "../../../../modules/ActivitySelected/redux/activityRedux";
import { toast } from "react-toastify";
import CircularProgress from "@material-ui/core/CircularProgress";
import "react-toastify/dist/ReactToastify.css";
import GetSectionData from "../../../../helpers/GetSectionDataHelper";
import { GetHelpsCheck, HasHelpsCheck } from "../../helpers/HelpsCheck";
import { errorMessages, incorrectMeasureFormat, measures } from "../../shared/aids/Aids";

export function WeightForm() {
  const { form, timer, aids } = useSelector((state) => state.activity);
  const [imageValue, setImageValue] = useState(undefined);
  const [imageTitle, setImageHelpTitle] = useState(undefined);
  const [openImageHelpModal, setOpenImageHelpModal] = useState(false);
  const [openWarningModal, setOpenWarningModal] = useState(false);
  const [errors, setErrors] = useState({});
  const [warnings, setWarnings] = useState({});
  const buttonSaveText = "Guardar";
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleWarningModal = () => {
    setOpenWarningModal(true);
  };

  const handleImageHelp = (title, id) => {
    const aidsF = GetHelpsCheck({ id: id, type: "image", aids: aids });
    setImageValue(aidsF[0]);
    setOpenImageHelpModal(true);
    setImageHelpTitle(title);
  };

  const { sectionInfo, sectionIndex } = GetSectionData("A");

  //Map the current activity to the fields in the form.
  const [currentActivityAnthro, setCurrentActivity] = useState({
    CurrentWeightValue: sectionInfo.fields[0].subfields[0].value,
    UsualWeightValue: sectionInfo.fields[0].subfields[1].value,
    ReferenceWeightValue: sectionInfo.fields[0].subfields[2].value,
    PercentageChangeValue: sectionInfo.fields[0].subfields[3].value,
    CurrentWeightInter: sectionInfo.fields[0].subfields[0].interpretation,
    UsualWeightInter: sectionInfo.fields[0].subfields[1].interpretation,
    ReferenceWeightInter: sectionInfo.fields[0].subfields[2].interpretation,
    PercentageChangeInter: sectionInfo.fields[0].subfields[3].interpretation,
    TricipalFoldValue: sectionInfo.fields[1].value,
    TricipalFoldInter: sectionInfo.fields[1].interpretation,
    SubscapularFoldValue: sectionInfo.fields[2].value,
    SubscapularFoldInter: sectionInfo.fields[2].interpretation,
    BrachialPerimeterValue: sectionInfo.fields[3].value,
    BrachialPerimeterInter: sectionInfo.fields[3].interpretation,
    AbdominalPerimeterValue: sectionInfo.fields[4].value,
    AbdominalPerimeterInter: sectionInfo.fields[4].interpretation,
    SizeValue: sectionInfo.fields[5].value,
    SizeInter: sectionInfo.fields[5].interpretation,
    StructureValue: sectionInfo.fields[6].value,
    StructureInter: sectionInfo.fields[6].interpretation,
    BMIValue: sectionInfo.fields[7].value,
    BMIInter: sectionInfo.fields[7].interpretation,
  });

  const SaveDataForm = (e) => {
    e.preventDefault();
    setLoading(true);
    const { Errors, Warnings } = findFormErrorsAndWarnings();
    if (Object.keys(Errors).length > 0) {
      setErrors(Errors);
    } else {
      dispatch(
        actionsActivitySelected.updateActivity({ timer: timer, ...currentActivityAnthro, section: "Anthro", sectionIndex: sectionIndex, form: form })
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
    const { CurrentWeightValue, UsualWeightValue, ReferenceWeightValue, PercentageChangeValue, PercentageChangeInter } = currentActivityAnthro;
    const Errors = {};
    const Warnings = {};

    if (!CurrentWeightValue || CurrentWeightValue === "") Warnings.CurrentWeightValue = "El peso actual";
    else if (incorrectMeasureFormat(CurrentWeightValue, "weight")) Errors.CurrentWeightValue = errorMessages.formatRegex + measures["weight"];

    if (!UsualWeightValue || UsualWeightValue === "") Warnings.UsualWeightValue = "El peso usual";
    else if (incorrectMeasureFormat(UsualWeightValue, "weight")) Errors.UsualWeightValue = errorMessages.formatRegex + measures["weight"];

    if (!ReferenceWeightValue || ReferenceWeightValue === "") Warnings.ReferenceWeightValue = "El peso de referencia";
    else if (incorrectMeasureFormat(ReferenceWeightValue, "weight")) Errors.ReferenceWeightValue = errorMessages.formatRegex + measures["weight"];

    if (!PercentageChangeValue || PercentageChangeValue === "") Warnings.PercentageChangeValue = "El valor del porcentaje de cambio";
    else if (incorrectMeasureFormat(PercentageChangeValue, "percentage"))
      Errors.PercentageChangeValue = errorMessages.formatRegex + measures["percentage"];

    if (!PercentageChangeInter || PercentageChangeInter === "") Warnings.PercentageChangeInter = "La intepretación del procentaje de cambio";

    return { Errors, Warnings };
  };

  //This function helps to detect the changes in the fields and update it.
  const handleChange = (name, value) => {
    setCurrentActivity({
      ...currentActivityAnthro,
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
      {HasHelpsCheck({ id: sectionInfo.fields[0].id, description: sectionInfo.fields[0].description, type: "text" }) ? (
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
      )}
      <Form style={{ width: "100%", paddingBottom: "15px" }}>
        <Form.Group>
          <Form.Label className="label-input">Actual</Form.Label>
          {HasHelpsCheck({
            id: sectionInfo.fields[0].subfields[0].id,
            description: "",
            type: "image",
          }) ? (
            <span style={{ paddingLeft: "5px" }}>
              <Fas
                icon={faSearch}
                className="solidTrianguleIcon"
                onClick={() => handleImageHelp(sectionInfo.fields[0].subfields[0].name, sectionInfo.fields[0].subfields[0].id)}
              ></Fas>
            </span>
          ) : null}
          <Form.Control
            className="form-input"
            name="CurrentWeightValue"
            onChange={(e) => handleChange("CurrentWeightValue", e.target.value)}
            value={currentActivityAnthro.CurrentWeightValue}
            label="Actual"
            type="text"
            isInvalid={!!errors.CurrentWeightValue}
          />
          <Form.Control.Feedback className="form-input" type="invalid">
            {errors.CurrentWeightValue}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label className="label-input">Usual</Form.Label>
          {HasHelpsCheck({
            id: sectionInfo.fields[0].subfields[1].id,
            description: "",
            type: "image",
          }) ? (
            <span style={{ paddingLeft: "5px" }}>
              <Fas
                icon={faSearch}
                className="solidTrianguleIcon"
                onClick={() => handleImageHelp(sectionInfo.fields[0].subfields[1].name, sectionInfo.fields[0].subfields[1].id)}
              ></Fas>
            </span>
          ) : null}
          <Form.Control
            className="form-input"
            name="UsualWeightValue"
            value={currentActivityAnthro.UsualWeightValue}
            label="Usual"
            type="text"
            onChange={(e) => handleChange("UsualWeightValue", e.target.value)}
            isInvalid={!!errors.UsualWeightValue}
          />
          <Form.Control.Feedback className="form-input" type="invalid">
            {errors.UsualWeightValue}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label className="label-input">Peso de referencia</Form.Label>
          {HasHelpsCheck({
            id: sectionInfo.fields[0].subfields[2].id,
            description: "",
            type: "image",
          }) ? (
            <span style={{ paddingLeft: "5px" }}>
              <Fas
                icon={faSearch}
                className="solidTrianguleIcon"
                onClick={() => handleImageHelp(sectionInfo.fields[0].subfields[2].name, sectionInfo.fields[0].subfields[2].id)}
              ></Fas>
            </span>
          ) : null}
          <Form.Control
            className="form-input"
            name="UsualWeightValue"
            value={currentActivityAnthro.ReferenceWeightValue}
            label="Referencia"
            type="text"
            onChange={(e) => handleChange("ReferenceWeightValue", e.target.value)}
            isInvalid={!!errors.ReferenceWeightValue}
          />
          <Form.Control.Feedback className="form-input" type="invalid">
            {errors.ReferenceWeightValue}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label className="label-input">Porcentaje cambio de peso</Form.Label>
          {HasHelpsCheck({
            id: sectionInfo.fields[0].subfields[3].id,
            description: "",
            type: "image",
          }) ? (
            <span style={{ paddingLeft: "5px" }}>
              <Fas
                icon={faSearch}
                className="solidTrianguleIcon"
                onClick={() => handleImageHelp(sectionInfo.fields[0].subfields[3].name, sectionInfo.fields[0].subfields[3].id)}
              ></Fas>
            </span>
          ) : null}
          <Form.Control
            className="form-input"
            name="PercentageChangeValue"
            value={currentActivityAnthro.PercentageChangeValue}
            label="Valor % cambio de peso"
            type="text"
            onChange={(e) => handleChange("PercentageChangeValue", e.target.value)}
            isInvalid={!!errors.PercentageChangeValue}
          />
          <Form.Text className="form-input" id="tasaCambioValorHelp" muted>
            Valor de % cambio de peso.
          </Form.Text>
          <Form.Control.Feedback className="form-input" type="invalid">
            {errors.PercentageChangeValue}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Control
            className="form-input"
            name="PercentageChangeInter"
            value={currentActivityAnthro.PercentageChangeInter}
            label="Intepretación % cambio de peso"
            as="textarea"
            onChange={(e) => handleChange("PercentageChangeInter", e.target.value)}
            isInvalid={!!errors.PercentageChangeInter}
          />
          <Form.Text className="form-input" id="tasaPercentageChangeInterHelp" muted>
            Interpretación % cambio de peso.
          </Form.Text>
          <Form.Control.Feedback className="form-input" type="invalid">
            {errors.PercentageChangeInter}
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
      {openImageHelpModal && (
        <DisplayMediaModal handleClose={() => setOpenImageHelpModal(false)} show={openImageHelpModal} title={imageTitle} information={imageValue} />
      )}
      {openWarningModal && <WarningModal handleClose={() => setOpenWarningModal(false)} show={openWarningModal} warnings={warnings} />}
    </div>
  );
}
