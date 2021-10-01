import React, { useState } from "react";
import "./EndActivity.css";
import { Button } from "react-bootstrap";
import { useHistory, withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { actions as actionsActivity } from "../../../modules/ActivitySelected/redux/activityRedux";
import {
  GeneralSection,
  ConsultationReasonSection,
  AnthopometrySection,
  BiochemistrySection,
  DiagnosisSection,
  TreatmentSection,
} from "./document-parts";
import GetSectionData from "../../../helpers/GetSectionDataHelper";

function EndActivity() {
  const buttonText = "Cerrar";
  const history = useHistory();
  const dispatch = useDispatch();
  const { sections, name, status, timer } = useSelector((state) => state.activity);
  const [showComm, setShowComm] = useState(false);
  var numberHours = parseFloat(timer);

  const showHideComments = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowComm(showComm === true ? false : true);
  };

  const closeActivity = (e) => {
    e.preventDefault();
    dispatch(actionsActivity.cleanActivity());
    status === "Calificada" ? history.push("/feedbacks") : history.push("/activites");
  };

  const getCommentOfSection = (section) => {
    const { sectionInfo } = GetSectionData(section);
    return sectionInfo.comment;
  };

  const calculateTotalTime = () => {
    var hoursTotalString = "";
    if (Math.floor(numberHours / 3600) > 0) {
      hoursTotalString = hoursTotalString + Math.floor(numberHours / 3600) + " horas, ";
    }
    numberHours = numberHours % 3600;
    if (Math.floor(numberHours / 60) > 0) {
      hoursTotalString = hoursTotalString + Math.floor(numberHours / 60) + " minutos, ";
    }
    hoursTotalString = hoursTotalString + Math.floor(numberHours % 60) + " segundos.";
    return hoursTotalString;
  };

  const comments = {
    A: sections.includes("anthropometric") ? getCommentOfSection("A") : null,
    B: sections.includes("biochemists") ? getCommentOfSection("B") : null,
    CR: sections.includes("consultation reason") ? getCommentOfSection("CR") : null,
    D: sections.includes("diagnosis") ? getCommentOfSection("D") : null,
    T: sections.includes("treatment") ? getCommentOfSection("T") : null,
    G: sections.includes("general info") ? getCommentOfSection("G") : null,
  };

  return (
    <div className="widget-dev">
      <div className="container-fluid" style={{ paddingBottom: "10px" }}>
        <div className="row align-items-center">
          <div className="col-sm" align="left">
            <p id="titleActivity" style={{ margin: "0px" }}>
              {name}
            </p>
          </div>
          <div className="col-sm" align="right">
            <Button variant="outline-primary" style={{ padding: "5px 30px", margin: "0px" }} className="button" onClick={(e) => closeActivity(e)}>
              {buttonText}
            </Button>
          </div>
        </div>
      </div>
      <div className="row">
        <div className={showComm ? "col-md-9 endGrid-Comm" : "endGrid"}>
          <div className="row">
            <span className="col-md pr-0">
              <h3 className="subTitleActivity mt-2" align="middle">
                Resumen resolución historia clínica nutricional
              </h3>
            </span>
            {status === "Calificada" ? (
              <span className="col-xs mr-3 buttonShared" align="right">
                <Button
                  variant="outline-primary"
                  style={{ padding: "5px 30px", margin: "0px" }}
                  className="button"
                  onClick={(e) => showHideComments(e)}
                >
                  {showComm ? "Ocultar" : "Mostrar"} comentarios
                </Button>
              </span>
            ) : null}
          </div>
          {status !== "Calificada" ? (
            <div className="mt-2">
              <span align="right" style={{ padding: "5px 0px", margin: "0px" }}>
                <b>
                  <i>Tiempo total de desarrollo: </i>
                </b>
                {calculateTotalTime()}
              </span>
            </div>
          ) : null}
          <div>
            {sections.includes("general info") ? (
              <div className="general-sec">
                <hr /> <GeneralSection />
              </div>
            ) : null}
            {sections.includes("consultation reason") ? (
              <div className="consultation-sec">
                <hr /> <ConsultationReasonSection />
              </div>
            ) : null}
            {sections.includes("anthropometric") ? (
              <div className="anthropometric-sec">
                <hr /> <AnthopometrySection />
              </div>
            ) : null}
            {sections.includes("biochemists") ? (
              <div className="biochemists-sec">
                <hr /> <BiochemistrySection />
              </div>
            ) : null}
            {sections.includes("diagnosis") ? (
              <div className="diagnosis-sec">
                <hr /> <DiagnosisSection />
              </div>
            ) : null}
            {sections.includes("treatment") ? (
              <div className="treatment-sec">
                <hr /> <TreatmentSection />
              </div>
            ) : null}
          </div>
        </div>
        {showComm ? (
          <div className="col-md-3 comments">
            <h3 className="subTitleActivity mt-2" align="middle">
              Comentarios
            </h3>
            {sections.includes("general info") ? (
              <div className="general-com mr-5">
                <hr />
                <b>Información general</b>
                <p>{comments.G !== "" ? comments.G : "¡Sin comentarios para la sección!"}</p>
              </div>
            ) : null}
            {sections.includes("consultation reason") ? (
              <div className="general-com mr-5">
                <hr />
                <b>Motivo de la consulta</b>
                <p>{comments.CR !== "" ? comments.CR : "¡Sin comentarios para la sección!"}</p>
              </div>
            ) : null}
            {sections.includes("anthropometric") ? (
              <div className="general-com mr-5">
                <hr />
                <b>Antropometría</b>
                <p>{comments.A !== "" ? comments.A : "¡Sin comentarios para la sección!"}</p>
              </div>
            ) : null}
            {sections.includes("biochemists") ? (
              <div className="general-com mr-5">
                <hr />
                <b>Bioquímica</b>
                <p>{comments.B !== "" ? comments.B : "¡Sin comentarios para la sección!"}</p>
              </div>
            ) : null}
            {sections.includes("diagnosis") ? (
              <div className="general-com mr-5">
                <hr />
                <b>Diágnostico</b>
                <p>{comments.D !== "" ? comments.D : "¡Sin comentarios para la sección!"}</p>
              </div>
            ) : null}
            {sections.includes("treatment") ? (
              <div className="general-com mr-5">
                <hr />
                <b>Tratamiento</b>
                <p>{comments.T !== "" ? comments.T : "¡Sin comentarios para la sección!"}</p>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default withRouter(EndActivity);
