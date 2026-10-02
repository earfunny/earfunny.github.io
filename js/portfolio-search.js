(function () {
  "use strict";

  const form = document.getElementById("site-search");
  const input = document.getElementById("site-search-input");
  const summary = document.getElementById("search-summary");
  const emptyState = document.getElementById("search-empty");
  const bingSearchLink = document.getElementById("bing-search-link");

  if (!form || !input || !summary || !emptyState || !bingSearchLink) {
    return;
  }

  const items = Array.from(document.querySelectorAll("[data-search-item]"));
  const sections = Array.from(document.querySelectorAll("[data-search-section]"));

  function updateBingLink() {
    const query = input.value.trim();
    const searchUrl = new URL(query ? form.action : "https://www.bing.com/");

    if (query) {
      searchUrl.searchParams.set("q", query);
    }

    bingSearchLink.href = searchUrl.toString();
  }

  function updateResults() {
    const query = input.value.trim().toLocaleLowerCase();
    let resultCount = 0;

    updateBingLink();
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
    const query = input.value.trim();

    if (!query) {
      input.focus();
      return;
    }

    const searchUrl = new URL(form.action);
    searchUrl.searchParams.set("q", query);
    window.location.assign(searchUrl.toString());
  });
  input.addEventListener("input", updateResults);
  updateResults();
})();
