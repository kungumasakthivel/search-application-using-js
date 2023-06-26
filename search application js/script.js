let searchInputEl = document.getElementById('searchInput');

let searchResult = document.getElementById('searchResults');

let spinnerEl = document.getElementById('spinner');

function createAndAppendSearchResult(result) {
    // create result item element 

    let resultItemEl = document.createElement('div');
    resultItemEl.classList.add("result-item");
    searchResult.appendChild(resultItemEl);

    // create title element

    let {
        link,
        title,
        description
    } = result;
    let titleEl = document.createElement("a");
    titleEl.href = link;
    titleEl.target = "_blank";
    titleEl.textContent = title;
    titleEl.classList.add("result-title");
    resultItemEl.appendChild(titleEl);

    // create break element 

    let titleBreakEl = document.createElement("br");
    resultItemEl.appendChild(titleBreakEl);

    // create url element 

    let urlEl = document.createElement("a");
    urlEl.textContent = link;
    urlEl.target = "_blank";
    urlEl.href = link;
    urlEl.classList.add("result-url");
    resultItemEl.appendChild(urlEl);

    // create break element
    let urlBreakEl = document.createElement("br");
    resultItemEl.appendChild(urlBreakEl);

    // creat description element

    let descriptionEl = document.createElement("p");
    descriptionEl.textContent = description;
    descriptionEl.classList.add("link-description");
    resultItemEl.appendChild(descriptionEl);
}

function displayResult(searchResult) {
    spinnerEl.classList.toggle("d-none");
    for (let result of searchResult) {
        createAndAppendSearchResult(result);
    }
}



function searchWikipedia(event) {
    if (event.key === "Enter") {
        searchResult.textContent = "";
        spinnerEl.classList.toggle("d-none");
        let searchInput = searchInputEl.value;
        let url = "https://apis.ccbp.in/wiki-search?search=" + searchInput;
        let options = {
            method: "GET"
        };
        fetch(url, options)
            .then(function(responce) {
                return responce.json();
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;
                displayResult(search_results);
            });
    }
}

searchInputEl.addEventListener('keydown', searchWikipedia);