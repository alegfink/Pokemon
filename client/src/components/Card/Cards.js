import React from 'react';
import s from './Cards.module.css';
import imagen from './pokeball.png'

export default function Card({name, img, types}){
    
    
    const tipo = types?.map(el=>el)
    
    
    
    return (
        <div className={s.container}>
            <div className={s.card}>
                <img src={img?img:imagen} alt='Not found' className={s.img}/>
            <div className={s.infoCard}>
                <div>
                    <h2 className={s.title}>{name[0].toUpperCase()+name.slice(1)}</h2>
                </div>
                <div className={s.dietContainer}>
                <div className={s.types}>
                        {
                            tipo? tipo.map(e=>(
                                <span className={(e==='ground'&&s.ground) || (e==='rock'&&s.rock) || (e==='ice'&&s.ice) || (e==='shadow'&&s.shadow) || (e==='normal'&&s.normal) || (e==='bug'&&s.bug) || (e==='water'&&s.water) || (e==='dragon'&&s.dragon) || (e==='flying'&&s.flying) || (e==='steel'&&s.steel) || (e==='electric'&&s.electric) || (e==='flying'&&s.flying) || (e==='fairy'&&s.fairy) || (e==='fighting'&&s.fighting) || (e==='fire'&&s.fire) || (e==='psychic'&&s.psychic) || (e==='unknown'&&s.unknown) || (e==='poison'&&s.poison) || (e==='ghost'&&s.ghost) || (e==='grass'&&s.grass) || (e==='dark'&&s.dark) } key={e}>{e.toUpperCase()}</span>
                            )): <ul >No tiene Tipo asociado</ul>
                        } 
                    </div>
                
                </div>
            
            
            </div>
            
            
        </div>
        </div>        
    )
}