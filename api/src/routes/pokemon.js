const { Router } = require('express');
const axios = require('axios');
const router = Router();
const { Op, Pokemon, Type, PokemonType } = require('../db.js');
const {getAllPokemon} = require('./middleware/getAllPokemon');

