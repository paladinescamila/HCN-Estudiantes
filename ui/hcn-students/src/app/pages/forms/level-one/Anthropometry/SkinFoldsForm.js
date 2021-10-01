import React, { useState } from "react";
import { OpenPropover } from "../../helpers/OpenPropover";
import { OverlayTrigger, Button, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { WarningModal } from "../../helpers/WarningModal";
import { actions as actionsActivitySelected } from "../../../../modules/ActivitySelected/redux/activityRedux";
import { toast } from "react-toastify";
import CircularProgress from "@material-ui/core/CircularProgress";
import "react-toastify/dist/ReactToastify.css";
import GetSectionData from "../../../../helpers/GetSectionDataHelper";
import { GetHelpsCheck, HasHelpsCheck } from "../../helpers/HelpsCheck";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon as Fas } from "@fortawesome/react-fontawesome";
import { DisplayMediaModal } from "../../helpers/ModalMediaHelp";
import { errorMessages, incorrectMeasureFormat, measures } from "../../shared/aids/Aids";

export function SkinFoldsForm() {
  const { form, timer, aids } = useSelector((state) => state.activity);
  const [imageValue, setImageValue] = useState(undefined);
  const [imageTitle, setImageHelpTitle] = useState(undefined);
  const [openImageHelpModal, setOpenImageHelpModal] = useState(false);
  const [errors, setErrors] = useState({});
  const [warnings, setWarnings] = useState({});
  const buttonSaveText = "Guardar";
  const dispatch = useDispatch();
  const [openWarningModal, setOpenWarningModal] = useState(false);
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
    const { TricipalFoldValue, TricipalFoldInter, SubscapularFoldValue, SubscapularFoldInter } = currentActivityAnthro;
    const Errors = {};
    const Warnings = {};

    if (!TricipalFoldValue || TricipalFoldValue === "") Warnings.TricipalFoldValue = "El valor del pliegue tricipal";
    else if (incorrectMeasureFormat(TricipalFoldValue, "fold")) Errors.TricipalFoldValue = errorMessages.formatRegex + measures["fold"];

    if (!TricipalFoldInter || TricipalFoldInter === "") Warnings.TricipalFoldInter = "La interpretación del pliegue tricipal";

    if (!SubscapularFoldValue || SubscapularFoldValue === "") Warnings.SubscapularFoldValue = "El valor del pliegue subescapular";
    else if (incorrectMeasureFormat(SubscapularFoldValue, "fold")) Errors.SubscapularFoldValue = errorMessages.formatRegex + measures["fold"];

    if (!SubscapularFoldInter || SubscapularFoldInter === "") Warnings.SubscapularFoldInter = "La interpretación del pliegue subescapular";

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
      {HasHelpsCheck({ id: sectionInfo.fields[1].id, description: sectionInfo.fields[1].description, type: "text" }) ? (
        <OverlayTrigger
          placement="right"
          trigger="focus"
          overlay={OpenPropover({
            id: sectionInfo.fields[1].id,
            name: sectionInfo.fields[1].name,
            description: sectionInfo.fields[1].description,
          })}
          transition={false}
        >
          {({ ...triggerHandler }) => (
            <Button id="buttonTooltips" variant="none" {...triggerHandler} className="d-inline-flex">
              <h4 className="form-lvl-title">{sectionInfo.fields[1].name}</h4>
            </Button>
          )}
        </OverlayTrigger>
      ) : (
        <h4 className="form-lvl-title">{sectionInfo.fields[1].name}</h4>
      )}
      <Form style={{ width: "100%", paddingBottom: "15px" }}>
        <Form.Group>
          <Form.Label className="label-input">Valor</Form.Label>
          {HasHelpsCheck({
            id: sectionInfo.fields[1].id,
            description: "",
            type: "image",
          }) ? (
            <span style={{ paddingLeft: "5px" }}>
              <Fas
                icon={faSearch}
                className="solidTrianguleIcon"
                onClick={() => handleImageHelp(sectionInfo.fields[1].name, sectionInfo.fields[1].id)}
              ></Fas>
            </span>
          ) : null}
          <Form.Control
            className="form-input"
            name="TricipalFoldValue"
            value={currentActivityAnthro.TricipalFoldValue}
            label="Valor"
            type="text"
            onChange={(e) => handleChange("TricipalFoldValue", e.target.value)}
            isInvalid={!!errors.TricipalFoldValue}
          />
          <Form.Control.Feedback className="form-input" type="invalid">
            {errors.TricipalFoldValue}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label className="label-input">Interpretación</Form.Label>
          <Form.Control
            className="form-input"
            name="TricipalFoldInter"
            value={currentActivityAnthro.TricipalFoldInter}
            label="Intepretación"
            as="textarea"
            onChange={(e) => handleChange("TricipalFoldInter", e.target.value)}
            isInvalid={!!errors.TricipalFoldInter}
          />
          <Form.Control.Feedback className="form-input" type="invalid">
            {errors.TricipalFoldInter}
          </Form.Control.Feedback>
        </Form.Group>
        {HasHelpsCheck({ id: sectionInfo.fields[2].id, description: sectionInfo.fields[2].description, type: "text" }) ? (
          <OverlayTrigger
            placement="right"
            trigger="focus"
            overlay={OpenPropover({
              id: sectionInfo.fields[2].id,
              name: sectionInfo.fields[2].name,
              description: sectionInfo.fields[2].description,
            })}
            transition={false}
          >
            {({ ...triggerHandler }) => (
              <Button id="buttonTooltips" variant="none" {...triggerHandler} className="d-inline-flex">
                <h4 className="form-lvl-title">{sectionInfo.fields[2].name}</h4>
              </Button>
            )}
          </OverlayTrigger>
        ) : (
          <h4 className="form-lvl-title">{sectionInfo.fields[2].name}</h4>
        )}
        <Form.Group>
          <Form.Label className="label-input">Valor</Form.Label>
          {HasHelpsCheck({
            id: sectionInfo.fields[2].id,
            description: "",
            type: "image",
          }) ? (
            <span style={{ paddingLeft: "5px" }}>
              <Fas
                icon={faSearch}
                className="solidTrianguleIcon"
                onClick={() => handleImageHelp(sectionInfo.fields[2].name, sectionInfo.fields[2].id)}
              ></Fas>
            </span>
          ) : null}
          <Form.Control
            className="form-input"
            name="SubscapularFoldValue"
            value={currentActivityAnthro.SubscapularFoldValue}
            label="Valor"
            type="text"
            onChange={(e) => handleChange("SubscapularFoldValue", e.target.value)}
            isInvalid={!!errors.SubscapularFoldValue}
          />
          <Form.Control.Feedback className="form-input" type="invalid">
            {errors.SubscapularFoldValue}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label className="label-input">Interpretación</Form.Label>
          <Form.Control
            className="form-input"
            name="SubscapularFoldInter"
            value={currentActivityAnthro.SubscapularFoldInter}
            label="Intepretación"
            as="textarea"
            onChange={(e) => handleChange("SubscapularFoldInter", e.target.value)}
            isInvalid={!!errors.SubscapularFoldInter}
          />
          <Form.Control.Feedback className="form-input" type="invalid">
            {errors.SubscapularFoldInter}
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
