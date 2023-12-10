document.addEventListener("DOMContentLoaded", function () {
    const paymentMethodSelect = document.getElementById("p_method");
    const paymentLabel = document.querySelector(".payment");
    const gcashQRCode = document.querySelector(".qrcode[src*='qrgcash.jpg']");
    const paymayaQRCode = document.querySelector(".qrcode[src*='qrpaymaya.png']");
    const refLabel = document.querySelector(".refLabel");
    const p_refnum = document.getElementById("ref_num");
    const receiptLabel = document.querySelector(".Receipt");
    const pReceiptInput = document.getElementById("p_method_receipt");

    function toggleElements() {
        const selectedOption = paymentMethodSelect.value;
        if (selectedOption === "cod") {
            gcashQRCode.style.display = "none";
            paymayaQRCode.style.display = "none";
            paymentLabel.style.display = "none";
            refLabel.style.display = "none";
            p_refnum.style.display = "none";

            receiptLabel.style.display = "none";
            pReceiptInput.style.display = "none";
        }
        else {
            paymentLabel.style.display = "block";
            if (selectedOption === "gcash") {
                refLabel.style.display = "block";
                p_refnum.style.display = "block";
                gcashQRCode.style.display = "block";
                paymentLabel.textContent = "Gcash#: 09226053498";
                paymayaQRCode.style.display = "none";
            } else if (selectedOption === "paymaya") {
                refLabel.style.display = "block";
                p_refnum.style.display = "block";
                paymentLabel.textContent = "Paymaya#: 09226053498";
                gcashQRCode.style.display = "none";
                paymayaQRCode.style.display = "block";
            }
            receiptLabel.style.display = "block";
            pReceiptInput.style.display = "block";
        }
    }

    paymentMethodSelect.addEventListener("change", toggleElements);

    toggleElements();
});


document.addEventListener("DOMContentLoaded", function () {
    const paymentMethodSelectReserve = document.getElementById("r_p_method");
    const paymentLabelReserve = document.querySelector(".paymentReserve");
    const gcashQRCodeReserve = document.querySelector(".qrcodeReserve[src*='qrgcash.jpg']");
    const paymayaQRCodeReserve = document.querySelector(".qrcodeReserve[src*='qrpaymaya.png']");
    const refLabelReserve = document.querySelector(".refLabelReserve");
    const p_refnumReserve = document.getElementById("r_ref_num");
    const receiptLabelReserve = document.querySelector(".ReceiptReserve");
    const pReceiptInputReserve = document.getElementById("r_p_method_receipt");

    function toggleElementsReserve() {
        const selectedOptionReserve = paymentMethodSelectReserve.value;
        if (selectedOptionReserve === "cod") {
            gcashQRCodeReserve.style.display = "none";
            paymayaQRCodeReserve.style.display = "none";
            paymentLabelReserve.style.display = "none";
            refLabelReserve.style.display = "none";
            p_refnumReserve.style.display = "none";

            receiptLabelReserve.style.display = "none";
            pReceiptInputReserve.style.display = "none";
        }
        else {
            paymentLabelReserve.style.display = "block";
            if (selectedOptionReserve === "gcash") {
                refLabelReserve.style.display = "block";
                p_refnumReserve.style.display = "block";
                gcashQRCodeReserve.style.display = "block";
                paymentLabelReserve.textContent = "Gcash#: 09226053498";
                paymayaQRCodeReserve.style.display = "none";
            } else if (selectedOptionReserve === "paymaya") {
                refLabelReserve.style.display = "block";
                p_refnumReserve.style.display = "block";
                paymentLabelReserve.textContent = "Paymaya#: 09226053498";
                gcashQRCodeReserve.style.display = "none";
                paymayaQRCodeReserve.style.display = "block";
            }
            receiptLabelReserve.style.display = "block";
            pReceiptInputReserve.style.display = "block";
        }
    }

    paymentMethodSelectReserve.addEventListener("change", toggleElementsReserve);

    toggleElementsReserve();
});


function updateTotalOrder() {
    let priceElement = document.querySelector('.getPrice');
    let kiloElement = document.querySelector('#order_kilo');
    let totalElement = document.querySelector('#t_amount');

    if (priceElement && kiloElement && totalElement) {
        let price = parseFloat(priceElement.textContent);
        let kilo = parseFloat(kiloElement.value);

        if (!isNaN(price) && !isNaN(kilo)) {
            let total = price * kilo;
            totalElement.textContent = total;
        } else {
            totalElement.textContent = 0;
        }
    }
}

document.querySelector('#order_kilo').addEventListener('input', updateTotalOrder);
updateTotalOrder();

function updateTotalReserve() {
    let priceElement = document.querySelector('.getPrice');
    let kiloElement = document.querySelector('#reserve_kilo');
    let totalElement = document.querySelector('#r_amount');

    if (priceElement && kiloElement && totalElement) {
        let price = parseFloat(priceElement.textContent);
        let kilo = parseFloat(kiloElement.value);

        if (!isNaN(price) && !isNaN(kilo)) {
            let total = price * kilo;
            totalElement.textContent = total;
        } else {
            totalElement.textContent = 0;
        }
    }
}

document.querySelector('#reserve_kilo').addEventListener('input', updateTotalReserve);
updateTotalReserve();

