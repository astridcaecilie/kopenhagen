const menuIcon = document.querySelector('.burgerMenu');

const navbar = document.querySelector('.navbar')

menuIcon.addEventListener('click', () => {
    navbar.classList.toggle("change");
}) //burger menu toggles to and from X

// *** FETCH fetching from both pod types ***
//fetching from event pods
fetch("https://astridcaecilie.dk/kopenhagen/wordpress/wp-json/wp/v2/event?_embed")
    .then(res => res.json())
    .then(handleEventData)
//fetching from magazine pods
fetch("https://astridcaecilie.dk/kopenhagen/wordpress/wp-json/wp/v2/magazine?_embed")
    .then(res => res.json())
    .then(handleEventData)

function handleEventData(handled) {
    //Create an array and then push the artist names (line31) into the array
    var artistNames = [];

    handled.forEach(item => {
        if (item._embedded["wp:term"][1] == false) {
            //There is no tag (artist name) in this event/magazine pod
        } else {
            //Here we have a tag (artist name)
            var names = item._embedded["wp:term"][1][0].name;
        }
        //so we get the names (line28) and then push it to the var artistName (line21)
        artistNames.push(names);
    });
    //Sort the array and for each artist name call the function showTagData
    artistNames.sort();
    artistNames.forEach(showTagData)
}

function showTagData(artistNameData) {
    //create a li with each artist name
    var li = document.createElement("li");
    li.textContent = artistNameData;

     //create an if statement so no empty elements sneak in
    if (artistNameData) {
        //We get the fist letter of the artist name
        const firstLetter = artistNameData.charAt(0);

        //Select the correct ul placeholder from the html document and give it the name "elem"
        var elem = document.querySelector(".artistsFetched #" + firstLetter);

        //append the li tags with the artist name
        elem.appendChild(li);

        //and since all the ul's have the class hide we need to remove it if the ul contains any li's
            // in css: ** .hide {display:none;} **
        if (elem > li) {
            elem.classList.remove("hide");
        }
    }
}


// burger menu code inspired by these two sites: https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_menu_icon_js and
// https://www.youtube.com/watch?v=BN6fH1nRDxA ;
