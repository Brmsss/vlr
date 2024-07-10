function displayWeaponDetails() {
  const weapData = sessionStorage.getItem("selectedWeapon");
  if (weapData) {
    const weap = JSON.parse(weapData);
    const detailsContainer = document.getElementById("weap-details");
    detailsContainer.innerHTML = `
          <h2>${weap.displayName}</h2>
          <hr>
          <div class="table-responsive">
            <table class="table table-striped mt-4">
              <thead>
                <tr class="text-center text-white" style="background-color: #1a2130">
                  <th scope="col" colspan="2">Detail</th>
                </tr>
              </thead>
              <tbody id="weap-table-body">
              <td class="text-white">Cost</td>
              <td class="text-white">${weap.shopData.cost}</td>
              </tbody>
              <tbody id="weap-table-body">
              <td class="text-white">Category</td>
              <td class="text-white">${weap.shopData.category}</td>
              </tbody>
              <tbody id="weap-table-body">
              <td class="text-white">Fire Rate</td>
              <td class="text-white">${weap.weaponStats.fireRate}</td>
              </tbody>
              <tbody id="weap-table-body">
              <td class="text-white">Magazine Size</td>
              <td class="text-white">${weap.weaponStats.magazineSize}</td>
              </tbody>
              <tbody id="weap-table-body">
              <td class="text-white">First Bullet Accuracy</td>
              <td class="text-white">${weap.weaponStats.firstBulletAccuracy}</td>
              </tbody>
              <tbody id="weap-table-body">
              <td class="text-white">Reload Time</td>
              <td class="text-white">${weap.weaponStats.reloadTimeSeconds} Seconds</td>
              </tbody>
              <tbody id="weap-table-body">
              <td class="text-white">Equip Time</td>
              <td class="text-white">${weap.weaponStats.equipTimeSeconds} Seconds</td>
              </tbody>
              <tbody id="weap-table-body">
              <td class="text-white">Run Speed Multiplier</td>
              <td class="text-white">${weap.weaponStats.runSpeedMultiplier}</td>
              </tbody>
            </table>
          </div>
      `;
    const foto = document.getElementById("weap-img");
    foto.innerHTML = `
          <img src="${weap.displayIcon}" alt="${weap.displayName}" class="img-fluid">
      `;
  } else {
    // Handle case where there is no agent data
    document.getElementById("weap-details").innerHTML =
      "<p>No weapon data available.</p>";
  }
}

document.addEventListener("DOMContentLoaded", displayWeaponDetails);
