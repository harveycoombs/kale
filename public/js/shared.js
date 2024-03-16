const header = document.querySelector("header");
const footer = document.querySelector("footer");

document.body.setAttribute("style", `--header-height: ${header.clientHeight}px; --footer-height: ${footer.clientHeight}px;`);