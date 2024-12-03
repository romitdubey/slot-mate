const express = require('express');
const router = express.Router();
const Consignment = require('../models/consigment'); // Path to your consignment model
const { body, validationResult } = require('express-validator'); // For validation

// POST route to save consignment data
router.post('/createConsignment',async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Extract data from the request body
    const {
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
      schedulePickupTime,
      pickupDate,
      estimatedDeliveryDate,
      deliveryDay,
      deliveryTime,
      deliveryCost,
      paymentMethod,
    } = req.body;

    // Create a new consignment object
    const consignment = new Consignment({
      sender: {
        fullName: senderFullName,
        mobileNumber: senderMobileNumber,
        address: senderAddress,
        pincode: senderPincode,
        postOffice: senderPostOffice,
        state: senderState,
        district: senderDistrict,
      },
      receiver: {
        fullName: receiverFullName,
        mobileNumber: receiverMobileNumber,
        address: receiverAddress,
        pincode: receiverPincode,
        postOffice: receiverPostOffice,
        state: receiverState,
        district: receiverDistrict,
      },
      schedulePickupTime,
      pickupDate,
      estimatedDeliveryDate,
      deliveryDay,
      deliveryTime,
      deliveryCost,
      paymentMethod,
    });

    // Save consignment to the database
    await consignment.save();
    res.status(201).json({
      message: 'Consignment data saved successfully',
      consignment: consignment // Optionally return the saved consignment object
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error saving consignment data' });
  }
});

router.get('/consignments/mobile/:mobile', async (req, res) => {
  try {
    const consignments = await Consignment.find({
      $or: [
        { 'sender.mobileNumber': req.params.mobile },
        { 'receiver.mobileNumber': req.params.mobile },
      ]
    });

    if (consignments.length === 0) {
      return res.status(404).json({ message: 'No consignments found for this mobile number' });
    }

    res.status(200).json({ data: consignments });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching consignment', error: err.message });
  }
});

module.exports = router;
