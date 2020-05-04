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
    var categoryNames = [];

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
            //                        console.log("names");
            //                        console.log(names);
        }
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


//    categoryIds.forEach(fetchingCat);
//    categoryIds.forEach(compare);
    //        console.log(categoryIds)

    //categoryNames.forEach(displayCategoryName)
    categoryIds.sort();
    categoryNames.sort();
//    categoryIds.forEach(noRepeat);

    function noRepeat(array){
        var noRepeatArray = [];


        // Loop through array values
        for(i=0; i < array.length; i++){
            if(noRepeatArray.indexOf(array[i]) === -1) {
                noRepeatArray.push(array[i]);
            }
        }
        return noRepeatArray;

    }
//console.log(categoryIds)

//     console.log("categoryNames");
    var catNamesNoRepeat = (noRepeat(categoryNames));
    var catIdsNoRepeat = (noRepeat(categoryIds));
//    console.log(catNamesNoRepeat);
//    console.log(catIdsNoRepeat);

//

//    console.log("categoryIds");
//    console.log();
//    console.log(categoryIds);
//    console.log(find_duplicate_in_array(categoryIds));
//

    catIdsNoRepeat.forEach(fetchingCat)

    artistNames.sort();
    artistNames.forEach(showTagData);

    function fetchingCat(categories) {
        fetch("https://astridcaecilie.dk/kopenhagen/wordpress/wp-json/wp/v2/categories/"
              + categories
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



//                console.log(handledCatData)
//                console.log("hey")


        // For the location
//
//        if (handledCatData.parent == 11) {
//            var locationId = handledCatData.id;
//            var locationName = handledCatData.name;
//            //                    console.log(locationId);
//            //                    console.log(locationName);
//            theLocationIds.push(locationId);
//            theLocationNames.push(locationName);
//            //            console.log(theLocationIds);
//            //            console.log(theLocationNames);
//
//
//            var regionsUl = document.querySelector(".regionsFetched #" + theLocationNames);
//            console.log(regionsUl)
//
////             console.log("location");
//        }

        //for the Institution name
        if (handledCatData.parent == 2) {
            var institutionId = handledCatData.id;
            var institutionName = handledCatData.name;
             var institutionLocation = handledCatData.description;
//             console.log(handledCatData.description);
            //                    console.log(locationId);
            //                    console.log(locationName);
            theInstitutionIds.push(institutionId);
            theInstitutionNames.push(institutionName);
//            theInstitutionLocation.push(institutionLocation);

            //          console.log(theInstitutionIds);
//                                    console.log(theInstitutionNames);

            var institutionLi = document.createElement("li");
            institutionLi.textContent = institutionName;
//            console.log(institutionLi);

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

//Deleting repeating values in an array https://www.tutorialrepublic.com/faq/how-to-remove-duplicate-values-from-a-javascript-array.php
