const path = require('path');
const fs = require('fs-extra');
const chalk = require('chalk');

var createFiles = function(dir, files, componentName, location){
    files.forEach((file)=>{
        let directory;
        file.parentFolder == undefined ? directory = dir : directory = path.join(dir, file.parentFolder)
        fs.ensureFileSync(path.join(directory, file.fileName))
        if(file.template !="none"){
            writeInFiles(directory, file.fileName, file.template, file.replace, componentName, location)
        }
    });
}

var writeInFiles = function (dirName, fileName, templateName, isReplace, componentName, location){
    let fileContent = fs.readFileSync(path.join(__dirname, 'template', templateName), { encoding: "UTF-8" });
    let updatedFileContent, withBaseComponentCorrection;
    isReplace ? updatedFileContent = fileContent.replace(/BComponent/g, componentName) : updatedFileContent =fileContent;
    
    if(location=="BaseComponents" && fileName=="index.js"){
        withBaseComponentCorrection = updatedFileContent.replace("import './../../Base/Base.scss';", "import './../Base/Base.scss';")
    }
    else{
        withBaseComponentCorrection = updatedFileContent;
    }
    fs.writeFileSync(path.join(dirName, fileName), withBaseComponentCorrection, { encoding: "UTF-8" });
}

var createComponentSkeleton = function (componentName, location, baseURL){ 

    const componentDir = path.join('src', 'Components', location, componentName);

    /** Root folder -- Folder with component name */
    fs.ensureDirSync(componentDir);

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

    var promise = new Promise((resolve, reject) =>{
        try{
            createFiles(componentDir, files, componentName, location)
            resolve("done");
        }
        catch(err){
            reject(err)
        }

    })

    return promise
    

}
module.exports = createComponentSkeleton;