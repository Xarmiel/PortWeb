document.addEventListener("DOMContentLoaded", () => {
    const dropdown = document.getElementById("filter-dropdown");
    const trigger = document.getElementById("filter-trigger");
    const triggerText = trigger ? trigger.querySelector(".filter_trigger-text") : null;
    const chips = document.querySelectorAll(".filter_chip");
    const sections = document.querySelectorAll("[data-category]");

    if (!dropdown || !trigger || !chips.length || !sections.length) return;

    const FADE_MS = 180;
    let activeFilter = "todos";

    function applyFilter(category) {
        sections.forEach((section) => {
            const matches = category === "todos" || section.dataset.category === category;

            if (matches) {
                if (section.classList.contains("filter_hidden")) {
                    section.classList.remove("filter_hidden");
                    section.style.opacity = "0";
                    requestAnimationFrame(() => {
                        section.style.opacity = "1";
                    });
                }
            } else {
                section.style.opacity = "0";
                window.setTimeout(() => {
                    section.classList.add("filter_hidden");
                }, FADE_MS);
            }
        });
    }

    function closeDropdown() {
        dropdown.classList.remove("is-open");
    }
    trigger.addEventListener("click", (event) => {
        event.stopPropagation();
        dropdown.classList.toggle("is-open");
    });

    document.addEventListener("click", (event) => {
        if (!dropdown.contains(event.target)) {
            closeDropdown();
        }
    });

    chips.forEach((chip) => {
        chip.addEventListener("click", () => {
            chips.forEach((c) => c.classList.remove("is-active"));
            chip.classList.add("is-active");

            activeFilter = chip.dataset.filter;
            if (triggerText) triggerText.textContent = chip.textContent;
            applyFilter(activeFilter);

            closeDropdown();
        });
    });
});