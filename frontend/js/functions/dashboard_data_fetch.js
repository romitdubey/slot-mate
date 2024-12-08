document.addEventListener('DOMContentLoaded', async () => {
    const phoneNumber = localStorage.getItem('phoneNumber');; // Replace with actual logged-in user's phone number
    const response = await fetch(`http://localhost:5000/api/consignment/consignments/mobile/${phoneNumber}`);
    const { currentOrders, pastOrders, ordersForMe } = await response.json();
// If the phone number exists in localStorage, update the text content of the profile element
if (phoneNumber) {
    document.getElementById('profile-btn').innerHTML = `
                <i class="fas fa-user-circle"></i>
              <span>${phoneNumber}</span>
              <i class="fas fa-chevron-down"></i>`;
} else {
    // If the phone number is not in localStorage, you can set a default or show an error
    document.getElementById('profile-btn').innerHTML = 'No phone number found';
}

    // Helper function to render order data
    function renderOrders(orders, tableId) {
        const tableBody = document.querySelector(`#${tableId} tbody`);
        tableBody.innerHTML = ''; // Clear the table before rendering

        orders.forEach(order => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${order._id}</td>
                <td>${order.sender.pincode}</td>
                <td>${order.receiver.pincode}</td>
                <td>
  ${(() => {
    const statusMap = order.deliveryStatus;
    if (order.deliveryStatus.delivered === 1) return 'Delivered';
    if (order.deliveryStatus.out_for_delivery === 1) return 'Out for Delivery';
    if (order.deliveryStatus.reached_to_nearest_hub === 1) return 'Reached Nearest Hub';
    if (order.deliveryStatus.in_transit === 1) return 'In Transit';
    if (order.deliveryStatus.picked_up === 1) return 'Picked Up';
    if (order.deliveryStatus.ready_for_pickup === 1) return 'Ready for Pickup';
    return 'Pending';
  })()}
</td>
  
                <td>${new Date(order.estimatedDeliveryDate).toLocaleDateString()}</td>
                <td><button class="view-btn" data-order='${JSON.stringify(order)}'>View Details</button></td>
            `;
            tableBody.appendChild(row);
        });
    }

    // Render the tables
    renderOrders(currentOrders, 'current-orders');
    renderOrders(pastOrders, 'past-orders');
    renderOrders(ordersForMe, 'orders-for-me');

// Handle click on view details button
document.querySelectorAll('.view-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        const order = JSON.parse(e.target.getAttribute('data-order'));

        // Get the order details container
        const detailsContainer = document.querySelector('#order-details');
        
        // Create detailed and styled HTML content for order details
        detailsContainer.innerHTML = `
            <div class="flex justify-between">
                <span class="font-semibold">Sender:</span>
                <span>${order.sender.fullName}</span>
            </div>
            <div class="flex justify-between">
                <span class="font-semibold">Sender Mobile:</span>
                <span>${order.sender.mobileNumber}</span>
            </div>
            <div class="flex justify-between">
                <span class="font-semibold">Sender Address:</span>
                <span>${order.sender.address}, ${order.sender.pincode}, ${order.sender.postOffice}, ${order.sender.state}, ${order.sender.district}</span>
            </div>
            <div class="flex justify-between">
                <span class="font-semibold">Receiver:</span>
                <span>${order.receiver.fullName}</span>
            </div>
            <div class="flex justify-between">
                <span class="font-semibold">Receiver Mobile:</span>
                <span>${order.receiver.mobileNumber}</span>
            </div>
            <div class="flex justify-between">
                <span class="font-semibold">Receiver Address:</span>
                <span>${order.receiver.address}, ${order.receiver.pincode}, ${order.receiver.postOffice}, ${order.receiver.state}, ${order.receiver.district}</span>
            </div>
            <div class="flex justify-between">
                <span class="font-semibold">Pickup Date:</span>
                <span>${order.pickupDate}</span>
            </div>
            <div class="flex justify-between">
                <span class="font-semibold">Pickup Charge:</span>
                <span>${order.pickupCharge}</span>
            </div>
            <div class="flex justify-between">
                <span class="font-semibold">Delivery Cost:</span>
                <span>${order.deliveryCost || 'Not available'}</span>
            </div>
            <div class="flex justify-between">
                <span class="font-semibold">Delivery Status:</span>
                <span>${(() => {
                    const statusMap = order.deliveryStatus;
                    if (order.deliveryStatus.delivered === 1) return 'Delivered';
                    if (order.deliveryStatus.out_for_delivery === 1) return 'Out for Delivery';
                    if (order.deliveryStatus.reached_to_nearest_hub === 1) return 'Reached Nearest Hub';
                    if (order.deliveryStatus.in_transit === 1) return 'In Transit';
                    if (order.deliveryStatus.picked_up === 1) return 'Picked Up';
                    if (order.deliveryStatus.ready_for_pickup === 1) return 'Ready for Pickup';
                    return 'Pending';
                  })()}</span>
            </div>
        `;

        // Display the popup
        document.querySelector('#popup').classList.remove('hidden');
    });
});

// Close the popup when the close button is clicked
document.querySelector('#close-popup').addEventListener('click', () => {
    document.querySelector('#popup').classList.add('hidden');
});
});
