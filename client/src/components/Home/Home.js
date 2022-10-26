import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPokemon, filterPokemonByType } from '../../actions';
import Card from '../Card/Cards.js';
import NavBar from '../NavBar/NavBar.js';
import Paginado from '../Paginado/Paginado.js';
import SearchBar from '../SearchBar/SearchBar.js';
import FilterBar from '../FilterBar/FilterBar.js';
import s from './Home.module.css';
import gif from './Pika-dance.gif';


export default function Home(){

    const dispatch = useDispatch()
    
    const allPokemon = useSelector (state=>state?.pokemon)
    const allPokemon2 = useSelector (state=>state?.allPokemon)
    
    
    const [loadingg, setLoadingg] = useState(false)
    
    const actualPage = useSelector(state=>state?.recordedPage)
    // const filtered = useSelector(state=>state?.filterDone)
    

    useEffect(()=>{
        
        dispatch(getAllPokemon())
        setTimeout( ()=>{
            setLoadingg(true) 
        }, 1000)
        
        return()=>{
           
        }
    },[dispatch])

    

    
    const pokemonPerPage = 12
    
    allPokemon.length===0&&dispatch(filterPokemonByType('All'))
    const indexOfLastRecipe = actualPage * pokemonPerPage
    const indexOfFirstRecipe = indexOfLastRecipe - pokemonPerPage
    const currentPokemon = allPokemon.length>0?allPokemon.slice(indexOfFirstRecipe, indexOfLastRecipe):allPokemon2.slice(indexOfFirstRecipe, indexOfLastRecipe)
    

    return (
        <div>
            <div>
                <NavBar/>
            </div>
            
            <div>
                <SearchBar/>
            </div>
            <div>
                <FilterBar/>
            
            </div>
            {
                !loadingg?(
                    <div className={s.loadingg}>
                        <img  src={gif} alt="Loading..."/>
                    </div>
                    
                )
                :
                <div>
            {allPokemon.length>0 &&
            <Paginado
            pokemonPerPage = {pokemonPerPage}
            allPokemon = {allPokemon.length>0?allPokemon.length:allPokemon2.length}
            />
            
            }
            
            <div className={s.containerCard}>
            
            {   
                
                currentPokemon && currentPokemon.map(el=>{
                    
                    return(
                        <div>
                            <Link key={el.id} to={`/detail/${el.id}`}>
                                <Card name={el.name} img={el.img} types={el.types} key={el.id}/>
                            </Link>
                            
                        </div>

                    
                    )
                })
                
            }
            </div>
            
            </div>
            }
            
        </div>
    )
}