
//for the category section of the page


function navigateToCategory(selectElement) {
  var selectedValue = selectElement.value;
  if (selectedValue) {
    window.location.href = selectedValue;
  }
}





//for the resourses  & search section page

//const  Url = "Resources.json";
let allResources = [];

const searchInput = document.getElementById("search");
const searchBtn = document.getElementById("searchBtn");
const container = document.getElementById("resource-container");

// Load data from JSON file
fetch('Resources.json ')
  .then(res => res.json())
  .then(data => {
    allResources = data;
  })
  .catch(err => {
    console.error("Failed to load resources:", err);
  });

function displayResources(filteredResources) {
  container.innerHTML = "";

  if (filteredResources.length === 0) {
    container.innerHTML = "<p>No results found.</p>";
    return;
  }

  filteredResources.forEach(resource => {
    const card = document.createElement("div");
    card.className = "resource-card";
    card.innerHTML = `
            <img src="${resource.image}" alt="${resource.title}" width ="180px" height ="180px" style = "border-radius:20px; display:flex; flex-wrap:wrap;
        align-items:center; justify-content:center; text-align:center;"/>
      <h1 class="title-header">${resource.title}</h1>
      <p><strong>Type:</strong> ${resource.type}</p>
      <p><strong>Platform:</strong> ${resource.platform}</p>
      <p><strong>Category:</strong> ${resource.category}</p>
      <a href="${resource.link}" target="_blank" class="view-live"
     }>VIEW RESOURCE LIVE</a>
    `;
    container.appendChild(card);
  });
}

// Search logic when button is clicked
searchBtn.addEventListener("click", () => {
  const keyword = searchInput.value.trim().toLowerCase();
  if (keyword === "") {
    container.innerHTML = "<p>Please enter a search term.</p>";
    return;
  }

  const filtered = allResources.filter(r =>
    r.title.toLowerCase().includes(keyword) ||
    r.category.toLowerCase().includes(keyword)
  );

  displayResources(filtered);
}); 