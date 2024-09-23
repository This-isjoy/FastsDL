"use strict";

const navToggleBtn = document.querySelector("[data-nav-toggle-btn]");
const header = document.querySelector("[data-header]");

navToggleBtn.addEventListener("click", function () {
  header.classList.toggle("active");
});

const bodyColor = document.getElementById("body_color");
const HeaderDark = document.getElementById("Header_dark");
const darkMode = document.getElementById("dark_mode");
const lightMode = document.getElementById("light_mode");

darkMode.addEventListener("click", () => {
  HeaderDark.style.background = "#636e66";
  bodyColor.style.background = "#636e66";
  lightMode.style.display = "block";
  darkMode.style.display = "none";
});

lightMode.addEventListener("click", () => {
  HeaderDark.style.background = "#fff";
  bodyColor.style.background = "#fff";
  lightMode.style.display = "none";
  darkMode.style.display = "block";
});

import { realdb, ref, get, child } from "./config.js";

// Function to fetch blogs and display them as cards
function fetchBlogs() {
  const blogsContainer = document.getElementById("blogsContainer");
  const dbRef = ref(realdb);

  // Fetch blogs from Firebase Realtime Database
  get(child(dbRef, "blogs"))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const blogs = snapshot.val();
        blogsContainer.innerHTML = ""; // Clear existing content

        // Loop through each blog and create a card
        for (const blogId in blogs) {
          const blog = blogs[blogId];
          const blogCard = createBlogCard(blog);
          blogsContainer.appendChild(blogCard);
        }
      } else {
        blogsContainer.innerHTML = "<p>No blogs available</p>";
      }
    })
    .catch((error) => {
      console.error("Error fetching blogs:", error);
    });
}

// Function to create a blog card element wrapped in <li>
// Function to create a blog card element wrapped in <li> and <a>
function createBlogCard(blog) {
  const listItem = document.createElement("li");

  const link = document.createElement("a");
  link.href = blog.link;

  const card = document.createElement("div");
  card.classList.add("blog-card");

  // Create the figure and img for blog image
  const figure = document.createElement("figure");
  figure.classList.add("blog-banner");
  const img = document.createElement("img");
  img.src = blog.photoURL;
  img.alt = blog.heading;
  figure.appendChild(img);
  card.appendChild(figure);

  // Create the meta section
  const meta = document.createElement("div");
  meta.classList.add("blog-meta");

  const dateSpan = document.createElement("span");
  const dateIcon = document.createElement("ion-icon");
  dateIcon.setAttribute("name", "calendar-outline");
  const timeElement = document.createElement("time");
  timeElement.setAttribute("datetime", blog.date);
  timeElement.textContent = blog.date;
  dateSpan.appendChild(dateIcon);
  dateSpan.appendChild(timeElement);

  const authorSpan = document.createElement("span");
  const authorIcon = document.createElement("ion-icon");
  authorIcon.setAttribute("name", "person-outline");
  const authorText = document.createElement("p");
  authorText.textContent = blog.author || "admin";
  authorSpan.appendChild(authorIcon);
  authorSpan.appendChild(authorText);

  meta.appendChild(dateSpan);
  meta.appendChild(authorSpan);
  card.appendChild(meta);

  // Create the title
  const title = document.createElement("h3");
  title.classList.add("blog-title");
  title.textContent = blog.heading;
  card.appendChild(title);

  // Create the description
  const description = document.createElement("p");
  description.classList.add("blog-text");
  description.textContent = blog.description;
  card.appendChild(description);

  // Append the card to the <a> tag
  link.appendChild(card);

  // Append the <a> to the <li> element
  listItem.appendChild(link);

  return listItem;
}

// Fetch and display blogs on page load
window.onload = fetchBlogs;
