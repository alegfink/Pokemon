const { Router } = require('express');
const axios = require('axios');
const router = Router();
const { Pokemon, Type } = require('../../db.js');
const { type } = require('os');

/*
router.get('/', async(req,res)=>{
    try{
        let apiUrl = await axios.get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=40')
        let apiUrlPokemon = await Promise.all(
         apiUrl.data.results.map(async el => {
            const apiId = await axios.get(el.url)
            const data = apiId.data
            // console.log('APIID',apiId.data)
            const asd = {
                name: el.name,
                id: data.id,
                hp: data.stats.map(e=>{
                    // console.log('ELEMENTO', e)
                    // const statFiltered = e.stat.filter(elem=>{elem.name===hp})
                    if (e.stat.name === 'hp'){
                        return e.base_stat
                    }
                    // console.log('BASE STAT', statFiltered.base_stat)
                    // return statFiltered.base_stat
                })[0],
                attack: data.stats.map(e=>{
                    if (e.stat.name === 'attack'){
                        return e.base_stat
                    }
                })[1],
                defense: data.stats.map(e=>{
                    if (e.stat.name === 'defense'){
                        return e.base_stat
                    }
                })[2],
                speed: data.stats.map(e=>{
                    if (e.stat.name === 'speed'){
                        return e.base_stat
                    }
                })[5],
                height: data.height,
                weight: data.weight,
                type: data.types.map(e=>{return e.type.name}),
                img: data.sprites.front_default
            }
            // console.log ('aaa', data.types)
            
            
            // console.log ('ASD', asd)
            return asd
        })
        )
        // console.log('RESULT', apiUrlPokemon )
        res.status(202).json(apiUrlPokemon)
    }catch(err){
        res.status(404).json('salio mal el primer get')
    }
})
*/
const getApiData = async()=>{
    try{
        let apiUrl = await axios.get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=40')
        let apiUrlPokemon = await Promise.all(
         apiUrl.data.results.map(async el => {
            const apiId = await axios.get(el.url)
            const data = apiId.data
            // console.log('APIID',apiId.data)
            const asd = {
                name: el.name,
                id: data.id,
                hp: data.stats.map(e=>{
                    // console.log('ELEMENTO', e)
                    // const statFiltered = e.stat.filter(elem=>{elem.name===hp})
                    if (e.stat.name === 'hp'){
                        return e.base_stat
                    }
                    // console.log('BASE STAT', statFiltered.base_stat)
                    // return statFiltered.base_stat
                })[0],
                attack: data.stats.map(e=>{
                    if (e.stat.name === 'attack'){
                        return e.base_stat
                    }
                })[1],
                defense: data.stats.map(e=>{
                    if (e.stat.name === 'defense'){
                        return e.base_stat
                    }
                })[2],
                speed: data.stats.map(e=>{
                    if (e.stat.name === 'speed'){
                        return e.base_stat
                    }
                })[5],
                height: data.height,
                weight: data.weight,
                types: data.types.map(e=>{return e.type.name}),
                img: data.sprites.other.dream_world.front_default
                //data.sprites.other.official-artwork.front_default?data.sprites.other.official-artwork.front_default:data.sprites.front_default
            }
            
            // console.log('DATA TYPES', data.types)
            // data.types.forEach(async e=>{
            //     console.log('TYPE NAME', e.type.name)
            //     await Type.findOrCreate({where:{name:e.type.name}})})

            
            // console.log ('aaa', data.types)
            
            
            // console.log ('ASD', asd)
            return asd
        })
        )
        // console.log('RESULT', apiUrlPokemon )
        return apiUrlPokemon
    }catch(err){
        return err
    }
}

const getDbData = async()=>{
    try{
        
        const pokemons = await Pokemon.findAll({
            include:{
                model: Type,
                atributes:['name'],
                through: {
                    attributes: [],
                  },
            }
        })
        console.log('POKEMON1', pokemons)
        const info = pokemons.map(el=>{
            console.log('POKEMON2', el.dataValues.types) 
            return {
                name: el.dataValues.name,
                hp: el.dataValues.hp,
                attack: el.dataValues.attack,
                deffense: el.dataValues.deffense,
                speed: el.dataValues.speed,
                height: el.dataValues.height,
                weight: el.dataValues.weight,
                img: el.dataValues.img,
                id: el.dataValues.id,
                types: el.dataValues.types?.map(elem=>{
                    console.log('TYPES', elem.dataValues)
                    return elem.dataValues.name
                    }),
                // handleCreated
            }
        })
        console.log('INFO', info)
        return info
    }catch(err){
        return err
    }
}

const getAllPokemon = async()=>{
    const apiData = await getApiData();
    const dbData = await getDbData();
    const apiPlusDb = [...apiData, ... dbData];
    return apiPlusDb
}

module.exports = {getAllPokemon};