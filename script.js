const menuIcon = document.querySelector('.burgerMenu');

const navbar = document.querySelector('.navbar')

menuIcon.addEventListener('click',() => {
    navbar.classList.toggle("change");
})


//burger menu code from: https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_menu_icon_js
