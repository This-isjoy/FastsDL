"use strict";

const navToggleBtn = document.querySelector("[data-nav-toggle-btn]");
const header = document.querySelector("[data-header]");

navToggleBtn.addEventListener("click", function () {
  header.classList.toggle("active");
});

const Header_dark = document.getElementById("Header_dark");
const dark_body = document.getElementById("body_color");
const dark_mode = document.getElementById("dark_mode");
const light_mode = document.getElementById("light_mode");

dark_mode.addEventListener("click", () => {
  Header_dark.style.background = "#636e66";
  dark_body.style.background = "#636e66";
  dark_body.style.color = "#fff";
  dark_mode.style.display = "none";
  light_mode.style.display = "block";
});
light_mode.addEventListener("click", () => {
  Header_dark.style.background = "#fff";
  dark_body.style.background = "#fff";
  dark_body.style.color = "#636e66";
  light_mode.style.display = "none";
  dark_mode.style.display = "block";
});
