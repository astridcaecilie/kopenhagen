
fetch("https://astridcaecilie.dk/kopenhagen/wordpress/wp-json/wp/v2/event")
    .then(res => res.json())
    .then(handleEventData)

function handleEventData(handled) {
    console.log("handle data");
    console.log(handled);
    handled.forEach(showEventData)
}

function showEventData(EventData) {
    //    console.log("show EventData");
    //    console.log(EventData);

    const eventId = EventData.id;
    console.log("artistEventId");
    console.log(eventId);

    if (eventId) {
        //single bike
        fetch("http://astridcaecilie.dk/kopenhagen/wordpress/wp-json/wp/v2/event/" + eventId + "?_embed")
            .then(res => res.json())
            .then(getInfoById)
    }

    function getInfoById(info) {

        var artistName = info._embedded["wp:term"][1][0].name;
        console.log("artistName");
        console.log(artistName);





    //    const artistName = EventData.name; // Here I get each artists name
    //    const artistEventId = EventData.id; // Here I get each artist Event id


        const artistNameDisplay = document.createElement("li"); //I create <li>

         const firstLetter = artistName.charAt(0);
        console.log(firstLetter)
        artistNameDisplay.classList.add(firstLetter);

//        artistNameDisplay.classList.add("artistNameDisplay"); //add a class to the <li> so it becomes <li class="artistNameDisplay">

        artistNameDisplay.textContent = artistName; //make the li include the names


        document.querySelector(".artistsFetched").appendChild(artistNameDisplay); //Get the <ul class="artistsFetched"> that alredy excists in the html and put in the new li's

        //Getting the fist letter of each name and make it a class on the element



}
