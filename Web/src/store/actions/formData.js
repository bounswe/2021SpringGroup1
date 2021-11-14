import FormData from "form-data";

export const FORM_DATA_TEXT = data => {
   const formData = new FormData();
   Object.keys(data).forEach(key => {
      formData.append(key, data[key]);
   });
   return formData;
};


export const FORM_DATA_TEXT_AND_IMAGES_MULTIPLE = (imagesFieldName, data) => {
   const formData = new FormData();
   Object.keys(data).forEach(key => {
     if (key === imagesFieldName) {
       data[key].forEach(image => {
         if (!image) return;
         formData.append(key, image, image.name);
       });
     } else {
       formData.append(key, data[key]);
     }
   });
   return formData;
 };