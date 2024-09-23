import { realdb, ref, get, child, set, remove } from "./config.js";

let SinOutBtn = document.getElementById("Sinout");
let signOut = () => {
  sessionStorage.removeItem("user-creds");
  sessionStorage.removeItem("user-info");
  window.location.href = "login.html";
};
let CheckCred = () => {
  if (!sessionStorage.getItem("user-creds"))
    window.location.href = "login.html";
  else {
    Message.innerText = `Wellcome ${UserCred.email}
    `;
  }
};
window.addEventListener("load", CheckCred);
SinOutBtn.addEventListener("click", signOut);
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
          const blogCard = createBlogCard(blog, blogId); // Pass blogId for deletion
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

// Function to create a blog card element
function createBlogCard(blog, blogId) {
  const card = document.createElement("div");
  card.classList.add("blog-card");

  const img = document.createElement("img");
  img.src = blog.photoURL;
  card.appendChild(img);

  const title = document.createElement("h3");
  title.textContent = blog.heading;
  card.appendChild(title);

  const description = document.createElement("p");
  description.textContent = blog.description;
  card.appendChild(description);

  const link = document.createElement("a");
  link.href = blog.link;
  link.textContent = "Read more";
  card.appendChild(link);

  // Create a delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.classList.add("delete-btn");
  deleteBtn.onclick = () => deleteBlog(blogId); // Attach delete function with blogId
  card.appendChild(deleteBtn);

  return card;
}

// Function to delete a blog
function deleteBlog(blogId) {
  const blogRef = ref(realdb, "blogs/" + blogId); // Reference to the specific blog

  // Remove the blog from Firebase Realtime Database
  remove(blogRef)
    .then(() => {
      console.log("Blog deleted successfully");
      fetchBlogs(); // Refresh the blogs list after deletion
    })
    .catch((error) => {
      console.error("Error deleting blog:", error);
    });
}

// Fetch and display blogs on page load
window.onload = fetchBlogs;
