window.addEventListener("DOMContentLoaded", init);

function init() {
  getInstitutions();
  getArtistName();

  const menuIcon = document.querySelector('.burgerMenu');

  const navbar = document.querySelector('.navbar')

  menuIcon.addEventListener('click', () => {
    navbar.classList.toggle("change");
  })


  //burger menu code from: https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_menu_icon_js


  fetch("https://astridcaecilie.dk/kopenhagen/wordpress/wp-json/wp/v2/event?_embed&per_page=100")
    .then(res => res.json())
    .then(handleData)
}

function getInstitutions() {
  fetch("https://astridcaecilie.dk/kopenhagen/wordpress/wp-json/wp/v2/institution?_embed&per_page=100")
    .then(res => res.json())
    .then(showInstitutions)
}

function showInstitutions(institution) {
  institution.forEach(institution => {
    //console.log("hej");
    //console.log(institution);
    const sectionSingleInst = document.createElement('section');
    const h2 = document.createElement('h2');
    h2.textContent = institution.name;
    sectionSingleInst.classList.add('inst-' + institution.id);
    const sectionOnPage = document.querySelector('.section-institution');
    sectionSingleInst.appendChild(h2);
    sectionOnPage.appendChild(sectionSingleInst);
  })
}

//getting the artist name instead of a ID number
function getArtistName() {
  fetch("https://astridcaecilie.dk/kopenhagen/wordpress/wp-json/wp/v2/categories?_embed")
    .then(res => res.json())
    .then(handleArtistNames)
}

function handleArtistNames(artists) {
  artists.forEach(addArtistNames);
}

function addArtistNames(artistNames) {
  console.log(artistNames);
  //        copy.querySelector(".temp-artist").textContent = artistNames.
}

function handleData(events) {
  events.forEach(showEvents)
}


function showEvents(events) {
  console.log(events)
  const template = document.querySelector("template").content;

  const copy = template.cloneNode(true);

  //    console.log(events.title.rendered)

  const artistName = events._embedded["wp:term"][1][0];
  if (artistName !== undefined) {
    //console.log(artistName.name);
    copy.querySelector(".temp-artist").textContent = artistName.name; //only showing tag id instead of name

  }
  //console.log("hey");
  //console.log(events._embedded["wp:term"][0][1].name);

  //    copy.querySelector(".temp.institution").textContent = events._embedded["wp:term"][1][0].name;
  copy.querySelector(".temp-event-name").textContent = events.title.rendered;
  copy.querySelector(".temp-paragraph").innerHTML = events.excerpt.rendered; //showing html tags
  //    copy.querySelector(".temp-institution").textContent = events._embedded["wp:term"][0][1];

  copy.querySelector(".start-date").textContent = events.start_date;
  copy.querySelector(".to-date").textContent = events.end_date;

  if (events.end_date == "0000-00-00") {
    copy.querySelector(".two-dates").classList.add("hide");
  }

  copy.querySelector(".temp-image").src = events._embedded["wp:featuredmedia"][0].media_details.sizes.full.source_url;

  //getting the artist name instead of a ID number - finished
  //document.querySelector("main").appendChild(copy);
  const sectionAndEventID = events.institution[0];
  //events._embedded["wp:term"][0][1].id;
  console.log('.inst-' + sectionAndEventID);
  const whereToPutIt = document.querySelector('.inst-' + sectionAndEventID);
  whereToPutIt.appendChild(copy);
  //document.querySelector(whereToPutIt).appendChild(copy);
}
