document.getElementById("line1").style.opacity = "0.3";
document.getElementById("line2").style.opacity = "0.3";
document.getElementById("line3").style.opacity = "0.3";

function showPopup() {
    const button = document.getElementById('input1button');
    const popupContainer = document.getElementById('popupContainer');

    // Calculate the position of the button
    const buttonRect = button.getBoundingClientRect();
    const buttonTop = buttonRect.top;
    const buttonLeft = buttonRect.left;

    // Set the position of the popup
    popupContainer.style.top = (buttonTop - popupContainer.offsetHeight - 10) + 'px';
    popupContainer.style.left = (buttonLeft + button.offsetWidth / 2 - popupContainer.offsetWidth / 2) + 'px';

    // Show the popup
    popupContainer.style.display = 'block';
}
const nav01 = document.getElementById('nav01');
const nav02 = document.getElementById('nav02');
const nav03 = document.getElementById('nav03');
const nav04 = document.getElementById('nav04');
// input1 div functions
//// Function to validate check-in and check-out dates
function validateInput1() {
    const checkinInput = document.getElementById("checkin");
    const checkoutInput = document.getElementById("checkout");

    if (!checkinInput.value || !checkoutInput.value) {
        alert("Please select both check-in and check-out dates.");

        // Highlight invalid inputs with a light red color
        checkinInput.classList.add("invalid");
        checkoutInput.classList.add("invalid");

        return false;
    } else {
        // If valid, remove the "invalid" class if it was previously added
        checkinInput.classList.remove("invalid");
        checkoutInput.classList.remove("invalid");
        return true;
    }
}
function validateInput2() {
    const titleInput = document.getElementById("title");
    const firstNameInput = document.getElementById("first-name");
    const lastNameInput = document.getElementById("last-name");
    const countryCodeInput = document.getElementById("country-code");
    const telephoneNumberInput = document.getElementById("telephone-number");
    const emailInput = document.getElementById("email");
    const smokingPreferenceInputs = document.querySelectorAll("input[name='smoking-preference']");
    const specialPreferenceInputs = document.querySelectorAll("input[name='special-preferences']");
    const lowFloorPreferenceInput = document.getElementById("low-floor");
    const highFloorPreferenceInput = document.getElementById("high-floor");

    // Clear previous validation errors
    const inputs = [titleInput, firstNameInput, lastNameInput, countryCodeInput, telephoneNumberInput, emailInput];
    inputs.forEach(input => input.classList.remove("invalid"));

    const errorMessages = [];

    // Validate Title (Drop-down list)
    if (!titleInput.value) {
        errorMessages.push("Please select a title.");
        titleInput.classList.add("invalid");
    }

    // Validate First Name (Text input)
    if (!firstNameInput.value.trim()) {
        errorMessages.push("Please enter your first name.");
        firstNameInput.classList.add("invalid");
    }

    // Validate Last Name (Text input)
    if (!lastNameInput.value.trim()) {
        errorMessages.push("Please enter your last name.");
        lastNameInput.classList.add("invalid");
    }

    // Validate Country Code (Text input)
    if (!countryCodeInput.value.trim()) {
        errorMessages.push("Please enter your country code.");
        countryCodeInput.classList.add("invalid");
    }

    // Validate Telephone Number (Text input)
    if (!telephoneNumberInput.value.trim()) {
        errorMessages.push("Please enter your telephone number.");
        telephoneNumberInput.classList.add("invalid");
    }

    // Validate Email Address (Email input)
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(emailInput.value)) {
        errorMessages.push("Please enter a valid email address.");
        emailInput.classList.add("invalid");
    }

    // Show all error messages, if any
    if (errorMessages.length > 0) {
        alert(errorMessages.join("\n"));
        return false;
    }

    // All inputs are valid
    return true;
}
function validateInput4() {
        const cardHolderNameInput = document.getElementById("card_holder_name");
        const cardNumberInput = document.getElementById("card_number");
        const expiryDateInput = document.getElementById("expiry_date");
        const cvvInput = document.getElementById("cvv");
        const termsAndConditionsCheckbox = document.getElementById("tandc");
        const agreement = document.getElementById("tandc1");
        const errors = [];

        // Validate Cardholder Name (Text input)
        if (!cardHolderNameInput.value.trim()) {
            errors.push("Please enter the cardholder's name.");
            cardHolderNameInput.classList.add("invalid");
        } else {
            cardHolderNameInput.classList.remove("invalid");
        }

        // Validate Card Number (Text input)
        const cardNumberRegex = /^\d{16}$/;
        if (!cardNumberRegex.test(cardNumberInput.value)) {
            errors.push("Please enter a valid 16-digit card number.");
            cardNumberInput.classList.add("invalid");
        } else {
            cardNumberInput.classList.remove("invalid");
        }

        // Validate Expiry Date (Text input)
        const expiryDateRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
        if (!expiryDateRegex.test(expiryDateInput.value)) {
            errors.push("Please enter a valid expiry date in the format MM/YY.");
            expiryDateInput.classList.add("invalid");
        } else {
            expiryDateInput.classList.remove("invalid");
        }

        // Validate CVV (Password input)
        const cvvRegex = /^\d{3,4}$/;
        if (!cvvRegex.test(cvvInput.value)) {
            errors.push("Please enter a valid CVV (3 or 4 digits).");
            cvvInput.classList.add("invalid");
        } else {
            cvvInput.classList.remove("invalid");
        }

        // Validate Terms and Conditions Checkbox
        if (!termsAndConditionsCheckbox.checked) {
            errors.push("Please accept the Terms and Conditions.");
            termsAndConditionsCheckbox.classList.add("invalid");
        } else {
            termsAndConditionsCheckbox.classList.remove("invalid");
        }
        if (!agreement.checked) {
            errors.push("Please accept the agreement.");
            agreement.classList.add("invalid");
        } else {
            agreement.classList.remove("invalid");
        }

        // Show all validation errors, if any
        if (errors.length > 0) {
            alert(errors.join("\n"));
            return false; // Prevent form submission
        }
    }


    document.getElementById("formAll").onsubmit = function (event) {
        // Prevent the default form submission behavior (page reload)
        event.preventDefault();
        SaveFormData();
    };


    // Attach the validateForm function to the button click event
    document.getElementById("input4button").addEventListener("click", validateInput4);

