let pokemonList  = [
    {name:'Butterfree', type:['bug', 'flying'], height: 1.1},
    {name:'Caterpie', type:'Bug', height: 0.3},
    {name: 'Jigglypuff', type:['Fairy', 'Normal'], height: 0.5}
];
for (let i=0; i < pokemonList.length; i++){
    if (pokemonList[i].height < 0.5){
        document.write(pokemonList[i].name + " (height: " + pokemonList[i].height +"m) - Wow! That's a tiny pokemon! <br>")
        }
    else if (pokemonList[i].height > 1.0){
        document.write(pokemonList[i].name + " (height: " + pokemonList[i].height +"m) - Wow! That's a big pokemon! <br>")
        }
    else {
        document.write(pokemonList[i].name + " (height: " + pokemonList[i].height +"m) <br>")
        }
    }