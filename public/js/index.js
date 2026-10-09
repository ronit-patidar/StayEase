const filters = document.querySelectorAll('.filters');

filters.forEach((filter) => {
    filter.addEventListener('click', () => {
        const category = filter.dataset.category;
        window.location.href = `/listings?category=${category}`;
    });
});

// filter select logic
const activeFilter = document.querySelector(".active-filter");

if (activeFilter) {
  activeFilter.scrollIntoView({
    behavior: "auto",
    block: "center",
    inline: "center"
  });
}

// GST Switch
let taxSwitch = document.getElementById("switchCheckDefault");
let taxToggle = document.querySelector(".tax-toggle");
let taxInfo = document.querySelectorAll(".gst");

taxToggle.addEventListener("click", (e) => {
    if (e.target.tagName !== "INPUT" && e.target.tagName !== "LABEL") {
        taxSwitch.click();
    }
});

taxSwitch.addEventListener('change', () => {
    for (let info of taxInfo) {
        if (info.style.display != 'inline') {
            info.style.display = 'inline';
        } else {
            info.style.display = 'none';
        }
    }
});