import React from 'react';
import {Link} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getAllPokemon } from '../../actions';
import s from './LandingPage.module.css';
import poke from './Pokebola2.png'


export default function LandingPage(){

    const dispatch = useDispatch()
    

    useEffect(()=>{
        dispatch(getAllPokemon());
    },[dispatch])

    return (
        
        <div className={s.landing}>
            
            <Link to = '/home'>
                
                <button className={s.button} ><img src={poke} alt="x"/></button>
                
            </Link>
        </div>
    )
}