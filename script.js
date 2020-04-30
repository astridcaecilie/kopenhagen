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
  console.log(".artistsFetched ." + firstLetter);
  const elem = document.querySelector(".artistsFetched ." + firstLetter);

  elem.appendChild(li);

}

function showTagData(tagData) {
  console.log(tagData);
  const artistName = tagData.name; // Here I get each artists name
  //    const artistTagId = tagData.id; // Here I get each artist tag id

  const artistNameDisplay = document.createElement("li"); //I create <li>
  //    artistNameDisplay.classList.add("artistNameDisplay"); //add a class to the <li> so it becomes <li class="artistNameDisplay">

  artistNameDisplay.textContent = artistName; //make the li include the names

  //Getting the fist letter of each name and make it a class on the element
  const firstLetter = artistName.charAt(0);
  artistNameDisplay.classList.add(firstLetter);

  console.log(artistNameDisplay);

  const elem = document.querySelector(".artistsFetched")

  elem.appendChild(artistNameDisplay);






  //    sort();


  //Prófa að gera if statement í stað ^ svo það vonandi endurtaki sig ekki
  //    document.querySelector(".artistsFetched").appendChild(h2FirstLetter);
  //        document.querySelector(".letterDiv").appendChild(h2);
  //        document.querySelector(h2).appendChild(artistNameDisplay);
  //    document.querySelector(".letterDiv").appendChild(artistNameDisplay);


  //    const h2 = document.createElement("h2");
  //    h2.classList.add(firstLetter);

  //    if (artistNameDisplay.classList == h2FirstLetter.classList) {
  //        console.log("is working");
  //        document.querySelector(".artistsFetched div").appendChild(artistNameDisplay);
  //        document.querySelector(".artistsFetched div").appendChild(h2);
  //
  //    } else {
  //
  //        h2.textContent = firstLetter;
  //        document.querySelector(".artistsFetched div").appendChild(h2);
  //        document.querySelector(".artistsFetched div").appendChild(artistNameDisplay);
  //        console.log("this is working")
  //    }
  //


  //    document.querySelector(".artistsFetched").appendChild(h2FirstLetter);
  //    document.querySelector(".artistsFetched div").appendChild(artistNameDisplay); //Get the <ul class="artistsFetched"> that alredy excists in the html and put in the new li's


  // https://astridcaecilie.dk/kopenhagen/wordpress/wp-json/wp/v2/categories?parent=23&orderby=count&order=desc
  // the nationality

  // http://astridcaecilie.dk/kopenhagen/wordpress/wp-json/wp/v2/categories?post=55
  // http://astridcaecilie.dk/kopenhagen/wordpress/wp-json/wp/v2/tags?post=55

  // http://astridcaecilie.dk/kopenhagen/wordpress/wp-json/wp/v2/event/37?_embed

  // get id
  // get tag name
  // get category if .parent == 23 get name
  //

  //

  //    function sort(sorted) {
  //        var h2FirstLetter = document.createElement("div");
  //        //        h2FirstLetter.classList.add("letterDiv");
  //        h2FirstLetter.classList.add(firstLetter);
  //        const h2 = document.createElement("h2");
  //        h2.textContent = firstLetter;
  //        h2.classList.add(firstLetter);
  //
  //
  //        if (artistNameDisplay.classList == h2FirstLetter.classList) {
  //            console.log("is working");
  //            document.querySelector(".artistsFetched div").appendChild(artistNameDisplay);
  //            document.querySelector(".artistsFetched div").appendChild(h2);
  //
  //        } else {
  //
  //            h2.textContent = firstLetter;
  //            document.querySelector(".artistsFetched div").appendChild(h2);
  //            document.querySelector(".artistsFetched div").appendChild(artistNameDisplay);
  //            console.log("this is working")
  //        }
  //    }

}




// burger menu code inspired by these two sites: https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_menu_icon_js and
// https://www.youtube.com/watch?v=BN6fH1nRDxA
