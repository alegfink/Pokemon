import React from 'react';
import { useHistory} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { postNewPokemon, getAllTypes, getAllPokemon, searchByName } from '../../actions';
import NavBar from '../NavBar/NavBar';
import s from './Form.module.css';
// import { types } from '@babel/core';
// import { initializeConnect } from 'react-redux/es/components/connect';


let count = 0;

export default function Form(){
  
    const dispatch = useDispatch()
    const typess = useSelector(state=>state?.allTypes)
    const history = useHistory()
    const [errors, seterrors] = useState('')
    const allPoke = useSelector(state=>state.allPokemon)

    useEffect(()=>{
        dispatch(getAllTypes())
        dispatch(getAllPokemon())

        return function(){
            
          dispatch(searchByName(''))
          count = 0
          
      }
    },[dispatch])

    const [input, setInput] = useState({
        title:'',
        hp:'',
        attack:'',
        defense:'',
        speed:'',
        types:[],
        img: '',
        height:'',
        weight:''
    })
    
    const inputsError = ['title', 'hp', 'attack', 'defense', 'speed', 'types', 'img', 'height', 'weight']

    

    function validate(input) {
        let errors = {};
        console.log('ALLPOKE', allPoke)
        const as = allPoke.map(el=>{
            if(el.name[0].toLowerCase()+el.name.slice(1) ===input.title[0]?.toLowerCase()+input.title.slice(1)) return true})
            const aa = as.includes(true)
            console.log('AA', aa)
        if (!input.title) {
          errors.title = 'Name is required';
        }
        else if(!isNaN(input.title)){errors.title = 'Name cannot be a number'}
        else if(aa){errors.title = 'Name allready exist'};
        if (!input.hp) {
          errors.hp = 'Hp is required';
        } 
        else if (input.hp<0 || input.hp>300) {
            errors.hp = 'Hp must be between 1-300'};
        if (!input.attack) {
            
          errors.attack = 'Attack is required';
        } 
        else if (input.attack<0 || input.attack>300) {
          errors.attack = 'Attack must be between 1-300';
        }
        if (!input.defense) {
          errors.defense = 'Defense is required';
        }
        else if (input.defense<0 || input.defense>300) {
          errors.defense = 'Defense must be between 1-300';
        }
        if (!input.speed) {
          errors.speed = 'Speed is required';
        }
        else if (input.speed<0 || input.speed>300) {
          errors.speed = 'Speed must be between 1-300';
        }
        if (!input.height) {
          errors.height = 'Height is required';
        }
        else if (input.height<0 || input.height>250) {
          errors.height = 'Height must be between 1-250';
        }
        if (!input.weight) {
            errors.weight = 'Weight is required';
        }
        else if (input.weight<0 || input.weight>10000) {
          errors.weight = 'Weight must be between 1-10000';
        }
        if (input.img.includes('?url=http')||input.img.length>=255){
            
            errors.img = 'URL invalid'
        }
        if (count>2){
          errors.types = 'You cannot choose more than 2 types'
        }
        return errors;
      };

    function handleChange(e){
        e.preventDefault()
        
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
        seterrors(validate({
            ...input,
            [e.target.name]:e.target.value
        }))
    }

    function handleSubmit(e){
        
        e.preventDefault()
        if(!inputsError.some(inp=>errors.hasOwnProperty(inp))&&input.title.length>0){
                dispatch(postNewPokemon(input))
                
                
                    alert('Pokemon created successfully')
                    setInput({
                        title:'',
                        hp:'',
                        attack:'',
                        defense:'',
                        speed:'',
                        types:[],
                        img: '',
                        height:'',
                        weight:''
                    })
                    history.push('/home')
                
            } else{
                
                alert('Complete mandatory data')
            }
        } 
    
    
    function handleSelect(e){
        e.preventDefault()
        if (e.target.value !=="Type"){
            if (!input.types.includes(e.target.value)){
                setInput({
                    ...input,
                    types: [...input.types, e.target.value]
                });
                count++
                
                seterrors(validate({
                  ...input,
                  
              }))
            }
            
        }
        
    }

    function handleDelete(e){
        setInput({
            ...input,
            types: [...input.types.filter(type=> type !== e)]
        })
        count--
        
        seterrors(validate({
          ...input,
          
      }))
        
    }

    

    return(
        <div>
            <div>
                <NavBar/>
            </div>
            <div className={s.container}>
            <form className={s.form} onSubmit={e=>handleSubmit(e)} >
                
                
              <div className={s.group_title}>
                <div className={s.group}>
                <input className={s.input} type='text' name='title' value={input.name} placeholder='Name...' onChange={e=>handleChange(e)}></input>
                
                </div>
                
              </div>
              <div className={s.group_errorTitle}>
                
                {errors.title && <span className={s.error}>{errors.title}</span>}
                
                </div>
              <div className={s.group_score}>
              <div className={s.group}>
              <input className={s.input} type='number' name='hp' value={input.name} placeholder='Hp...' onChange={e=>handleChange(e)}></input>
              </div>
                {errors.hp && <span className={s.error}>{errors.hp}</span>}
              </div>
              <div className={s.group_score}>
              <div className={s.group}>
              <input className={s.input} type='number' name='attack' value={input.name} placeholder='Attack...' onChange={e=>handleChange(e)}></input>
              </div>
                {errors.attack && <span className={s.error}>{errors.attack}</span>}
              </div>
              <div className={s.group_score}>
              <div className={s.group}>
              <input className={s.input} type='number' name='defense' value={input.name} placeholder='Defense...' onChange={e=>handleChange(e)}></input>
              </div>
                {errors.defense && <span className={s.error}>{errors.defense}</span>}
              </div>
              <div className={s.group_score}>
              <div className={s.group}>
              <input className={s.input} type='number' name='speed' value={input.name} placeholder='Speed...' onChange={e=>handleChange(e)}></input>
              </div>
                {errors.speed && <span className={s.error}>{errors.speed}</span>}
              </div>
              <div className={s.group_score}>
              <div className={s.group}>
              <input className={s.input} type='number' name='height' value={input.name} placeholder='Height...' onChange={e=>handleChange(e)}></input>
              </div>
                {errors.height && <span className={s.error}>{errors.height}</span>}
              </div>
              <div className={s.group_score}>
              <div className={s.group}>
              <input className={s.input} type='number' name='weight' value={input.name} placeholder='Weight...' onChange={e=>handleChange(e)}></input>
              </div>
                {errors.weight && <span className={s.error}>{errors.weight}</span>}
              </div>
                
              
            <div>
            <select className={s.select} onChange={e=>handleSelect(e)}>
                <option>Types</option>
                    {
                        typess.map(e=>(
                        <option key={e.id} value={input.types.name}>{e.name}</option>)
                        )
                    }
                    
              </select>
            {
                input.types.length>0?
                <div className={s.group}>
                    <div className={s.dietSelected}>
                    <span>Selected Types: {input.types.map(el=>el + ' ,')}</span>
                </div>
                </div>
                :<span className={s.error}>No type was selected</span>
            }
            {errors.types && <span className={s.error}>{errors.types}</span>}
            <div className={s.deleteDiet}>
            {input.types.map(el=>{
                
                return (
                <div >  
                    <span className={s.dietToDelete}>{el}</span>
                    <button className={s.button} onClick={e=>handleDelete(el)}>x</button>
                </div>

            )})}
            
            </div>
            
              
            </div>
            <div className={s.group_step}>
              <div className={s.group}>
              <input className={s.input} type='text' name='img' value={input.name} placeholder='Image Url...' onChange={e=>handleChange(e)}></input>
              </div>
                {input.img?(errors.img && <span className={s.error}>{errors.img}</span>):null}
            </div>
            <div className={s.containerSubmit}>  
            <button className={input.title!==''?s.submit:s.submitError} type='submit'>Create Pokemon</button>  
            </div>  
                
                
            </form>
            
            </div>
            
            
        </div>
    )
}