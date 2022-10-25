import React from "react";
import { searchByName, resetMaxMin, resetPage,setName } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import s from './SearchBar.module.css';
import poke from './Pokebola.png';

export default function SearchBar(){

    const dispatch = useDispatch()
    const titulo = useSelector(state=>state.name)
    
    
    function handleInput(e){
        e.preventDefault()
        // dispatch(resetMaxMin())
        // dispatch(resetPage())
        dispatch(setName(e.target.value))
        // dispatch(searchByName(e.target.value))   
    }

    function handleSelect(e){
        console.log('TITULO', titulo)
        e.preventDefault()
        dispatch(resetMaxMin())
        dispatch(resetPage())
        // dispatch(setName(e.target.value))
        dispatch(searchByName(titulo[0].toLowerCase()+titulo.slice(1))) 
    }
    
    return (
        <div className={s.container}>
            
            <input className={s.input} type='text' id='name' autoComplete='off' value={titulo} placeholder= "Search Pokemon" onChange={e=>handleInput(e)}></input>
            <button className={s.button} ><img src={poke} alt="x" onClick={e=>handleSelect(e)}/></button>
        </div>
    )
}