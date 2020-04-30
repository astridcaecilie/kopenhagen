const menuIcon = document.querySelector('.burgerMenu');

const navbar = document.querySelector('.navbar')

menuIcon.addEventListener('click', () => {
  navbar.classList.toggle("change");
}) //burger menu toggles to and from X

//const magazineLink = "https://astridcaecilie.dk/kopenhagen/wordpress/wp-json/wp/v2/magazine?_embed";

//const eventsLink = "https://astridcaecilie.dk/kopenhagen/wordpress/wp-json/wp/v2/event?_embed";

//fetch("https://astridcaecilie.dk/kopenhagen/wordpress/wp-json/wp/v2/tags?per_page=100")

fetch("https://astridcaecilie.dk/kopenhagen/wordpress/wp-json/wp/v2/tags?per_page=10")
  .then(res => res.json())
  .then(handleTagData)

function handleTagData(handled) {
  //    console.log("handle data");
  //    console.log(handled);
  //handled.forEach(showTagData2)
  //console.log(handled);
  var artistNames = [];
  handled.forEach(item => {
    //console.log(item.name);
    artistNames.push(item.name);
  });
  artistNames.sort();
  console.log(artistNames);
  artistNames.forEach(showTagData2);
  //  const artistNameDisplay = document.createElement("li");
  //  const firstLetter = artistName.charAt(0);
  //  artistNameDisplay.classList.add(firstLetter);
}

function showTagData2(artistName) {
  const li = document.createElement("li");
  li.textContent = artistName;
  const firstLetter = artistName.charAt(0);
  //artistNameDisplay.classList.add(firstLetter);

  console.log(artistName);
  console.log(".artistsFetched #" + firstLetter);
  const elem = document.querySelector(".artistsFetched #" + firstLetter);

  elem.appendChild(li);

    const h2 = document.querySelector(".LetterH2");

    if (elem > li) {
        elem.classList.remove("hide");
    }

}


// burger menu code inspired by these two sites: https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_menu_icon_js and
// https://www.youtube.com/watch?v=BN6fH1nRDxA
