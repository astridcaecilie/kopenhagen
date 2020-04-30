window.addEventListener("DOMContentLoaded", init);

function init() {

    getArtistName();

    const menuIcon = document.querySelector('.burgerMenu');

    const navbar = document.querySelector('.navbar')

    menuIcon.addEventListener('click', () => {
        navbar.classList.toggle("change");
    })


    //burger menu code from: https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_menu_icon_js


    fetch("http://astridcaecilie.dk/kopenhagen/wordpress/wp-json/wp/v2/event?_embed&per_page=100")
        .then(res => res.json())
        .then(handleData)
}

//getting the artist name instead of a ID number
    function getArtistName() {
        fetch("https://astridcaecilie.dk/kopenhagen/wordpress/wp-json/wp/v2/categories?_embed")
            .then(res => res.json())
            .then(handleArtistNames)
    }

    function handleArtistNames(addArtist) {
        addArtist.forEach(addArtistNames);
    }

    function addArtistNames(artistNames) {
        console.log(artistNames);
        //        copy.querySelector(".temp-artist").textContent = artistNames.
    }

function handleData(events) {
    events.forEach(showEvents)
}


function showEvents(events) {
    //    console.log(events)
    const template = document.querySelector("template").content;

    const copy = template.cloneNode(true);

    //    console.log(events.title.rendered)

    const artistName = events._embedded["wp:term"][1][0];
    if (artistName !== undefined) {
        console.log(artistName.name);
        copy.querySelector(".temp-artist").textContent = artistName.name; //only showing tag id instead of name

    }

    //    console.log(events._embedded["wp:term"][1][0].name);

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
    document.querySelector("main").appendChild(copy);
}
