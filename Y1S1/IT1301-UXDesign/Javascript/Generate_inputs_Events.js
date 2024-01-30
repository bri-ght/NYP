function SaveFormData() {
    // Get form elements
    const form = document.getElementById("Event_Proposals");
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
        if (field.id === "Meal_Requirements" && count == 0) {
            const mealRequirements = form.querySelectorAll('input[name="Meal_Requirements"]:checked');
            const selectedMealRequirements = Array.from(mealRequirements).map(item => item.value).join(', ');
            dataString += `${field.id}: ${selectedMealRequirements}\n`;
            count = count + 1
        } else {
            if (field.id != "Meal_Requirements") {
                dataString += `${field.id}: ${field.value}\n`;
            }
        }
    });

    // Create a new Blob object with the formatted form data
    const blob = new Blob([dataString], { type: "text/plain" });

    // Create a temporary anchor element to download the file
    const anchor = document.createElement("a");
    anchor.href = URL.createObjectURL(blob);
    anchor.download = "Events_Proposal.txt";
    anchor.click();
    window.location.href = "file:///C:/Data/Winston/NYP/UX%20Design/Project%20Hiwoods/HTML/Booking_successful.html";
}