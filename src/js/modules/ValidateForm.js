const form = document.querySelector('.feedback__form');
const formInputs = document.querySelectorAll('.feedback__input')
const nameInput = document.querySelector('.input-name');
const phoneInput = document.querySelector('.input-phone');
const emailInput = document.querySelector('.input-email');
const fileInput = document.querySelector('.feedback__upload-input');
const fileInputIcon = document.querySelector('.feedback__upload-icon');
const fileInputBtn = document.querySelector('.feedback__upload-btn');
const checkBox = document.querySelector('.feedback__form-checkbox');
const submitBtn = document.querySelector('.feedback__btn')
const successMessage = document.querySelector('.feedback__success');
const labelInputError = document.querySelector('.feedback__input-label');

fileInput.addEventListener('change', () => {
    if (fileInput.value) {
        fileInputIcon.classList.add('file-loaded');
        fileInputBtn.textContent = 'Загружено';
        fileInputBtn.classList.add('disabled_btn')
    }
})

const validateEmail = (email) => {
    const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

    return EMAIL_REGEXP.test(email);
}

function validatePhone(phone) {
    let re = /^\+(?:\d{1,3}-)?\d{1,14}$/;
    return re.test(String(phone));
}

function serializeForm(formNode) {
    const { elements } = formNode

    const data = Array.from(elements)
        .map((element) => {
            const { name, type } = element
            const value = type === 'checkbox' ? element.checked : element.value

            return { name, value }
        })
        .filter((item) => !!item.name)
}

form.addEventListener('change', () => {
    if (validatePhone(phoneInput.value) && validateEmail(emailInput.value) && checkBox.checked) {
        submitBtn.classList.remove('disabled_btn');
    } else {
        submitBtn.classList.add('disabled_btn');
    }
})

const validateForm = () => {
    formInputs.forEach((input) => {
        if (input.value === '') {
            input.classList.add('feedback__input-error');
            input.previousElementSibling.classList.add('displayON');
            return false;
        } else {
            input.classList.remove('feedback__input-error');
            input.previousElementSibling.classList.remove('displayON');

        }
    });

    if (!validateEmail(emailInput.value)) {
        emailInput.classList.add('feedback__input-error');
        return false
    } else {
        emailInput.classList.remove('feedback__input-error');
    }

    if (!validatePhone(phoneInput.value)) {
        phoneInput.classList.add('feedback__input-error');
        return false
    } else {
        phoneInput.classList.remove('feedback__input-error');
    }

    if (!checkBox.checked) {
        return false;
    }

    return true;
}

form.onsubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
        console.log('Данные отправлены')
        const data = serializeForm(form);
        submitBtn.remove();
        successMessage.classList.add('displayON');

        console.log(data);
    }
}