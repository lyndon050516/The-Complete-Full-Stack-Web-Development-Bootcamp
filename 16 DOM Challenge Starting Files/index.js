document
  .querySelector("ul")
  .querySelectorAll("li")
  .forEach(function (li) {
    if (li.textContent === "Third") {
      li.textContent = "Fourth";
    }
  });
