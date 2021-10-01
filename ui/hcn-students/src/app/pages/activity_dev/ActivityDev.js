import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon as Fas } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-regular-svg-icons";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { useHistory, withRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import "./ActivityDev.css";
import { TitleSection } from "./helpers/TitleSection";
import { ModalInfo } from "./helpers/GeneralInfo";
import { toAbsoluteUrl } from "../../helpers";
import AnthroForm from "../forms/level-two_level-three/anthropometry/AnthropometryForm";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GeneralInfoForm from "../forms/level-two_level-three/general-info/GeneralInfoForm";
import { defaultTextModal } from "../../helpers/ModalTexts";
import TreatmentForm from "../forms/shared/treatment/TreatmentForm";
import DiagnosisForm from "../forms/shared/diagnosis/DiagnosisForm";
import ConsultationForm from "../forms/shared/consultation-reason/ConsultationForm";
import BiochemistryForm from "../forms/level-two_level-three/biochemistry/BiochemistryForm";
import GetSectionData from "../../helpers/GetSectionDataHelper";
import { VisualizePDF } from "../VisualizePDF/VisualizePDF";

//If the activity is configured in the first level
function FirstLevel() {
  const history = useHistory();
  const { name, sections } = useSelector((state) => state.activity);

  const chooseClassType = (section) => {
    return sections.includes(section) ? "sectionsCards" : "sectionsCardsDisabled";
  };

  const beginSection = (section_url, section_name) => {
    sections.includes(section_name)
      ? history.push(section_url)
      : toast.error("Esta sección no está habilitada para esta actividad", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
  };

  return (
    <div className="widget-dev">
      {TitleSection(name)}
      <div className="card-group">
        <Button className={chooseClassType("general info")} onClick={() => beginSection("/general-info", "general info")}>
          <img className="card-img-top image-card" alt="" src={toAbsoluteUrl("/media/icons/general-data.png")} />
          <div className="card-body">
            <h5 className="card-title">Datos generales</h5>
          </div>
        </Button>
        <Button className={chooseClassType("consultation reason")} onClick={() => beginSection("/consultation-reason", "consultation reason")}>
          <img className="card-img-top image-card" alt="" src={toAbsoluteUrl("/media/icons/consultation-reason.png")} />
          <div className="card-body">
            <h5 className="card-title">Motivo de consulta</h5>
          </div>
        </Button>
        <Button className={chooseClassType("anthropometric")} onClick={() => beginSection("/anthropometry", "anthropometric")}>
          <img className="card-img-top image-card" alt="" src={toAbsoluteUrl("/media/icons/tape-measure.png")} />
          <div className="card-body">
            <h5 className="card-title">Antropometría</h5>
          </div>
        </Button>
        <Button className={chooseClassType("biochemists")} onClick={() => beginSection("/biochemistry", "biochemists")}>
          <img className="card-img-top image-card" alt="" src={toAbsoluteUrl("/media/icons/biochemistry.png")} />
          <div className="card-body">
            <h5 className="card-title">Bioquímica</h5>
          </div>
        </Button>
        <Button className={chooseClassType("clinics")}>
          <img className="card-img-top image-card" alt="" src={toAbsoluteUrl("/media/icons/clinicals.png")} />
          <div className="card-body">
            <h5 className="card-title">Clínica</h5>
          </div>
        </Button>
        <Button className={chooseClassType("dietetics")}>
          <img className="card-img-top image-card" alt="" src={toAbsoluteUrl("/media/icons/dietary.png")} />
          <div className="card-body">
            <h5 className="card-title"> Dietética</h5>
          </div>
        </Button>
        <Button className={chooseClassType("diagnosis")} onClick={() => beginSection("/diagnosis", "diagnosis")}>
          <img className="card-img-top image-card" alt="" src={toAbsoluteUrl("/media/icons/diagnosis.png")} />
          <div className="card-body">
            <h5 className="card-title">Diagnóstico</h5>
          </div>
        </Button>
        <Button className={chooseClassType("treatment")} onClick={() => beginSection("/treatment", "treatment")}>
          <img className="card-img-top image-card" alt="" src={toAbsoluteUrl("/media/icons/treatment.png")} />
          <div className="card-body">
            <h5 className="card-title">Tratamiento</h5>
          </div>
        </Button>
      </div>
    </div>
  );
}

//If the activity is configure in the second or third level
function OtherLevels() {
  const [showModalInfoA, setShowModalInfoA] = useState(false);
  const [showModalInfoG, setShowModalInfoG] = useState(false);
  const [showModalInfoCR, setShowModalInfoCR] = useState(false);
  const [showModalInfoD, setShowModalInfoD] = useState(false);
  const [showModalInfoT, setShowModalInfoT] = useState(false);
  const [showModalInfoB, setShowModalInfoB] = useState(false);
  const [showConsultationForm, setShowConsultationForm] = useState(false);
  const [showAnthoForm, setShowAnthoForm] = useState(false);
  const [showGeneralInfoForm, setShowGeneralInfoForm] = useState(false);
  const [showDiagnosisForm, setShowDiagnosisForm] = useState(false);
  const [showTreatmentForm, setShowTreatmentForm] = useState(false);
  const [showBiochemistryForm, setShowBiochemistryForm] = useState(false);
  const [titleModule, setTitleModule] = useState(undefined);
  const { sections, name, clinicCase } = useSelector((state) => state.activity);

  const chooseClassType = (section) => {
    return sections.includes(section) ? "buttonCss" : "buttonCssDisabled";
  };

  //Function to open the modal for anthropometric data section.
  const handleInfoPageA = () => {
    setShowModalInfoA(true);
  };

  //Function to open the modal for general information data section.
  const handleInfoPageG = () => {
    setShowModalInfoG(true);
  };

  //Function to open the modal for consultation reason data section.
  const handleInfoPageCR = () => {
    setShowModalInfoCR(true);
  };

  //Function to open the modal for diagnosis data section.
  const handleInfoPageD = () => {
    setShowModalInfoD(true);
  };

  //Function to open the modal for treatment data section.
  const handleInfoPageT = () => {
    setShowModalInfoT(true);
  };

  //Function to open the modal for treatment data section.
  const handleInfoPageB = () => {
    setShowModalInfoB(true);
  };

  //Define the possible module titles.
  const TitlesModule = {
    titleInfoA: (
      <span>
        <span style={{ color: "black" }}>INDICADORES ANTROPOMÉTRICOS </span>
        <Fas icon={faInfoCircle} className="solidIcon" onClick={() => handleInfoPageA()} />
      </span>
    ),
    titleInfoG: (
      <span>
        <span style={{ color: "black" }}>INDICADORES GENERALES </span>
        <Fas icon={faInfoCircle} className="solidIcon" onClick={() => handleInfoPageG()} />
      </span>
    ),
    titleInfoCR: (
      <span>
        <span style={{ color: "black" }}>MOTIVO DE LA CONSULTA </span>
        <Fas icon={faInfoCircle} className="solidIcon" onClick={() => handleInfoPageCR()} />
      </span>
    ),
    titleInfoD: (
      <span>
        <span style={{ color: "black" }}>DIAGNÓSTICO </span>
        <Fas icon={faInfoCircle} className="solidIcon" onClick={() => handleInfoPageD()} />
      </span>
    ),
    titleInfoT: (
      <span>
        <span style={{ color: "black" }}>TRATAMIENTO </span>
        <Fas icon={faInfoCircle} className="solidIcon" onClick={() => handleInfoPageT()} />
      </span>
    ),
    titleInfoB: (
      <span>
        <span style={{ color: "black" }}>INDICADORES BIOQUÍMICOS </span>
        <Fas icon={faInfoCircle} className="solidIcon" onClick={() => handleInfoPageB()} />
      </span>
    ),
  };

  const getHelpTextOfSection = (section) => {
    const { sectionInfo } = GetSectionData(section);
    return sectionInfo.description;
  };

  const ModalTextSections = {
    A: sections.includes("anthropometric") ? getHelpTextOfSection("A") : null,
    B: sections.includes("biochemists") ? getHelpTextOfSection("B") : null,
    CR: sections.includes("consultation reason") ? getHelpTextOfSection("CR") : null,
    D: sections.includes("diagnosis") ? getHelpTextOfSection("D") : null,
    T: sections.includes("treatment") ? getHelpTextOfSection("T") : null,
    G: sections.includes("general info") ? getHelpTextOfSection("G") : null,
  };

  //Function to render the General information component
  const openGeneralInfoForm = () => {
    setShowAnthoForm(false);
    setShowBiochemistryForm(false);
    setShowGeneralInfoForm(true);
    setShowConsultationForm(false);
    setShowDiagnosisForm(false);
    setShowTreatmentForm(false);
    setTitleModule(TitlesModule.titleInfoG);
  };

  //Function to render the Consultation reason component
  const openConsultationForm = () => {
    setShowAnthoForm(false);
    setShowBiochemistryForm(false);
    setShowGeneralInfoForm(false);
    setShowConsultationForm(true);
    setShowDiagnosisForm(false);
    setShowTreatmentForm(false);
    setTitleModule(TitlesModule.titleInfoCR);
  };

  //Function to render the Anthropometric component
  const openAnthroForm = () => {
    setShowAnthoForm(true);
    setShowBiochemistryForm(false);
    setShowGeneralInfoForm(false);
    setShowConsultationForm(false);
    setShowDiagnosisForm(false);
    setShowTreatmentForm(false);
    setTitleModule(TitlesModule.titleInfoA);
  };

  //Function to render the Anthropometric component
  const openBiochemistryForm = () => {
    setShowAnthoForm(false);
    setShowBiochemistryForm(true);
    setShowGeneralInfoForm(false);
    setShowConsultationForm(false);
    setShowDiagnosisForm(false);
    setShowTreatmentForm(false);
    setTitleModule(TitlesModule.titleInfoB);
  };

  //Function to render the Diagnosis component
  const openDiagnosisForm = () => {
    setShowAnthoForm(false);
    setShowBiochemistryForm(false);
    setShowGeneralInfoForm(false);
    setShowConsultationForm(false);
    setShowDiagnosisForm(true);
    setShowTreatmentForm(false);
    setTitleModule(TitlesModule.titleInfoD);
  };

  //Function to render the Treatment component
  const openTreatmentForm = () => {
    setShowAnthoForm(false);
    setShowBiochemistryForm(false);
    setShowGeneralInfoForm(false);
    setShowConsultationForm(false);
    setShowDiagnosisForm(false);
    setShowTreatmentForm(true);
    setTitleModule(TitlesModule.titleInfoT);
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
          <span style={{ color: "#00000", fontWeight: "bold" }}>Módulo: </span>
          {titleModule}
        </div>
        <div className="break" />
        <hr className="breakLineDev" />
        <div className="d-flex">
          <div className="buttonGroup">
            <Button className={chooseClassType("general info")} onClick={() => openGeneralInfoForm()}>
              Datos Generales
            </Button>
            <Button className={chooseClassType("consultation reason")} onClick={() => openConsultationForm()}>
              Motivo de la consulta
            </Button>
            <Button className={chooseClassType("anthropometric")} onClick={() => openAnthroForm()}>
              Indicadores antropométricos
            </Button>
            <Button className={chooseClassType("biochemists")} onClick={() => openBiochemistryForm()}>
              Indicadores bioquímicos
            </Button>
            <Button className={chooseClassType("clinicians")}> Indicadores clínicos</Button>
            <Button className={chooseClassType("dietetics")}> Indicadores dietéticos </Button>
            <Button className={chooseClassType("diagnosis")} onClick={() => openDiagnosisForm()}>
              Diagnóstico
            </Button>
            <Button className={chooseClassType("treatment")} onClick={() => openTreatmentForm()}>
              Tratamiento
            </Button>
          </div>

          <div className="Form" id="myDiv">
            {showAnthoForm ? <AnthroForm /> : null}
            {showGeneralInfoForm ? <GeneralInfoForm /> : null}
            {showConsultationForm ? <ConsultationForm /> : null}
            {showDiagnosisForm ? <DiagnosisForm /> : null}
            {showTreatmentForm ? <TreatmentForm /> : null}
            {showBiochemistryForm ? <BiochemistryForm /> : null}
          </div>
          {showModalInfoA && (
            <ModalInfo
              show={showModalInfoA}
              handleClose={() => setShowModalInfoA(false)}
              textInfo={ModalTextSections.A !== "" ? ModalTextSections.A : defaultTextModal}
            />
          )}
          {showModalInfoG && (
            <ModalInfo
              show={showModalInfoG}
              handleClose={() => setShowModalInfoG(false)}
              textInfo={ModalTextSections.G !== "" ? ModalTextSections.G : defaultTextModal}
            />
          )}
          {showModalInfoCR && (
            <ModalInfo
              show={showModalInfoCR}
              handleClose={() => setShowModalInfoCR(false)}
              textInfo={ModalTextSections.CR !== "" ? ModalTextSections.CR : defaultTextModal}
            />
          )}
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
          {showModalInfoB && (
            <ModalInfo
              show={showModalInfoB}
              handleClose={() => setShowModalInfoB(false)}
              textInfo={ModalTextSections.B !== "" ? ModalTextSections.B : defaultTextModal}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export function ActivityDev() {
  const { difficulty } = useSelector((state) => state.activity);

  switch (difficulty) {
    case 0:
      return FirstLevel();
    case 1:
      return OtherLevels();
    case 2:
      return OtherLevels();
    default:
      return <div></div>;
  }
}

export default withRouter(ActivityDev);
