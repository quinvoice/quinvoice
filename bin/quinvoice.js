#!/usr/bin/env node
const getopts = require('getopts');
const { execute } = require('../src/index');

const opts = getopts(process.argv.slice(2));

const {_, ...params} = opts;
const action = _.join('.');

execute(action, params);
