function openForm() {
    // Reset the form and hide success message if already shown
    resetForm();
    document.getElementById('consignmentForm').classList.remove('hidden');
}

function closeForm() {
    document.getElementById('consignmentForm').classList.add('hidden');
    document.getElementById('successMessage').classList.add('hidden');
}

function nextSection(current, next) {
    // Hide the current section and show the next section
    document.getElementById(current).classList.add('hidden');
    document.getElementById(next).classList.remove('hidden');
}

function previousSection(current, previous) {
    // Hide the current section and show the previous section
    document.getElementById(current).classList.add('hidden');
    document.getElementById(previous).classList.remove('hidden');
}





function resetForm() {
    // Reset all input fields and show the first section
    document.getElementById('senderDetails').classList.remove('hidden');
    document.getElementById('receiverDetails').classList.add('hidden');
    document.getElementById('pickupDetails').classList.add('hidden');

    const inputs = document.querySelectorAll('#consignmentForm input, #consignmentForm select');
    inputs.forEach(input => {
        if (input.type !== 'button' && input.type !== 'submit') {
            input.value = '';
        }
    });

    document.getElementById('successMessage').classList.add('hidden');
}

// Function to validate the pincode (sender or receiver)
function validatePincode(type) {
    const pincodeInput = document.getElementById(`${type}Pincode`);
    const pincode = pincodeInput.value.trim();

    if (!pincode) {
        alert("Please enter a pincode.");
        return;
    }

    // Show loading overlay while fetching data
    document.getElementById("loadingOverlay").classList.remove("hidden");

    // Validate Pincode API call
    fetch("http://localhost:3000/validate_pincode", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ pincode })
    })
    .then(response => response.json())
    .then(data => {
        // Hide loading overlay
        

        if (data.valid) {
            // Pincode is valid, now fetch pincode details
            fetchPincodeDetails(pincode, type);
        } else {
            // Pincode is invalid
            alert("Invalid pincode entered. Please try again.");
        }
    })
    .catch(error => {
        // Hide loading overlay and show error message
        document.getElementById("loadingOverlay").classList.add("hidden");
        alert("Error validating pincode. Please try again later.");
        console.error(error);
    });
}

// Function to fetch pincode details and populate PostOffice, State, and District
function fetchPincodeDetails(pincode, type) {
    fetch("http://localhost:3000/get_pincode_details", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ pincode })
    })
    .then(response => response.json())
    .then(data => {
        if (data && data.length > 0 && data[0].PostOffice) {
            const postOffices = data[0].PostOffice;
            const postOfficeSelect = document.getElementById(`${type}PostOffice`);
            const stateInput = document.getElementById(`${type}State`);
            const districtInput = document.getElementById(`${type}District`);

            // Clear previous options
            postOfficeSelect.innerHTML = "";

            // Populate the post office dropdown
            postOffices.forEach(postOffice => {
                const option = document.createElement("option");
                option.value = postOffice.Name;
                option.textContent = postOffice.Name;
                postOfficeSelect.appendChild(option);
            });

            // Disable the state and district fields initially
            stateInput.value = postOffices[0].State;
            districtInput.value = postOffices[0].District;

            // Make these fields uneditable
            stateInput.disabled = true;
            districtInput.disabled = true;

            // Optionally, you could listen for changes in the post office dropdown if you want to update state/district dynamically
            postOfficeSelect.addEventListener('change', function() {
                const selectedPostOffice = postOffices.find(post => post.Name === this.value);
                stateInput.value = selectedPostOffice.State;
                districtInput.value = selectedPostOffice.District;
            });
            document.getElementById("loadingOverlay").classList.add("hidden");

        } else {
            alert("No post office details found for this pincode.");
        }
    })
    .catch(error => {
        alert("Error fetching pincode details. Please try again later.");
        console.error(error);
    });
}
