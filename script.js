const form = document.querySelector('form');
const purposeInput = document.querySelector('#purpose');
let errorCheck = false;

const runValidation = (formItem, errorElement, errorMatch, errorMessage, custom = false) => {
    let elem = document.querySelector(`.form-group.${errorElement}`);
    let error = false;

    if (custom) {
        if (!errorMatch) {
            error = true;
            elem.classList.add('error');
            elem.querySelector('.error-message').textContent = errorMessage;
        }
    }

    if (formItem === errorMatch) {
        error = true;
        elem.classList.add('error');
        elem.querySelector('.error-message').textContent = errorMessage;
    }

    return error;
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    let formData = new FormData(form);
    let name = formData.get('name');
    let email = formData.get('email');
    let phone = formData.get('phone');
    let address = formData.get('addressOne');
    let purpose = formData.get('purpose');
    let otherPurpose = formData.get('otherPurpose');
    let mailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let numRegex = /^\d{11}$/;




    if (runValidation(name, "name", '', `Please enter your name`)) {
        errorCheck = true;
    }
    if (runValidation(email, "email", '', `Please enter your email`)) {
        errorCheck = true;
    } else if (runValidation(email, "email", email.match(mailRegex), `Email is not valid`, true)) {
        errorCheck = true;
    }
    if (runValidation(phone, "phone", '', `Please enter your phone number`)) {
        errorCheck = true;
    } else if (runValidation(phone, "phone", phone.match(numRegex), `Phone Number is not correct`, true)) {
        errorCheck = true;
    }
    if (runValidation(address, "add1", '', `Please enter your address`)) {
        errorCheck = true;
    }
    if (runValidation(purpose, "purpose", null, `Please select a purpose`)) {
        errorCheck = true;
    }
    if (purpose === 'other') {
        if (runValidation(otherPurpose, "other-purpose", '', `Please enter your purpose`)) {
            errorCheck = true;
        }
    }

    if (!errorCheck) {
        form.reset();
        alert('Form submitted successfully');
    }

})

form.addEventListener('click', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT' || e.target.tagName === 'TEXTAREA') {
        let elem = e.target.parentElement.parentElement;
        elem.classList.remove('error');
        elem.querySelector('.error-message').textContent = '';
        errorCheck = false;
    }
})



purposeInput.addEventListener('change', (e) => {
    if (e.target.value === 'other') {
        document.querySelector('#other-purpose').classList.remove('hidden');
    }
})

