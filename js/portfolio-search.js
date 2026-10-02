(function () {
  "use strict";

  const form = document.getElementById("site-search");
  const input = document.getElementById("site-search-input");
  const summary = document.getElementById("search-summary");
  const emptyState = document.getElementById("search-empty");

  if (!form || !input || !summary || !emptyState) {
    return;
  }

  const items = Array.from(document.querySelectorAll("[data-search-item]"));
  const sections = Array.from(document.querySelectorAll("[data-search-section]"));

  function updateResults() {
    const query = input.value.trim().toLocaleLowerCase();
    let resultCount = 0;

    items.forEach(function (item) {
      const searchableText = (
        (item.dataset.searchText || "") + " " + (item.textContent || "")
      ).toLocaleLowerCase();
      const matches = !query || searchableText.includes(query);
      const isPreview = item.dataset.searchPreview !== "false";

      item.hidden = !matches || (!query && !isPreview);
      if (matches) {
        resultCount += 1;
      }
    });

    sections.forEach(function (section) {
      const sectionItems = Array.from(section.querySelectorAll("[data-search-item]"));
      section.hidden = query.length > 0 && !sectionItems.some(function (item) {
        return !item.hidden;
      });
    });

    const searching = query.length > 0;
    summary.hidden = !searching;
    summary.textContent = searching
      ? resultCount + " hasil ditemukan untuk “" + input.value.trim() + "”"
      : "";
    emptyState.hidden = !searching || resultCount > 0;
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    updateResults();
  });
  input.addEventListener("input", updateResults);
  updateResults();
})();
