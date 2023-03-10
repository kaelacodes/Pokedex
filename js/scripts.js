// pokemonRepository uses external API and is wrapped in IIFE to eliminate code from global use

let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  
// function to add pokemon to list via .push() with conditions 
    function add(pokemon) {
        if (
            typeof pokemon === "object" &&
            "name" in pokemon,
            "detailsUrl" in pokemon
        ) {
            pokemonList.push(pokemon);
        }
        else {
            console.log("pokemon is not correct");
          }
      }

      // getAll function to return all of the items in the pokemonList array
    function getAll() {
      return pokemonList;
    }

// add pokemon to list in <button> format   
    function addListItem(pokemon) {
      let pokemonList = $('.pokemon-list');
      let listItem = $('<li class="group-list-item"></li>');
      let itemButton= $(`<button type="button" class="pokemon-button btn btn-info" data-target="#pokemon-modal" data-toggle="modal">${pokemon.name}</button>`);
      
      listItem.append(itemButton);
      pokemonList.append(listItem);

      //event listener shows pokemon details when clicked
      itemButton.on('click', function(){
        showDetails(pokemon);
      });
    }

//function to load pokemon API List
    function loadList() {
        return fetch(apiUrl).then(function (response) {
          return response.json();
      }).then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url
          };
          add(pokemon);
        });
      }).catch(function (e) {
        console.error(e);
      })
    }

// function to use the detailsUrl to load detailed pokemon data
    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
          return response.json();
        }).then(function (details) {
          // item details
          item.imageUrl = details.sprites.front_default;
          item.height = details.height;
          item.weight = details.weight;
          item.types = details.types.map((type) => type.type.name);
        }).catch(function (e) {
          console.error(e);
        });
      }

// function to show details
    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
          showDetailsModal(pokemon);
        });
      }

// -- Modal using jQuery and Bootsrap --

    function showDetailsModal(pokemon){
      let modalTitle = $('.modal-title');
      let modalBody = $('.modal-body');

      modalBody.empty();
      modalTitle.text(pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1));
      
      let spacerOne = $('<div class="col-3 spacer-one"></div>');
      let spacerTwo = $('<div class="col-3 spacer-two"></div>');
      let image = $('<img class="col-6 pokemon-img" src="' + pokemon.imageUrl + '"/>');
      let type = $('<p class="col-12 text-center">' + 'Types: ' + pokemon.types + '</p>');
      let height = $('<p class="col-12 text-center">' + 'Height: ' + pokemon.height + '</p>');
      let weight = $('<p class= "col-12 text-center">' + 'Weight: ' + pokemon.weight + '</p>');

      modalBody.append(spacerOne);
      modalBody.append(image);
      modalBody.append(spacerTwo);
      modalBody.append(type);
      modalBody.append(height);
      modalBody.append(weight);

    }

    // filter pokemon list via search input
    $(document).ready(function(){
      $('#search-value').on('keyup', function(){
        var value = $(this).val().toLowerCase();
        $('#pokemon-list li').filter(function(){
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
      });
    });

// returned data from defined functions
    return {
      add: add,
      getAll: getAll,
      addListItem: addListItem,
      loadList: loadList,
      loadDetails: loadDetails,
      showDetails: showDetails
    };
  })();
  
  pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
    });
  });

// UPDATED: forEach() loop - DOM manipulation
pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
})
