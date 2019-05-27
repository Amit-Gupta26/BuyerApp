const validation = {
  firstName: {
    empty: {
      message: "Please enter first name"
    },
    length: {
      max: 40,
      message: "First name should not exeeds 40 characters"
    },
    format: {
      pattern: /^[a-zA-Z]{1,10}$/,
      message: "Please enter valid first name"
    }
  },
  lastName: {
    empty: {
      message: "Please enter last name"
    },
    length: {
      max: 50,
      message: "Last name should not exeeds 40 characters"
    },
    format: {
      pattern: /^[a-zA-Z]{1,10}$/,
      message: "Please enter valid last name"
    }
  },
  email: {
    empty: {
      message: "Please enter email addresss"
    },
    length: {
      max: 80,
      message: "Email should not exeeds 80 characters"
    },
    format: {
      pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: "Please enter valid email address"
    }
  },
  phone: {
    empty: {
      message: "Please enter phone number"
    },
    format: {
      pattern: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
      message: "Please enter valid phone number"
    }
  },
  password: {
    empty: {
      message: "Please enter password"
    },
    length: {
      min: 8,
      message: "Password must at least 8 characters"
    },
    format: {
      pattern: /^(?=.*[a-z])(?=.*\\d)[\\x21-\\x7e]+$,/,
      message: "Please enter valid password"
    }
  }
};

const validate = (inputType, value) => {
  let status = true;
  let message = "";
  if (validation.hasOwnProperty(inputType)) {
    let input = validation[inputType];
    if (value == "" || value == null) {
      status = false;
      message = input["empty"]["message"];
    } else if (input.hasOwnProperty("length")) {
      if (
        input["length"]["max"] != undefined &&
        value.length > input["length"]["max"]
      ) {
        status = false;
        message = input["length"]["message"];
      } else if (
        input["length"]["min"] != undefined &&
        value.length < input["length"]["min"]
      ) {
        status = false;
        message = input["length"]["message"];
      } else if (!input["format"]["pattern"].test(value)) {
        status = false;
        message = input["format"]["message"];
      }
    } else if (
      input.hasOwnProperty("format") &&
      !input["format"]["pattern"].test(value)
    ) {
      status = false;
      message = input["format"]["message"];
    } else {
      status = true;
      message = "Yey!!!! Validated";
    }
  }
  return { status, message };
};

export default validate;
