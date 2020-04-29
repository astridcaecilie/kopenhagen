const menuIcon = document.querySelector('.burgerMenu');

const navbar = document.querySelector('.navbar')

menuIcon.addEventListener('click',() => {
    navbar.classList.toggle("change");
})


//burger menu code from: https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_menu_icon_js


fetch ("http://astridcaecilie.dk/kopenhagen/wordpress/wp-json/wp/v2/event?_embed")
     .then(res => res.json())
    .then(handleData)

function handleData (events){
    events.forEach(showEvents)
}

function showEvents(events) {
    console.log(events)
    const template = document.querySelector("template").content;

    const copy = template.cloneNode(true);

    console.log(events.title.rendered)


    copy.querySelector(".temp-event-name").textContent = events.title.rendered;
    copy.querySelector(".temp-artist").textContent = events.tags; //only showing tag id instead of name
    copy.querySelector(".temp-paragraph").textContent = events.excerpt.rendered; //showing html tags
//    copy.querySelector(".temp-image").src = events.images.guid; //not the right way to get featured img
    copy.querySelector(".temp-date").textContent = events.start_date + events.end_date; // works but needs seperation
    copy.querySelector(".temp-image").src = events._embedded["wp:featuredmedia"][0].media_details.sizes.full.source_url;

    document.querySelector("main").appendChild(copy);
}
