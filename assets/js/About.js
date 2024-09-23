"use strict";

const navToggleBtn = document.querySelector("[data-nav-toggle-btn]");
const header = document.querySelector("[data-header]");

navToggleBtn.addEventListener("click", function () {
  header.classList.toggle("active");
});

const bodyColor = document.getElementById("body_color");
const HeaderDark = document.getElementById("Header_dark");
const hero = document.getElementById("hero");
const darkMode = document.getElementById("dark_mode");
const lightMode = document.getElementById("light_mode");

darkMode.addEventListener("click", () => {
  HeaderDark.style.background = "#636e66";
  bodyColor.style.background = "#636e66";
  hero.style.background = "#636e66";
  lightMode.style.display = "block";
  darkMode.style.display = "none";
});

lightMode.addEventListener("click", () => {
  HeaderDark.style.background = "#fff";
  bodyColor.style.background = "#fff";
  hero.style.background = "#fff";
  lightMode.style.display = "none";
  darkMode.style.display = "block";
});
