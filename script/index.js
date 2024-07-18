const history = [];
let nameInput;
let timer;

const generateKhodam = () => {
  const khodam = [
    { khodam: "Charger Iphone", img: "img/charger-iphone.jpg" },
    { khodam: "Cobra Aji", img: "img/cobra.jpg" },
    { khodam: "Calya Penyok", img: "/img/calya-penyok.jpg" },
    { khodam: "Tawon Kawin", img: "/img/tawon-kawin.jpeg" },
  ];
  const randomNum = Math.floor(Math.random() * khodam.length);
  return khodam[randomNum];
};

document.getElementById("name").addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    handleForm(event);
  }
});

const displayLoading = () => {
  document.querySelector(".loading-container").style.display = "block";
};

const hideLoading = () => {
  document.querySelector(".loading-container").style.display = "none";
};

const onNameClick = (name) => {
  timer = 0;
  for (let i = 0; i < history.length; i++) {
    if (name === history[i].name) {
      displayResult(name, history[i].khodam, history[i].img);
    }
  }
};

const displayDropdownContent = (name) => {
  const dropdownHistory = document.getElementById("dropdownContent");

  const historyListContainer = document.createElement("div");
  historyListContainer.classList.add("history-item");

  const historyListName = document.createElement("p");
  historyListName.textContent = name;
  historyListName.addEventListener("click", () => onNameClick(name));

  const historyDeleteIcon = document.createElement("img");
  historyDeleteIcon.src = "/asset/delete.png";
  historyDeleteIcon.classList.add("delete-icon");
  historyDeleteIcon.addEventListener("click", () => handleDelete(name));
  historyListContainer.appendChild(historyListName);
  historyListContainer.appendChild(historyDeleteIcon);

  dropdownHistory.appendChild(historyListContainer);
};

const updateHistory = (name, khodam, img) => {
  let isNameDouble = false;
  let indexDoubledName = -1;

  for (let i = 0; i < history.length; i++) {
    if (name === history[i].name) {
      isNameDouble = true;
      indexDoubledName = i;
      break;
    }
  }

  if (isNameDouble) {
    history[indexDoubledName].khodam = khodam;
    history[indexDoubledName].img = img;
  } else {
    history.push({
      name: name,
      khodam: khodam,
      img: img,
    });
    updateDropdownDisplay();
  }
};

const handleForm = (event) => {
  event.preventDefault();
  timer = 3000;
  const khodam = generateKhodam();
  nameInput = document.getElementById("name").value;
  if (nameInput.length === 0) {
    alert("Masukan input terlebih dahulu!");
    return;
  } else {
    displayLoading();
    updateHistory(nameInput, khodam.khodam, khodam.img);
    displayResult(nameInput, khodam.khodam, khodam.img);
  }
  console.log(history);
};

const displayResult = (name, khodam, img) => {
  displayLoading();
  setTimeout(() => {
    hideLoading();
    document.getElementById(
      "displayName"
    ).textContent = `Nama yang dimasukan: ${name}`;
    document.getElementById(
      "KhodamResult"
    ).textContent = `Khodam kamu adalah: ${khodam}`;
    document.getElementById("imgKhodam").src = img;
  }, timer);
};

const handleDelete = (name) => {
  const indexToDelete = history.findIndex((item) => item.name === name);
  history.splice(indexToDelete, 1);
  updateDropdownDisplay();
  if (history.length > 0) {
    const previousItem = history[Math.max(0, indexToDelete - 1)]; // Get the item before the deleted one or the first item if deleting the first
    displayResult(previousItem.name, previousItem.khodam, previousItem.img);
  } else {
    clearDisplay();
  }
};

const updateDropdownDisplay = () => {
  const dropdownHistory = document.getElementById("dropdownContent");
  dropdownHistory.innerHTML = "";
  if (history.length === 0) {
    const emptyMessage = document.createElement("p");
    emptyMessage.textContent = "History Kosong";
    emptyMessage.classList.add("history-kosong");
    dropdownHistory.appendChild(emptyMessage);
  } else {
    history.forEach((item) => displayDropdownContent(item.name));
  }
};

const clearDisplay = () => {
  document.getElementById("displayName").textContent = "";
  document.getElementById("KhodamResult").textContent = "";
  document.getElementById("imgKhodam").src = "";
};

updateDropdownDisplay();
