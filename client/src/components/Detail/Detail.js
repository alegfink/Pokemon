import React from 'react';
import { useParams} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { getPokemonDetail, deleteDetail } from '../../actions';
import s from './Detail.module.css';
import NavBar from '../NavBar/NavBar';
import imagen from '../Card/ditto.jpg';
import gif from './Poke-gif.gif';




export default function RecipDetail(props){

    // const gif2 = 'https://media.baamboozle.com/uploads/images/230671/1618515492_257228_gif-url.gif'
    const dispatch = useDispatch()
    let {id} = useParams()
    
    
    let pokemonDetail = useSelector (state => state.pokemonDetail)
    const [loading, setLoading] = useState(false)
    
    
    

    useEffect(()=>{
        dispatch(getPokemonDetail(id));
        setTimeout( ()=>{
            setLoading(true) 
        }, 1000)
        
        return function(){
            
            dispatch(deleteDetail())
            
        }
    },[dispatch,id])

    // function setProgressHp(percent) {
    //     const range = document.querySelector('.range');
    //     const progress = range.querySelector('.progressHp');
        
    //     progress.style.width = `${percent}%`
    //   }

    

    return (
        <div>
            <NavBar/>
            {
                !loading?(
                    <div className={s.loading}>
                        <img  src={gif} alt='Loading...'/>
                    </div>
                    
                )
                :
            <div className={s.container}>
            
            <div className={s.img}>
                <img src={pokemonDetail.img?pokemonDetail.img:imagen} alt='not found'/>
            </div>
            <div className={s.text}>
            <h1 className={s.title}>{pokemonDetail.name[0].toUpperCase()+pokemonDetail.name.slice(1)}</h1>
            <div className={s.data}>
                <div className={s.score}>
                <h3>Hp: {pokemonDetail.hp}</h3>
                <h3>Attack: {pokemonDetail.attack}</h3>
                <h3>Defense: {pokemonDetail.defense}</h3>
                <h3>Speed: {pokemonDetail.speed}</h3>
                </div>
            {
            pokemonDetail.types && pokemonDetail.types.length>0?
            <div className={s.dishTypes}>
            
            <div className={s.tipos}>
            {pokemonDetail.id<10000?pokemonDetail.types.map(e=>{
                return <span className={(e==='ground'&&s.ground) || (e==='rock'&&s.rock) || (e==='ice'&&s.ice) || (e==='shadow'&&s.shadow) || (e==='normal'&&s.normal) || (e==='bug'&&s.bug) || (e==='water'&&s.water) || (e==='dragon'&&s.dragon) || (e==='flying'&&s.flying) || (e==='steel'&&s.steel) || (e==='electric'&&s.electric) || (e==='flying'&&s.flying) || (e==='fairy'&&s.fairy) || (e==='fighting'&&s.fighting) || (e==='fire'&&s.fire) || (e==='psychic'&&s.psychic) || (e==='unknown'&&s.unknown) || (e==='poison'&&s.poison) || (e==='ghost'&&s.ghost) || (e==='grass'&&s.grass) || (e==='dark'&&s.dark)} key={e}>{e.toUpperCase()}</span>
            })
            :
            pokemonDetail.types.map(e=>{
                return <span className={(e.name==='ground'&&s.ground) || (e.name==='rock'&&s.rock) || (e.name==='ice'&&s.ice) || (e.name==='shadow'&&s.shadow) || (e.name==='normal'&&s.normal) || (e.name==='bug'&&s.bug) || (e.name==='water'&&s.water) || (e.name==='dragon'&&s.dragon) || (e.name==='flying'&&s.flying) || (e.name==='steel'&&s.steel) || (e.name==='electric'&&s.electric) || (e.name==='flying'&&s.flying) || (e.name==='fairy'&&s.fairy) || (e.name==='fighting'&&s.fighting) || (e.name==='fire'&&s.fire) || (e.name==='psychic'&&s.psychic) || (e.name==='unknown'&&s.unknown) || (e.name==='poison'&&s.poison) || (e.name==='ghost'&&s.ghost) || (e.name==='grass'&&s.grass) || (e.name==='dark'&&s.dark) } key={e}>{e.name.toUpperCase()}</span>
            })
            }
            </div>
            
            </div>
            :<li className={s.id}>There is no type associated</li>
            }
            
            <div className={s.summary}>
                <div className={s.score}>
                <h3>Height: {pokemonDetail.height}</h3>
                <h3>Weight: {pokemonDetail.weight}</h3>
                </div>
            
            </div >
                <span className={s.id}>ID: {pokemonDetail.id}</span>
            
            
            </div>
            
            </div>
            
            
        </div>
            }
            
                
            
        </div>
        
    )
}