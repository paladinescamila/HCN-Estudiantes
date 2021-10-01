import { createSlice } from "@reduxjs/toolkit";
import { getFormFromActivity, updateActivitySection, sendActivity, updateActivityTime } from "./activityService";

export const initActivityState = {
  id: undefined,
  name: "",
  difficulty: undefined,
  status: undefined,
  form: undefined,
  aids: undefined,
  clinicCase: undefined,
  sections: [],
  timer: undefined,
};

const actionTypes = {
  set_id: "SET_ID",
  get_id: "GET_ID",
  set_name: "SET_NAME",
  get_name: "GET_NAME",
  set_difficulty: "SET_DIFFICULTY",
  get_difficulty: "GET_DIFFICULTY",
  set_aids: "SET_AIDS",
  set_sections: "SET_SECTIONS",
  update_activity: "UPDATE_ACTIVITY",
  set_form: "SET_FORM",
  set_status: "SET_STATUS",
  set_clinic_case: "SET_CC",
  set_timer: "SET_TIME",
};

const setId = (id) => (dispatch) => {
  dispatch(activitySlice.actions.setId({ type: actionTypes.set_id, id }));
};

const setDifficulty = (difficulty) => (dispatch) => {
  dispatch(
    activitySlice.actions.setDifficulty({
      type: actionTypes.set_difficulty,
      difficulty,
    })
  );
};

const setName = (name) => (dispatch) => {
  dispatch(
    activitySlice.actions.setName({
      type: actionTypes.set_name,
      name,
    })
  );
};

const setStatus = (status) => (dispatch) => {
  dispatch(activitySlice.actions.setStatus({ type: actionTypes.set_status, status }));
};

const setCC = (clinicCase) => (dispatch) => {
  dispatch(activitySlice.actions.setCC({ type: actionTypes.set_clinic_case, clinicCase }));
};

const setTimer = (timer) => (dispatch) => {
  console.log(timer);
  dispatch(activitySlice.actions.setTimer({ type: actionTypes.set_timer, timer }));
};

const cleanActivity = () => (dispatch) => {
  dispatch(activitySlice.actions.setId({ type: actionTypes.set_id, id: undefined }));
  dispatch(
    activitySlice.actions.setName({
      type: actionTypes.set_name,
      name: "",
    })
  );
  dispatch(
    activitySlice.actions.setDifficulty({
      type: actionTypes.set_difficulty,
      difficulty: undefined,
    })
  );
  dispatch(
    activitySlice.actions.setForm({
      type: actionTypes.set_form,
      form: undefined,
    })
  );
  dispatch(
    activitySlice.actions.setAids({
      type: actionTypes.set_aids,
      aids: undefined,
    })
  );
  dispatch(activitySlice.actions.setCC({ type: actionTypes.set_clinic_case, clinicCase: undefined }));
  dispatch(activitySlice.actions.setSections({ type: actionTypes.set_sections, sections: [] }));
  dispatch(
    activitySlice.actions.setStatus({
      type: actionTypes.set_status,
      status: undefined,
    })
  );
  dispatch(
    activitySlice.actions.setTimer({
      type: actionTypes.set_timer,
      timer: undefined,
    })
  );
};

const setSections = (sections) => (dispatch) => {
  dispatch(activitySlice.actions.setSections({ type: actionTypes.set_sections, sections }));
};

const getActivityForm = (activityId) => async (dispatch) => {
  const response = await getFormFromActivity(activityId);
  if (response.data) {
    dispatch(
      activitySlice.actions.setForm({
        type: actionTypes.set_form,
        form: response.data.naForm,
      })
    );
    dispatch(
      activitySlice.actions.setAids({
        type: actionTypes.set_form,
        aids: response.data.aids,
      })
    );
    dispatch(
      activitySlice.actions.setTimer({
        type: actionTypes.set_timer,
        timer: new Date().toUTCString(),
      })
    );
  }
  return response;
};