//// Function to calculate the number of nights
function calculateNights() {
    const checkinInput = document.getElementById("checkin");
    const checkoutInput = document.getElementById("checkout");
    const nightsInput = document.getElementById("nights");

    if (checkinInput.value && checkoutInput.value) {
        const checkinDate = new Date(checkinInput.value);
        const checkoutDate = new Date(checkoutInput.value);

        // Check if check-in date is after the current date
        const currentDate = new Date();
        if (checkinDate <= currentDate) {
            alert("Check-in date must be after the current date.");
            checkinInput.value = "";
            nightsInput.value = "";
            return;
        }

        const timeDiff = checkoutDate.getTime() - checkinDate.getTime();
        const nights = Math.ceil(timeDiff / (1000 * 3600 * 24));
        nightsInput.value = nights + " Nights";
    } else {
        nightsInput.value = "";
    }
}

//// Function to set the minimum date for check-in input (next day)
function setMinCheckinDate() {
    const checkinInput = document.getElementById("checkin");
    // Get the current date and add one day to it
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 1);

    // Format the current date plus one day as "YYYY-MM-DD" for the input's min attribute
    const minDate = currentDate.toISOString().split("T")[0];
    checkinInput.setAttribute("min", minDate);
}
//// Function to set the minimum date for checkout input (next day after check-in date)
function setMinCheckoutDate() {
    const checkinInput = document.getElementById("checkin");
    const checkoutInput = document.getElementById("checkout");

    if (checkinInput.value) {
        const checkinDate = new Date(checkinInput.value);
        const checkoutDate = new Date(checkoutInput.value);

        // Check if the new check-in date is after the current check-out date
        if (checkinDate >= checkoutDate) {
            // Set the check-out date to the next day after the new check-in date
            checkinDate.setDate(checkinDate.getDate() + 1);
            checkoutInput.value = checkinDate.toISOString().split("T")[0];
        }

        // Set the minimum date for checkout input as the next day after the new check-in date
        checkinDate.setDate(checkinDate.getDate() + 1);
        const minDate = checkinDate.toISOString().split("T")[0];
        checkoutInput.setAttribute("min", minDate);
        calculateNights();
    }
}
//// Function to update input1 info to aside divs
function updateInput1() {
    const checkinInput = document.getElementById("checkin");
    const checkoutInput = document.getElementById("checkout");
    const nightsInput = document.getElementById("nights");
    const adultsInput = document.getElementById("adults");
    const childrenInput = document.getElementById("children");

    const checkinDate = new Date(checkinInput.value);
    const checkoutDate = new Date(checkoutInput.value);
    const nights = Math.ceil((checkoutDate.getTime() - checkinDate.getTime()) / (1000 * 3600 * 24));
    const adultsCount = adultsInput.value;
    const childrenCount = childrenInput.value;
    // Update "input2" aside
    document.querySelector("#input2Aside .checkInOutput").textContent = checkinInput.value;
    document.querySelector("#input2Aside .checkOutOutput").textContent = checkoutInput.value;
    document.querySelector("#input2Aside .nightOutput").textContent = nights + " Nights";
    document.querySelector("#input2Aside .guestOutput").textContent = adultsCount + " Adults, " + childrenCount + " Children";

    // Update "input3" aside
    document.querySelector("#input3Aside .checkInOutput").textContent = checkinInput.value;
    document.querySelector("#input3Aside .checkOutOutput").textContent = checkoutInput.value;
    document.querySelector("#input3Aside .nightOutput").textContent = nights + " Nights";
    document.querySelector("#input3Aside .guestOutput").textContent = adultsCount + " Adults, " + childrenCount + " Children";

    // Update "input4" aside
    document.querySelector("#input4Aside .checkInOutput").textContent = checkinInput.value;
    document.querySelector("#input4Aside .checkOutOutput").textContent = checkoutInput.value;
    document.querySelector("#input4Aside .nightOutput").textContent = nights + " Nights";
    document.querySelector("#input4Aside .guestOutput").textContent = adultsCount + " Adults, " + childrenCount + " Children";
}
// input 2 functions
const rooms = [
    {
        name: 'Deluxe Solitude Retreat',
        description: 'This opulent hotel room offers a serene oasis amidst the bustling world, providing guests with a haven of privacy and relaxation.',
        image: '../Images/generated_002.png',
        rate: 300,
    },
    {
        name: 'Premier Serenity Suite',
        description: 'This exceptional hotel suite offers a sanctuary of serenity, where modern elegance meets timeless comfort. ',
        image: '../Images/generated_003.png',
        rate: 450,
    },
    {
        name: 'Royal Family Oasis',
        description: 'Treat your family to the enchanting allure of the Royal Family Oasis, combining refined luxury with thoughtful touches for your little ones.',
        image: '../Images/generated_004.png',
        rate: 500,
    },
    {
        name: 'Executive Grandeur Haven',
        description: 'Embrace the epitome of refined elegance in our Executive Grandeur Haven, ideal for discerning travelers.',
        image: '../Images/generated_003.png',
        rate: 550,
    },
    {
        name: 'Regal Family Adventure',
        description: 'Unveil a world of adventure and luxury in our Regal Family Adventure suite, a great experience.',
        image: '../Images/generated_002.png',
        rate: 600,
    },
    {
        name: 'Opulent Family Suite',
        description: 'Step into the epitome of luxury with our Opulent Family Suite.',
        image: '../Images/generated_004.png',
        rate: 650,
    },
    {
        name: 'Luxe Family Escape',
        description: 'Discover a luxurious haven for your family in our Luxe Family Escape, exquisitely designed suite.',
        image: '../Images/generated_004.png',
        rate: 700,
    },
];
//// Function to generate the HTML for each room
function createRoomElement(room) {
return `
    <div class="box01">
        <div class="gridContainer1">
            <div class="grid-item">
                <div class="imageBox">
                    <img src="${room.image}" alt="${room.name}" class="roomImage">
                </div>
            </div>
            <div class="descBox grid-item">
                <br>
                <h4>${room.name}</h4>
                <br>
                <p>${room.description}</p>
                <br><br>
            </div>
        </div>
        <div class="gridContainer2">
            <div class="descBox grid-item">
                <br>
                <p>Room rate:</p>
                <h2><span class="bold">${room.rate}</span> SGD/Night</h2>
            </div>
            <div class="descBox grid-item">
                <button type="button" class="roomCardButton" onclick="selectRoom(${room.rate}, '${room.name}')">SELECT ROOM AND CONTINUE</button>
            </div>
        </div>
    </div>
`;
}
//// Function to populate the room container with room elements
function renderRooms() {
const roomContainer = document.getElementById('roomContainer');
roomContainer.innerHTML = '';

rooms.forEach((room) => {
    const roomElement = createRoomElement(room);
    roomContainer.insertAdjacentHTML('beforeend', roomElement);
});
}
//// Function to update room rate and total cost in the "aside" divs
function selectRoom(roomRate, roomName) {
    const roomRateOutput = document.querySelector('.roomRateOutput');
    const totalCostOutput = document.querySelector('.totalCostOutput');
    const chosenRoomOutput = document.querySelector('.chosenRoomOutput');
    const nightsInput = document.getElementById("nights");
    const nights = parseInt(nightsInput.value, 10);

    roomRateOutput.textContent = `${roomRate} SGD`;
    totalCostOutput.textContent = `${roomRate * nights} SGD`;
    chosenRoomOutput.textContent = roomName;
    
    nav02.classList.remove('selected');
    button1.disabled = false;
    button2.disabled = false;
    button3.disabled = true;
    button4.disabled = true;

    document.getElementById("line1").style.opacity = "1";
    document.getElementById("line2").style.opacity = "1";
    document.getElementById("line3").style.opacity = "0.3";

    document.querySelector("#input4Aside .roomRateOutput").textContent = `${roomRate} SGD`;
    document.querySelector("#input4Aside .totalCostOutput").textContent = `${roomRate * nights} SGD`;
    document.querySelector("#input4Aside .chosenRoomOutput").textContent = roomName;
    showNextStep("input2", "input3");
}
//// Call the function to render the rooms when the page loads
document.addEventListener('DOMContentLoaded', () => {
renderRooms();
});
// div manuever functions
//// Function to show the next step and hide the current step
function showNextStep(currentStepId, nextStepId) {
    document.getElementById(currentStepId).style.display = "none";
    var input1 = document.getElementById(nextStepId);
    input1.style.display = "flex";
    input1.style.opacity = "0";

    (function fadeIn() {
        var val = parseFloat(input1.style.opacity);
        if (!((val += 0.01) > 1)) {
            input1.style.opacity = val;
            requestAnimationFrame(fadeIn);
        }
    })();
}
function showNextStepAll(nextStepId) {
    document.getElementById("input1").style.display = "none";
    document.getElementById("input2").style.display = "none";
    document.getElementById("input3").style.display = "none";
    document.getElementById("input4").style.display = "none";
    document.getElementById(nextStepId).style.display = "flex";
}
//// Event listener for the first button (Check Availability)
document.getElementById("input1button").addEventListener("click", function() {
    if (validateInput1()) {
        const checkinInput = document.getElementById("checkin");
        const checkinDate = new Date(checkinInput.value);
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + 1);
        checkinDate.setHours(0, 0, 0, 0);
        currentDate.setHours(0, 0, 0, 0);

        console.log(checkinDate);
        console.log(currentDate);
        document.getElementById("line1").style.opacity = "1";
        document.getElementById("line2").style.opacity = "0.3";
        document.getElementById("line3").style.opacity = "0.3";
        if (checkinDate.getTime() === currentDate.getTime()) {
            showPopup();
        } else {
            nav01.classList.remove('selected');
            button1.disabled = false;
            button2.disabled = true;
            button3.disabled = true;
            showNextStep("input1", "input2");
            updateInput1();
        }
    }
});
document.getElementById("input2back").addEventListener("click", function() {
    nav01.classList.add('selected');
    button1.disabled = false;
    button2.disabled = false;
    button3.disabled = false;
    document.getElementById("line1").style.opacity = "0.3";
    showNextStep("input2", "input1");
});
document.getElementById("input3back").addEventListener("click", function() {
    nav02.classList.add('selected');
    button1.disabled = true;
    button2.disabled = false;
    button3.disabled = false;
    document.getElementById("line2").style.opacity = "0.3";
    showNextStep("input3", "input2");
});
document.getElementById("input4back").addEventListener("click", function() {
    nav03.classList.add('selected');
    button1.disabled = true;
    button2.disabled = true;
    button3.disabled = false;
    document.getElementById("line3").style.opacity = "0.3";
    showNextStep("input4", "input3");
});
document.getElementById("input3button").addEventListener("click", function() {
    if (validateInput2()) {
        nav03.classList.remove('selected');
        button1.disabled = false;
        button2.disabled = false;
        button3.disabled = false;
        document.getElementById("line1").style.opacity = "1";
        document.getElementById("line2").style.opacity = "1";
        document.getElementById("line3").style.opacity = "1";
        showNextStep("input3", "input4");
    }
});

