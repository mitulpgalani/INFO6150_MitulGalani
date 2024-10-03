const regExName = /^[a-zA-Z]{2,50}$/;
const regExEmail = /^[^\s@]+@[northeastern]+\.[edu]+$/;
const regExPhone = /\d{3}-?\d{3}-\d{4}$/;
const regExZip = /^\d{5}$/;
const regExStreet = /^[\sa-zA-Z0-9]{5,100}$/;
const regExCity = /^[a-zA-Z]{5,50}$/;

const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const email = document.getElementById("emailId");
const phone = document.getElementById("phoneNumber");
const zip = document.getElementById("zipcode");
const streetAd1 = document.getElementById("streetAddress1");
const streetAd2 = document.getElementById("streetAddress2");
const city = document.getElementById("city");
const state = document.getElementById("state");


firstName.addEventListener("input", validate);
lastName.addEventListener("input", validate);
email.addEventListener("input", validate);
phone.addEventListener("input", validate);
zip.addEventListener("input", validate);
streetAd1.addEventListener("input", validate);
streetAd2.addEventListener("input", validate);
city.addEventListener("input", validate);
state.addEventListener("input", validate);


function validate(event) {
    const value = event.target.value;
    const type = event.target.id;
    const errorField = "error-" + type;

    if (type === "firstName" || type === "lastName") {
        document.getElementById(errorField).style.display =
            value.trim().match(regExName) ? "none" : "block";
    }
    else if (type === "emailId") {
        document.getElementById(errorField).style.display =
            value.trim().match(regExEmail) ? "none" : "block";
    }
    else if (type === "phoneNumber") {
        document.getElementById(errorField).style.display =
            value.trim().match(regExPhone) ? "none" : "block";
    }
    else if (type === "zipcode") {
        document.getElementById(errorField).style.display = value.trim().match(regExZip) ? "none" : "block";
    }
    else if (type === "streetAddress1") {
        document.getElementById(errorField).style.display =
            value.trim().match(regExStreet) ? "none" : "block";
    }
    else if (type === "streetAddress2") {
        if (value.trim() === "") {
            document.getElementById(errorField).style.display = "none";
        } else {
            document.getElementById(errorField).style.display =
                value.trim().match(regExStreet) ? "none" : "block";
        }
    }
    else if (type === "city" || type === "state") {
        document.getElementById(errorField).style.display =
            value.trim().match(regExCity) ? "none" : "block";
    }

    checkFormValidity();
}


function checkFormValidity() {
    const inputs = document.querySelectorAll('input[required]');
    const textAreas = document.querySelectorAll('textarea[required]');
    const validInputs = Array.from(inputs).every(input => input.checkValidity() && !input.classList.contains('error'));
    const validTextAreas = Array.from(textAreas).every(textArea => textArea.checkValidity() && !textArea.classList.contains('error'));
    const streetAddress2 = document.getElementById('streetAddress2');
    const isStreetAddress2Valid = streetAddress2.value.trim() === "" || streetAddress2.value.trim().match(regExStreet);
    const submitBtn = document.getElementById('submitBtn');
    submitBtn.disabled = !(validInputs && validTextAreas && isStreetAddress2Valid);
}

function createTable() {
    const tableContainer = document.getElementById('tableContainer');
    tableContainer.innerHTML = '';
    const formData = new FormData(document.getElementById('feedbackForm'));
    const table = document.createElement('table');
    formData.forEach((value, key) => {
        const row = table.insertRow();
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        cell1.innerHTML = `<strong>${key}</strong>`;
        cell2.textContent = value;
    });
    tableContainer.appendChild(table);
    resetForm();
}


function addCheckbox() {
    const selection = document.getElementById('selection');
    const selectedOption = selection.options[selection.selectedIndex].value;
    const checkboxContainer = document.getElementById('checkboxContainer');
    checkboxContainer.innerHTML = '';  

    function createCheckbox(checkboxName, checkboxValue, checkboxText) {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.name = checkboxName;
        checkbox.value = checkboxValue;

        checkbox.addEventListener('change', function() {
            handleTextField(this);
        });

        checkboxContainer.appendChild(checkbox);
        const label = document.createElement('label');
        label.textContent = checkboxText;
        checkboxContainer.appendChild(label);
    }

    if (selectedOption === 'Coffee' || selectedOption === 'Tea') {
        createCheckbox('Quantity', '8oz', 'Small');
    } else if (selectedOption === 'Donut') {
        createCheckbox('Quantity', '2', 'Pack of 2');
    } else if (selectedOption === 'Pastry') {
        createCheckbox('Quantity', '1', 'Single');
    } else {
        createCheckbox('Quantity', '6', '6 Pack');
    }
}

function handleTextField(checkbox) {
    const checkboxContainer = document.getElementById('checkboxContainer');

    if (checkbox.checked) {
        const textField = document.createElement('input');
        textField.type = 'text';
        textField.id = 'hiddenTextField';
        textField.name = 'hiddenTextField';
        textField.placeholder = 'Please enter additional information';
        textField.required = true;  
        checkboxContainer.appendChild(textField);
    } 
    else {
        const textField = document.getElementById('hiddenTextField');
        if (textField) {
            checkboxContainer.removeChild(textField);
        }
    }

    checkFormValidity(); 
}


function checkFormValidity() {
    const inputs = document.querySelectorAll('input[required]');
    const textAreas = document.querySelectorAll('textarea[required]');
    const validInputs = Array.from(inputs).every(input => input.checkValidity() && !input.classList.contains('error'));
    const validTextAreas = Array.from(textAreas).every(textArea => textArea.checkValidity() && !textArea.classList.contains('error'));

    const submitBtn = document.getElementById('submitBtn');
    submitBtn.disabled = !(validInputs && validTextAreas);
}


document.getElementById('feedbackForm').addEventListener('change', checkFormValidity);

function resetForm() {
    document.getElementById('feedbackForm').reset();
    checkFormValidity();
}