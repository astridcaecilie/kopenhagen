const menuIcon = document.querySelector('.burgerMenu');

const navbar = document.querySelector('.navbar')

menuIcon.addEventListener('click', () => {
    navbar.classList.toggle("change");
}) //burger menu toggles to and from X

//const magazineLink = "https://astridcaecilie.dk/kopenhagen/wordpress/wp-json/wp/v2/magazine?_embed";

//const eventsLink = "https://astridcaecilie.dk/kopenhagen/wordpress/wp-json/wp/v2/event?_embed";



fetch("https://astridcaecilie.dk/kopenhagen/wordpress/wp-json/wp/v2/tags")
    .then(res => res.json())
    .then(handleTagData)

function handleTagData(handled) {
    console.log("handle data");
    console.log(handled);
    handled.forEach(showTagData)
}

function showTagData(tagData) {

    const artistName = tagData.name; // Here I get each artists name
    const artistTagId = tagData.id; // Here I get each artist tag id
    console.log("artistTagId");
    console.log(artistTagId);

    const artistNameDisplay = document.createElement("li"); //I create <li>
    artistNameDisplay.classList.add("artistNameDisplay"); //add a class to the <li> so it becomes <li class="artistNameDisplay">

    artistNameDisplay.textContent = artistName; //make the li include the names


    //Getting the fist letter of each name and make it a class on the element
    const firstLetter = artistName.charAt(0);
    artistNameDisplay.classList.add(firstLetter);

     document.querySelector(".artistsFetched").appendChild(artistNameDisplay); //Get the <ul class="artistsFetched"> that alredy excists in the html and put in the new li's



}










// burger menu code inspired by these two sites: https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_menu_icon_js and
// https://www.youtube.com/watch?v=BN6fH1nRDxA
