// Base URL (Use 127.0.0.1 for local deployment)
const BASE_URL = "https://pwaru.pilistarship.com/api";

async function getRoleNums(time) {
  try {
    // Set all `.reservation-count` elements to "Loading..."
    document.querySelectorAll(".reservation-count").forEach((element) => {
      element.textContent = "Loading...";
    });

    const response = await fetch(`${BASE_URL}/roleNums?time=${time}`);
    const data = await response.json();
    const count = data.data;

    // Update elements with the fetched data
    document.querySelectorAll(".reservation-count").forEach((element) => {
      element.textContent = count;
    });

    // Update product images based on the count
    updateProductImages(count);

    // Update progress bar
    updateProgressBar(count);
  } catch (error) {
    console.error("Error:", error);
    document.querySelectorAll(".reservation-count").forEach((element) => {
      element.textContent = "Error";
    });
  }
}

// Wait until the DOM is fully loaded, then call the function
document.addEventListener("DOMContentLoaded", function () {
  getRoleNums("2025/10/11 23:08:03");
});

// Function to validate email format
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Function to submit an email and show a confirmation message
async function addEmail(email) {
  try {
    const response = await fetch(`${BASE_URL}/addEmail`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `email=${email}`,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Something went wrong");
    }

    // Show success message
    document.querySelector(".email-success").classList.remove("hidden");
  } catch (error) {
    console.error("Error:", error);
  }
}

// Handle form submission
document
  .getElementById("emailForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const emailInput = document.getElementById("emailInput");
    const email = emailInput.value.trim();

    // Validate email before submitting
    if (!isValidEmail(email)) {
      alert("Пожалуйста, введите корректный адрес электронной почты!");
      emailInput.classList.add("border-red-500"); // Highlight invalid input
      return;
    }

    emailInput.classList.remove("border-red-500"); // Remove error highlight if fixed
    addEmail(email);
  });

function updateProductImages(count) {
  const thresholds = [100000, 200000, 300000, 400000, 500000]; // Price thresholds
  const productImages = document.querySelectorAll(".product-image");

  productImages.forEach((img, index) => {
    const unlockingOrder = parseInt(img.getAttribute("unlocking-order")); // Get the unlocking-order attribute value

    // Check if the product image is unlocked based on the current count
    if (count >= thresholds[unlockingOrder - 1]) {
      img.src = img.getAttribute("data-unlocked"); // Set the unlocked image
      img.classList.remove("group-hover:scale-110"); // Optionally remove the hover effect once unlocked
    }
  });
}

function updateProgressBar(count) {
  const maxCount = 500000; // The maximum count for 100% progress
  const progressBar = document.querySelector(".progress-bar");
  // Calculate the progress width, limiting the value to 100%
  const progressWidth = Math.min((count / maxCount) * 100, 100);
  progressBar.style.width = `${progressWidth}%`;
}
