// ------------------ Combined Quotes & Jokes ------------------
const funMessages = [
  { type: "quote", text: "Believe you can and you're halfway there. - Theodore Roosevelt" },
  { type: "joke", text: "Why don't eggs tell jokes? They'd crack each other up!" },
  { type: "quote", text: "Success is not final, failure is not fatal: It is the courage to continue that counts. - Winston Churchill" },
  { type: "joke", text: "What do you call a fake noodle? An impasta!" }
];

let currentMsg = 0;
function rotateFun() {
  const funDiv = document.getElementById("quote");
  const msg = funMessages[currentMsg];
  funDiv.innerHTML = msg.type === "quote" ? `💡 <em>${msg.text}</em>` : `😂 <em>${msg.text}</em>`;
  currentMsg = (currentMsg + 1) % funMessages.length;
}
setInterval(rotateFun, 7000);
window.addEventListener("DOMContentLoaded", rotateFun); // load first message

// ------------------ Adoption via Card Click ------------------
function adoptPet(petType) {
  const petName = prompt(`What would you like to name your ${petType}?`);
  if (!petName) return;

  showAdoptionModal(petType, petName);
  storeAdoption(petType, petName);
  updateAdoptedPetsList();
}

// ------------------ Adoption via Form ------------------
document.addEventListener("DOMContentLoaded", function () {
  updateAdoptedPetsList();

  const modal = document.getElementById("adoption-modal");
  const closeModal = document.getElementById("close-modal");

  closeModal.onclick = () => (modal.style.display = "none");
  window.onclick = (e) => {
    if (e.target === modal) modal.style.display = "none";
  };

  const clearBtn = document.getElementById("clear-adoptions");
  clearBtn.onclick = () => {
    const confirmClear = confirm("Are you sure you want to clear all adopted pets?");
    if (confirmClear) {
      localStorage.removeItem("adoptedPets");
      updateAdoptedPetsList();
    }
  };

  // Handle form adoption
  const form = document.getElementById("form");
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const petType = document.getElementById("pet-type").value;
    const petName = document.getElementById("pet-name").value.trim();
    if (!petName) return;

    showAdoptionModal(petType, petName);
    storeAdoption(petType, petName);
    updateAdoptedPetsList();
    form.reset();
  });
});

// ------------------ Modal + Confetti ------------------
function showAdoptionModal(petType, petName) {
  const modal = document.getElementById("adoption-modal");
  const modalText = document.getElementById("modal-text");
  modalText.innerHTML = `🎉 You adopted a <strong>${petType}</strong> named <strong>${petName}</strong>!`;
  modal.style.display = "block";

  if (typeof confetti === "function") {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }
}

// ------------------ Storage + Display ------------------
function storeAdoption(petType, petName) {
  let adopted = JSON.parse(localStorage.getItem("adoptedPets")) || [];
  adopted.push({ type: petType, name: petName });
  localStorage.setItem("adoptedPets", JSON.stringify(adopted));
}

function updateAdoptedPetsList() {
  const list = document.getElementById("adopted-pets-list");
  list.innerHTML = "";

  const adopted = JSON.parse(localStorage.getItem("adoptedPets")) || [];

  if (adopted.length === 0) {
    list.innerHTML = `<li>🐾 You haven’t adopted any pets yet. They’re waiting for you!</li>`;
    return;
  }

  adopted.forEach((pet) => {
    const li = document.createElement("li");
    li.textContent = `🐾 ${pet.type} — ${pet.name}`;
    list.appendChild(li);
  });
}
