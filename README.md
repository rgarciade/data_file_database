# Data file database!
## use
- include module
- createNewModel **Model name, estructure []**
```sh
const casas = new dataFileDatabase('dataFile', ["casa", "perro"])
```
- insert **objetTo insert**
```sh
    casas.setVal({ "casa": "verde", "perro": "hh" }).then(a => console.log(a))
```
- update **objetTo to find, param, value to find, new values**
```sh
    casas.updateVals('casa', '=', 'naranja', { "casa": "rosa" }).then(a => console.log(a))
```
- delete **objetTo to find, param, value to find**
```sh
    casas.deleteteVals('casa', '=', 'roja').then(a => console.log(a)) 
```
- find **objetTo to find, param, value to find**
```sh
  casas.getVal('casa', '=', 'roja')
```
- find all
```sh
casas.data.then(a => console.log(a))
```

## cant use in getVal, updateVals, deleteteVals
- "="
- "!="
- ">"
- "<"
