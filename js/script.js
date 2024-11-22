// Handle Track Parcel Overlay
document.querySelector('.track-btn').addEventListener('click', function() {
    document.querySelector('.track-overlay').style.display = 'block';
  });
  
  document.getElementById('closeOverlay').addEventListener('click', function() {
    document.querySelector('.track-overlay').style.display = 'none';
  });
  
  document.getElementById('trackSubmit').addEventListener('click', function() {
    const trackingId = document.getElementById('trackingId').value;
    alert('Tracking Parcel ID: ' + trackingId); // Simulating parcel tracking
    document.querySelector('.track-overlay').style.display = 'none';
  });
  
  // Handle Postage Calculation
  document.getElementById('postageForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const weight = parseFloat(document.getElementById('weight').value);
    const distance = parseFloat(document.getElementById('distance').value);
    const postage = calculatePostage(weight, distance);
    document.getElementById('postageResult').innerText = 'Estimated Postage: $' + postage;
  });
  
  function calculatePostage(weight, distance) {
    const ratePerKg = 5;
    const ratePerKm = 0.5;
    return (weight * ratePerKg) + (distance * ratePerKm);
  }
  