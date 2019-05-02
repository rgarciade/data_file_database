# Data file database!
## use
- include module
- createNewModel
let casas = new dataFileDatabase('dataFile', ["casa", "perro"])

- insert
    casas.setVal({ "casa": "verde", "gato": "gg", "perro": "hh" }).then(a => console.log(a))
- update
    casas.updateVals('casa', '=', 'naranja', { "casa": "rosa" }).then(a => console.log(a))
- delete
    casas.deleteteVals('casa', '=', 'roja').then(a => console.log(a)) 
- find
  casas.getVal('casa', '=', 'roja')
- find all
casas.data.then(a => console.log(a))ç

## cant use 
- =
- !=
- >
- <
