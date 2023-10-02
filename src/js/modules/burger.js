

const navigation = document.querySelector('.navigation');
const burgerBtn = document.querySelector('.header__burgerMenu');


burgerBtn.addEventListener('click', () => {
    navigation.classList.toggle('active');
    burgerBtn.classList.add('close');
})


