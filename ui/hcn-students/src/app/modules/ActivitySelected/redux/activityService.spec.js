import axios from "axios";
import { BASE_URL, PATH_ACTIVITES, PATH_FORMS } from "../../helpers";
import { getFormFromActivity, updateActivitySection, sendActivity } from "./activityService";

jest.mock("axios");
describe("activityService", () => {
  const bodyNA = {
    general_info: {
      hcn_info: {
        valoration_date: {
          cellName: "FechaValoracion",
          id: 30,
          name: "Fecha de valoración",
          value: "2020-12-25",
        },
        hcn_number: {
          cellName: "NumeroHistoriaClinica",
          id: 31,
          name: "Número de la historia clínica",
          value: 23456,
        },
        entry_date: {
          cellName: "FechaIngreso",
          id: 32,
          name: "Fecha de ingreso",
          value: "2020-12-22",
        },
        room: {
          cellName: "Habitacion",
          id: 33,
          name: "Habitación",
          value: "N-23",
        },
      },
      patient_info: {
        full_name: {
          cellName: "NombreCompleto",
          id: 34,
          name: "Nombres y Apellidos",
          value: "Sara Martínez",
        },
        birthdate: {
          cellName: "FechaNacimiento",
          id: 35,
          name: "Fecha de nacimiento",
          value: "1999-01-23",
        },
        gender: {
          cellName: "Genero",
          id: 42,
          name: "Género",
          value: "Femenino",
        },
        sex: {
          cellName: "Sexo",
          id: 36,
          name: "Sexo",
          value: "Mujer",
        },
        age: {
          cellName: "Edad",
          id: 37,
          name: "Edad",
          value: "",
        },
        eps: {
          cellName: "EPS",
          id: 38,
          name: "EPS",
          value: "",
        },
        phone: {
          cellName: "Telefono",
          name: "Teléfono",
          id: 39,
          value: "",
        },
        ocupation: {
          cellName: "Ocupacion",
          id: 40,
          name: "Ocupación",
          value: "",
        },
        marital_status: {
          cellName: "EstadoCivil",
          id: 41,
          name: "Estado civil",
          value: "",
        },
      },
    },
    consultation_reason: {
      name: "Motivo de consulta",
      id: 23,
      value:
        "Desde hace un mes me he estado sintiendo mal. Me duelen muchos los pies, los huesos y tengo dificultad para respirar y a veces al caminar siento que me pesa como todo el cuerpo. Y después de hacerme examenes me dijeron que tenía que venir a que me evaluara un nutricionista, por eso estoy aquí.",
      type: "string",
    },
    biochemists: {
      name: "Indicadores bioquímicos",
      id: 32112,
      type: "list",
      subFields: [
        {
          date: "2021-02-25",
          parameter: "Hemoglobina g/L",
          value: "105,0",
          referenceValue: "110,0 - 119,0",
          interpretation: "El paciente presenta un bajo nivel de hemogoblina",
        },
        {
          date: "2021-02-25",
          parameter: "Albúmina g/L",
          value: "39,6",
          referenceValue: "39,0 - 41,7",
          interpretation: "",
        },
      ],
    },
  };

  const errorResponse = {
    error: "Error: El servidor no ha podido procesar la solicitud. ¡Intente de nuevo!",
    success: false,
  };

  afterEach(() => {
    axios.get.mockClear();
    axios.put.mockClear();
    axios.post.mockClear();
  });

  it("should get the form an activity", async () => {
    const sucessMessage = { success: true, data: bodyNA };
    axios.get.mockImplementationOnce(() => Promise.resolve({ data: bodyNA }));

    await expect(getFormFromActivity(1)).resolves.toEqual(sucessMessage);

    expect(axios.get).toHaveBeenCalledWith(BASE_URL + PATH_ACTIVITES + 1 + "/form");
  });

  it("should throw an error when a problem occurs getting the form of an activity", async () => {
    const errorMessage = "404 Error";
    axios.get.mockImplementationOnce(() => Promise.reject(new Error(errorMessage)));

    await expect(getFormFromActivity(1, bodyNA)).resolves.toEqual(errorResponse);

    expect(axios.get).toHaveBeenCalledWith(BASE_URL + PATH_ACTIVITES + 1 + "/form");
  });

  it("should update an activity", async () => {
    const sucessMessage = { success: true, mssg: "Sección actualizada con éxito" };
    axios.put.mockImplementationOnce(() => Promise.resolve([]));

    await expect(updateActivitySection(1, bodyNA)).resolves.toEqual(sucessMessage);

    expect(axios.put).toHaveBeenCalledWith(BASE_URL + PATH_FORMS + 1, bodyNA);
  });

  it("should throw an error when a problem occurs updating the activity", async () => {
    const errorMessage = "404 Error";
    axios.put.mockImplementationOnce(() => Promise.reject(new Error(errorMessage)));

    await expect(updateActivitySection(1, bodyNA)).resolves.toEqual(errorResponse);

    expect(axios.put).toHaveBeenCalledWith(BASE_URL + PATH_FORMS + 1, bodyNA);
  });

  it("should send an activity", async () => {
    const sucessMessage = { success: true, mssg: "Actividad enviada con éxito" };
    const sendData = { name: "Juliana Diaz", email: "julianaD@mail.com" };
    axios.post.mockImplementationOnce(() => Promise.resolve([]));

    await expect(sendActivity(1, sendData)).resolves.toEqual(sucessMessage);

    expect(axios.post).toHaveBeenCalledWith(BASE_URL + PATH_ACTIVITES + 1 + "/end", sendData);
  });

  it("should throw an error when a problem occurs sending the activity", async () => {
    const errorMessage = "404 Error";
    axios.post.mockImplementationOnce(() => Promise.reject(new Error(errorMessage)));
    const sendData = { name: "Juliana Diaz", email: "julianaD@mail.com" };

    await expect(sendActivity(1, sendData)).resolves.toEqual(errorResponse);

    expect(axios.post).toHaveBeenCalledWith(BASE_URL + PATH_ACTIVITES + 1 + "/end", sendData);
  });
});
