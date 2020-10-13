import text from "./../../../configs/text";

export default function header() {
  document.getElementById("header").innerHTML = `<h1> ${text.header} </h1>`;
}
