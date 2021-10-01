import React from "react";
import GetSectionData from "../../../../helpers/GetSectionDataHelper";
import { useSelector } from "react-redux";
import { FinalFeedbackAnthroValues, FinalFeedbackInterpretation } from "./final-feedback/FinalFeedback";
import ErrorIcon from "@material-ui/icons/Error";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

export function AnthopometrySection() {
  const { sectionInfo } = GetSectionData("A");
  const { status } = useSelector((state) => state.activity);
  const anthroValues = Object.values(sectionInfo.fields);

  const validateFieldValue = (field) => {
    const feed = FinalFeedbackAnthroValues(field);
    return feed;
  };

  const validateFieldInter = (field) => {
    const feed = FinalFeedbackInterpretation(field);
    return feed;
  };

  const AnthroTable = anthroValues.map((field, indexHCN) => {
    const indicatorsValues = Object.values(field.subfields);
    let parameterRows;

    //If the field does not have indicators
    Object.entries(field.subfields).length === 0
      ? (parameterRows = (
          <tr key={indexHCN}>
            <td style={{ verticalAlign: "middle", textAlign: "center" }}>
              <span className="ml-1">{field.name}</span>
            </td>
            <td className="tdDisabled"></td>
            <td>
              {status !== "Calificada" ? (
                <div className="row">
                  <span className="col-sm-7 mr-2 icon-right" align="middle">
                    {field.value}
                  </span>
                  {validateFieldValue(field) !== null ? (
                    <span className="col-sm mr-2 icon-right" align="right">
                      <OverlayTrigger
                        placement="bottom"
                        trigger="focus"
                        overlay={<Tooltip id="tooltip-info-error">{validateFieldValue(field)}</Tooltip>}
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
                field.value
              )}
            </td>
            {field.requiresInterpretation ? (
              <td>
                {status !== "Calificada" ? (
                  <div className="row">
                    <span className="col-sm-7 mr-2 icon-right" align="middle">
                      {field.interpretation}
                    </span>
                    {validateFieldInter(field.interpretation) !== null ? (
                      <span className="col-sm mr-2 icon-right" align="right">
                        <OverlayTrigger
                          placement="bottom"
                          trigger="focus"
                          overlay={<Tooltip id="tooltip-info-error">{validateFieldInter(field.interpretation)}</Tooltip>}
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
            ) : (
              <td className="tdDisabled"></td>
            )}
          </tr>
        ))
      : //Otherwise
        (parameterRows = indicatorsValues.map((indicator, indexIndicator) => {
          const paramaterName =
            indexIndicator === 0 ? (
              <td rowSpan={indicatorsValues.length} style={{ verticalAlign: "middle", textAlign: "center" }}>
                <span className="ml-1">{field.name}</span>
              </td>
            ) : null;
          const indicatorName = <td style={{ verticalAlign: "middle", textAlign: "center" }}>{indicator.name}</td>;
          const value = (
            <td>
              {status !== "Calificada" ? (
                <div className="row">
                  <span className="col-sm-7 mr-2 icon-right" align="middle">
                    {indicator.value}
                  </span>
                  {validateFieldValue(indicator) !== null ? (
                    <span className="col-sm mr-2 icon-right" align="right">
                      <OverlayTrigger
                        placement="bottom"
                        trigger="focus"
                        overlay={<Tooltip id="tooltip-info-error">{validateFieldValue(indicator)}</Tooltip>}
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
                indicator.value
              )}
            </td>
          );
          const interpretation = indicator.requiresInterpretation ? (
            <td>
              {status !== "Calificada" ? (
                <div className="row">
                  <span className="col-sm-7 mr-2 icon-right" align="middle">
                    {indicator.interpretation}
                  </span>
                  {validateFieldInter(indicator.interpretation) !== null ? (
                    <span className="col-sm mr-2 icon-right" align="right">
                      <OverlayTrigger
                        placement="bottom"
                        trigger="focus"
                        overlay={<Tooltip id="tooltip-info-error">{validateFieldInter(indicator.interpretation)}</Tooltip>}
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
                indicator.interpretation
              )}
            </td>
          ) : (
            <td className="tdDisabled"></td>
          );
          return (
            <tr key={indexIndicator}>
              {paramaterName}
              {indicatorName}
              {value}
              {interpretation}
            </tr>
          );
        }));
    return parameterRows;
  });

  return (
    <div>
      <p style={{ fontWeight: "bold", fontSize: "20px" }}> Antropometría </p>
      <div id="end-activity-table">
        <table className="table-4">
          <tbody>
            <tr id="colorTaText">
              <th>Parámetro</th>
              <th>Indicador</th>
              <th>Valor</th>
              <th>Interpretación</th>
            </tr>
            {AnthroTable}
          </tbody>
        </table>
      </div>
    </div>
  );
}
