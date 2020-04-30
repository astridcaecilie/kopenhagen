const menuIcon = document.querySelector('.burgerMenu');

const navbar = document.querySelector('.navbar')

menuIcon.addEventListener('click', () => {
    navbar.classList.toggle("change");
}) //burger menu toggles to and from X


fetch("https://astridcaecilie.dk/kopenhagen/wordpress/wp-json/wp/v2/event" + "?_embed")
    .then(res => res.json())
    .then(handleEventData)

fetch("https://astridcaecilie.dk/kopenhagen/wordpress/wp-json/wp/v2/magazine" + "?_embed")
    .then(res => res.json())
    .then(handleEventData)

function handleEventData(handled) {
    var artistNames = [];

    handled.forEach(item => {
        if (item._embedded["wp:term"][1] == false){
//            console.log("No Tag")
        } else {
//            console.log("Has a Tag")
            var names = item._embedded["wp:term"][1][0].name;
        }
        artistNames.push(names);
    });
    artistNames.sort();
    artistNames.forEach(showTagData)
}

function showTagData(artistNameData) {
  console.log("artistNameData");
  console.log(artistNameData);

  var li = document.createElement("li");
  li.textContent = artistNameData;

    if (artistNameData){
  const firstLetter = artistNameData.charAt(0);
  //artistNameDisplay.classList.add(firstLetter);

//  console.log(".artistsFetched #" + firstLetter);
  var elem = document.querySelector(".artistsFetched #" + firstLetter);

  elem.appendChild(li);

    const h2 = document.querySelector(".LetterH2");

    if (elem > li) {
        elem.classList.remove("hide");
    }

}}


// burger menu code inspired by these two sites: https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_menu_icon_js and
// https://www.youtube.com/watch?v=BN6fH1nRDxA ;
