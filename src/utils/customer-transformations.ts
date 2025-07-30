export const transformForApi = (formData: any) => {

  const formDataObj = new FormData();
  formDataObj.set('Customer.CustomerName', formData.CustomerName);
  formDataObj.set('Customer.EmailAddress', formData.EmailAddress);
  formDataObj.set('Customer.PhoneNumber', formData.PhoneNumber);
  formDataObj.set('Customer.CustomerType', formData.CustomerType);
  formDataObj.set('Customer.City', formData.City);
  formDataObj.set('Customer.ZipCode', formData.ZipCode);
  formDataObj.set('Customer.Country', formData.Country);
  formDataObj.set('Customer.Address', formData.Address);
  formDataObj.set('Customer.IdentityNumber', formData.IdentityNumber);
  formDataObj.set('Customer.UplevelId', formData.UplevelId);
  formDataObj.set('Admin.FirstName', formData.FirstName);
  formDataObj.set('Admin.LastName', formData.LastName);
  formDataObj.set('Admin.Email', formData.Email);
  formDataObj.set('Admin.Password', formData.Password);
  formData?.Claims?.forEach((claim: any, index: any) => {
    formDataObj.set(`Claims[${index}]`, claim);
  });
  if (formData.Image) {
    formDataObj.set('Image', formData.Image);
  }
  return formDataObj;
};
