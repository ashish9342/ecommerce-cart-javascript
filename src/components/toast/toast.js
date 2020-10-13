import text from "./../../../configs/text";

export default function Toast(title) {
  let node = document.createElement("div");
  node.classList.add("toast");
  node.innerHTML = ` ${title + " " + text.itemAdded}`;
  document.getElementById("header").append(node);
}
