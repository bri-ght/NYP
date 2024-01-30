function Check_Text(a, fieldName) {
    const inputField = document.getElementById(a);
    const errors = [];

    if (/\d/.test(inputField.value)) {
        errors.push(`There should only be letters for '${fieldName}'!`);
        inputField.classList.add('invalid-input');
    } else {
        inputField.classList.remove('invalid-input');
    }

    return errors;
}

function Check_Email(a) {
    const inputField = document.getElementById(a);
    const pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const errors = [];

    if (!pattern.test(inputField.value)) {
        errors.push("Please key in a valid email!");
        inputField.classList.add('invalid-input');
    } else {
        inputField.classList.remove('invalid-input');
    }

    return errors;
}

function Check_Contact_Num(a) {
    const inputField = document.getElementById(a);
    const pattern = /^\d{10}$/;
    const errors = [];

    if (!pattern.test(inputField.value)) {
        errors.push("Please key in a valid contact number!");
        inputField.classList.add('invalid-input');
    } else {
        inputField.classList.remove('invalid-input');
    }

    return errors;
}

function Check_Valid_Date(a, b) {
    const inputField = document.getElementById(a);
    const inputField1 = document.getElementById(b);
    const inputDate = new Date(inputField.value);
    const inputDate1 = new Date(inputField1.value);
    const errors = [];

    inputDate.setHours(0, 0, 0, 0);
    inputDate1.setHours(0, 0, 0, 0);

    if (inputDate > inputDate1) {
        errors.push("Start date must be before end date!");
        inputField.classList.add('invalid-input');
        inputField1.classList.add('invalid-input');
    } else {
        inputField.classList.remove('invalid-input');
        inputField1.classList.remove('invalid-input');
    }

    return errors;
}