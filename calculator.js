function calculatePrice() {
    // Sheet dimensions and prices
    const sheetWidth = 1380;
    const prices = {
        heatCut: {
            3000: 2791093,
            4000: 3721457,
            5000: 4651821,
            6000: 5582186
        },
        shade: {
            3000: 1640056,
            4000: 2186741,
            5000: 2733426,
            6000: 3280111
        }
    };

    // Accessory prices and lengths
    const accessories = {
        alumFrame: { price: 208954, length: 6000 },
        coverAlum: { price: 126942, length: 6000 },
        epdmBase: { price: 557507, length: 30000 },
        epdmSeal: { price: 318908, length: 24000 },
        endCap: { price: 2515, length: null }, // Length not applicable for end caps
        alumLProfile: { price: 115893, length: 6000 },
        flashingAlumZ: { price: 275767, length: 6000 }
    };

    // User input
    const type = document.getElementById('type').value;
    const userLength = parseInt(document.getElementById('length').value);
    const userWidth = parseInt(document.getElementById('width').value);

    // Determine the price per sheet based on the length
    let pricePerSheet;
    if (userLength <= 3000) {
        pricePerSheet = prices[type][3000];
    } else if (userLength <= 4000) {
        pricePerSheet = prices[type][4000];
    } else if (userLength <= 5000) {
        pricePerSheet = prices[type][5000];
    } else if (userLength <= 6000) {
        pricePerSheet = prices[type][6000];
    } else {
        document.getElementById('result').innerText = 'Invalid length provided.';
        return;
    }

    // Calculate the number of sheets required for the canopy width
    const sheetsAcrossWidth = Math.ceil(userWidth / sheetWidth);

    // Calculate the total price for the sheets
    const totalPrice = sheetsAcrossWidth * pricePerSheet;

    // Calculate the quantities and total price for accessories
    const alumFrameQty = sheetsAcrossWidth + 1;
    const coverAlumQty = sheetsAcrossWidth + 1;
    const epdmBaseQty = Math.ceil((userLength * (sheetsAcrossWidth + 1)) / accessories.epdmBase.length);
    const epdmSealQty = Math.ceil((userLength * (sheetsAcrossWidth + 1) * 2) / accessories.epdmSeal.length);
    const endCapQty = sheetsAcrossWidth + 1;
    const alumLProfileQty = Math.ceil(userWidth / accessories.alumLProfile.length);
    const flashingAlumZQty = Math.ceil(userWidth / accessories.flashingAlumZ.length);

    const alumFrameTotal = alumFrameQty * accessories.alumFrame.price;
    const coverAlumTotal = coverAlumQty * accessories.coverAlum.price;
    const epdmBaseTotal = epdmBaseQty * accessories.epdmBase.price;
    const epdmSealTotal = epdmSealQty * accessories.epdmSeal.price;
    const endCapTotal = endCapQty * accessories.endCap.price;
    const alumLProfileTotal = alumLProfileQty * accessories.alumLProfile.price;
    const flashingAlumZTotal = flashingAlumZQty * accessories.flashingAlumZ.price;

    // Calculate the total price including all accessories
    const totalPriceWithAllAccessories = totalPrice + alumFrameTotal + coverAlumTotal +
                                         epdmBaseTotal + epdmSealTotal + endCapTotal +
                                         alumLProfileTotal + flashingAlumZTotal;

    // Display the result
    let resultText = `Total sheets required: ${sheetsAcrossWidth}\nTotal price for Shinkolite: Rp${totalPrice.toLocaleString()}\n\n`;
    resultText += `Accessories:\n`;
    resultText += `Aluminium Frame (${alumFrameQty} pcs): Rp${alumFrameTotal.toLocaleString()}\n`;
    resultText += `Cover Aluminium (${coverAlumQty} pcs): Rp${coverAlumTotal.toLocaleString()}\n`;
    resultText += `EPDM Rubber Base (${epdmBaseQty} pcs): Rp${epdmBaseTotal.toLocaleString()}\n`;
    resultText += `EPDM Rubber Seal (${epdmSealQty} pcs): Rp${epdmSealTotal.toLocaleString()}\n`;
    resultText += `End Cap (${endCapQty} pcs): Rp${endCapTotal.toLocaleString()}\n`;
    resultText += `Aluminium L Profile (${alumLProfileQty} pcs): Rp${alumLProfileTotal.toLocaleString()}\n`;
    resultText += `Flashing Aluminium Z (${flashingAlumZQty} pcs): Rp${flashingAlumZTotal.toLocaleString()}\n\n`;
    resultText += `Total price including all accessories: Rp${totalPriceWithAllAccessories.toLocaleString()}`;

    document.getElementById('result').innerText = resultText;
}

// Ensure to call this function when the Calculate button is clicked.