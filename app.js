// slider
const swiper = new Swiper(".swiper", {
  loop: true,
  pagination: {
    el: ".swiper-pagination",
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  effect: "fade",
  autoplay: {
    delay: 5000,
  },
});
// Animate on scroll
document.addEventListener("DOMContentLoaded", function () {
  window.addEventListener("scroll", function () {
    const sections = document.querySelectorAll(".product-img");
    const sectionsReverse = document.querySelector(".product-img-reverse");
    sections.forEach(function (section) {
      if (isElementInViewport(section)) {
        section.classList.add("animation");
        section.style.opacity = "1";
      } else {
        // section.classList.remove("animation");
      }
    });
    if (isElementInViewport(sectionsReverse)) {
      sectionsReverse.classList.add("animation-reverse");
      sectionsReverse.style.opacity = "1";
    } else {
      // sectionsReverse.classList.remove("animation-reverse");
    }
  });
});

function isElementInViewport(element) {
  let rect = element.getBoundingClientRect();
  let windowHeight =
    window.innerHeight || document.documentElement.clientHeight;
  return rect.top >= 0 && rect.top <= windowHeight - element.offsetHeight;
}
// scroll on click
const fixedHeader = document.querySelector(".header-container");
function scrollToSection(sectionId) {
  const targetSection = document.getElementById(sectionId);
  const offsetTop =
    targetSection.offsetTop -
    respNavbar.clientHeight -
    fixedHeader.clientHeight;
  window.scrollTo({
    top: offsetTop,
    behavior: "smooth",
  });
}
// burger toggle
// responsive navbar
const burgerIcon = document.querySelector(".burger-icon");
const swiperDiv = document.querySelector(".swiper");
const respNavbar = document.querySelector(".resp-navbar");
function toggleBurger() {
  burgerIcon.classList.toggle("active");
  if (respNavbar.style.display === "block") {
    respNavbar.style.display = "none";
    swiperDiv.style.marginTop = "105px";
  } else {
    respNavbar.style.display = "block";
    swiperDiv.style.marginTop = `${
      respNavbar.clientHeight + fixedHeader.clientHeight
    }px`;
  }
}
const responsiveNavigation = respNavbar.querySelectorAll("li");
responsiveNavigation.forEach((item) => {
  item.addEventListener("click", () => {
    toggleBurger();
  });
});
function checkResolution() {
  const screenWidth = window.innerWidth;
  const targetWidth = 1241;
  const mediaQuery = window.matchMedia("(min-width: 1241px)");

  if (mediaQuery.matches) {
    respNavbar.style.display = "none";
    swiperDiv.style.marginTop = `-${
      respNavbar.clientHeight - fixedHeader.clientHeight
    }px`;
    console.log("if");
  } else {
    respNavbar.style.display = "none";
    swiperDiv.style.marginTop = `${
      respNavbar.clientHeight + fixedHeader.clientHeight
    }px`;
    console.log("else");
  }
}
window.addEventListener("resize", checkResolution);

// submit message
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
function validatePhoneNumber(number) {
  const phoneRegex = /^\+995\s?5\d{2}\s?\d{6}$/;
  return phoneRegex.test(number);
}

function submitForm(event) {
  event.preventDefault(); // Prevent default form submission behavior

  // Get form input values
  const firstName = document.getElementById("firstName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const email = document.getElementById("email").value.trim();
  const number = document.getElementById("number").value.trim();
  const textMessage = document.getElementById("textMessage").value.trim();
  const errorElement = document.getElementById("error");

  // Reset error message
  errorElement.textContent = "";

  // Check if required fields are filled
  if (
    firstName === "" ||
    lastName === "" ||
    email === "" ||
    number === "" ||
    textMessage === ""
  ) {
    errorElement.textContent = "შეავსეთ ყველა ველი";
    return; // Return early to prevent form submission
  }

  // Validate email format
  if (!validateEmail(email)) {
    errorElement.textContent = "შეიყვანეთ მეილის სწორი ფორმატი";
    return; // Return early to prevent form submission
  }

  // Validate phone number format
  if (!validatePhoneNumber(number)) {
    errorElement.textContent =
      "ტელეფონის ნომერი უნდა იწყებოდეს +995-ით და შედგებოდეს 13 ციფრისგან";
    return; // Return early to prevent form submission
  }

  // If all validations pass, you can proceed with form submission here
  // For example, you can use AJAX to send form data to the server
  // Replace the following line with your actual form submission code
  // sendFormDataToServer(firstName, lastName, email, number, textMessage);

  // For this example, we'll just display a success message
  errorElement.textContent = "ფორმა წარმატებით გაგზავნილია!";
}

// Attach the form submission handler to the form element
document.getElementById("messageForm").addEventListener("submit", submitForm);

const url = `https://api.brandfetch.io/v2/brands/`;
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: "Bearer TWvnbNVE/eRjWvo05G6PneRYSweS66r2BEJNJ69+hKk=",
  },
};

//   async function getLogo() {
//     try {
//       const companys = ["m2.ge", "archi.ge", "house.ge"];
//       companys.forEach(async (item) => {
//         const response = await fetch(url + item, options);
//         const json = await response.json();
//         const partnerDiv = document.createElement("div");
//         partnerDiv.classList.add("partners");
//         const partnerImage = document.createElement("img");
//         partnerImage.setAttribute("src", `${json.logos[0].formats[0].src}`);
//         partnerDiv.appendChild(partnerImage);
//       });
//     } catch {
//       console.log(error, "error");
//     }
//
