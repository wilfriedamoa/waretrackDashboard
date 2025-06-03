export const ResetForm = (data: any) => {
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      data[key] = "";
    }
  }
  return data;
};

export const ResetError = (errors: any) => {
  for (const key in errors) {
    if (Object.prototype.hasOwnProperty.call(errors, key)) {
      errors[key] = undefined;
    }
  }
  return errors;
};

export const writeErrors = (state: any, errors: any) => {
  for (const key in state) {
    if (errors[key] == undefined) {
      state[key] = undefined;
    } else {
      state[key] = errors[key];
    }
  }
  return state;
};

export const encodeData = (values: any) => {
  const formData = new FormData();

  for (const key in values) {
    if (Object.hasOwnProperty.call(values, key)) {
      formData.append(key, values[key]);
    }
  }
  return formData;
};
