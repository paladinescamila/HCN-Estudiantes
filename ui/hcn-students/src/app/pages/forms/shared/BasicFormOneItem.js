import React, { useState } from "react";
import { FontAwesomeIcon as Fas } from "@fortawesome/react-fontawesome";
import { TitleSection } from "../../activity_dev/helpers/TitleSection";
import { faUserCircle } from "@fortawesome/free-regular-svg-icons";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { ModalInfo } from "../../activity_dev/helpers/GeneralInfo";
import { useSelector } from "react-redux";
import DiagnosisForm from "./diagnosis/DiagnosisForm";
import ConsultationForm from "./consultation-reason/ConsultationForm";
import TreatmentForm from "./treatment/TreatmentForm";
import { defaultTextModal } from "../../../helpers/ModalTexts";
import GetSectionData from "../../../helpers/GetSectionDataHelper";
import { VisualizePDF } from "../../VisualizePDF/VisualizePDF";

function BasicFormOneItem({ section }) {
  const { name, sections, clinicCase } = useSelector((state) => state.activity);
  const [showModalInfoD, setShowModalInfoD] = useState(false);
  const [showModalInfoCR, setShowModalInfoCR] = useState(false);
  const [showModalInfoT, setShowModalInfoT] = useState(false);

  const handleInfoPageD = async () => {
    setShowModalInfoD(true);
  };

  const handleInfoPageCR = async () => {
    setShowModalInfoCR(true);
  };

  const handleInfoPageT = async () => {
    setShowModalInfoT(true);
  };

  const getHelpTextOfSection = (section) => {
    const { sectionInfo } = GetSectionData(section);
    return sectionInfo.description;
  };

  const ModalTextSections = {
    CR: sections.includes("consultation reason") ? getHelpTextOfSection("CR") : null,
    D: sections.includes("diagnosis") ? getHelpTextOfSection("D") : null,
    T: sections.includes("treatment") ? getHelpTextOfSection("T") : null,
  };

  const sectionInfo = () => {
    switch (section) {
      case "Consultation":
        return {
          titleInfo: (
            <span>
              <span style={{ color: "black" }}>MOTIVO DE LA CONSULTA </span>
              <Fas icon={faInfoCircle} className="solidIcon" onClick={() => handleInfoPageCR()} />
            </span>
          ),
          modal: <ConsultationForm />,
        };
      case "Diagnosis":
        return {
          titleInfo: (
            <span>
              <span style={{ color: "black" }}>DIAGNÓSTICO </span>
              <Fas icon={faInfoCircle} className="solidIcon" onClick={() => handleInfoPageD()} />
            </span>
          ),
          modal: <DiagnosisForm />,
        };
      case "Treatment":
        return {
          titleInfo: (
            <span>
              <span style={{ color: "black" }}>TRATAMIENTO </span>
              <Fas icon={faInfoCircle} className="solidIcon" onClick={() => handleInfoPageT()} />
            </span>
          ),
          modal: <TreatmentForm />,
        };
      default:
        return <div></div>;
    }
  };
  const currentSection = sectionInfo();

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
        <div id="upright">{currentSection.titleInfo}</div>
        <div className="break" />
        <hr className="breakLineDev" />
        <div className="d-flex flex-column-fluid">{currentSection.modal}</div>
      </div>
      {showModalInfoD && (
        <ModalInfo
          show={showModalInfoD}
          handleClose={() => setShowModalInfoD(false)}
          textInfo={ModalTextSections.D !== "" ? ModalTextSections.D : defaultTextModal}
        />
      )}
      {showModalInfoT && (
        <ModalInfo
          show={showModalInfoT}
          handleClose={() => setShowModalInfoT(false)}
          textInfo={ModalTextSections.T !== "" ? ModalTextSections.T : defaultTextModal}
        />
      )}
      {showModalInfoCR && (
        <ModalInfo
          show={showModalInfoCR}
          handleClose={() => setShowModalInfoCR(false)}
          textInfo={ModalTextSections.CR !== "" ? ModalTextSections.CR : defaultTextModal}
        />
      )}
    </div>
  );
}

export default BasicFormOneItem;
