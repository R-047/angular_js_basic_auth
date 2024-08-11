# AngularAuthApp

<!-- This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.1.3. -->

## Setup Instructions
### prerequisites
- node.js
- npm
- nvm (node version manager) or nodist (for windows)

### todos
1. run `nvm install 18.19.1`, and `nvm use 18.19.1` this will install the needed version among few others to set up an angular project and angular-cli.
2. run `npm install -g npm@10.8.2`, this step mostly will not be needed, but if there are errors, mostly related to versioning, this might help.
3. run `npm install -g @angular/cli`, this will install the angular cli, hence enabling the ng command.
4. run `npm isntall` in the project root directory, this will install all the necessary modules from the package.json.
5. run `ng serve` to start the dev server and navigate to `http://localhost:4200` to experience the website.

> ⚠️ **Note:** I installed those specific versions of npm and node mentioned in step 1 and 2, after lot of errors, and finally refering to 
> [angular version compatibility](https://angular.dev/reference/versions), you can try other versions as well, depending on what works.

## Few things to note about this project
- you can refer `organization.service.ts` to add couple of more organizations and designations for the inputs.
- all the data that is submitted after signup are persisted inside the local storage, that can be cleared from the browser if you 
wish to start again.
- this project uses tools/utilities like routers for easy navigation between components, ngrx for a centralised state management and rxjs
for reactive experience.
- minor bug fixes in progress.


