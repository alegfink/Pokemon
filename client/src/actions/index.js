import axios from 'axios';

export const GET_ALL_POKEMON = 'GET_ALL_POKEMON';
export const SAVE_PAGE = 'SAVE_PAGE';
export const MAX_PAGE_NUMBER = 'MAX_PAGE_NUMBER';
export const MIN_PAGE_NUMBER = 'MIN_PAGE_NUMBER';
export const SEARCH_BY_NAME = 'SEARCH_BY_NAME';
export const RESET_MAX_MIN = 'RESET_MAX_MIN;';
export const RESET_PAGE = 'RESET_PAGE';
export const SET_NAME = 'SET_NAME';
export const FILTER_BY_TYPE = 'FILTER_BY_TYPE';
export const ORDER_BY_NAME = 'ORDER_BY_NAME';
export const ORDER_BY_ATTACK = 'ORDER_BY_ATTACK';
export const DELETE_FILTER = 'DELETE_FILTER';
export const FILTER_DONE = 'FILTER_DONE';
export const GET_DETAIL = 'GET_DETAIL';
export const DELETE_DETAIL = 'DELETE_DETAIL';
export const POST_POKEMON = 'POST_POKEMON';
export const GET_ALL_TYPES = 'GET_ALL_TYPES';
export const ORDER_BY_CREATION = 'ORDER_BY_CREATION';

export function getAllPokemon (){
    return function(dispatch){
        return axios.get('http://localhost:3001/pokemon')
        .then(json=>{
            
            dispatch({
                type: GET_ALL_POKEMON,
                payload: json.data
            });
        })
        .catch(err=>{
            dispatch({
                type:GET_ALL_POKEMON,
                payload: err.data
            })
        })
    }
}

export function getAllTypes(){
  return function (dispatch){
    return axios.get('http://localhost:3001/types')
      .then(json=>{
        dispatch({
          type: GET_ALL_TYPES,
          payload: json.data
        })
      })
      .catch(err=>{
        dispatch({ 
          type: GET_ALL_TYPES, 
          payload: err.data,
      })
      })
  }
}

export function searchByName (payload){
  return function(dispatch){
    return axios.get(`http://localhost:3001/pokemon?name=${payload}`)
    .then(json => {
        dispatch({ 
        type: SEARCH_BY_NAME, 
        payload: json.data,
    });
    })
    .catch(err=>{
      dispatch({ 
        type: SEARCH_BY_NAME, 
        payload: err.response.data,
    })
  })
  }
}

export function filterPokemonByType(payload){
  return{
    type: FILTER_BY_TYPE,
    payload
  }
}

export function orderByName(payload){
  return{
    type: ORDER_BY_NAME,
    payload
  }
}

export function getPokemonDetail (id){
  return function (dispatch){
    return axios.get(`http://localhost:3001/pokemon/${id}`)
      .then(json=>{
        
        dispatch({
          type: GET_DETAIL,
          payload: json.data
        })
      })
      .catch(err=>{
        dispatch({ 
          type: GET_DETAIL, 
          payload: err.data,
      })
      })
  }
}

export function postNewPokemon (payload){
  return function (dispatch){
    return axios.post('http://localhost:3001/pokemon', payload)
      .then((json)=>{
        dispatch({                 // o return json
          type: POST_POKEMON,
          payload:json.data
        })}
      )
      .catch(err=>{
        dispatch({ 
          type: POST_POKEMON, 
          payload: err.response.data,
      })
      })
  } 
} 

export function deleteDetail(){
  return{
      type: DELETE_DETAIL,
  }
}

export function savePage(payload){
    return{
      type: SAVE_PAGE,
      payload
    }
  }

export function orderByAttack(payload){
  return{
    type: ORDER_BY_ATTACK,
    payload
  }
}

export function orderByCreation(payload){
  return{
    type: ORDER_BY_CREATION,
    payload
  }
}

export function deleteFilter(){ // para resetear el filtro cuando actualiza
  return{
    type: DELETE_FILTER
  }
}

export function maxPageNumber(payload){
    return{
      type: MAX_PAGE_NUMBER,
      payload
    }
  }
  
export function minPageNumber(payload){
    return {
      type: MIN_PAGE_NUMBER,
      payload
    }
  }

export function resetMaxMin(){
    return{
      type: RESET_MAX_MIN
    }
  }
  
export function resetPage(){
    return{
      type:RESET_PAGE
    }
  }

export function setName(payload){
    return{
      type: SET_NAME,
      payload
    }
  }

export function filterDone(){
  return{
    type: FILTER_DONE,
    
  }
}
