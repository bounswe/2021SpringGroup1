import FormData from "form-data";

export const FORM_DATA_TEXT = data => {
   const formData = new FormData();
   Object.keys(data).forEach(key => {
      formData.append(key, data[key]);
   });
   return formData;
};