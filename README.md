# iGEM team Rotterdam 2018 wiki environment.
This repository contains modules to automate a large part of our wiki.
These modules (apart from Page-uploader) were written by our own team members.
Note that the module Page-uploader will be replaced by the iGEM-wiki-api-python module when it is fully operational.
## Setup
1. Put all authentication JSON files in the lib folder
2. Make sure you fetch all module updates
3. Install all modules from Page-uploader
## Usage
* For generating html and updating the notebook, execute main.py located in ./app .
* For uploading the pages to the wiki, execute uploader.js located in ./app/Page-uploader .
## Modules
* tevd/iGEM-wiki-api-python
* RensBoeser/Page-viewdata-analyser
* RensBoeser/Page-uploader
* RensBoeser/Page-generator
* RensBoeser/Notebook-generator
* RensBoeser/ELabJournal-entry-receiver
* RensBoeser/GoogleDrive-entry-receiver
