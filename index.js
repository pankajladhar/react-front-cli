#!/usr/bin/env node
var chalk       = require('chalk');
var getComponentDetails = require('./src/GetComponentDetails');
var createComponentSkeleton = require('./src/CreateComponent');

getComponentDetails(function(){
    let userEnteredComponentName = arguments[0].componentname;
    
    let componentName = userEnteredComponentName.charAt(0).toUpperCase() + userEnteredComponentName.slice(1)
    let location = arguments[0].location;
    const baseURL = 'src/Components/';
    createComponentSkeleton(componentName, location, baseURL);
});
