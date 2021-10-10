const express = require("express");
const router = express.Router();
const crypto = require("crypto");

const Razorpay = require("razorpay");
const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret:process.env.RAZORPAY_SECRET
});

// for initiating payment
router.post("/order/:amount", async function (req, res) {
    try {
        const options = {
            amount: 100 * req.params.amount,
            currency: "INR",
        }
        const order = await instance.orders.create(options);
        if (!order) return res.status(500).send("Error occured");
        return res.status(200).json(order);
    }
    catch (error) {
        res.status(500).json({ error });
    }
});

// for verify and capture payment
router.post("/success", async function (req, res) {
    try {
        const {
            orderCreateId,
            razorpayPaymentId,
            razorpayOrderId,
            razorpaySignature,
            amount,
            currency
        } = req.body;
        const signature = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);
        signature.update(`${orderCreateId}|${razorpayPaymentId}`);
        const digest = signature.digest("hex");

        if (digest !== razorpaySignature) return res.status(400).json({ msg: "Transactions not legit" });
        const captureResponse = await instance.payment.capture(
            razorpayPaymentId,
            amount,
            currency
        );
        return res.status(200).json({
            status: "success",
            orderId: razorpayOrderId,
            paymentId: razorpayPaymentId,
            captureResponse
        });
    }
    catch (err) {
        return res.status(500).send(erro);
    }
})

module.exports = router;