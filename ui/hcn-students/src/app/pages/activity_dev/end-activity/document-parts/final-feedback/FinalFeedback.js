import {
  incorrectMeasureFormat,
  isNum,
  measures,
  incorrectMeassureBMI,
  dateLower,
  incorrectSex,
  incorrectNameFormat,
  errorMessages,
  incorrectAgeFormat,
} from "../../../../forms/shared/aids/Aids";

export const FinalFeedbackAnthroValues = (field) => {
  var fieldErr = "";
  switch (field.cellName) {
    case "CurrentWeight":
      if (!field.value || field.value === undefined || field.value === "") {
        fieldErr = "Este campo está vacío";
      } else if (incorrectMeasureFormat(field.value, "weight", false)) {
        fieldErr = "El formato es incorrecto, este valor se debía escribir como 23 " + measures.weight;
      } else {
        fieldErr = null;
      }
      break;
    case "UsualWeight":
      if (!field.value || field.value === undefined || field.value === "") {
        fieldErr = "Este campo está vacío";
      } else if (incorrectMeasureFormat(field.value, "weight", false)) {
        fieldErr = "El formato es incorrecto, este valor se debía escribir como 23 " + measures.weight;
      } else {
        fieldErr = null;
      }
      break;
    case "ReferenceWeight":
      if (!field.value || field.value === undefined || field.value === "") {
        fieldErr = "Este campo está vacío";
      } else if (incorrectMeasureFormat(field.value, "weight", false)) {
        fieldErr = "El formato es incorrecto, este valor se debía escribir como 23 " + measures.weight;
      } else {
        fieldErr = null;
      }
      break;
    case "PercentageChange":
      if (!field.value || field.value === undefined || field.value === "") {
        fieldErr = "Este campo está vacío";
      } else if (incorrectMeasureFormat(field.value, "percentage", false)) {
        fieldErr = "El formato es incorrecto, este valor se debía escribir como 23 " + measures.percentage;
      } else {
        fieldErr = null;
      }
      break;
    case "TricipalFold":
      if (!field.value || field.value === undefined || field.value === "") {
        fieldErr = "Este campo está vacío";
      } else if (incorrectMeasureFormat(field.value, "fold", false)) {
        fieldErr = "El formato es incorrecto, este valor se debía escribir como 23 " + measures.fold;
      } else {
        fieldErr = null;
      }
      break;
    case "SubscapularFold":
      if (!field.value || field.value === undefined || field.value === "") {
        fieldErr = "Este campo está vacío";
      } else if (incorrectMeasureFormat(field.value, "fold", false)) {
        fieldErr = "El formato es incorrecto, este valor se debía escribir como 23 " + measures.fold;
      } else {
        fieldErr = null;
      }
      break;
    case "BrachialPerimeter":
      if (!field.value || field.value === undefined || field.value === "") {
        fieldErr = "Este campo está vacío";
      } else if (incorrectMeasureFormat(field.value, "circumference", false)) {
        fieldErr = "El formato es incorrecto, este valor se debía escribir como 23 " + measures.circumference;
      } else {
        fieldErr = null;
      }
      break;
    case "AbdominalPerimeter":
      if (!field.value || field.value === undefined || field.value === "") {
        fieldErr = "Este campo está vacío";
      } else if (incorrectMeasureFormat(field.value, "circumference", false)) {
        fieldErr = "El formato es incorrecto, este valor se debía escribir como 23 " + measures.circumference;
      } else {
        fieldErr = null;
      }
      break;
    case "Size":
      if (!field.value || field.value === undefined || field.value === "") {
        fieldErr = "Este campo está vacío";
      } else if (incorrectMeasureFormat(field.value, "size", false)) {
        fieldErr = "El formato es incorrecto, este valor se debía escribir como 23 " + measures.size;
      } else {
        fieldErr = null;
      }
      break;
    case "Structure":
      if (!field.value || field.value === undefined || field.value === "") {
        fieldErr = "Este campo está vacío";
      } else if (isNum(field.value)) {
        fieldErr = "El formato es incorrecto, este valor es sólo un número";
      } else {
        fieldErr = null;
      }
      break;
    case "BMI":
      if (!field.value || field.value === undefined || field.value === "") {
        fieldErr = "Este campo está vacío";
      } else if (incorrectMeassureBMI(field.value, "bmi", false)) {
        fieldErr = "El formato es incorrecto, este valor se debía escribir como 23 " + measures.bmi;
      } else {
        fieldErr = null;
      }
      break;
    default:
      fieldErr = null;
  }
  return fieldErr;
};

export const FinalFeedbackInterpretation = (field) => {
  var fieldErr = "";
  switch (field) {
    case "":
      fieldErr = "Este campo está vacío";
      break;
    case undefined:
      fieldErr = "Este campo está vacío";
      break;
    case !field:
      fieldErr = "Este campo está vacío";
      break;
    default:
      fieldErr = null;
  }
  return fieldErr;
};

export const FinalFeedbackDateLower = (field) => {
  var fieldErr = "";
  switch (field) {
    case "":
      fieldErr = "Este campo está vacío";
      break;
    case dateLower(field):
      fieldErr = "La fecha no puede ser mayor a hoy";
      break;
    default:
      fieldErr = null;
  }
  return fieldErr;
};

export const FinalFeedbackPatientValues = (field) => {
  var fieldErr = "";
  switch (field.cellName) {
    case "FullName":
      if (!field.value || field.value === undefined || field.value === "") {
        fieldErr = "Este campo está vacío";
      } else if (incorrectNameFormat(field.value)) {
        fieldErr = errorMessages.name;
      } else {
        fieldErr = null;
      }
      break;
    case "BirthDate":
      if (!field.value || field.value === undefined || field.value === "") {
        fieldErr = "Este campo está vacío";
      } else if (dateLower(field.value, "weight", false)) {
        fieldErr = "La fecha no puede ser menor a hoy";
      } else {
        fieldErr = null;
      }
      break;
    case "Gender":
      if (!field.value || field.value === undefined || field.value === "") {
        fieldErr = "Este campo está vacío";
      } else {
        fieldErr = null;
      }
      break;
    case "Sex":
      if (!field.value || field.value === undefined || field.value === "") {
        fieldErr = "Este campo está vacío";
      } else if (incorrectSex(field.value)) {
        fieldErr = errorMessages.sex;
      } else {
        fieldErr = null;
      }
      break;
    case "Age":
      if (!field.value || field.value === undefined || field.value === "") {
        fieldErr = "Este campo está vacío";
      } else if (incorrectAgeFormat(field.value, "weight", false)) {
        fieldErr = `El formato es incorrecto, este valor se debía escribir como 23 ${measures.years} o ${measures.month}`;
      } else {
        fieldErr = null;
      }
      break;
    case "SPE":
      if (!field.value || field.value === undefined || field.value === "") {
        fieldErr = "Este campo está vacío";
      } else {
        fieldErr = null;
      }
      break;
    case "Phone":
      if (!field.value || field.value === undefined || field.value === "") {
        fieldErr = "Este campo está vacío";
      } else if (isNum(field.value)) {
        fieldErr = errorMessages.number;
      } else {
        fieldErr = null;
      }
      break;
    case "Occupation":
      if (!field.value || field.value === undefined || field.value === "") {
        fieldErr = "Este campo está vacío";
      } else {
        fieldErr = null;
      }
      break;
    case "CivilStatus":
      if (!field.value || field.value === undefined || field.value === "") {
        fieldErr = "Este campo está vacío";
      } else {
        fieldErr = null;
      }
      break;
    default:
      fieldErr = null;
  }
  return fieldErr;
};
