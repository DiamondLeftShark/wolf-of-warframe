const express = require('express');
const bodyParser = require('body-parser');

const db = require('../database/index.js');

//testing
db.loadData();