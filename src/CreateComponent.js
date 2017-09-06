const path = require('path');
const fs = require('fs-extra');
const chalk = require('chalk');


let writeInFiles = function (dirName, fileName, templateName, isReplace, componentName, location){
    let templateFileContent = fs.readFileSync(path.join(__dirname, 'template', templateName), { encoding: "UTF-8" });
    let withBaseComponentCorrection;
    let updatedtemplateFileContent = isReplace ? templateFileContent.replace(/BComponent/g, componentName) : templateFileContent;
    
    if(location=="BaseComponents" && fileName=="index.js"){
        withBaseComponentCorrection = updatedtemplateFileContent.replace("import './../../Base/Base.scss';", "import './../Base/Base.scss';")
    }
    else{
        withBaseComponentCorrection = updatedtemplateFileContent;
    }
    fs.writeFileSync(path.join(dirName, fileName), withBaseComponentCorrection, { encoding: "UTF-8" });
}

let createFiles = function(dir, files, componentName, location) {
    return Promise.all(
        files.map((file)=>{
            let directory = file.parentFolder == undefined ?  dir : path.join(dir, file.parentFolder)
            return fs.ensureFile(path.join(directory, file.fileName)).then(()=>{
                if(file.template !="none"){
                    writeInFiles(directory, file.fileName, file.template, file.replace, componentName, location);
                }
                return file.fileName;
            })
        })
    )
}

var createComponentSkeleton = function (componentName, location, baseURL){ 

    const rootDir = path.join(baseURL, location, componentName);

    var files = [
        {
            fileName: "index.js",
            template:"index.template",
            replace: true
        },
        {
            fileName: componentName + "Spec.js",
            parentFolder: "__tests__",
            template:"Spec.template",
            replace: true
        },
        {
            fileName: "Readme.md",
            template:"none",
            replace: false
        },
        {
            fileName: componentName + ".scss",
            template:"Style.template",
            replace: false
        },
        {
            fileName: "Settings.scss",
            template:"Settings.template",
            replace: false
        }
    ]

    return createFiles(rootDir, files, componentName, location)
          .then((data)=>{

            var childObject = {}, rootObject ={}, testObject={}
            
            data.map((file)=>{
                if(file.indexOf('Spec.js') > 0){
                  testObject[file] = null;
                  childObject = { '__tests__' : testObject }
                }
                else{
                    childObject[file] = null
                }
            })
            
            rootObject[componentName] = childObject
            return rootObject;  
          })

}
module.exports = createComponentSkeleton;