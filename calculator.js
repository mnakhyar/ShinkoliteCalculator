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
	
	// Determine istallation Price
	const priceInstall = 975000;
	const areaInstall = Math.ceil(userLength * userWidth/1000000);
	const totalInstall = Math.ceil(priceInstall * areaInstall);

    // Calculate the number of sheets required for the canopy width
    const sheetsAcrossWidth = Math.ceil(userWidth / sheetWidth);

    // Calculate the total price for the sheets
    const totalPrice = sheetsAcrossWidth * pricePerSheet;

    // Calculate the quantities and total price for accessories
	let alumFrameQty, coverAlumQty;
    if (userLength <= 3000) {
        // For every two sheets, only one Aluminium Frame and Cover Aluminium Frame are needed
        alumFrameQty = Math.ceil(sheetsAcrossWidth / 2);
        coverAlumQty = Math.ceil(sheetsAcrossWidth / 2);
    } else {
        // If sheet length is more than 3000mm, each sheet requires its own Aluminium Frame and Cover Aluminium Frame
        alumFrameQty = sheetsAcrossWidth + 1;
        coverAlumQty = sheetsAcrossWidth + 1;
    };
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

 // Assuming 'type' is either 'heatCut' or 'shade'
    const typeText = type === 'heatCut' ? 'Heat Cut' : 'Shade';
	
 // Dimension of Shinkolite sheet
	let dimensionText ;
	if (userLength <= 3000) {
        dimensionText = "3 m";
    } else if (userLength <= 4000) {
        dimensionText = "4 m";
    } else if (userLength <= 5000) {
         dimensionText = "5 m";;
    } else if (userLength <= 6000) {
         dimensionText = "6 m";;
    } else {
		null
	};
	

    // Calculate the tax (11% of the total price)
    const taxAmount = Math.ceil(totalPriceWithAllAccessories * 0.11);
	
	// Calculate the final total price including tax
    const finalTotalPrice = totalPriceWithAllAccessories + taxAmount;

    // Display the result
let resultTable = `<table class="result-table">
                      <tr><th>Item</th><th>Quantity</th><th>Price</th></tr>
                      <tr><td>${typeText} ${dimensionText} </td><td>${sheetsAcrossWidth} Sheets</td><td>Rp${totalPrice.toLocaleString()}</td></tr>`;

resultTable += `<tr><td>Aluminium Frame</td><td>${alumFrameQty} pcs</td><td>Rp${alumFrameTotal.toLocaleString()}</td></tr>`;
resultTable += `<tr><td>Cover Aluminium</td><td>${coverAlumQty} pcs</td><td>Rp${coverAlumTotal.toLocaleString()}</td></tr>`;
resultTable += `<tr><td>EPDM Rubber Base</td><td>${epdmBaseQty} pcs</td><td>Rp${epdmBaseTotal.toLocaleString()}</td></tr>`;
resultTable += `<tr><td>EPDM Rubber Seal</td><td>${epdmSealQty} pcs</td><td>Rp${epdmSealTotal.toLocaleString()}</td></tr>`;
resultTable += `<tr><td>End Cap</td><td>${endCapQty} pcs</td><td>Rp${endCapTotal.toLocaleString()}</td></tr>`;
resultTable += `<tr><td>Aluminium L Profile</td><td>${alumLProfileQty} pcs</td><td>Rp${alumLProfileTotal.toLocaleString()}</td></tr>`;
resultTable += `<tr><td>Flashing Aluminium Z</td><td>${flashingAlumZQty} pcs</td><td>Rp${flashingAlumZTotal.toLocaleString()}</td></tr>`;
resultTable += `<tr><td colspan="2"><strong>Total price including all accessories</strong></td><td><strong>Rp${totalPriceWithAllAccessories.toLocaleString()}</strong></td></tr>`;
resultTable += `<tr><td></td> <td> </td> </tr>`;
resultTable += `<tr><td colspan="2">Tax 11%</td><td>Rp${taxAmount.toLocaleString()}</td></tr>`;
resultTable += `<tr><td colspan="2"><strong>Total Material price including tax</strong></td><td><strong>Rp${finalTotalPrice.toLocaleString()}</strong></td></tr>`;
resultTable += `<tr><td></td> <td> </td> </tr>`;
resultTable += `<tr><th>Item</th><th>Area</th><th>Price</th></tr>`;
resultTable += `<tr><td colspan="2">Installation per m<sup>2</sup></td><td>Rp${priceInstall.toLocaleString()}</td></tr>`;
resultTable += `<tr><td>Installation Price</td><td>${areaInstall.toLocaleString()} m<sup>2</sup></td><td>Rp${totalInstall.toLocaleString()}</td></tr>`;

resultTable += `</table>`;




// Set the innerHTML of the result div to the result table
document.getElementById('result').innerHTML = resultTable;


    document.getElementById('result').innerHTML = resultText;
}

// Ensure to call this function when the Calculate button is clicked.