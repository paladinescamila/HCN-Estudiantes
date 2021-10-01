import React, { useState } from "react";
import { Button, OverlayTrigger } from "react-bootstrap";
import "./AnthropometryForm.css";
import { FontAwesomeIcon as Fas } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { DisplayMediaModal } from "../../helpers/ModalMediaHelp";
import { actions as actionsActivitySelected } from "../../../../modules/ActivitySelected/redux/activityRedux";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import CircularProgress from "@material-ui/core/CircularProgress";
import "react-toastify/dist/ReactToastify.css";
import GetSectionData from "../../../../helpers/GetSectionDataHelper";
import { OpenPropover } from "../../helpers/OpenPropover";
import { GetHelpsCheck, HasHelpsCheck } from "../../helpers/HelpsCheck";

//These are the variables to map the fields.
const valueField = "Value";
const interpretationField = "Inter";

function AnthroForm() {
  const { form, timer, aids } = useSelector((state) => state.activity);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const { sectionInfo, sectionIndex } = GetSectionData("A");
  const anthroValues = Object.values(sectionInfo.fields);

  //Map the current activity to the fields in the form.
  const [currentActivityAnthro, setCurrentActivity] = useState({
    CurrentWeightValue: sectionInfo.fields[0].subfields[0].value,
    UsualWeightValue: sectionInfo.fields[0].subfields[1].value,
    ReferenceWeightValue: sectionInfo.fields[0].subfields[2].value,
    PercentageChangeValue: sectionInfo.fields[0].subfields[3].value,
    CurrentWeightInter: sectionInfo.fields[0].subfields[0].interpretation,
    UsualWeightInter: sectionInfo.fields[0].subfields[1].interpretation,
    ReferenceWeightInter: sectionInfo.fields[0].subfields[2].interpretation,
    PercentageChangeInter: sectionInfo.fields[0].subfields[3].interpretation,
    TricipalFoldValue: sectionInfo.fields[1].value,
    TricipalFoldInter: sectionInfo.fields[1].interpretation,
    SubscapularFoldValue: sectionInfo.fields[2].value,
    SubscapularFoldInter: sectionInfo.fields[2].interpretation,
    BrachialPerimeterValue: sectionInfo.fields[3].value,
    BrachialPerimeterInter: sectionInfo.fields[3].interpretation,
    AbdominalPerimeterValue: sectionInfo.fields[4].value,
    AbdominalPerimeterInter: sectionInfo.fields[4].interpretation,
    SizeValue: sectionInfo.fields[5].value,
    SizeInter: sectionInfo.fields[5].interpretation,
    StructureValue: sectionInfo.fields[6].value,
    StructureInter: sectionInfo.fields[6].interpretation,
    BMIValue: sectionInfo.fields[7].value,
    BMIInter: sectionInfo.fields[7].interpretation,
  });

  //This function helps to detect the changes in the fields and update it.
  const handleChange = (event) => {
    const { name, value } = event.target;
    setCurrentActivity({
      ...currentActivityAnthro,
      [name]: value,
    });
  };

  const [imageValue, setImageValue] = useState(undefined);
  const [imageTitle, setImageHelpTitle] = useState(undefined);
  const [openImageHelpModal, setOpenImageHelpModal] = useState(false);

  const handleImageHelp = (title, id) => {
    const aidsF = GetHelpsCheck({ id: id, type: "image", aids: aids });
    setImageValue(aidsF[0]);
    setOpenImageHelpModal(true);
    setImageHelpTitle(title);
  };

  const buttonSaveText = "Guardar";
  const SaveDataForm = (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(
      actionsActivitySelected.updateActivity({ timer: timer, ...currentActivityAnthro, section: "Anthro", sectionIndex: sectionIndex, form: form })
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
      }
    });
    setLoading(false);
  };

  //The table for the anthopometric fields
  const AnthroTable = anthroValues.map((field, indexHCN) => {
    const indicatorsValues = Object.values(field.subfields);
    let parameterRows;

    //If the field does not have indicators
    Object.entries(field.subfields).length === 0
      ? (parameterRows = (
          <tr key={indexHCN}>
            <td style={{ verticalAlign: "middle", textAlign: "center" }}>
              {HasHelpsCheck({ id: field.id, description: field.description, type: "text" }) ? (
                <OverlayTrigger
                  placement="right"
                  trigger="focus"
                  overlay={OpenPropover({ id: field.id, name: field.name, description: field.description, type: "text" })}
                  transition={false}
                >
                  {({ ...triggerHandler }) => (
                    <div className="row align-items-center">
                      <Button id="buttonTooltips" variant="none" {...triggerHandler} className="d-inline-flex align-items-center">
                        <span className="ml-1">
                          <span className="col ml-0">{field.name}</span>
                        </span>
                      </Button>
                      {HasHelpsCheck({
                        id: field.id,
                        description: "",
                        type: "image",
                      }) ? (
                        <span className="col-sm mr-2" align="right">
                          <Fas icon={faSearch} className="solidTrianguleIcon" onClick={() => handleImageHelp(field.name, field.id)}></Fas>
                        </span>
                      ) : null}
                    </div>
                  )}
                </OverlayTrigger>
              ) : (
                <span className="ml-1">
                  {field.name}
                  {HasHelpsCheck({
                    id: field.id,
                    description: "",
                    type: "image",
                  }) ? (
                    <span style={{ float: "right" }}>
                      <Fas icon={faSearch} className="solidTrianguleIcon" onClick={() => handleImageHelp(field.name, field.id)}></Fas>
                    </span>
                  ) : null}
                </span>
              )}
            </td>
            <td className="tdDisabled"></td>
            <td>
              <input
                style={{ verticalAlign: "middle", textAlign: "center" }}
                type="text"
                placeholder="Escriba aquí el parámetro"
                name={field.cellName + valueField}
                onChange={(e) => handleChange(e)}
                value={currentActivityAnthro[field.cellName + valueField]}
              />
            </td>
            {field.requiresInterpretation ? (
              <td>
                <input
                  style={{ verticalAlign: "middle", textAlign: "center" }}
                  type="text"
                  placeholder="Escriba aquí la interpretación del parámetro escrito"
                  name={field.cellName + interpretationField}
                  onChange={(e) => handleChange(e)}
                  value={currentActivityAnthro[field.cellName + interpretationField]}
                />
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
                {HasHelpsCheck({
                  id: field.id,
                  description: field.description,
                  type: "text",
                }) ? (
                  <OverlayTrigger
                    placement="right"
                    trigger="focus"
                    overlay={OpenPropover({ id: field.id, name: field.name, description: field.description })}
                    transition={false}
                  >
                    {({ ...triggerHandler }) => (
                      <div className="row align-items-center">
                        <Button id="buttonTooltips" variant="none" {...triggerHandler} className="d-inline-flex align-items-center">
                          <span className="ml-1">
                            <span className="col ml-4">{field.name}</span>
                          </span>
                        </Button>

                        {HasHelpsCheck({
                          id: field.id,
                          description: "",
                          type: "image",
                        }) ? (
                          <span className="col-sm mr-2" align="right">
                            <Fas icon={faSearch} className="solidTrianguleIcon" onClick={() => handleImageHelp(field.name, field.id)}></Fas>
                          </span>
                        ) : null}
                      </div>
                    )}
                  </OverlayTrigger>
                ) : (
                  <span className="ml-1">
                    {field.name}
                    {HasHelpsCheck({
                      id: field.id,
                      description: "",
                      type: "image",
                    }) ? (
                      <span style={{ float: "right" }}>
                        <Fas icon={faSearch} className="solidTrianguleIcon" onClick={() => handleImageHelp(field.name, field.id)}></Fas>
                      </span>
                    ) : null}
                  </span>
                )}
              </td>
            ) : null;
          const indicatorName = (
            <td style={{ verticalAlign: "middle", textAlign: "center" }}>
              {indicator.name}
              {HasHelpsCheck({
                id: indicator.id,
                description: "",
                type: "image",
              }) ? (
                <span style={{ float: "right" }}>
                  <Fas icon={faSearch} className="solidTrianguleIcon" onClick={() => handleImageHelp(indicator.name, indicator.id)}></Fas>
                </span>
              ) : null}
            </td>
          );
          const value = (
            <td>
              <input
                style={{ verticalAlign: "middle", textAlign: "center" }}
                className="tableFocus"
                type="text"
                placeholder="Escriba aquí el indicador"
                name={indicatorsValues[indexIndicator].cellName + valueField}
                onChange={(e) => handleChange(e)}
                value={currentActivityAnthro[indicatorsValues[indexIndicator].cellName + valueField]}
              />
            </td>
          );
          const interpretation = indicator.requiresInterpretation ? (
            <td>
              <input
                style={{ verticalAlign: "middle", textAlign: "center" }}
                className="tableFocus"
                type="text"
                placeholder="Escriba aquí la interpretación del indicador escrito"
                name={indicatorsValues[indexIndicator].cellName + interpretationField}
                onChange={(e) => handleChange(e)}
                value={currentActivityAnthro[indicatorsValues[indexIndicator].cellName + interpretationField]}
              />
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
      <div id="todays-table">
        <table className="table-4">
          <tbody>
            <tr id="colorTaInput">
              <th>Parámetro</th>
              <th>Indicador</th>
              <th>Valor</th>
              <th>Interpretación</th>
            </tr>
            {AnthroTable}
          </tbody>
        </table>
      </div>
      <div className="row align-items-center" style={{ paddingBottom: "15px" }}>
        <div className="col-sm" align="right">
          <Button
            style={{ padding: "5px 30px", margin: "0px", marginRight: "20px" }}
            className="button"
            disabled={loading}
            onClick={(e) => SaveDataForm(e)}
          >
            {loading && <CircularProgress size={20} style={{ marginRight: 20 }} />}
            {buttonSaveText}
          </Button>
        </div>
      </div>
      {openImageHelpModal && (
        <DisplayMediaModal handleClose={() => setOpenImageHelpModal(false)} show={openImageHelpModal} title={imageTitle} information={imageValue} />
      )}
    </div>
  );
}

export default AnthroForm;
