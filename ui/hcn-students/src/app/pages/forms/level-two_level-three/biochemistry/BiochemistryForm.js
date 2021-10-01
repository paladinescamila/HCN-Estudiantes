import React, { useState } from "react";
import { Button, Col } from "react-bootstrap";
import { actions as actionsActivitySelected } from "../../../../modules/ActivitySelected/redux/activityRedux";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import CircularProgress from "@material-ui/core/CircularProgress";
import "react-toastify/dist/ReactToastify.css";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import DeleteIcon from "@material-ui/icons/Delete";
import GetSectionData from "../../../../helpers/GetSectionDataHelper";

function BiochemistryForm() {
  const { form, timer } = useSelector((state) => state.activity);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const { sectionInfo, sectionIndex } = GetSectionData("B");

  //Map the current activity to the fields in the form.
  const [currentActivityBiochemists, setCurrentActivity] = useState(
    sectionInfo.fields[0].value === ""
      ? [
          {
            DateValue: new Date().toISOString().slice(0, 10),
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
        })
  );

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...currentActivityBiochemists];
    list[index][name] = value;
    setCurrentActivity(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...currentActivityBiochemists];
    list.splice(index, 1);
    setCurrentActivity(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setCurrentActivity([
      ...currentActivityBiochemists,
      {
        DateValue: new Date().toISOString().slice(0, 10),
        ParameterValue: "",
        ValueValue: "",
        ReferenceValue: "",
        InterpretationValue: "",
      },
    ]);
  };

  const buttonSaveText = "Guardar";
  const SaveDataForm = (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(
      actionsActivitySelected.updateActivity({
        timer: timer,
        currentActivityBiochemists: currentActivityBiochemists,
        section: "Biochemists",
        sectionIndex: sectionIndex,
        form: form,
      })
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

  //The table for the biochemistry fields
  const BiochemistryTable = currentActivityBiochemists.map((field, index) => {
    let parameterRows;
    parameterRows = (
      <tr key={index}>
        <td>
          <input
            style={{ verticalAlign: "middle", textAlign: "center" }}
            type="date"
            placeholder="Fecha del examen"
            name="DateValue"
            onChange={(e) => handleInputChange(e, index)}
            value={field.DateValue}
          />
        </td>
        <td>
          <input
            style={{ verticalAlign: "middle", textAlign: "center" }}
            type="text"
            placeholder="Parámetro"
            name="ParameterValue"
            onChange={(e) => handleInputChange(e, index)}
            value={field.ParameterValue}
          />
        </td>
        <td>
          <input
            style={{ verticalAlign: "middle", textAlign: "center" }}
            type="text"
            placeholder="Valor"
            name="ValueValue"
            onChange={(e) => handleInputChange(e, index)}
            value={field.ValueValue}
          />
        </td>
        <td>
          <input
            style={{ verticalAlign: "middle", textAlign: "center" }}
            type="text"
            placeholder="Valor de referencia"
            name="ReferenceValue"
            onChange={(e) => handleInputChange(e, index)}
            value={field.ReferenceValue}
          />
        </td>
        <td>
          <input
            style={{ verticalAlign: "middle", textAlign: "center" }}
            type="text"
            placeholder="Interpretación"
            name="InterpretationValue"
            onChange={(e) => handleInputChange(e, index)}
            value={field.InterpretationValue}
          />
        </td>
        <Col xs={1} className="btn-box-table mr-4">
          {currentActivityBiochemists.length !== 1 && <DeleteIcon className="deleteIcon" onClick={() => handleRemoveClick(index)} />}
          {currentActivityBiochemists.length - 1 === index && <AddCircleIcon onClick={() => handleAddClick()} />}
        </Col>
      </tr>
    );
    return parameterRows;
  });

  return (
    <div>
      <div id="todays-table">
        <table className="table-5">
          <tbody>
            <tr id="colorTaInput">
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
    </div>
  );
}

export default BiochemistryForm;
