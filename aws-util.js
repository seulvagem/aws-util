const r = require("ramda")
const u = require("js-util")


const typeToFn = {
    "S": r.identity,
    "N": parseInt,
    "BOOL": r.identity,
    "NULL": r.always(null),
    "SS": u.set,
    "NS": r.compose(u.set, r.map(parseInt)),
    "L": dynmToJson,
    "M": dynmToJson
}

const dynmToJson = (input) => {
    return r.map((val) => { //val => {tipo:valor}
        const [type, value] = Object.entries(val)[0]
        return typeToFn[type](value)
    }, (input))
}

module.exports = {
    dynmToJson
}