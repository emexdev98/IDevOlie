const pokemonlist = (document.getElementById('pokemonList'))
const loadMoreButton = document.getElementById('loadMore')
const maxRecords = 151
const limit = 10
let offset = 0



function loadPokemonItens(offset, limit){
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newhtml = pokemons.map((pokemon) => `
        <li class="pokemon ${pokemon.type}" >
        <span class="number">#${pokemon.number}</span>
        <span class="name">${pokemon.name}</span>
    
        <div class="detail">
            <ol class="types">
               ${pokemon.types.map((type) => `<li class="type ${type} ">${type}</li>`).join('')}
    
            </ol>
    
            <img src="${pokemon.photo}"
                alt="${pokemon.name}">
    
        </div>
    </li>
        `).join('')
        pokemonlist.innerHTML += newhtml
    
    })
}

loadPokemonItens(offset,limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNextPage = offset + limit

    if( qtdRecordsWithNextPage >= maxRecords) {
        const newLlimit = maxRecords - offset
        loadPokemonItens(offset,newLlimit)
    
        loadMoreButton.parentElement.removeChild(loadMoreButton) 
    }else{
        loadPokemonItens(offset, limit)
    }

})




