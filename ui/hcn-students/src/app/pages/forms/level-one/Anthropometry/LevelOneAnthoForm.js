import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon as Fas } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-regular-svg-icons";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { ModalInfo } from "../../../activity_dev/helpers/GeneralInfo";
import { SkinFoldsForm } from "./SkinFoldsForm";
import { CircumferencesForm } from "./CircumferencesForm";
import { WeightForm } from "./WeightForm";
import "./LevelOneForm.css";
import { TitleSection } from "../../../activity_dev/helpers/TitleSection";
import { SizeForm } from "./SizeForm";
import { StructureForm } from "./StructureForm";
import { BMIForm } from "./BMIForm";
import { useSelector } from "react-redux";
import { defaultTextModal } from "../../../../helpers/ModalTexts";
import GetSectionData from "../../../../helpers/GetSectionDataHelper";
import { VisualizePDF } from "../../../VisualizePDF/VisualizePDF";

function LevelOneAnthoForm() {
  const { name, clinicCase } = useSelector((state) => state.activity);
  const [showFirstCard, setShowFirstCard] = useState(false);
  const [showSecondCard, setShowSecondCard] = useState(false);
  const [showThirdCard, setShowThirdCard] = useState(false);
  const [showFourthCard, setShowFourthCard] = useState(false);
  const [showFifhtCard, setShowFifthCard] = useState(false);
  const [showSixthCard, setShowSixthCard] = useState(false);
  const [showModalInfoA, setShowModalInfoA] = useState(false);

  const { sectionInfo } = GetSectionData("A");

  const handleInfoPageA = async () => {
    setShowModalInfoA(true);
  };

  const openFirstCardPage = () => {
    setShowSecondCard(false);
    setShowFirstCard(true);
    setShowThirdCard(false);
    setShowFourthCard(false);
    setShowFifthCard(false);
    setShowSixthCard(false);
  };

  const openSecondCardPage = () => {
    setShowSecondCard(true);
    setShowFirstCard(false);
    setShowThirdCard(false);
    setShowFourthCard(false);
    setShowFifthCard(false);
    setShowSixthCard(false);
  };

  const openThirdCardPage = () => {
    setShowSecondCard(false);
    setShowFirstCard(false);
    setShowThirdCard(true);
    setShowFourthCard(false);
    setShowFifthCard(false);
    setShowSixthCard(false);
  };

  const openFourthCardPage = () => {
    setShowSecondCard(false);
    setShowFirstCard(false);
    setShowThirdCard(false);
    setShowFourthCard(true);
    setShowFifthCard(false);
    setShowSixthCard(false);
  };

  const openFifthCardPage = () => {
    setShowSecondCard(false);
    setShowFirstCard(false);
    setShowThirdCard(false);
    setShowFourthCard(false);
    setShowFifthCard(true);
    setShowSixthCard(false);
  };

  const openSixthCardPage = () => {
    setShowSecondCard(false);
    setShowFirstCard(false);
    setShowThirdCard(false);
    setShowFourthCard(false);
    setShowFifthCard(false);
    setShowSixthCard(true);
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
          <span style={{ color: "black" }}>INDICADORES ANTROPOMÉTRICOS </span>
          <Fas icon={faInfoCircle} color="#FFBF00" className="solidIcon" onClick={() => handleInfoPageA()} />
        </div>
        <div className="break" />
        <hr className="breakLineDev" />
        <div className="d-flex flex-column-fluid">
          <div className="buttonGroup">
            <Button className="buttonCss" onClick={() => openFirstCardPage()}>
              Peso
            </Button>
            <Button className="buttonCss" onClick={() => openSecondCardPage()}>
              Pliegues
            </Button>
            <Button className="buttonCss" onClick={() => openThirdCardPage()}>
              Perímetros
            </Button>
            <Button className="buttonCss" onClick={() => openFourthCardPage()}>
              Talla
            </Button>
            <Button className="buttonCss" onClick={() => openFifthCardPage()}>
              Estructura
            </Button>
            <Button className="buttonCss" onClick={() => openSixthCardPage()}>
              IMC
            </Button>
          </div>
          <div className="form-lvl-buttons" id="myDiv">
            {showModalInfoA && (
              <ModalInfo
                show={showModalInfoA}
                handleClose={() => setShowModalInfoA(false)}
                textInfo={sectionInfo.description !== "" ? sectionInfo.description : defaultTextModal}
              />
            )}
            {showFirstCard ? <WeightForm /> : null}
            {showSecondCard ? <SkinFoldsForm /> : null}
            {showThirdCard ? <CircumferencesForm /> : null}
            {showFourthCard ? <SizeForm /> : null}
            {showFifhtCard ? <StructureForm /> : null}
            {showSixthCard ? <BMIForm /> : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LevelOneAnthoForm;
