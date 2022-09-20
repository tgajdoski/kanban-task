**Note: I am using chackra-ui to speed me up (previous project was using grommet, but I dont find it very good)**
https://github.com/chakra-ui/chakra-ui/

**Note: I am using react-beautiful-dnd for drag&drop from atlassian**
https://github.com/atlassian/react-beautiful-dnd
**Note: ordering task inside same column works also with DnD**
**Note: ordering of columns can be done on column header pressing on < or > to move it left or right**

**Note: when creating column/task use key ENTER to insert them - onKeyPressed is used**

**Note: project have no persistant laye - on each refresh/restart any modified data will be lost**

**Note: Improvements: data manipulation can be moved to models/service, now is in src/data**
**Note: Improvements: keys, when new column/task is created, are generated from the total count of task/column - not ideal when delete is introduced :)**

**Note: TODO: delete/edit functionality on column/task, persistant layer, redux, backend, some noSQL will fit...**

## Available Scripts
In the project directory, you can run:

### `yarn install`
to install all dependencies for a project

### `yarn start`

to run the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

