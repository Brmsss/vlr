function displayAgentDetails() {
  const agentData = sessionStorage.getItem("selectedAgent");
  if (agentData) {
    const agent = JSON.parse(agentData);
    const detailsContainer = document.getElementById("agent-details");
    detailsContainer.innerHTML = `
          <h2>${agent.displayName}</h2>
          <hr>
          <p>${agent.description}</p>
          <div class="table-responsive">
            <table class="table table-striped mt-4">
              <thead>
                <tr class="text-center text-white" style="background-color: #1a2130">
                  <th scope="col" colspan="2">Skill Name</th>
                  <th scope="col">Description</th>
                </tr>
              </thead>
              <tbody id="skill-table-body">
                <!-- Skill data will be inserted here dynamically -->
              </tbody>
            </table>
          </div>
      `;
    const foto = document.getElementById("agent-img");
    foto.innerHTML = `
          <img src="${agent.displayIcon}" alt="${agent.role.displayName}" class="img-fluid">
      `;

    // Populate skills table
    const skillTableBody = document.getElementById("skill-table-body");
    agent.abilities.forEach((ability) => {
      const row = document.createElement("tr");
      row.innerHTML = `
            <td class="text-white"><img src="${ability.displayIcon}" alt="${agent.role.displayName}" class="img-fluid" height="150" width="150"></td>
            <td class="text-white">${ability.displayName}</td>
            <td class="text-white">${ability.description}</td>
        `;
      skillTableBody.appendChild(row);
    });
  } else {
    // Handle case where there is no agent data
    document.getElementById("agent-details").innerHTML =
      "<p>No agent data available.</p>";
  }
}

document.addEventListener("DOMContentLoaded", displayAgentDetails);
