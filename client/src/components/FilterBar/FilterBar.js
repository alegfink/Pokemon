import React from "react";
import { useDispatch } from "react-redux";
import { filterPokemonByType, orderByName, orderByAttack, resetMaxMin, resetPage, deleteFilter, filterDone, orderByCreation } from "../../actions";
import s from './FilterBar.module.css';

export default function FilterBar(){

    const dispatch = useDispatch()

    const handleFilterType=(e)=>{
        e.preventDefault()
        dispatch (resetMaxMin())
        dispatch (resetPage())
        dispatch(deleteFilter())
        dispatch(filterPokemonByType(e.target.value))
                
    }

    const handleOrderByName =(e)=>{
        e.preventDefault()
        dispatch(resetMaxMin())
        dispatch(resetPage())
        dispatch(orderByName(e.target.value))
        dispatch(filterDone())
        
    }

    function handleOrderByAttack(e){
        e.preventDefault()
        dispatch(resetMaxMin())
        dispatch(resetPage())
        dispatch(orderByAttack(e.target.value))
        dispatch(filterDone())

    }

    function handleOrderByCreation(e){
        e.preventDefault()
        dispatch(resetMaxMin())
        dispatch(resetPage())
        dispatch(orderByCreation(e.target.value))
        dispatch(filterDone())
    }


    return(
        <div >
            <div className={s.filter}>
            <select className={s.select} onChange={e=>handleOrderByName(e)}>
                    <option value='asc'>(a-z) Ascendent</option>
                    <option value='desc'>(z-a) Descendent</option>
                </select>
                <select className={s.select} onChange={e=>handleOrderByAttack(e)}>
                    <option value='low'>Lower (attack)</option>
                    <option value='hi'>Higher (attack)</option>
                </select>
                <select className={s.select} onChange={e=>handleOrderByCreation(e)}>
                    <option value='All'>All (pokemon)</option>
                    <option value='created'>Created</option>
                    <option value='original'>Original</option>
                </select>
                <select className={s.select} onChange={e=>handleFilterType(e)}>
                    <option value='All'>All (types)</option>
                    <option value='normal'>normal</option>
                    <option value='fighting'>fighting</option>
                    <option value='flying'>flying</option>
                    <option value='poison'>poison</option>
                    <option value='ghost'>ghost</option>
                    <option value='ground'>ground</option>
                    <option value='rock'>rock</option>
                    <option value='bug'>bug</option>
                    <option value='fire'>fire</option>
                    <option value='water'>water</option>
                    <option value='grass'>grass</option>
                    <option value='electric'>electric</option>  
                    <option value='psychic'>psychic</option>
                    <option value='ice'>ice</option>
                    <option value='dragon'>dragon</option>
                </select>
            </div>
            
        </div>
    )
}