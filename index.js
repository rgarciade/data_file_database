var fs = require('fs');
const principalDirectory = '../dataFilesDatabases'

class dataFileDatabase {
    constructor(url, structure) {
        this._url = url + ".json"
        this._structure = structure
        if (!fs.existsSync(principalDirectory)) {
            fs.mkdirSync(principalDirectory);
        }
    }
    get data() {
        const url = this._url
        return new Promise(function(resolve, reject) {
            if (!fs.existsSync(`${principalDirectory}/${url}`)) {
                console.log('aa')
                fs.writeFile(`${principalDirectory}/${url}`, JSON.stringify([]), function(err) {
                    if (err) {
                        reject(err);
                    }
                })
            }
            fs.readFile(`${principalDirectory}/${url}`, function read(err, data) {
                if (err) {
                    reject(err);
                }
                if (data === undefined) {
                    resolve([])
                } else {
                    resolve(JSON.parse(data))
                }
            });

        })
    }
    _setdata(newDatas) {
        const url = this._url
        return new Promise(function(resolve, reject) {
            fs.writeFile(`${principalDirectory}/${url}`, JSON.stringify(newDatas), function(err) {
                if (err) {
                    reject(err);
                }
                resolve('DataUpdated')
            });
        })
    }
    getVal(indexToFind, func, valToFind) {
        let that = this
        return new Promise(async function(resolve, reject) {
            return that.data.then(fileData => {
                let result = fileData.filter(fileDataret => {
                    if (func == "=") {
                        return fileDataret[indexToFind] == valToFind
                    }
                    if (func == "!=") {
                        return fileDataret[indexToFind] != valToFind
                    }
                    if (func == ">") {
                        return fileDataret[indexToFind] > valToFind
                    }
                    if (func == "<") {
                        return fileDataret[indexToFind] < valToFind
                    }
                })
                resolve(result)
            }).catch(e => reject(e))
        })

    }
    setVal({...vals }) {
        let newElement = {}
        let that = this
        return new Promise(async function(resolve, reject) {
            for (let index = 0; index < that._structure.length; index++) {
                const element = that._structure[index];
                newElement[element] = (vals[element]) ? vals[element] : null
            }
            return that.data.then(fileData => {
                let newId = (fileData.length > 0) ? fileData[fileData.length - 1]["_id"] + 1 : 1
                fileData.push(Object.assign({ "_id": newId }, newElement))
                that._setdata(fileData).catch(e => reject(e))
                resolve(newId)
            }).catch(e => reject(e))
        })

    }
    updateVals(indexToFind, func, valToFind, newDatas) {
        let that = this
        return new Promise(async function(resolve, reject) {
            let idsUpdateds = []
            return that.data.then(fileData => {
                let results = findData(fileData, indexToFind, func, valToFind)
                for (let index = 0; index < results.length; index++) {
                    idsUpdateds.push(results[index]._id)
                }
                for (var clave in newDatas) {
                    for (let index = 0; index < results.length; index++) {
                        results[index][clave] = newDatas[clave]
                    }
                }
                for (let index = 0; index < fileData.length; index++) {
                    let find = results.filter(result => {
                        if (result._id == fileData[index]._id) {
                            return result
                        }
                    })
                    if (find.length > 0) {
                        let compareElement = find[0]
                        for (let index = 0; index < that._structure.length; index++) {
                            const element = that._structure[index];
                            compareElement[element] = (compareElement[element]) ? compareElement[element] : null
                        }
                        fileData[index] = compareElement
                    }
                }
                that._setdata(fileData).catch(e => reject(e))
                resolve({ "upddateadas": idsUpdateds })
            }).catch(e => reject(e))
        })
    }
    deleteteVals(indexToFind, func, valToFind) {
        let that = this
        return new Promise(async function(resolve, reject) {
            let idsUpdateds = []
            return that.data.then(fileData => {
                let results = findData(fileData, indexToFind, func, valToFind)
                for (let index = 0; index < results.length; index++) {
                    idsUpdateds.push(results[index]._id)

                }
                let newDatas = []
                for (let index = 0; index < fileData.length; index++) {
                    let find = results.filter(result => {
                        if (result._id == fileData[index]._id) {
                            return result
                        }
                    })
                    if (find.length == 0) {
                        newDatas.push(fileData[index])
                    }
                }
                that._setdata(newDatas).catch(e => reject(e))
                resolve({ "borradas": idsUpdateds })
            }).catch(e => reject(e))
        })
    }
}

function findData(fileData, indexToFind, func, valToFind) {
    return fileData.filter(fileDataret => {
        if (func == "=") {
            return fileDataret[indexToFind] == valToFind
        }
        if (func == "!=") {
            return fileDataret[indexToFind] != valToFind
        }
        if (func == ">") {
            return fileDataret[indexToFind] > valToFind
        }
        if (func == "<") {
            return fileDataret[indexToFind] < valToFind
        }
    })
}
module.exports = { dataFileDatabase }