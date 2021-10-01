import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon as Fas } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-regular-svg-icons";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { ModalInfo } from "../../../activity_dev/helpers/GeneralInfo";
import { TitleSection } from "../../../activity_dev/helpers/TitleSection";
import { GeneralDataForm } from "./GeneralDataForm";
import { PatientDataForm } from "./PatientDataForm";
import { useSelector } from "react-redux";
import { defaultTextModal } from "../../../../helpers/ModalTexts";
import GetSectionData from "../../../../helpers/GetSectionDataHelper";
import { VisualizePDF } from "../../../VisualizePDF/VisualizePDF";

function LevelOneGeneralInfo() {
  const { name, clinicCase } = useSelector((state) => state.activity);
  const [showFirstCard, setShowFirstCard] = useState(false);
  const [showSecondCard, setShowSecondCard] = useState(false);
  const [showModalInfoG, setShowModalInfoG] = useState(false);

  const { sectionInfo } = GetSectionData("G");

  const handleInfoPageG = async () => {
    setShowModalInfoG(true);
  };

  const openFirstCardPage = () => {
    setShowSecondCard(false);
    setShowFirstCard(true);
  };

  const openSecondCardPage = () => {
    setShowSecondCard(true);
    setShowFirstCard(false);
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
          <span style={{ color: "black" }}>INFORMACIÓN GENERAL </span>
          <Fas icon={faInfoCircle} color="#FFBF00" className="solidIcon" onClick={() => handleInfoPageG()} />
        </div>
        <div className="break" />
        <hr className="breakLineDev" />
        <div className="d-flex flex-column-fluid">
          <div className="buttonGroup">
            <Button className="buttonCss" onClick={() => openFirstCardPage()}>
              Datos generales
            </Button>
            <Button className="buttonCss" onClick={() => openSecondCardPage()}>
              Datos del paciente
            </Button>
          </div>
          <div className="form-lvl-buttons" id="myDiv">
            {showModalInfoG && (
              <ModalInfo
                show={showModalInfoG}
                handleClose={() => setShowModalInfoG(false)}
                textInfo={sectionInfo.description !== "" ? sectionInfo.description : defaultTextModal}
              />
            )}
            {showFirstCard ? <GeneralDataForm /> : null}
            {showSecondCard ? <PatientDataForm /> : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LevelOneGeneralInfo;