const updateTimer = (props) => async (dispatch) => {
  var timer_difference_seconds = (new Date().getTime() - new Date(props.timer).getTime()) / 1000;
  const updateTimer = await updateActivityTime(props.activityId, timer_difference_seconds);
  if (updateTimer.success) {
    dispatch(
      activitySlice.actions.setTimer({
        type: actionTypes.set_timer,
        timer: new Date().toUTCString(),
      })
    );
  }
  return updateTimer;
};

const updateActivity = (props) => async (dispatch) => {
  const sectionIndex = props.sectionIndex;
  let form = JSON.parse(JSON.stringify(props.form));

  //To update the timer in seconds
  var timer_difference_seconds = (new Date().getTime() - new Date(props.timer).getTime()) / 1000;

  if (props.section === "GeneralData") {
    form.sections[sectionIndex].fields[0].subfields[0].value = props.currentActivityHCNData.ValuationDateValue;
    form.sections[sectionIndex].fields[0].subfields[1].value = props.currentActivityHCNData.MedicalRecordNumberValue;
    form.sections[sectionIndex].fields[0].subfields[2].value = props.currentActivityHCNData.EntryDateValue;
    form.sections[sectionIndex].fields[0].subfields[3].value = props.currentActivityHCNData.RoomValue;
    form.sections[sectionIndex].fields[1].subfields[0].value = props.currentActivityPersonalInfo.FullNameValue;
    form.sections[sectionIndex].fields[1].subfields[1].value = props.currentActivityPersonalInfo.BirthDateValue;
    form.sections[sectionIndex].fields[1].subfields[2].value = props.currentActivityPersonalInfo.GenderValue;
    form.sections[sectionIndex].fields[1].subfields[3].value = props.currentActivityPersonalInfo.SexValue;
    form.sections[sectionIndex].fields[1].subfields[4].value = props.currentActivityPersonalInfo.AgeValue;
    form.sections[sectionIndex].fields[1].subfields[5].value = props.currentActivityPersonalInfo.SPEValue;
    form.sections[sectionIndex].fields[1].subfields[6].value = props.currentActivityPersonalInfo.PhoneValue;
    form.sections[sectionIndex].fields[1].subfields[7].value = props.currentActivityPersonalInfo.OccupationValue;
    form.sections[sectionIndex].fields[1].subfields[8].value = props.currentActivityPersonalInfo.CivilStatusValue;
  } else if (props.section === "HCNData") {
    form.sections[sectionIndex].fields[0].subfields[0].value = props.ValuationDateValue;
    form.sections[sectionIndex].fields[0].subfields[1].value = props.MedicalRecordNumberValue;
    form.sections[sectionIndex].fields[0].subfields[2].value = props.EntryDateValue;
    form.sections[sectionIndex].fields[0].subfields[3].value = props.RoomValue;
  } else if (props.section === "PatientData") {
    form.sections[sectionIndex].fields[1].subfields[0].value = props.FullNameValue;
    form.sections[sectionIndex].fields[1].subfields[1].value = props.BirthDateValue;
    form.sections[sectionIndex].fields[1].subfields[2].value = props.GenderValue;
    form.sections[sectionIndex].fields[1].subfields[3].value = props.SexValue;
    form.sections[sectionIndex].fields[1].subfields[4].value = props.AgeValue;
    form.sections[sectionIndex].fields[1].subfields[5].value = props.SPEValue;
    form.sections[sectionIndex].fields[1].subfields[6].value = props.PhoneValue;
    form.sections[sectionIndex].fields[1].subfields[7].value = props.OccupationValue;
    form.sections[sectionIndex].fields[1].subfields[8].value = props.CivilStatusValue;
  } else if (props.section === "Anthro") {
    form.sections[sectionIndex].fields[0].subfields[0].value = props.CurrentWeightValue;
    form.sections[sectionIndex].fields[0].subfields[1].value = props.UsualWeightValue;
    form.sections[sectionIndex].fields[0].subfields[2].value = props.ReferenceWeightValue;
    form.sections[sectionIndex].fields[0].subfields[3].value = props.PercentageChangeValue;
    form.sections[sectionIndex].fields[0].subfields[0].interpretation = props.CurrentWeightInter;
    form.sections[sectionIndex].fields[0].subfields[1].interpretation = props.UsualWeightInter;
    form.sections[sectionIndex].fields[0].subfields[2].interpretation = props.ReferenceWeightInter;
    form.sections[sectionIndex].fields[0].subfields[3].interpretation = props.PercentageChangeInter;
    form.sections[sectionIndex].fields[1].value = props.TricipalFoldValue;
    form.sections[sectionIndex].fields[1].interpretation = props.TricipalFoldInter;
    form.sections[sectionIndex].fields[2].value = props.SubscapularFoldValue;
    form.sections[sectionIndex].fields[2].interpretation = props.SubscapularFoldInter;
    form.sections[sectionIndex].fields[3].value = props.BrachialPerimeterValue;
    form.sections[sectionIndex].fields[3].interpretation = props.BrachialPerimeterInter;
    form.sections[sectionIndex].fields[4].value = props.AbdominalPerimeterValue;
    form.sections[sectionIndex].fields[4].interpretation = props.AbdominalPerimeterInter;
    form.sections[sectionIndex].fields[5].value = props.SizeValue;
    form.sections[sectionIndex].fields[5].interpretation = props.SizeInter;
    form.sections[sectionIndex].fields[6].value = props.StructureValue;
    form.sections[sectionIndex].fields[6].interpretation = props.StructureInter;
    form.sections[sectionIndex].fields[7].value = props.BMIValue;
    form.sections[sectionIndex].fields[7].interpretation = props.BMIInter;
  } else if (props.section === "Consultation") {
    form.sections[sectionIndex].fields[0].value = props.ConsultationReasonValue;
  } else if (props.section === "Diagnosis") {
    form.sections[sectionIndex].fields[0].value = props.DiagnosticValue;
  } else if (props.section === "Treatment") {
    form.sections[sectionIndex].fields[0].value = props.NutritionalPlanValue;
  } else if (props.section === "Biochemists") {
    const BiochemistryFormString = props.currentActivityBiochemists.map((b) => {
      return {
        date: b.DateValue,
        parameter: b.ParameterValue,
        value: b.ValueValue,
        referenceValue: b.ReferenceValue,
        interpretation: b.InterpretationValue,
      };
    });
    form.sections[sectionIndex].fields[0].value = JSON.stringify(BiochemistryFormString);
  }
  const updateStatus = await updateActivitySection(form.id, form, timer_difference_seconds);
  if (updateStatus.success) {
    dispatch(
      activitySlice.actions.setForm({
        type: actionTypes.set_form,
        form: form,
      })
    );
    dispatch(
      activitySlice.actions.setTimer({
        type: actionTypes.set_timer,
        timer: new Date().toUTCString(),
      })
    );
  }
  return updateStatus;
};

