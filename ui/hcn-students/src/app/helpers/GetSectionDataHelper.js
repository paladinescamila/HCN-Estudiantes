import { useSelector } from "react-redux";

const GetSectionData = (code) => {
  const { form } = useSelector((state) => state.activity);
  let i = 0;
  while (i < form.sections.length) {
    if (form.sections[i].code === code) {
      return { sectionInfo: form.sections[i], sectionIndex: i };
    } else {
      ++i;
    }
  }
  return null;
};

export default GetSectionData;
