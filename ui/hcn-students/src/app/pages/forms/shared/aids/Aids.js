export const errorMessages = {
  empty: "Este campo no puede ser vacío",
  number: "Es campo solo recibe valores númericos",
  dateBigger: "La fecha debe ser mayor a hoy",
  dateLower: "La fecha debe ser menor o igual a hoy",
  formatRegex: "El formato es incorrecto, este valor se debe escribir como 23",
  sex: "El sexo sólo puede ser Femenino o Masculino",
  name: "Los nombres y/o apellidos deben tener mínimo 3 cáracteres, sólo letras y máximo dos nombres y dos apellidos",
  emailRegex: "El email no cumple con el formato '@javerianacali.edu.co'",
  different: "Estos campos son diferentes",
};

export const measures = {
  weight: "kg",
  percentage: "%",
  circumference: "cm",
  fold: "mm",
  size: "cm",
  bmi: "kg/m2",
  month: "meses",
  years: "años",
};

/* Function taken from: https://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript/3561711#3561711 */
function regExpEscape(literal_string) {
  return literal_string.replace(/[-[\]{}()*+!<=:?./\\^$|#\s,]/g, "\\$&");
}

export const isNum = (value) => {
  isNaN(value);
};

export const dateLower = (value) => {
  return new Date(value) > Date.now() ? true : false;
};

export const dateBigger = (value) => {
  return new Date(value) > Date.now() ? true : false;
};

export const incorrectMeasureFormat = (value, measure, lowerCase = true) => {
  const regexExpression = new RegExp(`^[0-9]+(\\\\ |\\ )?${measures[measure]}$`);
  return !regexExpression.test(regExpEscape(lowerCase ? value.toLowerCase() : value)) ? true : false;
};

export const incorrectMeassureBMI = (value, measure, lowerCase = true) => {
  const bmiRegex = regExpEscape(measures[measure]);
  const regexExpression = new RegExp(`^[0-9]+(\\\\ |\\ )?${bmiRegex}$`);
  return !regexExpression.test(regExpEscape(lowerCase ? value.toLowerCase() : value)) ? true : false;
};

export const incorrectAgeFormat = (value) => {
  const regexExpression = new RegExp(`^[0-9]+\\\\ +(${measures["month"]}|${measures["years"]})$`);
  return !regexExpression.test(regExpEscape(value.toLowerCase())) ? true : false;
};

export const incorrectNameFormat = (value) => {
  const expression = "[a-za-zA-ZñÑáéíóúÁÉÍÓÚ\\s]{3,}";
  const regexExpression = new RegExp(`^${expression}\\\\ +${expression}(\\\\ +${expression})?(\\\\ +${expression})?$`);
  return !regexExpression.test(regExpEscape(value)) ? true : false;
};

export const incorrectEmailFormat = (value) => {
  const emailRegex = new RegExp("^[a-zA-Z0-9._-]+@javerianacali.edu.co$");
  return !emailRegex.test(value) ? true : false;
};

export const incorrectSex = (value) => {
  return value.toLowerCase() === "Femenino" || value.toLowerCase() === "Masculino" ? true : false;
};
