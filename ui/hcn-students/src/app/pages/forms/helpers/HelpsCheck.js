import { useSelector } from "react-redux";

export const HasHelpsCheck = ({ id, description, type }) => {
  const { aids } = useSelector((state) => state.activity);
  let i = 0;
  let indexAid = "";
  while (i < Object.values(aids).length) {
    if (aids[i].fieldId === id && aids[i].type === type) {
      indexAid = i;
      break;
    } else {
      ++i;
    }
  }
  if (indexAid !== "" || (description !== "" && description !== undefined)) return true;
  return false;
};

export const GetHelpsCheck = ({ id, type, aids }) => {
  let i = 0;
  let aidsF = {};
  let j = 0;
  while (i < Object.values(aids).length) {
    if (aids[i].fieldId === id && aids[i].type === type) {
      aidsF[j] = aids[i].text;
      ++j;
    }
    ++i;
  }
  return aidsF;
};
