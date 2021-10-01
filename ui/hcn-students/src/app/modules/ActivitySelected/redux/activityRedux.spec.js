import { activitySlice, initActivityState, actions } from "./activityRedux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import store from "../../../../redux/store";
import {
  formMockPrev,
  currentActivityGeneralMock,
  generalDataAfterMock,
  currentActivityHCNDataMock,
  currentActivityPersonalInfoMock,
  currentActivityAnthroMock,
  AnthroDataAfterMock,
  currentActivityConsultationMock,
  consultationDataAfterMock,
  currentActivityDiagnosisMock,
  diagnosisDataAfterMock,
  currentActivityTreatmentMock,
  treatmentDataAfterMock,
  currentActivityBiochemistsMock,
  biochemistsDataAfterMock,
} from "../../../test/mocks/Form.mock";
const activityService = require("./activityService");

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
describe("activityRedux", () => {
  let storemock = mockStore([]);
  const updateActivityServiceMock = jest.spyOn(activityService, "updateActivitySection");
  const getFormServiceMock = jest.spyOn(activityService, "getFormFromActivity");
  const sendActivityServiceMock = jest.spyOn(activityService, "sendActivity");

  beforeEach(() => {
    storemock = mockStore([]);
    updateActivityServiceMock.mockImplementation(() => Promise.resolve({ success: true, mssg: "Sección actualizada con éxito" }));
    getFormServiceMock.mockImplementation(() => Promise.resolve({ success: true, data: { naForm: {}, aids: [] } }));
    sendActivityServiceMock.mockImplementation(() => Promise.resolve());
  });

  afterEach(() => {
    updateActivityServiceMock.mockClear();
    getFormServiceMock.mockClear();
    sendActivityServiceMock.mockClear();
  });

  it("should return the initial state on first run", () => {
    expect(activitySlice.reducer(undefined, {})).toEqual(initActivityState);
  });

  it("should call the setId action", () => {
    // Arrange
    const id = 1;
    const actionSetId = [{ payload: { id: id, type: "SET_ID" }, type: "Activity/setId" }];

    // Act
    storemock.dispatch(actions.setId(id));
    const actionsResponse = storemock.getActions();

    // Assert
    expect(actionsResponse).toEqual(actionSetId);
  });

  it("should update the id when the setId function is called", () => {
    // Arrange
    const id = 1;

    // Act
    store.dispatch(actions.setId(id));
    const activityResponse = store.getState().activity.id;

    // Assert
    expect(activityResponse).toEqual(id);
  });

  it("should call the setDifficulty action", () => {
    // Arrange
    const difficulty = 1;
    const actionSetDifficulty = [{ payload: { difficulty: difficulty, type: "SET_DIFFICULTY" }, type: "Activity/setDifficulty" }];

    // Act
    storemock.dispatch(actions.setDifficulty(difficulty));
    const actionsResponse = storemock.getActions();

    // Assert
    expect(actionsResponse).toEqual(actionSetDifficulty);
  });

  it("should update the difficulty when the setDifficulty function is called", () => {
    // Arrange
    const difficulty = 1;

    // Act
    store.dispatch(actions.setDifficulty(difficulty));
    const activityResponse = store.getState().activity.difficulty;

    // Assert
    expect(activityResponse).toEqual(difficulty);
  });

  it("should call the setName action", () => {
    // Arrange
    const name = "Actividad #23";
    const actionSetName = [{ payload: { name: name, type: "SET_NAME" }, type: "Activity/setName" }];

    // Act
    storemock.dispatch(actions.setName(name));
    const actionsResponse = storemock.getActions();

    // Assert
    expect(actionsResponse).toEqual(actionSetName);
  });

  it("should update the name when the setName function is called", () => {
    // Arrange
    const name = "Actividad #23";

    // Act
    store.dispatch(actions.setName(name));
    const activityResponse = store.getState().activity.name;

    // Assert
    expect(activityResponse).toEqual(name);
  });

  it("should call the setStatus action", () => {
    // Arrange
    const status = "Calificada";
    const actionSetStatus = [{ payload: { status: status, type: "SET_STATUS" }, type: "Activity/setStatus" }];

    // Act
    storemock.dispatch(actions.setStatus(status));
    const actionsResponse = storemock.getActions();

    // Assert
    expect(actionsResponse).toEqual(actionSetStatus);
  });

  it("should update the status when the setStatus function is called", () => {
    // Arrange
    const status = "Calificada";

    // Act
    store.dispatch(actions.setStatus(status));
    const activityResponse = store.getState().activity.status;

    // Assert
    expect(activityResponse).toEqual(status);
  });

  it("should call the setCC action", () => {
    // Arrange
    const clinicCase = "wwww.google.com";
    const actionSetCC = [{ payload: { clinicCase: clinicCase, type: "SET_CC" }, type: "Activity/setCC" }];

    // Act
    storemock.dispatch(actions.setCC(clinicCase));
    const actionsResponse = storemock.getActions();

    // Assert
    expect(actionsResponse).toEqual(actionSetCC);
  });

  it("should update the clinic case when the setCC function is called", () => {
    // Arrange
    const clinicCase = "wwww.google.com";

    // Act
    store.dispatch(actions.setCC(clinicCase));
    const activityResponse = store.getState().activity.clinicCase;

    // Assert
    expect(activityResponse).toEqual(clinicCase);
  });

  it("should call the setName, setDifficulty, setForm, setAids, setSections and setStatus actions the cleanActivity function is called", () => {
    // Arrange
    const actionSetId = { payload: { id: undefined, type: "SET_ID" }, type: "Activity/setId" };
    const actionSetDifficulty = { payload: { difficulty: undefined, type: "SET_DIFFICULTY" }, type: "Activity/setDifficulty" };
    const actionSetName = { payload: { name: "", type: "SET_NAME" }, type: "Activity/setName" };
    const actionSetCC = { payload: { clinicCase: undefined, type: "SET_CC" }, type: "Activity/setCC" };
    const actionSetSections = { payload: { sections: [], type: "SET_SECTIONS" }, type: "Activity/setSections" };
    const actionSetForm = { payload: { form: undefined, type: "SET_FORM" }, type: "Activity/setForm" };
    const actionSetAids = { payload: { aids: undefined, type: "SET_AIDS" }, type: "Activity/setAids" };
    const actionSetStatus = { payload: { status: undefined, type: "SET_STATUS" }, type: "Activity/setStatus" };

    // Act
    storemock.dispatch(actions.cleanActivity());
    const actionsResponse = storemock.getActions();

    // Assert
    expect(actionsResponse).toEqual([
      actionSetId,
      actionSetName,
      actionSetDifficulty,
      actionSetForm,
      actionSetAids,
      actionSetCC,
      actionSetSections,
      actionSetStatus,
    ]);
  });

  it("should update the variables to the init state when the cleanActivity function is called", () => {
    // Act
    store.dispatch(actions.cleanActivity());
    const activityResponse = store.getState().activity;

    // Assert
    expect(activityResponse).toEqual(initActivityState);
  });

  it("should call the setSections action", () => {
    // Arrange
    const sections = [];
    const actionSetSections = [{ payload: { sections: sections, type: "SET_SECTIONS" }, type: "Activity/setSections" }];

    // Act
    storemock.dispatch(actions.setSections(sections));
    const actionsResponse = storemock.getActions();

    // Assert
    expect(actionsResponse).toEqual(actionSetSections);
  });

  it("should update the sections when the setSections function is called", () => {
    // Arrange
    const sections = [];

    // Act
    store.dispatch(actions.setSections(sections));
    const activityResponse = store.getState().activity.sections;

    // Assert
    expect(activityResponse).toEqual(sections);
  });

  it("should call the getFormFromActivity service", () => {
    // Arrange
    const activityId = 2;

    // Act
    store.dispatch(actions.getActivityForm(activityId));

    // Assert
    expect(getFormServiceMock).toHaveBeenCalledWith(activityId);
    expect(getFormServiceMock).toHaveBeenCalledTimes(1);
  });

  it("should update the GeneralData section when the updateActivity is called for that section", () => {
    // Arrange
    const props = { ...currentActivityGeneralMock, section: "GeneralData", sectionIndex: 0, form: formMockPrev };
    const form = JSON.parse(JSON.stringify(props.form));
    form.sections[0] = generalDataAfterMock;

    // Act
    store.dispatch(actions.updateActivity(props));

    // Assert
    expect(updateActivityServiceMock).toHaveBeenCalledWith(form.id, form);
    expect(updateActivityServiceMock).toHaveBeenCalledTimes(1);
  });

  it("should update the HCNData section when the updateActivity is called for that section", () => {
    // Arrange
    const props = { ...currentActivityHCNDataMock, section: "HCNData", sectionIndex: 0, form: formMockPrev };
    const form = JSON.parse(JSON.stringify(props.form));
    form.sections[0].fields[0] = generalDataAfterMock.fields[0];

    // Act
    store.dispatch(actions.updateActivity(props));

    // Assert
    expect(updateActivityServiceMock).toHaveBeenCalledWith(form.id, form);
    expect(updateActivityServiceMock).toHaveBeenCalledTimes(1);
  });

  it("should update the PatientData section when the updateActivity is called for that section", () => {
    // Arrange
    const props = { ...currentActivityPersonalInfoMock, section: "PatientData", sectionIndex: 0, form: formMockPrev };
    const form = JSON.parse(JSON.stringify(props.form));
    form.sections[0].fields[1] = generalDataAfterMock.fields[1];

    // Act
    store.dispatch(actions.updateActivity(props));

    // Assert
    expect(updateActivityServiceMock).toHaveBeenCalledWith(form.id, form);
    expect(updateActivityServiceMock).toHaveBeenCalledTimes(1);
  });

  it("should update the Anthropometric section when the updateActivity is called for that section", () => {
    // Arrange
    const props = { ...currentActivityAnthroMock, section: "Anthro", sectionIndex: 1, form: formMockPrev };
    const form = JSON.parse(JSON.stringify(props.form));
    form.sections[1] = AnthroDataAfterMock;

    // Act
    store.dispatch(actions.updateActivity(props));

    // Assert
    expect(updateActivityServiceMock).toHaveBeenCalledWith(form.id, form);
    expect(updateActivityServiceMock).toHaveBeenCalledTimes(1);
  });

  it("should update the Consultation section when the updateActivity is called for that section", () => {
    // Arrange
    const props = { ...currentActivityConsultationMock, section: "Consultation", sectionIndex: 2, form: formMockPrev };
    const form = JSON.parse(JSON.stringify(props.form));
    form.sections[2] = consultationDataAfterMock;

    // Act
    store.dispatch(actions.updateActivity(props));

    // Assert
    expect(updateActivityServiceMock).toHaveBeenCalledWith(form.id, form);
    expect(updateActivityServiceMock).toHaveBeenCalledTimes(1);
  });

  it("should update the Diagnosis section when the updateActivity is called for that section", () => {
    // Arrange
    const props = { ...currentActivityDiagnosisMock, section: "Diagnosis", sectionIndex: 3, form: formMockPrev };
    const form = JSON.parse(JSON.stringify(props.form));
    form.sections[3] = diagnosisDataAfterMock;

    // Act
    store.dispatch(actions.updateActivity(props));

    // Assert
    expect(updateActivityServiceMock).toHaveBeenCalledWith(form.id, form);
    expect(updateActivityServiceMock).toHaveBeenCalledTimes(1);
  });

  it("should update the Treatment section when the updateActivity is called for that section", () => {
    // Arrange
    const props = { ...currentActivityTreatmentMock, section: "Treatment", sectionIndex: 4, form: formMockPrev };
    const form = JSON.parse(JSON.stringify(props.form));
    form.sections[4] = treatmentDataAfterMock;

    // Act
    store.dispatch(actions.updateActivity(props));

    // Assert
    expect(updateActivityServiceMock).toHaveBeenCalledWith(form.id, form);
    expect(updateActivityServiceMock).toHaveBeenCalledTimes(1);
  });

  it("should update the Biochemists section when the updateActivity is called for that section", () => {
    // Arrange
    const props = { currentActivityBiochemists: currentActivityBiochemistsMock, section: "Biochemists", sectionIndex: 5, form: formMockPrev };
    const form = JSON.parse(JSON.stringify(props.form));
    form.sections[5] = biochemistsDataAfterMock;

    // Act
    store.dispatch(actions.updateActivity(props));

    // Assert
    expect(updateActivityServiceMock).toHaveBeenCalledWith(form.id, form);
    expect(updateActivityServiceMock).toHaveBeenCalledTimes(1);
  });

  it("should call the updateActivitySection service", () => {
    // Arrange
    const props = { sectionIndex: 1, form: formMockPrev };

    // Act
    store.dispatch(actions.updateActivity(props));

    // Assert
    expect(updateActivityServiceMock).toHaveBeenCalledWith(props.form.id, props.form);
    expect(updateActivityServiceMock).toHaveBeenCalledTimes(1);
  });

  it("should call the sendActivity service", () => {
    // Arrange
    const props = { activityId: 2, data: { email: "julianazs@email.com", name: "Juliana S" } };

    // Act
    store.dispatch(actions.endActivity(props));

    // Assert
    expect(sendActivityServiceMock).toHaveBeenCalledWith(props.activityId, props.data);
    expect(sendActivityServiceMock).toHaveBeenCalledTimes(1);
  });
});
