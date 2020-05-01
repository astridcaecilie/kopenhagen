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
            //            categoryNames.push(catName);
        });




        //                categoryIds.forEach(testCategoryData);


    });


    categoryIds.forEach(fetchingCat);
    categoryIds.forEach(compare);
    //        console.log(categoryIds)

    //categoryNames.forEach(displayCategoryName)



    artistNames.sort();
    artistNames.forEach(showTagData);

    function fetchingCat(categories) {
        fetch("https://astridcaecilie.dk/kopenhagen/wordpress/wp-json/wp/v2/categories/" + categories)
            .then(res => res.json())
            .then(handleCategories)
    }

    function handleCategories(handledCatData) {
        var theLocationIds = [];
        var theLocationNames = [];

        var allCategoryNames = [];

        var theInstitutionIds = [];
        var theInstitutionNames = [];


        //        console.log(handledCatData.name)

        // For the location
        if (handledCatData.parent == 11) {
            var locationId = handledCatData.id;
            var locationName = handledCatData.name;
            //                    console.log(locationId);
            //                    console.log(locationName);
            theLocationIds.push(locationId);
            theLocationNames.push(locationName);
            //            console.log(theLocationIds);
            //            console.log(theLocationNames);
            var regionsUl = document.querySelector(".regionsFetched #" + theLocationNames);

//             console.log(locationName);
        }

        //for the Institution name
        else if (handledCatData.parent == 2) {
            var institutionId = handledCatData.id;
            var institutionName = handledCatData.name;
            //                    console.log(locationId);
            //                    console.log(locationName);
            theInstitutionIds.push(institutionId);
//            theInstitutionNames.push(institutionName);
            //          console.log(theInstitutionIds);
            //                        console.log(theInstitutionNames);

            var institutionLi = document.createElement("li");
            institutionLi.textContent = institutionName;
            console.log(handledCatData.name);
        }

//        theInstitutionNames.forEach(showInstitutionName);
//
//        function showInstitutionName(institutionNameDisplay) {


//        if (theInstitutionNames == 0) {
////            console.log("no")
//            } else {
//               var institutionLi = document.createElement("li");
//                institutionLi.textContent = theInstitutionNames;
//
//
////                var regionsUl = document.querySelector(".regionsFetched #" + theLocationNames);
////                regionsUl.appendChild(institutionLi);
////            console.log("yey")
//            }


                //  console.log(".artistsFetched #" + firstLetter);



//            console.log(institutionLi)
//            console.log(theLocationNames)



//                const regionH2 = document.querySelector(".regions");

//                if (regionsUl > institutionLi) {regionsElem.classList.remove("hide");}

//        }









        //    handledCatData.forEach(locationCategories);
        //     console.log(handledCatData)
    }

    function locationCategories(locationCat) {
        //        console.log("locationCat")
        //        console.log(locationCat)
        //        console.log("categoryIds")
        //        console.log(categoryIds)
        //        var theLocationIds = [];

        //        console.log(locationCat.parent == 11)
        //        if (locationCat.parent !== 11) {
        //            console.log("no")
        //
        //        } else {
        ////
        //            console.log("locationCat.id")
        ////            console.log(locationCat.id)
        //           var locationCatId = locationCat.id;
        ////            var stringCatId = locationCatId.toString();
        ////            console.log(stringCatId)
        //             theLocationIds.push(locationCatId);
        //        }
        //            console.log

        //                    console.log(theLocationIds)

        //theLocationIds.forEach(compare)

        //        var locationId = locationCat.parent == 11;
        //        console.log(locationId)

    }

    function compare(compared) {
        //        if (locationId == categoryIds) {
        //            console.log("yey")
        //        }
    }
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


//function fetchingCat (categories) {
//    fetch("https://astridcaecilie.dk/kopenhagen/wordpress/wp-json/wp/v2/categories/" + categories)
//        .then(res => res.json())
//        .then(showLocationCategories)
//}
//function showLocationCategories (locationCat){
////    console.log(locationCat)
//    if (locationCat.parent == 11) {
////        console.log("Location!");
//        var locationId = [""];
//
//    }
//locationId.forEach(compareCategories)
//}
//
//function compareCategories (compared){
//
//}

if (artists.html == true){
    console.log("yes")
} else{
    console.log("no")
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
