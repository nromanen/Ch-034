# Enviroment setting on Windows OS

##General scheme:
№ | What will be installed? | Notes
--- | --- | ---
1 | *ruby&sass* | Install ruby with ruby package manager gem for install sass via gem on the next step.
2 | node.js | Node package manager npm is installed automatically together with node.js. NPM is need to install all dependencies (grunt, json-server, lowdb etc) via package.json: npm install.
3 | grunt | Grunt is a collector for frontend developer (we install node.js+npm because we have choose use Grunt!)
4 | json-server | For installing json-server to be sure npm is installed. 
5 | git | In such program environment Git is needed to work with bower and to team development generally. 
6 | bower | For installing bower to be sure npm and git are installed. 

### 1. Install ruby&sass(scss)

1) Download [rubyinstaller] (http://rubyinstaller.org/downloads) and install (don’t forget about path!)
![alt text](https://github.com/alenkasun/Ch-034/blob/viewdocs/docs/src/img/ruby-path.png "Don't forget about ruby path")

Check installation through Start Command Prompt with Ruby or any cmd: 

	ruby -v

![alt text](https://github.com/alenkasun/Ch-034/blob/viewdocs/docs/src/img/ruby-check.png "Checking ruby installing")

> Uninstall: via windows control panel

2) Install sass via ruby package manager gem: 

	gem install sass


![alt text](https://github.com/alenkasun/Ch-034/blob/viewdocs/docs/src/img/sass-check.png "Checking sass installing")

Check installation through any cmd: 

	sass –v
     
> Uninstall: via cmd: gem uninstall sass   

### 2. Install node.js&npm

1) Download [nodejs] (https://nodejs.org/en/download/) and install 

2) Check installation through any cmd: 

	node –v
 
 ![alt text](https://github.com/alenkasun/Ch-034/blob/viewdocs/docs/src/img/node-check.png "Checking node.js installing")

> Uninstall: via windows control panel, then check and remove the next folders  
>            C:\Program Files (x86)\Nodejs  
>            C:\Program Files\Nodejs  
>            C:\Users\{User}\AppData\Roaming\npm (or %appdata%\npm)  
>            C:\Users\{User}\AppData\Roaming\npm-cache (or %appdata%\npm-cache)  


### 3. Install Grunt (after install node.js!)

1) Install Grunt CLI (command line interface for cmd process command grunt)  
   
   Install globally via cmd: 
     
     npm install -g grunt-cli
     
   Check installation through any cmd: 
     
     grunt --help
      
![alt text](https://github.com/alenkasun/Ch-034/blob/viewdocs/docs/src/img/grunt-check.png "Checking grunt installing")

> Uninstall: via cmd: npm uninstall –g grunt

2) Grunt install for each project separately, where there will be two files:             
  - package.json (description of the project for the npm with list of all dependencies),              
  - gruntfile.js (Grunt's configuration file).   
  
Create in the project folder a small file called package.json (for npm) via cmd:         
       
	npm init  (be sure to enter the project name and version)

Install all needed dependencies in folder node_modules, for example grunt:

	npm install grunt --save-dev

or other plugins:

	npm install grunt-contrib-concat --save-dev
	
Option *--save-dev* add them to package.json:

	"devDependencies": {
	   "grunt": "^0.4.5",
	   "grunt-contrib-clean": "^0.6.0",
	}
       
> In our case we have amd-skeleton with ready package.json and simply install all dependencies:

	npm install
	

### 4. Install json-server (after install node.js!)

Install globally via cmd: 

	npm install -g json-server

Check installation through any cmd: 

	json-server -v

![alt text](https://github.com/alenkasun/Ch-034/blob/viewdocs/docs/src/img/json-server-check.png "Checking json-server installing")

### 5. Install Git

1) Download [gitinstaller] (http://git-scm.com/download/win) and install (don’t forget about path!)
![alt text](https://github.com/alenkasun/Ch-034/blob/viewdocs/docs/src/img/git-install.png "Don't forget about git path")


2) Config git:

	git config --global user.name "<YOUR NAME>"
	git config --global user.email "<YOUR EMAIL ADDRESS>"


### 6. Install bower (after install node.js and Git!)

Install globally via cmd: 

	npm install -g bower

Check installation through any cmd: 

	bower –v
 
![alt text](https://github.com/alenkasun/Ch-034/blob/viewdocs/docs/src/img/bower-check.png "Checking bower installing")

Create bower.json in the project folder via cmd:

	bower init
  
Install needed any package:

	bower install --save jquery  
  
(this command add dependency into bower.json and install package into folder bower_components)

> Attention!   
> Check git path in environment variables: Computer -> Properties -> Additional system parameters -> Enviroment variables: >add something like C:\Program Files (x86)\Git\bin to system variables   
                 
> In our case we have amd-skeleton with ready bower.json and simply install all dependencies:

    bower install
	
