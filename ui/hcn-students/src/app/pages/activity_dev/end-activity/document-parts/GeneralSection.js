import React from "react";
import GetSectionData from "../../../../helpers/GetSectionDataHelper";
import { useSelector } from "react-redux";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import ErrorIcon from "@material-ui/icons/Error";
import { FinalFeedbackPatientValues, FinalFeedbackDateLower, FinalFeedbackInterpretation } from "./final-feedback/FinalFeedback";

export function GeneralSection() {
  const { sectionInfo } = GetSectionData("G");
  const { status } = useSelector((state) => state.activity);
  const personalInfoValues = Object.values(sectionInfo.fields[1].subfields);

  const validateFieldDate = (field) => {
    const feed = FinalFeedbackDateLower(field);
    return feed;
  };

  const validateFieldValue = (field) => {
    return FinalFeedbackPatientValues(field);
  };

  const validateFieldInter = (field) => {
    const feed = FinalFeedbackInterpretation(field);
    return feed;
  };

  const personalInfoTable = personalInfoValues.map((info, infoIndex) => {
    const rows = (
      <tr key={infoIndex}>
        <td
          style={{
            verticalAlign: "middle",
            textAlign: "center",
            width: "6%",
            fontStyle: "italic",
          }}
        >
          {info.name}
        </td>
        <td style={{ verticalAlign: "middle", textAlign: "center" }}>
          {status !== "Calificada" ? (
            <div className="row">
              <span className="col-sm-7 mr-2 icon-right" align="middle">
                {info.value}
              </span>
              {validateFieldValue(info) !== null ? (
                <span className="col-sm mr-2 icon-right" align="right">
                  <OverlayTrigger
                    placement="bottom"
                    trigger="focus"
                    overlay={<Tooltip id="tooltip-info-error">{validateFieldValue(info)}</Tooltip>}
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
            info.value
          )}
        </td>
      </tr>
    );
    return rows;
  });
  return (
    <div>
      <div id="end-activity-table">
        <table className="table2">
          <tbody>
            <tr id="colorTaText">
              <th>Fecha de valoración</th>
              <th>No. Historia clínica</th>
              <th>Fecha de ingreso</th>
              <th>Habitación</th>
            </tr>
            <tr>
              <td>
                {status !== "Calificada" ? (
                  <div className="row">
                    <span className="col-sm-7 mr-2 icon-right" align="middle">
                      {sectionInfo.fields[0].subfields[0].value}
                    </span>
                    {validateFieldDate(sectionInfo.fields[0].subfields[0].value) !== null ? (
                      <span className="col-sm mr-2 icon-right" align="right">
                        <OverlayTrigger
                          placement="bottom"
                          trigger="focus"
                          overlay={<Tooltip id="tooltip-info-error">{validateFieldDate(sectionInfo.fields[0].subfields[0].value)}</Tooltip>}
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
                  sectionInfo.fields[0].subfields[0].value
                )}
              </td>
              <td>
                {status !== "Calificada" ? (
                  <div className="row">
                    <span className="col-sm-7 mr-2 icon-right" align="middle">
                      {sectionInfo.fields[0].subfields[1].value}
                    </span>
                    {validateFieldInter(sectionInfo.fields[0].subfields[1].value) !== null ? (
                      <span className="col-sm mr-2 icon-right" align="right">
                        <OverlayTrigger
                          placement="bottom"
                          trigger="focus"
                          overlay={<Tooltip id="tooltip-info-error">{validateFieldInter(sectionInfo.fields[0].subfields[1].value)}</Tooltip>}
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
                  sectionInfo.fields[0].subfields[1].value
                )}
              </td>
              <td>
                {status !== "Calificada" ? (
                  <div className="row">
                    <span className="col-sm-7 mr-2 icon-right" align="middle">
                      {sectionInfo.fields[0].subfields[2].value}
                    </span>
                    {validateFieldDate(sectionInfo.fields[0].subfields[2].value) !== null ? (
                      <span className="col-sm mr-2 icon-right" align="right">
                        <OverlayTrigger
                          placement="bottom"
                          trigger="focus"
                          overlay={<Tooltip id="tooltip-info-error">{validateFieldDate(sectionInfo.fields[0].subfields[2].value)}</Tooltip>}
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
                  sectionInfo.fields[0].subfields[2].value
                )}
              </td>
              <td>
                {status !== "Calificada" ? (
                  <div className="row">
                    <span className="col-sm-7 mr-2 icon-right" align="middle">
                      {sectionInfo.fields[0].subfields[3].value}
                    </span>
                    {validateFieldInter(sectionInfo.fields[0].subfields[3].value) !== null ? (
                      <span className="col-sm mr-2 icon-right" align="right">
                        <OverlayTrigger
                          placement="bottom"
                          trigger="focus"
                          overlay={<Tooltip id="tooltip-info-error">{validateFieldInter(sectionInfo.fields[0].subfields[3].value)}</Tooltip>}
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
                  sectionInfo.fields[0].subfields[3].value
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div style={{ paddingTop: "20px" }}>
        <div id="end-activity-table">
          <table className="tableColLeft">
            <tbody>{personalInfoTable}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
