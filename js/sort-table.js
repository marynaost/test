import { array } from "./data.js";

const tableRef = document.querySelector("table");
const tBodyRef = document.querySelector("#tBody");

window.onload = () => {
  sortTable();
};
tableRef.addEventListener("click", (e) => {
  const elem = e.target;
  if (elem.nodeName !== "TH") {
    return;
  }
  const index = elem.cellIndex;
  sortTable(index);
});

function sortTable(index) {
  if (!index) {
    tBodyRef.innerHTML = getTable(array);
  }
  if (index === 0) {
    tBodyRef.innerHTML = getTable(arraySortByCode);
  } else if (index === 1) {
    tBodyRef.innerHTML = getTable(arraySortByIso);
  } else if (index === 3) {
    tBodyRef.innerHTML = getTable(arraySortByName);
  } else if (index === 4) {
    tBodyRef.innerHTML = getTable(arraySortByRate);
  } else if (index === 5) {
    tBodyRef.innerHTML = getTable(arraySortByUahIncrease);
  } else if (index === 6) {
    tBodyRef.innerHTML = getTable(arraySortByPercent);
  } else {
    tBodyRef.innerHTML = getTable(array);
  }

  const td = document.querySelectorAll("td.changes");

  td.forEach((el) => {
    const value = el.textContent.split("")[0];
    if (value === "-") {
      el.style.color = "red";
    }
    if (value === "+") {
      el.style.color = "green";
    }
  });
}

function getTable(array) {
  return array
    .map(({ code, iso, amount, name, rate, changes, percent }) => {
      return `
      <tr>
      <td>${code}</td>
        <td>${iso}</td>
        <td>${amount}</td>
        <td>${name}</td>
        <td>${rate}</td>
        <td class="changes">${changes}</td>
        <td class="changes">${percent} %</td>
        </tr>
        `;
    })
    .join(" ");
}
const arraySortByCode = [...array].sort(
  (a, b) => Number(a.code) - Number(b.code)
);

const arraySortByIso = [...array].sort((a, b) => a.iso.localeCompare(b.iso));

const arraySortByName = [...array].sort((a, b) => a.name.localeCompare(b.name));

const arraySortByRate = [...array].sort(
  (a, b) =>
    Number(a.rate.split(",").join("")) - Number(b.rate.split(",").join(""))
);

const arraySortByUahIncrease = [...array].sort(
  (a, b) =>
    Number(a.changes.split(".").join("")) -
    Number(b.changes.split(".").join(""))
);

const arraySortByUahDescending = [...array].sort(
  (a, b) =>
    Number(b.changes.split(".").join("")) -
    Number(a.changes.split(".").join(""))
);

const arraySortByPercent = [...array].sort(
  (a, b) =>
    Number(a.percent.split(".").join("")) -
    Number(b.percent.split(".").join(""))
);

const arraySortByPercentDescending = [...array].sort(
  (a, b) =>
    Number(b.percent.split(".").join("")) -
    Number(a.percent.split(".").join(""))
);
