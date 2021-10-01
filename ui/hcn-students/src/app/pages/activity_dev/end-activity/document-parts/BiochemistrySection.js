import React from "react";
import GetSectionData from "../../../../helpers/GetSectionDataHelper";
import { useSelector } from "react-redux";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import ErrorIcon from "@material-ui/icons/Error";
import { FinalFeedbackDateLower, FinalFeedbackInterpretation } from "./final-feedback/FinalFeedback";

export function BiochemistrySection() {
  const { sectionInfo } = GetSectionData("B");
  const { status } = useSelector((state) => state.activity);
  const Biochems =
    sectionInfo.fields[0].value === ""
      ? [
          {
            DateValue: "",
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
        });

  const validateFieldValue = (field) => {
    const feed = FinalFeedbackDateLower(field);
    return feed;
  };

  const validateFieldInter = (field) => {
    const feed = FinalFeedbackInterpretation(field);
    return feed;
  };
  //The table for the biochemistry fields
  const BiochemistryTable = Biochems.map((field, index) => {
    let parameterRows;
    parameterRows = (
      <tr key={index}>
        <td style={{ verticalAlign: "middle", textAlign: "center" }}>
          {status !== "Calificada" ? (
            <div className="row">
              <span className="col-sm-7 mr-2 icon-right" align="middle">
                {field.DateValue}
              </span>
              {validateFieldValue(field.DateValue) !== null ? (
                <span className="col-sm mr-2 icon-right" align="right">
                  <OverlayTrigger
                    placement="bottom"
                    trigger="focus"
                    overlay={<Tooltip id="tooltip-info-error">{validateFieldValue(field.DateValue)}</Tooltip>}
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
            field.interpretation
          )}
        </td>
        <td style={{ verticalAlign: "middle", textAlign: "center" }}>
          {status !== "Calificada" ? (
            <div className="row">
              <span className="col-sm-7 mr-2 icon-right" align="middle">
                {field.ParameterValue}
              </span>
              {validateFieldInter(field.ParameterValue) !== null ? (
                <span className="col-sm mr-2 icon-right" align="right">
                  <OverlayTrigger
                    placement="bottom"
                    trigger="focus"
                    overlay={<Tooltip id="tooltip-info-error">{validateFieldInter(field.ParameterValue)}</Tooltip>}
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
            field.ParameterValue
          )}
        </td>
        <td style={{ verticalAlign: "middle", textAlign: "center" }}>
          {status !== "Calificada" ? (
            <div className="row">
              <span className="col-sm-7 mr-2 icon-right" align="middle">
                {field.ValueValue}
              </span>
              {validateFieldInter(field.ValueValue) !== null ? (
                <span className="col-sm mr-2 icon-right" align="right">
                  <OverlayTrigger
                    placement="bottom"
                    trigger="focus"
                    overlay={<Tooltip id="tooltip-info-error">{validateFieldInter(field.ValueValue)}</Tooltip>}
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
            field.ValueValue
          )}
        </td>
        <td style={{ verticalAlign: "middle", textAlign: "center" }}>
          {status !== "Calificada" ? (
            <div className="row">
              <span className="col-sm-7 mr-2 icon-right" align="middle">
                {field.ReferenceValue}
              </span>
              {validateFieldInter(field.ReferenceValue) !== null ? (
                <span className="col-sm mr-2 icon-right" align="right">
                  <OverlayTrigger
                    placement="bottom"
                    trigger="focus"
                    overlay={<Tooltip id="tooltip-info-error">{validateFieldInter(field.ReferenceValue)}</Tooltip>}
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
            field.ReferenceValue
          )}
        </td>
        <td style={{ verticalAlign: "middle", textAlign: "center" }}>
          {status !== "Calificada" ? (
            <div className="row">
              <span className="col-sm-7 mr-2 icon-right" align="middle">
                {field.InterpretationValue}
              </span>
              {validateFieldInter(field.InterpretationValue) !== null ? (
                <span className="col-sm mr-2 icon-right" align="right">
                  <OverlayTrigger
                    placement="bottom"
                    trigger="focus"
                    overlay={<Tooltip id="tooltip-info-error">{validateFieldInter(field.InterpretationValue)}</Tooltip>}
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
            field.InterpretationValue
          )}
        </td>
      </tr>
    );
    return parameterRows;
  });

  return (
    <div>
      <p style={{ fontWeight: "bold", fontSize: "20px" }}> Bioquímica </p>
      <div id="end-activity-table">
        <table className="table-5">
          <tbody>
            <tr id="colorTaText">
              <th>Fecha</th>
              <th>Parámetro</th>
              <th>Valor</th>
              <th>Valor de referencia</th>
              <th>Interpretación</th>
            </tr>
            {BiochemistryTable}
          </tbody>
        </table>
      </div>
    </div>
  );
}
