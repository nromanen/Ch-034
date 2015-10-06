![SoftServe Course Management System](https://raw.githubusercontent.com/okrasn/Ch-034/tmp/github_header.png)
[Client Side Part]  
SSITA Ch-034 group

## Setup project
*Note:* [Node.js](https://nodejs.org/en/) and [Ruby](http://rubyinstaller.org/downloads/) must be installed on you OS system

1. Install global components
In any folder  
`npm install -g grunt-cli`  
`npm install -g bower`  
`gem install compass`  

2. Install project components:
In project root folder  
`npm install`  
`bower install`  
`grunt copy-libs` - to copy vendors libraries to dev environment  
`grunt build:dev` - to build project for development  
`grunt serve` - to run local server on port 8084 with livereload  
`grunt build:prod` - to build production version of project

## Contribute to project

### Config Git
`git config --global user.name "<YOUR NAME>"`  
`git config --global user.email "<YOUR EMAIL ADDRESS>"`

### Clone repository
`git clone https://github.com/<YOUR-USERNAME>/Ch-034.git`

### Add upstream
`git remote -v`  
`git remote add upstream https://github.com/okrasn/Ch-034.git`


### Commit changes
`git commit -am "<MESSAGE>"`  
`git push`
