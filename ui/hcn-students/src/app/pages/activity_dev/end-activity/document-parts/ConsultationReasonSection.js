import React from "react";
import GetSectionData from "../../../../helpers/GetSectionDataHelper";
import { useSelector } from "react-redux";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import ErrorIcon from "@material-ui/icons/Error";
import { FinalFeedbackInterpretation } from "./final-feedback/FinalFeedback";

export function ConsultationReasonSection() {
  const { sectionInfo } = GetSectionData("CR");
  const { status } = useSelector((state) => state.activity);

  const validateFieldInter = (field) => {
    const feed = FinalFeedbackInterpretation(field);
    return feed;
  };

  return (
    <div>
      <p style={{ fontWeight: "bold", fontSize: "20px" }}> Historia clínica nutricional </p>
      {status !== "Calificada" ? (
        <div className="row">
          <span className="pl-3" align="left">
            <p style={{ fontWeight: "bold" }}> Motivo de consulta: </p>
          </span>
          {validateFieldInter(sectionInfo.fields[0].value) !== null ? (
            <span align="left">
              <OverlayTrigger
                placement="right"
                trigger="focus"
                overlay={<Tooltip id="tooltip-info-error-r">{validateFieldInter(sectionInfo.fields[0].value)}</Tooltip>}
                transition={false}
              >
                {({ ref, ...triggerHandler }) => (
                  <button
                    variant="none"
                    style={{
                      background: "transparent",
                      border: "none",
                    }}
                    {...triggerHandler}
                    className="d-inline-flex align-items-center button-transparent"
                  >
                    <ErrorIcon ref={ref} className="error-icon" />
                  </button>
                )}
              </OverlayTrigger>
            </span>
          ) : null}
        </div>
      ) : (
        <p style={{ fontWeight: "bold" }}> Motivo de consulta: </p>
      )}
      <p> {sectionInfo.fields[0].value} </p>
    </div>
  );
}