const endActivity = (props) => async () => {
  var timer_difference_seconds = (new Date().getTime() - new Date(props.timer).getTime()) / 1000;
  return await sendActivity(props.activityId, props.data, timer_difference_seconds);
};

export const actions = {
  setId,
  setDifficulty,
  setName,
  setSections,
  setStatus,
  cleanActivity,
  updateActivity,
  getActivityForm,
  endActivity,
  setCC,
  setTimer,
  updateTimer,
};

export const activitySlice = createSlice({
  name: "Activity",
  initialState: initActivityState,
  reducers: {
    setId: (state, action) => {
      const { id } = action.payload;
      state.id = id;
    },

    setDifficulty: (state, action) => {
      const { difficulty } = action.payload;
      state.difficulty = difficulty;
    },

    setName: (state, action) => {
      const { name } = action.payload;
      state.name = name;
    },

    setAids: (state, action) => {
      const { aids } = action.payload;
      state.aids = aids;
    },

    setSections: (state, action) => {
      const { sections } = action.payload;
      state.sections = sections;
    },

    setForm: (state, action) => {
      const { form } = action.payload;
      state.form = form;
    },

    setStatus: (state, action) => {
      const { status } = action.payload;
      state.status = status;
    },

    setCC: (state, action) => {
      const { clinicCase } = action.payload;
      state.clinicCase = clinicCase;
    },

    setTimer: (state, action) => {
      const { timer } = action.payload;
      state.timer = timer;
    },
  },
});
