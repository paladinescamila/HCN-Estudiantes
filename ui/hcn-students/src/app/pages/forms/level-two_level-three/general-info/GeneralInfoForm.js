import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { actions as actionsActivitySelected } from "../../../../modules/ActivitySelected/redux/activityRedux";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import CircularProgress from "@material-ui/core/CircularProgress";
import "react-toastify/dist/ReactToastify.css";
import GetSectionData from "../../../../helpers/GetSectionDataHelper";
import { valueField } from "../../helpers/MapFieldsVariable";

function GeneralInfoForm() {
  const { form, timer } = useSelector((state) => state.activity);
  const buttonSaveText = "Guardar";
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const { sectionInfo, sectionIndex } = GetSectionData("G");

  //Map the current activity to the fields in the form.
  const [currentActivityHCNData, setCurrentActivityHCN] = useState({
    ValuationDateValue: sectionInfo.fields[0].subfields[0].value,
    MedicalRecordNumberValue: sectionInfo.fields[0].subfields[1].value,
    EntryDateValue: sectionInfo.fields[0].subfields[2].value,
    RoomValue: sectionInfo.fields[0].subfields[3].value,
  });

  //This function helps to detect the changes in the fields and update it.
  const handleChangeHCN = (event) => {
    const { name, value } = event.target;
    setCurrentActivityHCN({
      ...currentActivityHCNData,
      [name]: value,
    });
  };

  const personalInfoValues = Object.values(sectionInfo.fields[1].subfields);

  //Map the current activity to the fields in the form.
  const [currentActivityPersonalInfo, setCurrentActivityPatient] = useState({
    FullNameValue: sectionInfo.fields[1].subfields[0].value,
    BirthDateValue: sectionInfo.fields[1].subfields[1].value,
    GenderValue: sectionInfo.fields[1].subfields[2].value,
    SexValue: sectionInfo.fields[1].subfields[3].value,
    AgeValue: sectionInfo.fields[1].subfields[4].value,
    SPEValue: sectionInfo.fields[1].subfields[5].value,
    PhoneValue: sectionInfo.fields[1].subfields[6].value,
    OccupationValue: sectionInfo.fields[1].subfields[7].value,
    CivilStatusValue: sectionInfo.fields[1].subfields[8].value,
  });

  //This function helps to detect the changes in the fields and update it.
  const handleChangePatient = (event) => {
    const { name, value } = event.target;
    setCurrentActivityPatient({
      ...currentActivityPersonalInfo,
      [name]: value,
    });
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
          <input
            style={{ verticalAlign: "middle", textAlign: "center" }}
            type={info.name.includes("Fecha") ? "date" : "text"}
            placeholder="Valor"
            name={info.cellName + valueField}
            onChange={(e) => handleChangePatient(e)}
            value={currentActivityPersonalInfo[info.cellName + valueField]}
          />
        </td>
      </tr>
    );
    return rows;
  });

  const SaveDataForm = (e) => {
    e.preventDefault();
    setLoading(true);
    const currentActivityGeneral = { currentActivityHCNData, currentActivityPersonalInfo };
    dispatch(
      actionsActivitySelected.updateActivity({
        timer: timer,
        ...currentActivityGeneral,
        section: "GeneralData",
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

  return (
    <div>
      {/* HCN Information Section */}
      <div>
        <h4 style={{ padding: "20px 0px 0px 20px" }}>Información Historia Clínica</h4>
        <div id="todays-table">
          <table className="table2">
            <tbody>
              <tr id="colorTaInput">
                <th>Fecha de valoración</th>
                <th>No. Historia clínica</th>
                <th>Fecha de ingreso</th>
                <th>Habitación</th>
              </tr>
              <tr>
                <td>
                  <input
                    style={{ verticalAlign: "middle", textAlign: "center" }}
                    type="date"
                    name="ValuationDateValue"
                    onChange={(e) => handleChangeHCN(e)}
                    value={currentActivityHCNData.ValuationDateValue}
                  />
                </td>
                <td>
                  <input
                    style={{ verticalAlign: "middle", textAlign: "center" }}
                    type="text"
                    name="MedicalRecordNumberValue"
                    onChange={(e) => handleChangeHCN(e)}
                    value={currentActivityHCNData.MedicalRecordNumberValue}
                  />
                </td>
                <td>
                  <input
                    style={{ verticalAlign: "middle", textAlign: "center" }}
                    type="date"
                    name="EntryDateValue"
                    onChange={(e) => handleChangeHCN(e)}
                    value={currentActivityHCNData.EntryDateValue}
                  />
                </td>
                <td>
                  <input
                    style={{ verticalAlign: "middle", textAlign: "center" }}
                    type="text"
                    name="RoomValue"
                    onChange={(e) => handleChangeHCN(e)}
                    value={currentActivityHCNData.RoomValue}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {/* Patient Information Section */}
      <div>
        <h4 style={{ padding: "20px 0px 0px 20px" }}>Información Personal del paciente</h4>
        <div id="todays-table">
          <table className="tableColLeft">
            <tbody>{personalInfoTable}</tbody>
          </table>
        </div>
      </div>

      <div className="row align-items-center" style={{ paddingBottom: "15px" }}>
        <div className="col-sm" align="right">
          <Button
            style={{
              padding: "5px 30px",
              margin: "0px",
              marginRight: "20px",
            }}
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

export default GeneralInfoForm;
