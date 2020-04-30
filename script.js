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
    //    console.log(handled);
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

        //        categoryIds.forEach(testCategoryData);


    });
    categoryIds.forEach(myFunction);

    artistNames.sort();
    artistNames.forEach(showTagData);
}

//fetch("https://astridcaecilie.dk/kopenhagen/wordpress/wp-json/wp/v2/categories")
//    .then(res => res.json())
//    .then(handleCategoryData)
//
//
//function handleCategoryData(catHandled) {
//    catHandled.forEach(testCategoryData);
//    console.log("catHandled")
//    console.log(catHandled)
//}
//
//function testCategoryData(categories) {
//    console.log("categories")
//    console.log(categories)
//
//}
function myFunction(categories) {
    fetch("https://astridcaecilie.dk/kopenhagen/wordpress/wp-json/wp/v2/categories/" + categories)
        .then(res => res.json())
        .then(showLocationCategories)
}
function showLocationCategories (locationCat){
//    console.log(locationCat)
    if (locationCat.parent == 11) {
//        console.log("Location!");
        var location = locationCat.name;

    var locationLi = document.createElement("li");
    locationLi.textContent = location;

    console.log(locationLi)
    var regionsDiv = document.querySelector(".regionsFetched #" + location);

        regionsDiv.appendChild(locationLi);

        const h2 = document.querySelector(".regions");

        if (regionsDiv > locationLi) {
            regionsDiv.classList.remove("hide");
        }
}
    }

function showTagData(artistNameData) {
    //    console.log("artistNameData");
    //    console.log(artistNameData);

    var artistLi = document.createElement("li");
    artistLi.textContent = artistNameData;

    if (artistNameData) {
        const firstLetter = artistNameData.charAt(0);
        //artistNameDisplay.classList.add(firstLetter);

        //  console.log(".artistsFetched #" + firstLetter);
        var elem = document.querySelector(".artistsFetched #" + firstLetter);

        elem.appendChild(artistLi);

        const h2 = document.querySelector(".LetterH2");

        if (elem > artistLi) {
            elem.classList.remove("hide");
        }

    }
}


// burger menu code inspired by these two sites: https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_menu_icon_js and
// https://www.youtube.com/watch?v=BN6fH1nRDxA ;
