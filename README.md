# Description
_seasons-cli_ is a command line tool.

# Installation 

To install the stable version you can use [npm](https://npmjs.org/) or [yarn](https://yarnpkg.com/en/): 

```shell
$ npm install seasons-cli 
```

```shell
$ yarn install seasons-cli  
```

# CLI
```shell
$ seasons-cli [options]
```
if option is not provided then `$ seasons-cli -h` will be executed. 


# CLI Options
* `-u, --updateversion`  Bumps up patch version, It will amend to exisiting local commit if exists else will create a new local commit
* `-c or --createcomponent` Creates Skeletion of component
* `-V or --version` Outputs the version number season-cli
* `-h or --help` Outputs usage information

# Component Structure
`$ seasons-cli -c`

Following structure has been generated where `SampleComponent` is component name.

![createcomponent](https://github.com/pankajladhar/seasons-cli/blob/master/src/images/createcomponent.jpg)

```javascript
└─ SampleComponent
   ├─ __tests__
   │  └─ SampleComponentSpec.js
   ├─ Readme.md
   ├─ SampleComponent.scss
   └─ Settings.scss
```