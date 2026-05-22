const artCards = document.querySelectorAll(".art-card");

const modal = document.querySelector("#art-modal");
const modalImage = document.querySelector("#modal-image");
const modalTitle = document.querySelector("#modal-title");
const modalCollection = document.querySelector("#modal-collection");
const modalMedium = document.querySelector("#modal-medium");
const modalDate = document.querySelector("#modal-date");
const modalDescription = document.querySelector("#modal-description");
const modalCloseButtons = document.querySelectorAll("[data-modal-close]");

let lastFocusedElement = null;

function openModal(button) {
  if (!modal || !modalImage || !modalTitle || !modalCollection || !modalMedium || !modalDate || !modalDescription) {
    return;
  }

  lastFocusedElement = document.activeElement;

  const title = button.dataset.title || "Untitled Artwork";
  const image = button.dataset.image || "";
  const medium = button.dataset.medium || "Unknown medium";
  const date = button.dataset.date || "Unknown date";
  const collection = button.dataset.collection || "Gallery Work";
  const description = button.dataset.description || "No description has been added yet.";
  const modalLayout = button.dataset.modalLayout || "auto";

  modalTitle.textContent = title;
  modalImage.src = image;
  modalImage.alt = title;
  modalCollection.textContent = collection;
  modalMedium.textContent = medium;
  modalDate.textContent = date;
  modalDescription.textContent = description;

  const modalWindow = modal.querySelector(".art-modal-window");

if (modalWindow) {
  modalWindow.classList.remove("modal-layout-top", "modal-layout-side");
  
  if (modalLayout === "top") {
    modalWindow.classList.add("modal-layout-top");
  }

  if (modalLayout === "side") {
    modalWindow.classList.add("modal-layout-side");
  }
}

  modal.hidden = false;
  document.body.classList.add("modal-open");

  const closeButton = modal.querySelector(".modal-close");
  if (closeButton) closeButton.focus();
}

function closeModal() {
  if (!modal) return;

  modal.hidden = true;
  document.body.classList.remove("modal-open");

  if (lastFocusedElement) {
    lastFocusedElement.focus();
  }
}

artCards.forEach((card) => {
  const button = card.querySelector(".art-card-button");
  if (!button) return;

  button.addEventListener("click", () => {
    openModal(button);
  });
});

modalCloseButtons.forEach((button) => {
  button.addEventListener("click", closeModal);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal && !modal.hidden) {
    closeModal();
  }
});