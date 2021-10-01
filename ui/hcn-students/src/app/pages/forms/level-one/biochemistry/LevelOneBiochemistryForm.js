import React, { useState } from "react";
import { OverlayTrigger, Button, Form, Row, Col, Modal } from "react-bootstrap";
import { OpenPropover } from "../../helpers/OpenPropover";
import { useSelector, useDispatch } from "react-redux";
import { actions as actionsActivitySelected } from "../../../../modules/ActivitySelected/redux/activityRedux";
import { toast } from "react-toastify";
import CircularProgress from "@material-ui/core/CircularProgress";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import DeleteIcon from "@material-ui/icons/Delete";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon as Fas } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-regular-svg-icons";
import { defaultTextModal } from "../../../../helpers/ModalTexts";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { ModalInfo } from "../../../activity_dev/helpers/GeneralInfo";
import { TitleSection } from "../../../activity_dev/helpers/TitleSection";
import "./biochemistry.css";
import GetSectionData from "../../../../helpers/GetSectionDataHelper";
import { HasHelpsCheck } from "../../helpers/HelpsCheck";
import { VisualizePDF } from "../../../VisualizePDF/VisualizePDF";
import { errorMessages, dateLower } from "../../shared/aids/Aids";

function LevelOneBiochemistryForm() {
  const { form, timer, difficulty, name, clinicCase } = useSelector((state) => state.activity);
  const [openWarningModal, setOpenWarningModal] = useState(false);
  const [errors, setErrors] = useState([]);
  const [warnings, setWarnings] = useState([]);
  const buttonSaveText = "Guardar";
  const dispatch = useDispatch();
  const [showModalInfoB, setShowModalInfoB] = useState(false);
  const [loading, setLoading] = useState(false);

  const { sectionInfo, sectionIndex } = GetSectionData("B");

  //Map the current activity to the fields in the form.
  const [currentActivityBiochemists, setCurrentActivity] = useState(
    sectionInfo.fields[0].value === ""
      ? [
          {
            DateValue: new Date().toISOString().slice(0, 10),
            ParameterValue: "",
            ValueValue: "",
            ReferenceValue: "",
            InterpretationValue: "",
          },
        ]
      : JSON.parse(sectionInfo.fields[0].value).map((b) => {
          return {
            DateValue: b.date,
            ParameterValue: b.parameter,
            ValueValue: b.value,
            ReferenceValue: b.referenceValue,
            InterpretationValue: b.interpretation,
          };
        })
  );

  const handleWarningModal = () => {
    setOpenWarningModal(true);
  };

  const handleInfoPageB = async () => {
    setShowModalInfoB(true);
  };

  const handleClose = () => {
    setOpenWarningModal(false);
  };

  const SaveDataForm = (e) => {
    e.preventDefault();
    const bioChecks = findFormErrorsAndWarnings();
    const hasErrors = checkFor("Errors", bioChecks);
    if (Object.values(bioChecks).length > 0 && !hasErrors) {
      const mapErrors = bioChecks.map((check) => check.Errors);
      setErrors([...mapErrors]);
    } else {
      dispatch(
        actionsActivitySelected.updateActivity({
          timer: timer,
          currentActivityBiochemists: currentActivityBiochemists,
          section: "Biochemists",
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
          const hasWarnings = checkFor("Warnings", bioChecks);
          if (Object.keys(bioChecks).length > 0 && !hasWarnings) {
            const mapWarnings = bioChecks.map((check) => check.Warnings);
            setWarnings([...mapWarnings]);
            handleWarningModal();
          }
        }
      });
    }
    setLoading(false);
  };

  const checkFor = (word, bioChecks) => {
    let i = 0;
    while (i < Object.values(bioChecks).length) {
      if (bioChecks[i][word] !== undefined && Object.values(bioChecks[i][word]).length > 0) {
        return false;
      } else {
        ++i;
      }
    }
    return true;
  };

  const findFormErrorsAndWarnings = () => {
    const bioChecks = currentActivityBiochemists.map((value) => {
      let ErrorsT = {};
      let WarningsT = {};
      if (!value.DateValue || value.DateValue === "") WarningsT.DateValue = "La fecha del examen";
      else if (dateLower(value.DateValue)) ErrorsT.DateValue = errorMessages.dateLower;

      if (!value.ValueValue || value.ValueValue === "") WarningsT.ValueValue = "El valor del examen";

      if (!value.ParameterValue || value.ParameterValue === "") WarningsT.ParameterValue = "El parámetro del examen";

      if (!value.ReferenceValue || value.ReferenceValue === "") WarningsT.ReferenceValue = "El valor de referencia del examen";

      if (!value.InterpretationValue || value.InterpretationValue === "") WarningsT.InterpretationValue = "La interpretación del examen";
      return { Errors: ErrorsT, Warnings: WarningsT };
    });
    return bioChecks;
  };

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...currentActivityBiochemists];
    list[index][name] = value;
    setCurrentActivity(list);

    //Check and see if errors exist, and remove them from the error object:
    if (errors[index]) {
      if (!!errors[index][name] || errors[index][name] === []) {
        const errorsList = [...errors];
        errorsList[index] = {};
        setErrors(errorsList);
      }
    }
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...currentActivityBiochemists];
    list.splice(index, 1);
    setCurrentActivity(list);

    if (errors[index]) {
      if (!!errors[index][name] || errors[index][name] === []) {
        const errorsList = [...errors];
        errorsList[index] = {};
        setErrors(errorsList);
      }
    }
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setCurrentActivity([
      ...currentActivityBiochemists,
      {
        DateValue: new Date().toISOString().slice(0, 10),
        ParameterValue: "",
        ValueValue: "",
        ReferenceValue: "",
        InterpretationValue: "",
      },
    ]);
  };

  return (
    <div className="widget-dev">
      {TitleSection(name)}
      <div className="grid">
        <div id="upleft">
          <button
            href="#"
            style={{
              background: "transparent",
              border: "none",
            }}
            className="button-header-cc"
            onClick={() => VisualizePDF(clinicCase)}
          >
            <Fas icon={faUserCircle} className="regularIcon" />
            Caso clínico
          </button>
        </div>
        <div id="upright">
          <span style={{ color: "#24A46D", fontWeight: "bold" }}>Módulo: </span>
          <span style={{ color: "black" }}>INDICADORES BIOQUÍMICOS </span>
          <Fas icon={faInfoCircle} color="#FFBF00" className="solidIcon" onClick={() => handleInfoPageB()} />
        </div>
        <div className="break" />
        <hr className="breakLineDev" />
        <div className="d-flex flex-column-fluid">
          <div className="FormOneItem" id="mtDiv">
            <div style={{ paddingTop: "15px" }}>
              {difficulty === 0 ? (
                HasHelpsCheck({ id: sectionInfo.fields[0].id, description: sectionInfo.fields[0].description, type: "text" }) ? (
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
                {currentActivityBiochemists.map((values, index) => {
                  return (
                    <div key={index}>
                      <Row className="form-biochem">
                        <Col m={2} className="mt-1">
                          <Form.Label> Fecha </Form.Label>
                          <Form.Control
                            className="form-input-chem"
                            rows="10"
                            name="DateValue"
                            value={values.DateValue}
                            label="Fecha del exámen"
                            type="date"
                            onChange={(e) => handleInputChange(e, index)}
                            isInvalid={errors[index] ? !!errors[index].DateValue : false}
                          />
                        </Col>

                        <Col m={2} className="mt-1">
                          <Form.Label> Parámetro </Form.Label>
                          <Form.Control
                            className="form-input-chem"
                            rows="10"
                            name="ParameterValue"
                            value={values.ParameterValue}
                            label="Parámetro"
                            type="text"
                            onChange={(e) => handleInputChange(e, index)}
                            isInvalid={errors[index] ? !!errors[index].ParameterValue : false}
                          />
                        </Col>

                        <Col m={2} className="mt-1">
                          <Form.Label> Valor </Form.Label>
                          <Form.Control
                            className="form-input-chem"
                            rows="10"
                            name="ValueValue"
                            value={values.ValueValue}
                            label="Valor"
                            type="text"
                            onChange={(e) => handleInputChange(e, index)}
                            isInvalid={errors[index] ? !!errors[index].ValueValue : false}
                          />
                        </Col>

                        <Col m={2} className="mt-1">
                          <Form.Label> Valor de referencia </Form.Label>
                          <Form.Control
                            className="form-input-chem"
                            rows="10"
                            name="ReferenceValue"
                            value={values.ReferenceValue}
                            label="Valor de referencia"
                            type="text"
                            onChange={(e) => handleInputChange(e, index)}
                            isInvalid={errors[index] ? !!errors[index].ReferenceValue : false}
                          />
                        </Col>

                        <Col m={3} className="mt-1">
                          <Form.Label> Interpretación </Form.Label>
                          <Form.Control
                            className="form-input-chem"
                            rows="10"
                            name="InterpretationValue"
                            value={values.InterpretationValue}
                            label="Interpretación"
                            type="text"
                            onChange={(e) => handleInputChange(e, index)}
                            isInvalid={errors[index] ? !!errors[index].InterpretationValue : false}
                          />
                        </Col>

                        <Col xs={1} className="btn-box mt-1">
                          {currentActivityBiochemists.length !== 1 && <DeleteIcon className="deleteIcon" onClick={() => handleRemoveClick(index)} />}
                          {currentActivityBiochemists.length - 1 === index && <AddCircleIcon onClick={() => handleAddClick()} />}
                        </Col>
                      </Row>
                      <Row className="align-items-center form-biochem-none">
                        <Col m={2}>
                          <Form.Control.Feedback className="mt-0" type="invalid">
                            {errors[index] ? errors[index].DateValue : null}
                          </Form.Control.Feedback>
                        </Col>
                        <Col m={2}>
                          <Form.Control.Feedback className="mt-0" type="invalid">
                            {errors[index] ? errors[index].ParameterValue : null}
                          </Form.Control.Feedback>
                        </Col>
                        <Col m={2}>
                          <Form.Control.Feedback className="mt-0" type="invalid">
                            {errors[index] ? errors[index].ValueValue : null}
                          </Form.Control.Feedback>
                        </Col>
                        <Col m={2}>
                          <Form.Control.Feedback className="mt-0" type="invalid">
                            {errors[index] ? errors[index].referenceValue : null}
                          </Form.Control.Feedback>
                        </Col>
                        <Col m={3}>
                          <Form.Control.Feedback className="mt-0" type="invalid">
                            {errors[index] ? errors[index].InterpretationValue : null}
                          </Form.Control.Feedback>
                        </Col>
                      </Row>
                    </div>
                  );
                })}
                <div className="row align-items-center" style={{ paddingBottom: "15px" }}>
                  <div className="col-sm" align="right">
                    <Button
                      variant="outline-primary"
                      style={{ padding: "5px 30px", margin: "0px", marginTop: "20px" }}
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
              {openWarningModal && (
                <Modal show={openWarningModal} onHide={handleClose} animation={false}>
                  <Modal.Header closeButton>
                    <Modal.Title>¡Recuerda!</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <span>Tu actividad fue guardada, pero los siguientes campos están vacíos: </span>
                    <div style={{ padding: "15px" }}>
                      {Object.values(warnings).map((_item, index) => {
                        return Object.values(warnings[index]).map((item) => {
                          return (
                            <li key={item}>
                              {item} #{index + 1}
                            </li>
                          );
                        });
                      })}
                    </div>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="outline-primary" className="buttonModal" onClick={() => handleClose()}>
                      Cerrar
                    </Button>
                  </Modal.Footer>
                </Modal>
              )}
            </div>
          </div>
        </div>
      </div>
      {showModalInfoB && (
        <ModalInfo
          show={showModalInfoB}
          handleClose={() => setShowModalInfoB(false)}
          textInfo={sectionInfo.description !== "" ? sectionInfo.description : defaultTextModal}
        />
      )}
    </div>
  );
}

export default LevelOneBiochemistryForm;
