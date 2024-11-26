// Profile Dropdown
const profile = document.querySelector('.profile');
const dropdown = document.querySelector('.profile-dropdown');

// Toggle dropdown on click
profile.addEventListener('click', function (event) {
  event.stopPropagation();
  dropdown.style.display = (dropdown.style.display === 'block') ? 'none' : 'block';
});

// Hide dropdown if clicked outside
document.addEventListener('click', function (event) {
  if (!profile.contains(event.target)) {
    dropdown.style.display = 'none';
  }
});

// Orders Array
let orders = [
  {
    id: "12345",
    deliveryDate: "2024-11-30",
    timeSlot: "2 PM - 4 PM",
    creationDate: "2024-11-20",
    payment: "Paid",
    location: "New York",
    status: "Delivered",
  },
  {
    id: "12346",
    deliveryDate: "2024-12-01",
    timeSlot: "10 AM - 12 PM",
    creationDate: "2024-11-21",
    payment: "Paid",
    location: "Los Angeles",
    status: "In Transit",
  },
];

// Load Orders into Separate Tables
function loadOrders() {
  orders.forEach((order) => {
    addOrderToTable(order);
  });
}

// Add Order to Appropriate Table
function addOrderToTable(order) {
  const tbodyId = order.status === "Delivered" ? "delivered-tbody" : "in-progress-tbody";
  const tbody = document.getElementById(tbodyId);

  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${order.id}</td>
    <td>${order.deliveryDate}</td>
    <td>${order.timeSlot}</td>
    <td>${order.creationDate}</td>
    <td>${order.payment}</td>
    <td>${order.location}</td>
    <td>
      <button class="see-status-btn" onclick="showStatus('${order.id}')">See Status</button>
    </td>
  `;
  tbody.appendChild(row);
}

// Show Order Status Modal
function showStatus(orderId) {
  const modal = document.getElementById("order-status-modal");
  modal.style.display = "flex"; // Show the modal

  const order = orders.find((o) => o.id === orderId); // Find the order
  const steps = document.querySelectorAll(".status-step");
  const locationElem = document.getElementById("sample-location");

  // Reset Steps and Location
  steps.forEach((step) => step.classList.remove("completed"));
  locationElem.textContent = "";

  // Update steps based on status
  if (order.status === "Picked Up") {
    steps[0].classList.add("completed");
  } else if (order.status === "In Transit") {
    steps[0].classList.add("completed");
    steps[1].classList.add("completed");
    locationElem.textContent = order.location;
  } else if (order.status === "Delivered") {
    steps.forEach((step) => step.classList.add("completed"));
  }
}

function closeModal() {
  const modal = document.getElementById("order-status-modal");
  modal.style.display = "none"; // Hide the modal
}

// Modal Handling for Adding New Consignment
let currentConsignment = {};
const addConsignmentModal = document.getElementById("add-consignment-modal");
const paymentModal = document.getElementById("payment-modal");
const addConsignmentForm = document.getElementById("add-consignment-form");

document.getElementById("add-consignment-btn").addEventListener("click", () => {
  addConsignmentModal.style.display = "flex";
});

function closeAddConsignmentModal() {
  addConsignmentModal.style.display = "none";
}

function closePaymentModal() {
  paymentModal.style.display = "none";
}

// Handle Form Submission
addConsignmentForm.addEventListener("submit", (event) => {
  event.preventDefault();

  // Collect Form Data
  currentConsignment = {
    id: document.getElementById("consignment-id").value,
    deliveryDate: document.getElementById("delivery-date").value,
    timeSlot: document.getElementById("time-slot").value,
    location: document.getElementById("location").value,
    creationDate: new Date().toISOString().split("T")[0],
    payment: "Paid",
    status: "Picked Up",
  };

  // Close form modal and show payment modal
  closeAddConsignmentModal();
  paymentModal.style.display = "flex";
});

// Complete Payment and Add Consignment
function completePayment() {
  // Add the consignment to orders array
  orders.push(currentConsignment);

  // Add the order dynamically to the appropriate table
  addOrderToTable(currentConsignment);

  // Close payment modal
  closePaymentModal();

  // Clear form
  addConsignmentForm.reset();
}

// Load orders on page load
loadOrders();



// Open Profile Settings Modal
document.getElementById("profile-settings-btn").addEventListener("click", function () {
  document.getElementById("profile-settings-modal").style.display = "flex";
});

// Close Profile Settings Modal
function closeProfileSettingsModal() {
  document.getElementById("profile-settings-modal").style.display = "none";
}

// Handle Profile Form Submission
document.getElementById("profile-settings-form").addEventListener("submit", function (event) {
  event.preventDefault();

  // Collect updated profile data
  const updatedProfile = {
    name: document.getElementById("profile-name").value,
    username: document.getElementById("profile-username").value,
    password: document.getElementById("profile-password").value,
    email: document.getElementById("profile-email").value,
    phone: document.getElementById("profile-phone").value,
    homeAddress: document.getElementById("profile-address-home").value,
    officeAddress: document.getElementById("profile-address-office").value,
    gender: document.getElementById("profile-gender").value,
    profession: document.getElementById("profile-profession").value,
  };

  // Log updated data (You can replace this with API call to save the data)
  console.log("Updated Profile Data:", updatedProfile);

  // Close the modal
  closeProfileSettingsModal();

  // Optionally display a success message
  alert("Profile updated successfully!");
});

