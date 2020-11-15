export const regex = {
  emailRegex: /^(([^<>()\\.,;:\s@"]+(\.[^<>()\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i,
  passwordRegex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
  nameRegex: /^[a-zA-Z]{3,25}$/,
  codeRegex: /^[0-9]+$/,
  currencyFloatRegex: /^\d+(\.\d+)?$/,
};

export const fieldValidate = (text, type) => {
  let result = {
    error: false,
    helperText: "",
  };
  switch (type) {
    case "price":
      if (text > 9999 || text === "") {
        result = {
          error: true,
          helperText: "Price can not be greater than 9999",
        };
      } else result = { error: false, helperText: "" };
      break;
    case "email":
      if (!regex.emailRegex.test(text)) {
        result = { error: true, helperText: "Incorrect Email Format." };
      }
      break;
    case "password":
      if (!regex.passwordRegex.test(text)) {
        result = {
          error: true,
          helperText:
            "Incorrect Password Format. Must contain each small, capital alphabets, numbers and atleast 8 characters long.",
        };
      }
      break;

    case "name":
      if (!regex.nameRegex.test(text)) {
        result = {
          error: true,
          helperText:
            "Incorrect Format! Can only contain alphabets & atleast 3 to 25 characters long",
        };
      }
      break;

    case "code":
      if (!regex.codeRegex.test(text)) {
        result = {
          error: true,
          helperText: "Incorrect Format. Can only contain numbers.",
        };
      }
      break;

    case "currencyFloat":
      if (!regex.currencyFloatRegex.test(text)) {
        result = {
          error: true,
          helperText: "Incorrect Format. Enter correct value.",
        };
      }
      break;

    default:
      break;
  }
  return result;
};
