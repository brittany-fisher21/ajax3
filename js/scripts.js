"use strict";

fetch("https://swapi.dev/api/people/")
    .then(function (response) {
        //listens for the response from the fetch()promise 1
        return response.json();
    })
    .then(function (data) {
        //listens for the data from response.json() promise 2
        buildContent(data);
    })
    .catch(function (error) {
        //listens for rejection from the fetch() promise 
        console.error("ERROR", error);
        return error;
    });

//promise alwasys returns response or rejection.

function buildContent(data) {//buildContent is a callback function
    console.log("the data is: ", data.results);
// 1. create an unordered list
// 2. loop through the results array 
//3. create list item elements
//4. the list itemsn will have the name values of each entry
// 5. append list itmenst to the unordered list
//6. append the unordered list to the #root element
    const listOfNames = document.createElement("ul");
    const characters = data.results;

    characters.forEach(function(character){
        const characterNameItem = document.createElement("li");
        characterNameItem.innerText = character.name;
        listOfNames.append(characterNameItem);
    });
    const root = document.querySelector("#root");
    root.append(listOfNames);
}

document.addEventListener("DOMContentLoaded", function (){
    //1. get form element
    //2. add event listener
    //3. get the value of the input
    //4. use the value of the input to search the API
    //5. append the results to #search results

    const searchForm = document.querySelector("#searchForm");

    searchForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const searchInput = document.querySelector("input");
        doSearch(searchInput.value);
        
    });
});

function doSearch(name) {
    console.log("searching for ", name);

    fetch(`https://swapi.dev/api/people/?search=${name}`)
        .then(function(response) {
            return response.json();
        })
        .then(function (data) {
            console.log("search responses: ", data);
            if (data.count > 0) {
                buildSearchResults(data);
            }
        })
        .catch(function (error) {
            console.error("ERROR: ", error);
            return error;
        });
}

function buildSearchResults (data){
    const searchResults = data.results;

    const searchResultsDiv = document.querySelector("#searchResults");

    searchResults.forEach(function (result) {
        const characterInfo = document.createElement("p");
        characterInfo.innerText = `${result.name} was born in ${result.birth_year}`
        searchResultsDiv.appendChild(characterInfo);
    });
}