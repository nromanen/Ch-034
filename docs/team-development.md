## Preparing work enviroment before team project's development

It is necessary to install all programm set on Windows OS according to the [help] (https://github.com/alenkasun/Ch-034/blob/viewdocs/docs/enviroment-setting.md):
* ruby&sass
* node.js&npm
* grunt, bower and json-server via npm 
* git
* bower via npm (it needs in git to work with bower)


## Team development of project [Course Management System] (https://github.com/nromanen/Ch-034)

Model «Fork + Pull» is a popular for open source projects and allows developers work independently.

### Start

1) Create your own repo "fork" from [main repository] (https://github.com/nromanen/Ch-034) on GitHub clicking ![alt text] (https://github.com/nromanen/Ch-034/blob/master/docs/src/img/fork-button.png "Create fork") 

2) Clone repository
```  
  git clone https://github.com/<YOUR-USERNAME>/Ch-034.git
```
3) Create binding to [main repository] (https://github.com/nromanen/Ch-034) 
```
  git remote add upstream https://github.com/nromanen/Ch-034.git
```  
4) Create separate branch for new feature:  
```
  git checkout -b feature
```
### Pull all (npm and bower) dependencies

Do it via any cmd:
```
  bower install
  npm install
```  

### Working with project
 
In a separate window run json-server (or node server) and grunt task:
```
  json-server --watch db.json
```
or
```
  node server
```
```
  grunt server:dev
```

Go to project [localhost:8034] (http://localhost:8034/) 
