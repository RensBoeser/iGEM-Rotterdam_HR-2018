# iGEM team Rotterdam 2018 wiki environment
This repository contains modules to automate a large part of our wiki.
These modules (apart from Page-uploader) were written by our own team members.
Note that the module Page-uploader will be replaced by the iGEM-wiki-api-python module when it is fully operational.
## Setup
1. Put all authentication JSON files in the ./app/lib directory
2. Create an empty directory named 'generated html' in the ./www directory
3. Make sure you fetch all module updates
4. Install all node-modules from Page-uploader using npm install
5. install all python dependencies contained in Pipfile
## Usage
* For generating html and updating the notebook, execute main.py located in ./app
* For uploading the pages to the wiki, execute uploader.js located in ./app/Page-uploader
## Modules
* tevd/iGEM-wiki-api-python
* RensBoeser/Page-viewdata-analyser
* RensBoeser/Page-uploader
* RensBoeser/Page-generator
* RensBoeser/Notebook-generator
* RensBoeser/ELabJournal-entry-receiver
* RensBoeser/GoogleDrive-entry-receiver
