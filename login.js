import { API_LOCAL } from "./config";

fetch(API_LOCAL + "/profile", {
  // Include cookies with the request
  headers: {
    "Content-Type": "application/json",
  },
  credentials: "include",
})
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    console.log(data);
    if (data.blockStatus) {
      location.href = "/block/";
      console.log("blockedddddd");
    } else if (data.role == "MANAGEMENT") {
      location.href = "/management/";
    } else if (data.role == "ADMIN") {
      location.href = "/admin/";
    } else if (data.role == "USER") {
      location.href = "/venues/";
    }
  });

const formEl = document.querySelector(".form");

formEl.addEventListener("submit", async (event) => {
  event.preventDefault();
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  var signBtn = document.getElementById("signin");
  signBtn.innerHTML = `<span class="loader" style="border-top: 3px solid #fff;height: 24px; width: 24px;"></span>`;
  signBtn.classList.add("disabled");
  await fetch(API_LOCAL + "/login", {
    //mode: 'cors',
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
    credentials: "include",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, data.blockStatus);
      if (data.blockStatus) {
        location.href = "/block/";
        console.log("blockedddddd");
      } else if (data.message === "Login successful") {
        console.log("Welcome");
        if (data.role == "ADMIN") {
          location.href = "/admin/";
        } else if (data.role == "MANAGEMENT") {
          location.href = "/management/";
        } else if (data.role == "USER") {
          location.href = "/venues/";
        }
      } 
      // else if (data.message === "Invalid email") {
      //   alert("Invalid Email or Password");
      //   signBtn.innerHTML = `<span class="sign-in butt-main ff-inter fs-3s">Sign In</span>`;
      //   signBtn.classList.remove("disabled");
      // } 
      else if (data.message === "Invalid email or password" || data.status==404) {
        alert("Invalid email or password");
        signBtn.innerHTML = `<span class="sign-in butt-main ff-inter fs-3s">Sign In</span>`;
        signBtn.classList.remove("disabled");
      } else if (data.message === "Internal server error") {
        alert("Internal server error");
        signBtn.innerHTML = `<span class="sign-in butt-main ff-inter fs-3s">Sign In</span>`;
        signBtn.classList.remove("disabled");
      }
    })
    .catch((error) => console.log(error));
});

// window.addEventListener('popstate', function(event) {
//     // Redirect to the home page when the user clicks the back button
//     window.location.href = '/';
//   });
localStorage.setItem("x", 1);

feather.replace();
