Surveyfy - An adaptive machine learning based Survey Web App which adapts based on responses (i.e. An user who takes a given survey).
========

Surveyfy will solve your problem for Automatic Survey Question Curation that adaps based on user responses. 
Also, surveyfy provides an easy way for creating a survey and it's questions with added functionalities that can be 
used for machine learning purpose. The application can create and deploy online surveys. 
The application is developed for the Center of Survey Research, University of Massachusetts, Boston.


By determining the order of the questions in a survey. The survey pages for the respondents will be mobile first optimized. 
The entire system will have visual feedback and instructions for the functionalities that are specific to a user of the web app. 

Future Development
------------------
- Will be Creating a Machine Learning Model
- Machine Learning Integration to our Surveyfy Web Application using our own API

Features
--------

- Dashboard
- Sign Up
- Log In
- Forgot Password
- Admin Previliges
- Create, Edit and Delete a Survey
- Create, Edit and Delete a Question
- Mobile First Approach Throughout Entire App
- Survey Search Tool 
- Creating a New Survey
- Adding a Question to a Survey
- Deleting an Existing Survey
- View Survey Page
- Add a Question to Survey
- Bar Graph Report
- Survey Reports in different formats downloable in PDF, Word, jpg etc...
- Line Graph Report
- Download Line Graph Report
- Navigating to Previous Pages
- Industry Standard Security to protect database

Technology Stack
----------------
Frontend - HTML 5, CSS, Bootstrap, jQuery
Runtime – Node.js
Frontend Frameworks – Express.js (express-session and body-parser) 
Security feature - passport, passport-local-mongoose
DBMS – MongoDB
Version control system – GIT

Installation
------------
How to Run the Web App:
-----------------------
- Clone/Downlaod the project
- Remove node_modules folder
- Check package.json to see all the required frameworks
- Run "npm install" command
- Install client dependencies for mongoose database to run the app and connect to local database

- Other Way just using these commands:
Install $project by running:
    git clone https://github.com/azamakhan/Surveyfy-2.0.git
    cd surveyfy
    rm -r npm node_moudles 
    npm install

Installing MongoDB on a Cloud9 workspace
sudo apt-get install -y mongodb-org

$ mkdir data
$ echo 'mongod --bind_ip=$IP --dbpath=data --nojournal --rest "$@"' > mongod
$ chmod a+x mongod

$ ./mongod




How to Run Tests:

- Note: The commands work based on your directory/workspace structure. So, use 'cd' command appropriately to navigate directory structure

- Use 'cd' command from root directory to move to another directory i.e. cd tests/
- Run test:
- Once you are in tests/ folder run i.e. mocha user.test.js in command/terminal
- Similarly, test for other cases using i.e. mocha option.test.js (example)

Mocha: 

- Mocha, a feature-rich JavaScript test framework running on Node.js has been used to write test cases for the project.
Asynchronous testing is done. Tests are run serially.

- Mocha utilizes a library called "Chai"


Contribution
------------

- Chintan
- Azam
- Monal

How to get support
------------------
- If you are having issues, please let us know.
- Email:
- Chintan: chintan.rank001@umb.edu
- Karthik: azamahmad.khan001@umb.edu 
- Yuxuan: monal.rupapara001@umb.edu


Coding Standard:
----------------

Google, ESLint coding standard has been used. Semicolon (;) in this entire project is not required at the end of each line hence semicolon not used. 

User Support
------------
End User Document to know how to use the web app
https://www.dropbox.com/s/kce3ur0iamscnhl/End_User_Survefy%20%281%29.pdf?dl=0

Support
-------

- Prof. Kenneth Fletcher

License
-------

© 2018 Copyright Surveyfy. All Rights Reserved.


 
 
 
 
