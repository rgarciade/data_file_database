# Data file database!
## use
- include module
- createNewModel **Model name, estructure []**
```sh
const homes = new dataFileDatabase('home', ['size', 'floors'])
```
- insert **objetTo insert**
```sh
    homes.setVal({ 'size': 130, 'floors': 1 }).then(result => console.log(result))
```
- update **objetTo to find, param, value to find, new values**
```sh
    homes.updateVals('floors', '=', 1, { 'size': 90 }).then(result => console.log(result))
```
- delete **objetTo to find, param, value to find**
```sh
    homes.deleteteVals('floors', '=', '1').then(result => console.log(result)) 
```
- find **objetTo to find, param, value to find**
```sh
  homes.getVal('floors', '=', '1').then(result => console.log(result))
```
- find all
```sh
homes.data.then(results => console.log(results))
```

## cant use in getVal, updateVals, deleteteVals
- "="
- "!="
- ">"
- "<"