document.getElementById("nav01").addEventListener("click", function() {
    // Hide other input sections
    document.getElementById("input2").style.display = "none";
    document.getElementById("input3").style.display = "none";
    document.getElementById("input4").style.display = "none";
    document.getElementById("line1").style.opacity = "0.3";
    document.getElementById("line2").style.opacity = "0.3";
    document.getElementById("line3").style.opacity = "0.3";
    // Show input1 and fade it in
    var input1 = document.getElementById("input1");
    input1.style.display = "flex";
    input1.style.opacity = "0";

    (function fadeIn() {
        var val = parseFloat(input1.style.opacity);
        if (!((val += 0.01) > 1)) {
            input1.style.opacity = val;
            requestAnimationFrame(fadeIn);
        }
    })();
    
    nav01.classList.add('selected');
    nav02.classList.add('selected');
    nav03.classList.add('selected');
    nav04.classList.add('selected');
    button1.disabled = true;
    button2.disabled = true;
    button3.disabled = true;
});
document.getElementById("nav02").addEventListener("click", function() {
    // Hide other input sections
    document.getElementById("input1").style.display = "none";
    document.getElementById("input3").style.display = "none";
    document.getElementById("input4").style.display = "none";
    document.getElementById("line1").style.opacity = "1";
    document.getElementById("line2").style.opacity = "0.3";
    document.getElementById("line3").style.opacity = "0.3";
    // Show input1 and fade it in
    var input1 = document.getElementById("input2");
    input1.style.display = "flex";
    input1.style.opacity = "0";

    (function fadeIn() {
        var val = parseFloat(input1.style.opacity);
        if (!((val += 0.01) > 1)) {
            input1.style.opacity = val;
            requestAnimationFrame(fadeIn);
        }
    })();
    nav02.classList.add('selected');
    nav03.classList.add('selected');
    nav04.classList.add('selected');
    button1.disabled = false;S
    button2.disabled = true;
    button3.disabled = true;
});
document.getElementById("nav03").addEventListener("click", function() {
    // Hide other input sections
    document.getElementById("input1").style.display = "none";
    document.getElementById("input2").style.display = "none";
    document.getElementById("input4").style.display = "none";
    document.getElementById("line1").style.opacity = "1";
    document.getElementById("line2").style.opacity = "1";
    document.getElementById("line3").style.opacity = "0.3";
    // Show input1 and fade it in
    var input1 = document.getElementById("input3");
    input1.style.display = "flex";
    input1.style.opacity = "0";

    (function fadeIn() {
        var val = parseFloat(input1.style.opacity);
        if (!((val += 0.01) > 1)) {
            input1.style.opacity = val;
            requestAnimationFrame(fadeIn);
        }
    })();
    nav03.classList.add('selected');
    button1.disabled = false;
    button2.disabled = false;
    button3.disabled = true;
});

