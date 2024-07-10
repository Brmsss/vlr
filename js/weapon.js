async function getData() {
    const currentUrl = window.location.href;
    const pathname = new URL(currentUrl).pathname;
    const hash = window.location.hash;
    const queryString = window.location.search;
  
    let isIndexPage = pathname === "/weapon.html" || pathname === "weapon.html";
  
    if (isIndexPage || queryString !== "" || hash !== "") {
      const menuUrl = "https://valorant-api.com/v1/weapons";
      try {
        const response = await fetch(menuUrl);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
  
        const json = await response.json();
        const container = document.getElementById("menu-container");
  
        json.data.forEach((weap) => {
          const col = document.createElement("div");
          col.className = "col-md-4 mb-4"; // Menggunakan class Bootstrap untuk menentukan lebar kolom dan margin-bottom
          const card = document.createElement("div");
          card.className = "card card-zoom";
          card.style.backgroundColor = "transparent";
          card.innerHTML = `
                    <img src="${weap.displayIcon}" class="card-img-top" alt="${weap.displayName}">
                    <div class="card-body bg-white text-dark">
                        <p class="card-text text-center"><strong>${weap.displayName}</strong></p>
                    </div>
                `;
          card.addEventListener("click", () => {
            sessionStorage.setItem("selectedWeapon", JSON.stringify(weap));
            window.location.href = "keterangan-senjata.html";
          });
          col.appendChild(card);
          container.appendChild(col);
        });
      } catch (error) {
        console.error(error.message);
      }
    }
  }
  
  async function searchWeapon() {
    const searchInput = document.getElementById("search-input").value.toLowerCase();
    const menuContainer = document.getElementById("menu-container");
    menuContainer.innerHTML = ''; // Clear existing content
  
    const menuUrl = "https://valorant-api.com/v1/weapons";
    try {
      const response = await fetch(menuUrl);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
  
      const json = await response.json();
      json.data.forEach((weap) => {
        if (weap.displayName.toLowerCase().includes(searchInput)) {
          const col = document.createElement("div");
          col.className = "col-md-4 mb-4"; // Menggunakan class Bootstrap untuk menentukan lebar kolom dan margin-bottom
          const card = document.createElement("div");
          card.className = "card card-zoom fixed card";
          card.style.backgroundColor = "transparent";
          card.innerHTML = `
                    <img src="${weap.displayIcon}" class="card-img-top" alt="${weap.displayName}">
                    <div class="card-body bg-white text-dark">
                        <p class="card-text text-center"><strong>${weap.displayName}</strong></p>
                    </div>
                `;
          card.addEventListener("click", () => {
            sessionStorage.setItem("selectedWeapon", JSON.stringify(weap));
            window.location.href = "keterangan-senjata.html";
          });
          col.appendChild(card);
          menuContainer.appendChild(col);
        }
      });
    } catch (error) {
      console.error(error.message);
    }
  }
  
  document.addEventListener("DOMContentLoaded", getData);
  
  document.getElementById("search-input").addEventListener("input", searchWeapon);