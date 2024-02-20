const accessKey = "08McL3HtK_bobsyxdRPJ9zJ89MUMAr5DNcel3UDzOSU";

// create variables
// dont use # here
const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const showMore = document.getElementById("show-more-btn");

let keyword = "";
let page = 1;

async function searchImages() {
    keyword = searchBox.value; // Value entered in saerch box
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;

    //get the response

    const response = await fetch(url);
    const data = await response.json();

    // empty the search field for new query
    if( page === 1){
        searchResult.innerHTML = " ";
    }

    const results = data.results;

    // for each element of the array
    results.map((result) => {
        // create iamge tag
        const image = document.createElement("img");
        // url for the image (add image to the img tag) 
        image.src = result.urls.small;
        // image link to the website
        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        // Open link in new tab
        imageLink.target = "_blank";

        // place image inside 'a' tag
        imageLink.appendChild(image);
        //show image in the searchResult
        searchResult.appendChild(imageLink);
    })

    //change the show more button from hidden to block 
    showMore.style.display = "block "

}

// show images on clicking the search button
searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    page = 1;
    searchImages();
})

// increase page when show more button is clicked and 
// call the searchImage function to show images
showMore.addEventListener("click",() =>{
    page++;
    searchImages();
} )


