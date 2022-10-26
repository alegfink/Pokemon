const {GET_ALL_POKEMON, POST_POKEMON, GET_ALL_TYPES, SAVE_PAGE, SET_NAME, ORDER_BY_CREATION, FILTER_BY_TYPE, ORDER_BY_NAME, ORDER_BY_ATTACK, DELETE_FILTER, FILTER_DONE, GET_DETAIL, DELETE_DETAIL, MAX_PAGE_NUMBER, MIN_PAGE_NUMBER, SEARCH_BY_NAME, RESET_MAX_MIN, RESET_PAGE, filterDone} = require('../actions');

const initialState={
    allPokemon: [],
    pokemon: [],
    recordedPage: 1,
    maxPage:4,
    minPage:0,
    pokemonSearch: [],
    name: [],
    typeFiltered: [],
    filterDone: false,
    pokemonDetail: [],
    allTypes:[],

}

function rootReducer (state = initialState, action){
    switch(action.type){
        case GET_ALL_POKEMON:
            
            return{
                ...state,
                allPokemon: action.payload,
                
            }
        case SEARCH_BY_NAME:
            
            return{
                ...state,
                pokemonSearch: action.payload&&action.payload,
                pokemon: action.payload&&action.payload
            }
        case FILTER_BY_TYPE:
            const allPokemons = state.allPokemon
                
            let typeFiltered = action.payload === 'All'? allPokemons : allPokemons.filter(el=>{
                
                const asd = el.types.filter(el=>el===action.payload)
                
                if(asd.length>0){
                    return true
                }
                return false
                })
                
            return{
                ...state,
                pokemon: typeFiltered
            }
        case ORDER_BY_NAME:
            
            let arrayOrd = action.payload === 'asc' ?
                state.pokemon.sort((a,b)=>{
                    if (a.name>b.name) return 1
                    if (b.name>a.name) return -1
                    return 0
                }):
                state.pokemon.sort((a,b)=>{
                    if (a.name>b.name) return -1
                    if (b.name>a.name) return 1
                    return 0
                })
            console.log('REDUCER')
            
            return{
                ...state,
                pokemon: arrayOrd,
                
            }
        case ORDER_BY_ATTACK:
            let arrayLowHigh = action.payload === 'low'?
                state.pokemon.sort((a,b)=>{
                    if (a.attack>b.attack) return 1
                    if (b.attack>a.attack) return -1 
                    return 0       
                }):
                state.pokemon.sort((a,b)=>{
                    if (a.attack>b.attack) return -1
                    if (b.attack>a.attack) return 1 
                    return 0 
                })
            return{
                ...state,
                pokemon: arrayLowHigh,
                
            }
        case ORDER_BY_CREATION:
            const allPokemonss = state.allPokemon
            console.log('PAYLOAD', action.payload)
            let arrayCreation = action.payload === 'All'? allPokemonss : allPokemonss.filter(el=>{
                console.log('ID', el.id)
                if (action.payload === 'created') return el.id.length>8
                else return el.id<10000
            })
            console.log('ARRAY', arrayCreation)
            return {
                ...state,
                pokemon: arrayCreation,
            }
        case FILTER_DONE:
            return{
                ...state,
                filterDone: state.filterDone? false : true
            }
        case GET_DETAIL:
            
            return{
                ...state,
                pokemonDetail: action.payload
            }
        case DELETE_DETAIL:
            
            return{
                ...state,
                pokemonDetail:{}
            }
        case POST_POKEMON:
            return{
                ...state,
            }
        case GET_ALL_TYPES:
            
            return{
                ...state,
                allTypes: action.payload
            }
        case SAVE_PAGE:
            
            return{
                ...state,
                recordedPage: action.payload
            }
        case DELETE_FILTER:
            return{
                ...state,
                typeFiltered: []
            }
        case MAX_PAGE_NUMBER:
                return {
                    ...state,
                    maxPage: state.maxPage + action.payload
            }
        case MIN_PAGE_NUMBER:
                return {
                    ...state,
                    minPage: state.minPage + action.payload
            }
        case RESET_MAX_MIN:
            
                return{
                    ...state,
                    maxPage:4,
                    minPage:0
                }
        case RESET_PAGE:
                return{
                    ...state,
                    recordedPage:1
                }
        case SET_NAME:
            return{
                ...state,
                name: action.payload
            }
        default:
            return state;
    }
}

module.exports={
    rootReducer
}