// Get references to the buttons and the target div
const button1 = document.getElementById('nav01');
const button2 = document.getElementById('nav02');
const button3 = document.getElementById('nav03');
const button4 = document.getElementById('nav04');

button1.disabled = true;
button2.disabled = true;
button3.disabled = true;
button4.disabled = true;

setMinCheckinDate();
setMinCheckoutDate();
//// Add event listeners to check-in and check-out inputs
document.getElementById("checkin").addEventListener("change", calculateNights);
document.getElementById("checkout").addEventListener("change", calculateNights);
document.getElementById("checkin").addEventListener("change", setMinCheckoutDate);






//// form input to file output
function SaveFormData() {
    // Get form elements
    const form = document.getElementById("formAll");
    const inputElements = form.querySelectorAll("input, select, textarea");

    // Create an array to store form data
    const formData = [];

    // Iterate through input elements
    for (let i = 0; i < inputElements.length; i++) {
        const element = inputElements[i];

        if (element.value.trim() !== "" && !(element.type === "checkbox" && !element.checked)) {
            // Store element id and value in formData array
            if (element.type === "radio" && !element.checked) {
                continue; // Skip unchecked radio buttons
            }
            formData.push({
                id: element.id,
                value: element.value
            });
        }
    }

    // Create a formatted string representation of the form data
    let dataString = "";
    var count = 0
    formData.forEach(field => {
        dataString += `${field.id}: ${field.value}\n`;
    });

    // Create a new Blob object with the formatted form data
    const blob = new Blob([dataString], { type: "text/plain" });

    // Create a temporary anchor element to download the file
    const anchor = document.createElement("a");
    anchor.href = URL.createObjectURL(blob);
    anchor.download = "Room_Booking_Reservation.txt";
    anchor.click();
    window.location.href = "../HTML/Booking_successful.html";
}