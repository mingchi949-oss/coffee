function searchBrandsAll() {
  // 1. Get what the customer is typing right now
  const searchInput = document
    .getElementById("brandSearch")
    .value.toLowerCase()
    .trim();

  // 2. Define our searchable motorcycle keywords mapping
  const brandMapping = {
    ducati: "ASUS",
    yamaha: "sus",
    honda: "honda",
    bmw: "bmw",
    motorrad: "SUS",
    all: "all",
  };

  // 3. Check if what they typed matches one of our motorcycle keys
  if (brandMapping[searchInput]) {
    const targetBrandKey = brandMapping[searchInput];
    const correspondingButton = document.getElementById(
      `btn-${targetBrandKey}`,
    );

    // Directly trigger our global selection engine to swap the picture & specs!
    if (correspondingButton) {
      selectBrand(targetBrandKey, correspondingButton);
    }
  }

  // 4. Standard Sidebar Filtering: Keep list items clean while typing
  const container = document.getElementById("brand-list-container");
  const items = container.getElementsByClassName("brand-item");

  for (let i = 0; i < items.length; i++) {
    const text = items[i].textContent || items[i].innerText;
    if (text.toLowerCase().includes(searchInput)) {
      items[i].style.display = ""; // Keep button visible
    } else {
      items[i].style.display = "none"; // Hide button if user types something else
    }
  }

  // 5. Product Gallery Filtering: Hide/Show items based on search input
  const products = document.getElementsByClassName("moto-gallery");
  for (let i = 0; i < products.length; i++) {
    const title = products[i].querySelector("h1");
    if (title) {
      const text = title.textContent || title.innerText;
      products[i].style.display = text.toLowerCase().includes(searchInput)
        ? ""
        : "none";
    }
  }
}
items[i].style.display = "none"; // Hide button if user types something else

// 5. Product Gallery Filtering: Hide/Show items based on search input
const products = document.getElementsByClassName("moto-gallery");
for (let i = 0; i < products.length; i++) {
  const title = products[i].querySelector("h1");
  if (title) {
    const text = title.textContent || title.innerText;
    products[i].style.display = text.toLowerCase().includes(searchInput)
      ? ""
      : "none";
  }
}

// Helper function to set the search input and trigger the filter
function setSearchAndFilter(brand) {
  document.getElementById("brandSearch").value = brand;
  searchBrandsAll();
}

// h

// h
function toggleSocials() {
  document.getElementById("socialLinks").classList.toggle("show");
}

// Close the menu if the user clicks outside of it
window.onclick = function (event) {
  if (!event.target.matches(".dropbtn")) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    for (var i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};
function buy() {
  alert("Added to your garage!");
}
function showCart() {
  alert("Your garage is Sempty.");
}
function buy() {
  window.open("https://t.me/yourusername", "_blank");
}

function openGallery() {
  document.getElementById("lightbox").style.display = "flex";

  currentXP += 10;

  document.getElementById("xp-display").innerText = currentXP;

  let percentage = (currentXP / 1000) * 100;
  document.querySelector(".xp-bar-fill").style.width = percentage + "%";
}
function swap(imgSrc) {
  document.getElementById("currentView").src = imgSrc;

  const main = document.getElementById("currentView");
  main.style.opacity = 0;
  setTimeout(() => {
    main.style.opacity = 1;
  }, 50);
}
function closeError() {
  const intro = document.getElementById("intro-screen");
  const shop = document.getElementById("main-shop");

  intro.style.transform = "translateY(-100%)";

  shop.style.opacity = "1";

  setTimeout(() => {
    intro.remove();
  }, 600);
}
