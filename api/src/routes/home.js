const { Router } = require('express');
const axios = require('axios');
const router = Router();
const { Op, Pokemon, Type, PokemonType } = require('../db.js');
const {getAllPokemon} = require('./middleware/getAllPokemon');
const {v4} = require ('uuid');

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
router.get('/', async (req,res)=>{
    const {name} = req.query
    // console.log('NAME', name)
    try{
        if (name){
            const contain = await Pokemon.findAll({
                where:{
                    name:{
                        [Op.iLike]: `%${name}%`
                        }
                    },
                    include: [
                        {
                         model:Type,
                         attributes:['name'],
                         through:{
                            attributes:[],
                         }
                        },
                        
                    ]
                })
                
                if (contain.length===0){
                    const apiName = await axios(`https://pokeapi.co/api/v2/pokemon/${name}`)
                    const data = apiName.data;
                        
                        const asd = [{
                           name: data.name,
                           id: data.id,
                           hp: data.stats.map(e=>{
                                if (e.stat.name === 'hp'){
                                   return e.base_stat
                               }
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
                           img: data.sprites.other.dream_world.front_default
                           //data.sprites.other.official-artwork.front_default?data.sprites.other.official-artwork.front_default:data.sprites.front_default
                       }]
                    if (asd) return res.status(202).json(asd)
                       
                }
                if (contain.length>0){
                    return res.status(202).json(contain)
                
                } else return res.status(404).json('no se encontro un pokemon con ese nombre')
        } else {
            const allPoke = await getAllPokemon()
            return res.status(202).json(allPoke)
        }
    }catch(err){
        res.status(404).json('fallo el primer get')
    }
    
})

router.get('/:id', async(req,res)=>{
    const {id} = req.params
    try{
        if (id.length<10){
            const apiPokemon = await axios(`https://pokeapi.co/api/v2/pokemon/${id}`)
                const data = apiPokemon.data;
                // console.log('APIID',apiId.data)
                const asd = {
                   name: data.name,
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
               // console.log ('aaa', data.types)
               
               
            //    console.log ('ASD', asd)
               
           
        console.log('ASD', asd)
        return res.status(202).json(asd)
        }else{
            console.log('ID', id)
            const pokemon = await Pokemon.findAll({
                where:{
                    id:id
                },
                include :[
                    {
                        model: Type,
                        attributes:['name'],
                        through:{
                            attributes:[],
                        }
                    }
                ]
            })
            // console.log('POKEMONN', pokemon)
            // console.log('POKEMONNN', pokemon[0].dataValues)
            return res.status(202).json(pokemon[0].dataValues)
        }
        
    }catch(err){
        res.status(404).json('error get id api')
    }
})

router.get('/handleCreated/:id', async(req,res)=>{
    const {id} = req.params
    try{
        const pokemon = await Pokemon.findAll({
            where:{
                id:id
            },
            include :[
                {
                    model: Type,
                    attributes:['name'],
                    through:{
                        attributes:[],
                    }
                }
            ]
        })
        res.status(202).json(pokemon)
    }catch(err){
        res.status(404).json('error get id bd')
    }
})

// router.get('/', async(req,res)=>{
//     const {name} = req.query
//     try{
//         const contain = await Pokemon.findAll({
//         where:{
//             name:{
//                 [Op.iLike]: `%${name}%`
//                 }
//             },
//             include: [
//                 {
//                  model:Type,
//                  attributes:['name'],
//                  through:{
//                     attributes:[],
//                  }
//                 },
                
//             ]
//         })
//         if (contain.length===0){
//             const apiName = await axios(`https://pokeapi.co/api/v2/pokemon/${name}`)
//             const data = apiName.data;
                
//                 const asd = {
//                    name: data.name,
//                    id: data.id,
//                    hp: data.stats.map(e=>{
//                         if (e.stat.name === 'hp'){
//                            return e.base_stat
//                        }
//                     })[0],
//                    attack: data.stats.map(e=>{
//                        if (e.stat.name === 'attack'){
//                            return e.base_stat
//                        }
//                    })[1],
//                    defense: data.stats.map(e=>{
//                        if (e.stat.name === 'defense'){
//                            return e.base_stat
//                        }
//                    })[2],
//                    speed: data.stats.map(e=>{
//                        if (e.stat.name === 'speed'){
//                            return e.base_stat
//                        }
//                    })[5],
//                    height: data.height,
//                    weight: data.weight,
//                    type: data.types.map(e=>{return e.type.name}),
//                    img: data.sprites.front_default
//                }
//         }
//         if (contain.length>0){
//             res.status(202).json(contain)
//         } else if(asd.length>0){
//             res.status(202).json(asd)
//         } else res.status(404).json('no se encontro un pokemon con ese nombre')
//     }catch(err){
//         res.status(404).json('algo fallo busqueda query')
//     }
// })


router.post('/', async(req,res)=>{
    const{title, hp, attack, defense, speed, height, weight, img, types} = req.body
    try{
        console.log('PROBANDOO1')
        const nombre = title[0].toLowerCase()+title.slice(1)  
        const index = v4()
        const pokemon = await Pokemon.create({
            name: nombre,
            hp,
            attack,
            defense,
            speed,
            id: index,
            height,
            weight,
            img
        })
        console.log('PROBANDOO2')
        
        if (types){
            const tipos = await Type.findAll({
                where:{
                    name: types
                }
            })
            const poke = await Pokemon.findByPk(index)
            
            await poke.setTypes(tipos)
            }
        return res.status(202).json('Pokemon created')

    }catch(err){
        res.status(404).json('error al postear el form')
    }
})



module.exports = router;