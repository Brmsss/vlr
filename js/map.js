async function getData() {
  const currentUrl = window.location.href;
  const pathname = new URL(currentUrl).pathname;
  const hash = window.location.hash;
  const queryString = window.location.search;

  let isIndexPage = pathname === "/vlr/map.html" || pathname === "map.html";

  if (isIndexPage || queryString !== "" || hash !== "") {
    const menuUrl = "https://valorant-api.com/v1/maps";
    fetch('https://cors-anywhere.herokuapp.com/https://valorant-api.com/v1/maps')
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));
    try {
      const response = await fetch(menuUrl);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();
      const container = document.getElementById("menu-container");

      json.data.forEach((map) => {
        const col = document.createElement("div");
        col.className = "col-md-4 mb-4"; // Menggunakan class Bootstrap untuk menentukan lebar kolom dan margin-bottom
        const card = document.createElement("div");
        card.className = "card card-zoom";
        card.style.backgroundColor = "transparent";
        card.innerHTML = `
                    <img src="${map.splash}" class="card-img-top" alt="${map.displayName}">
                    <div class="card-body bg-white text-dark">
                        <p class="card-text text-center"><strong>${map.displayName}</strong></p>
                    </div>
                `;
        col.appendChild(card);
        container.appendChild(col);
      });
    } catch (error) {
      console.error(error.message);
    }
  }
}

async function searchMap() {
  const searchInput = document
    .getElementById("search-input")
    .value.toLowerCase();
  const menuContainer = document.getElementById("menu-container");
  menuContainer.innerHTML = ""; // Clear existing content

  const menuUrl = "https://valorant-api.com/v1/maps";
  try {
    const response = await fetch(menuUrl);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    json.data.forEach((map) => {
      if (weap.displayName.toLowerCase().includes(searchInput)) {
        const col = document.createElement("div");
        col.className = "col-md-4 mb-4"; // Menggunakan class Bootstrap untuk menentukan lebar kolom dan margin-bottom
        const card = document.createElement("div");
        card.className = "card card-zoom";
        card.style.backgroundColor = "transparent";
        card.innerHTML = `
                    <img src="${map.splash}" class="card-img-top" alt="${map.displayName}">
                    <div class="card-body bg-white text-dark">
                        <p class="card-text text-center"><strong>${map.displayName}</strong></p>
                    </div>
                `;
        col.appendChild(card);
        menuContainer.appendChild(col);
      }
    });
  } catch (error) {
    console.error(error.message);
  }
}

document.addEventListener("DOMContentLoaded", getData);

document.getElementById("search-input").addEventListener("input", searchMap);
