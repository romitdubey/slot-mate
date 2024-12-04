// Handle form submission
function submitForm() {
  const loadingOverlay = document.createElement('div');
  loadingOverlay.classList.add(
      'fixed',
      'inset-0',
      'bg-black',
      'bg-opacity-50',
      'flex',
      'items-center',
      'justify-center',
      'z-50'
  );
  loadingOverlay.innerHTML = `
      <div class="text-white text-lg font-semibold">Submitting...</div>
  `;
  document.body.appendChild(loadingOverlay);

  setTimeout(() => {
      // Simulate successful submission
      loadingOverlay.remove();
      //document.getElementById('consignmentForm').classList.add('hidden');
      document.getElementById('successMessage').classList.remove('hidden');
      document.getElementById('consignmentId').textContent = '123456789';

      // Redirect back to the main page after 3 seconds
      setTimeout(() => {
          closeForm();
      }, 10000);
  }, 3000);
}
document.getElementById('submitConsignmentForm').addEventListener('click', async (e) => {
    e.preventDefault();
    submitForm();
    // Get the values from the form
    const senderFullName = document.getElementById('senderName').value;
    const senderMobileNumber = document.getElementById('senderPhone').value;
    const senderAddress = document.getElementById('senderAddress').value;
    const senderPincode = document.getElementById('senderPincode').value;
    const senderPostOffice = document.getElementById('senderPostOffice').value;
    const senderState = document.getElementById('senderState').value;
    const senderDistrict = document.getElementById('senderDistrict').value;
    const receiverFullName = document.getElementById('receiverName').value;
    const receiverMobileNumber = document.getElementById('receiverPhone').value;
    const receiverAddress = document.getElementById('receiverAddress').value;
    const receiverPincode = document.getElementById('receiverPincode').value;
    const receiverPostOffice = document.getElementById('receiverPostOffice').value;
    const receiverState = document.getElementById('receiverState').value;
    const receiverDistrict = document.getElementById('receiverDistrict').value;
    const pickupDate = document.getElementById('pickupDate').value;
    const deliveryCost = document.getElementById('priceDetails').value;
  
    // Prepare the data to send to the backend
    const consignmentData = {
      senderFullName,
      senderMobileNumber,
      senderAddress,
      senderPincode,
      senderPostOffice,
      senderState,
      senderDistrict,
      receiverFullName,
      receiverMobileNumber,
      receiverAddress,
      receiverPincode,
      receiverPostOffice,
      receiverState,
      receiverDistrict,
      pickupDate,
      deliveryCost
    };
    console.log(consignmentData);
    try {
      const response = await fetch('http://localhost:5000/api/consignment/createConsignment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(consignmentData)
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert(data.message); // Success
      } else {
        alert('Error: ' + data.message); // Error
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  });
  