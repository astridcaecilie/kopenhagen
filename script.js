const menuIcon = document.querySelector('.burgerMenu');

const navbar = document.querySelector('.navbar')

menuIcon.addEventListener('click', () => {
    navbar.classList.toggle("change");
}) //burger menu toggles to and from X

// *** FETCH fetching from both pod types ***
//fetching from event pods
fetch("https://astridcaecilie.dk/kopenhagen/wordpress/wp-json/wp/v2/event" + "?_embed")
    .then(res => res.json())
    .then(handleData)
//fetching from magazine pods
fetch("https://astridcaecilie.dk/kopenhagen/wordpress/wp-json/wp/v2/magazine" + "?_embed")
    .then(res => res.json())
    .then(handleData)

function handleData(handled) {
    //Create an array and then push the artist names (line31) into the array
    var artistNames = [];
    var categoryIds = [];
    var categoryNames = [];

    handled.forEach(item => {
        var allCategories = item._embedded["wp:term"][0];

        //check if there is a tag
        if (item._embedded["wp:term"][1] == false) {
            //There is no tag (artist name) in this event/magazine pod
        } else {
            //Here we have a tag (artist name)
            var names = item._embedded["wp:term"][1][0].name;
        }
        //so we get the names (line28) and then push it to the var artistName (line21)
        artistNames.push(names);

        // Since there are multiple categories I needed one more step to get "inside"
        allCategories.forEach(cate => {
            var catId = cate.id;
            var catName = cate.name;

            //Now I push it outside of this function and create an array from it
            //            console.log(catId);
            categoryIds.push(catId);
            categoryNames.push(catName);

        });
    });

    categoryIds.sort();
    categoryNames.sort();

    function noRepeat(array) {
        var noRepeatArray = [];

        // Loop through array values
        for (i = 0; i < array.length; i++) {
            if (noRepeatArray.indexOf(array[i]) === -1) {
                noRepeatArray.push(array[i]);
            }
        }
        return noRepeatArray;

    }

    var catNamesNoRepeat = (noRepeat(categoryNames));
    var catIdsNoRepeat = (noRepeat(categoryIds));


    catIdsNoRepeat.forEach(fetchingCat)

    //Sort the array and for each artist name call the function showTagData
    artistNames.sort();
    artistNames.forEach(showTagData);

    function fetchingCat(categories) {
        fetch("https://astridcaecilie.dk/kopenhagen/wordpress/wp-json/wp/v2/categories/" +
                categories
            )
            .then(res => res.json())
            .then(handleCategories)
    }

    function handleCategories(handledCatData) {
        var theLocationIds = [];
        var theLocationNames = [];

        var allCategoryNames = [];

        var theInstitutionIds = [];
        var theInstitutionNames = [];
        var theInstitutionLocation = [];


        //for the Institution name
        if (handledCatData.parent == 2) {
            var institutionId = handledCatData.id;
            var institutionName = handledCatData.name;
            var institutionLocation = handledCatData.description;
            theInstitutionIds.push(institutionId);
            theInstitutionNames.push(institutionName);

            var institutionLi = document.createElement("li");
            institutionLi.textContent = institutionName;

            var regionsUl = document.querySelector(".regionsFetched #" + institutionLocation);
            console.log(regionsUl);

            regionsUl.appendChild(institutionLi);

            if (regionsUl > institutionLi) {
                regionsUl.classList.remove("hide");
            }
        }
    }
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

//Deleting repeating values in an array https://www.tutorialrepublic.com/faq/how-to-remove-duplicate-values-from-a-javascript-array.php

