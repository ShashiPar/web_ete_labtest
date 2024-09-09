const fetchButton = document.getElementById("fetchDog");
const imgContainer = document.getElementById("dogImage");

fetchButton.addEventListener("click", () => {
  fetch("https://dog.ceo/api/breeds/image/random")
    .then((response) => response.json())
    .then((data) => {
      imgContainer.src = data.message;
    })
    .catch((error) => {
      console.error("Error fetching image:", error);
      alert("Oops! Something went wrong while fetching the dog image.");
    });
});

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("signupForm");

  form.addEventListener("submit", (event) => {
    let valid = true;
    let errorMessage = "";

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const dob = document.getElementById("dob").value;
    const gender = document.getElementById("gender").value;
    const breed = document.getElementById("breed").value.trim();
    const preferences = document.getElementById("preferences").value.trim();
    const terms = document.getElementById("terms").checked;

    if (name === "") {
      errorMessage += "Name is required.\n";
      valid = false;
    }

    if (!validateEmail(email)) {
      errorMessage += "Please enter a valid email address.\n";
      valid = false;
    }

    if (phone !== "" && !validatePhone(phone)) {
      errorMessage += "Please enter a valid phone number.\n";
      valid = false;
    }

    if (dob === "") {
      errorMessage += "Date of Birth is required.\n";
      valid = false;
    }

    if (gender === "") {
      errorMessage += "Gender is required.\n";
      valid = false;
    }

    if (breed === "") {
      errorMessage += "Favorite Dog Breed is required.\n";
      valid = false;
    }

    if (preferences === "") {
      errorMessage += "Preferences cannot be empty.\n";
      valid = false;
    }

    if (!terms) {
      errorMessage += "You must agree to the terms and conditions.\n";
      valid = false;
    }

    if (!valid) {
      event.preventDefault();
      alert(errorMessage);
    } else {
      event.preventDefault();
      alert("Form submitted successfully!");
      form.reset();
    }
  });

  function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  function validatePhone(phone) {
    const regex = /^[0-9]{10}$/;
    return regex.test(phone);
  }
});

fetch("https://raw.githubusercontent.com/ShashiPar/dogs/main/breeds.json")
  .then((response) => response.json())
  .then((breeds) => {
    let breedList = document.getElementById("breedList");
    breeds.forEach((breed) => {
      breedList.innerHTML += `
            <div class="col-md-4 breed">
              <h3>${breed.breedName}</h3>
              <p>${breed.description}</p>
              <img src="${breed.imageUrl}" alt="${breed.breedName}" class="img-fluid">
            </div>`;
    });
  })
  .catch((error) => console.log("Error loading breeds:", error));
