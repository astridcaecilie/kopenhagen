const menuIcon = document.querySelector('.burgerMenu');

const navbar = document.querySelector('.navbar')

menuIcon.addEventListener('click', () => {
    navbar.classList.toggle("change");
}) //burger menu toggles to and from X

//events
fetch("https://astridcaecilie.dk/kopenhagen/wordpress/wp-json/wp/v2/event" + "?_embed")
    .then(res => res.json())
    .then(handleData)
//magazine
fetch("https://astridcaecilie.dk/kopenhagen/wordpress/wp-json/wp/v2/magazine" + "?_embed")
    .then(res => res.json())
    .then(handleData)
//Categories
//fetch("https://astridcaecilie.dk/kopenhagen/wordpress/wp-json/wp/v2/categories?per_page=100")
//    .then(res => res.json())
//    .then(handleData)

function handleData(handled) {
    var artistNames = [];
    var categoryIds = [];
    //console.log("handled");
    //console.log(handled);
    //console.log(handled._embedded["wp:term"][0]);
    handled.forEach(item => {
        var allCategories = item._embedded["wp:term"][0];
//                console.log("item");
//                console.log(item);

        //check if there is a tag
        if (item._embedded["wp:term"][1] == false) {
            // No tag
        } else {
            // Yes tag
            var names = item._embedded["wp:term"][1][0].name;
            //            console.log("names");
            //            console.log(names);
        }
        artistNames.push(names);

        // Since there are multiple categories I needed one more step to get "inside"
        allCategories.forEach(cate => {
            var catId = cate.id;

            //Now I push it outside of this function and create an array from it
            categoryIds.push(catId);
        });

        categoryIds.forEach(catId => {
            var catIdLink = fetch("https://astridcaecilie.dk/kopenhagen/wordpress/wp-json/wp/v2/categories/" + catId)
            .then(res => res.json())


            console.log(catIdLink)
        });


    });


    artistNames.sort();
    artistNames.forEach(showTagData)
}

function showTagData(artistNameData) {
    //    console.log("artistNameData");
    //    console.log(artistNameData);

    var li = document.createElement("li");
    li.textContent = artistNameData;

    if (artistNameData) {
        const firstLetter = artistNameData.charAt(0);
        //artistNameDisplay.classList.add(firstLetter);

        //  console.log(".artistsFetched #" + firstLetter);
        var elem = document.querySelector(".artistsFetched #" + firstLetter);

        elem.appendChild(li);

        const h2 = document.querySelector(".LetterH2");

        if (elem > li) {
            elem.classList.remove("hide");
        }

    }
}


// burger menu code inspired by these two sites: https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_menu_icon_js and
// https://www.youtube.com/watch?v=BN6fH1nRDxA ;
