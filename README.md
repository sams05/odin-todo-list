# odin-todo-list

This is my work for TOP's [Todo List Project](https://www.theodinproject.com/lessons/node-path-javascript-todo-list) project

Topics covered:
- SOLID design principles
- Decoupling objects
- Project specific:
    - `date-fns` library to format dates
    - `localStorage` to save data on users' browsers

Additional topics not covered by TOP:
- [Colt Steele's Webpack Course](/Users/samuelshen/repos/odin-todo-list/dist/index.html)
    - Cache busting (including hashes in filename)
    - Separating development and production configuration
    - Setting up dev server
    - Generating HTML file from template
    - Extracting CSS into separate files
    - Minifying files
- Using the [uuid](https://www.npmjs.com/package/uuid) library to generate unique ids

## Possible improvements:
Some app module logic can be moved to the project and todo module to better follow the single responsibility principle and dependency inversion.