export default function validate(input) {
  let errors = {};
  var regex = new RegExp("^[0-9-]+$");
  if (!input.name) {
    errors.name = "A name is required";
  } else if (input.name.length < 3 || input.name.length > 20) {
    errors.name = "The name must have a length between 3 and 20 characters";
  } else if (/[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>\d/?~]/.test(input.name)) {
    errors.name = "Only capital and lower case letters";
  } else if (
    input.name.includes("-") ||
    input.name.charAt(input.name.length - 1) == " " ||
    input.name.charAt(0) == " "
  ) {
    errors.name = "Enter a valid name, mix of capital and lower case!";
  }
  /////////////////
  else if (!input.height) {
    errors.height = "It's required a height of format 'Hmin-Hmax'";
  } else if (!input.height.charAt(input.height.indexOf("-") + 1)) {
    errors.height = "It's required a height of format 'Hmin-Hmax'";
  } else if (!input.height.includes("-")) {
    errors.height = "It's required a height of format 'Hmin-Hmax'";
  } else if (
    Number(input.height.split("-")[0]) > Number(input.height.split("-")[1])
  ) {
    errors.height = "Maximum height must be higher than the minimum height";
  } else if (regex.test(input.height) == false) {
    errors.height = "Only positive integer numbers!";
  } else if (input.height.charAt(0) == "-") {
    errors.height = "Only positive integer numbers!";
  }
  ////////////////////
  else if (!input.weight) {
    errors.weight = "It's required a weight of format 'Wmin-Wmax'";
  } else if (!input.weight.includes("-")) {
    errors.weight = "It's required a weight of format 'Wmin-Wmax'";
  } else if (!input.weight.charAt(input.weight.indexOf("-") + 1)) {
    errors.weight = "It's required a weight of format 'Wmin-Wmax'.";
  } else if (
    Number(input.weight.split("-")[0]) > Number(input.weight.split("-")[1])
  ) {
    errors.weight = "Maximum weight must be higher than the minimum weight";
  } else if (regex.test(input.weight) == false) {
    errors.weight = "Only positive integer numbers!";
  } else if (input.weight.charAt(0) == "-") {
    errors.weight = "Only positive integer numbers!";
  }
  ////////////////////
  else if (!input.life_span) {
    errors.life_span = "It's required a life span of format 'Vmin-Vmax'";
  } else if (!input.life_span.includes("-")) {
    errors.life_span = "It's required a life span of format 'Vmin-Vmax'";
  } else if (!input.life_span.charAt(input.life_span.indexOf("-") + 1)) {
    errors.life_span = "It's required a life span of format 'Vmin-Vmax'";
  } else if (
    Number(input.life_span.split("-")[0]) >
    Number(input.life_span.split("-")[1])
  ) {
    errors.life_span =
      "The maximum life span must be higher than the minimum life span";
  } else if (regex.test(input.life_span) == false) {
    errors.life_span = "Only positive integer numbers!";
  } else if (input.life_span.charAt(0) == "-") {
    errors.life_span = "Only positive integer numbers!";
  }
  ////////////////////////////////
  else if (input.temperament?.length == 5) {
    errors.temperament = "You can only add up to six temperaments";
  }
  //////////////////////////////////
  if (!errors.name && !errors.height && !errors.weight && !errors.life_span) {
    document.getElementById("Create").disabled = false;
  } else {
    document.getElementById("Create").disabled = true;
  }
  return errors;
}
