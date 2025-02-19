let searchbtn = document.getElementById("searchbtn");
let clearbtn = document.getElementById("clearbtn");
let result = document.getElementById("resultContainer");
let mydiv = document.getElementById("dropdown");
let close = document.getElementById("close-btn");
let query = document.getElementById("searchinput");

// Function to clear search input and hide dropdown
const clearsearch = () => {
  query.value = "";
  mydiv.style.display = "none";
  console.log("Clearing search");
};

// Attach clear button event
clearbtn.addEventListener("click", clearsearch);

// Function to show search results
const showResult = (name, img, info) => {
  mydiv.style.display = "block"; // Ensure dropdown is visible
  result.innerHTML = `
    <h2 class="title">${name}</h2>
    <img class="search-img" src="${img}" alt="${name}">
    <p class="description">${info}</p>
  `;
};

// Function to close dropdown
const closeDropdown = () => {
  mydiv.style.display = "none";
  query.value = "";
};

// Attach close button event
close.addEventListener("click", closeDropdown);

// Function to show error when no results found
const searchError = () => {
  mydiv.style.display = "block"; // Ensure dropdown is visible
  result.innerHTML = `<p class="notfound">Sorry, we can't find your search</p>`;
};

// Fetch JSON data and handle search
fetch("travel_recomendation_ap1.json")
  .then((res) => res.json())
  .then((data) => {
    const search = () => {
      let searchQuery = query.value.trim().toLowerCase();
      if (searchQuery === "") return; // Prevent empty searches

      let notfound = true;

      // Search in different categories
      data.countries.forEach((country) => {
        country.cities.forEach((city) => {
          if (city.name.toLowerCase().includes(searchQuery)) {
            showResult(city.name, city.imageUrl, city.description);
            notfound = false;
          }
        });
      });

      data.temples.forEach((temple) => {
        if (temple.name.toLowerCase().includes(searchQuery)) {
          showResult(temple.name, temple.imageUrl, temple.description);
          notfound = false;
        }
      });

      data.beaches.forEach((beach) => {
        if (beach.name.toLowerCase().includes(searchQuery)) {
          showResult(beach.name, beach.imageUrl, beach.description);
          notfound = false;
        }
      });

      if (notfound) {
        searchError();
      }
    };

    // Attach event listeners for search button and Enter key
    searchbtn.addEventListener("click", search);
    query.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        search();
      }
    });
  })
  .catch((error) => console.error("Error loading data:", error));
