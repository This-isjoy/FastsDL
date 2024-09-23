// let SinOutBtn = document.getElementById("Sinout");
// let signOut = () => {
//   sessionStorage.removeItem("user-creds");
//   sessionStorage.removeItem("user-info");
//   window.location.href = "login.html";
// };
// let CheckCred = () => {
//   if (!sessionStorage.getItem("user-creds"))
//     window.location.href = "login.html";
//   else {
//     Message.innerText = `Wellcome ${UserCred.email}
//     `;
//   }
// };
// window.addEventListener("load", CheckCred);
// SinOutBtn.addEventListener("click", signOut);

import {
  storage,
  realdb,
  sRef,
  uploadBytesResumable,
  getDownloadURL,
  ref,
  set,
  push,
} from "./config.js";

// Handle the form submission
const form = document.getElementById("blogForm");
form.addEventListener("submit", (event) => {
  event.preventDefault();

  // Get form values
  const photo = document.getElementById("photo").files[0];
  const heading = document.getElementById("heading").value;
  const description = document.getElementById("description").value;
  const link = document.getElementById("link").value;

  if (photo) {
    const storageRef = sRef(storage, `images/${photo.name}`);
    const uploadTask = uploadBytesResumable(storageRef, photo);

    // Upload the file to Firebase Storage
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Handle progress (optional)
      },
      (error) => {
        console.error("Error uploading file:", error);
      },
      () => {
        // File uploaded successfully, now get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          // Create a reference in the Realtime Database
          const blogRef = ref(realdb, "blogs");
          const newBlogRef = push(blogRef); // Generates a new unique key

          // Set the data in the Realtime Database
          set(newBlogRef, {
            photoURL: downloadURL,
            heading: heading,
            description: description,
            link: link,
          })
            .then(() => {
              // Show the popup
              showPopup();
              // Clear the form
              form.reset();
            })
            .catch((error) => {
              console.error("Error uploading data:", error);
            });
        });
      }
    );
  }
});

// Function to show popup
function showPopup() {
  const popup = document.getElementById("popup");
  popup.classList.add("show");

  // Hide popup after 3 seconds
  setTimeout(() => {
    popup.classList.remove("show");
  }, 3000);
}
