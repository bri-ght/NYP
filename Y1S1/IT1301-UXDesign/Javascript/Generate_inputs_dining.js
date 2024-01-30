function SaveFormData() {
    // Get form elements
    const form = document.getElementById("Eat_and_Drink_form");
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
    anchor.download = "Restaurant_Reservation.txt";
    anchor.click();
    window.location.href = "Booking_successful.html";
}