const r = require("ramda")
const u = require("js-util")

const dynmToJson = (input) => {
    return r.map((val) => { //val => {tipo:valor}
        const [type, value] = Object.entries(val)[0]
        return typeToFn[type](value)
    }, (input))
}

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

// const jsonToDynm = (input) => {
//     return r.map((val) => { //val => {tipo:valor}
//         const [type, value] = Object.entries(val)[0]
//         return typeToFn[type](value)
//     }, (input))
// }

// const jsTypeToFn = {
//     "S": r.identity,
//     "N": parseInt,
//     "BOOL": r.identity,
//     "NULL": r.always(null),
//     "SS": u.set,
//     "NS": r.compose(u.set, r.map(parseInt)),
//     "L": dynmToJson,
//     "M": dynmToJson
// }

const typeToDynmType = {
    "string": "S",
    "number": "N",
    "boolean": "BOOL"
}

const whichSet = (s) => {
    console.log(s)
    const first = s.values().next().value
    const ftype = typeToDynmType[typeof (first)]
    return ftype + "S"
}

const isObject = (x) => (x === Object(x))

const whatObject = r.cond([
    [Array.isArray, r.always("L")],
    [r.equals(null), r.always("NULL")],
    [r.is(Set), whichSet],
    [isObject, r.always("M")],
    [r.T, (x) => { throw new Error("Invalid type: " + x) }]
])

const type = (x) => {
    const typ = typeof (x)

    return (typ === "object") ? whatObject(x) : typeToDynmType[typ]
}

module.exports = {
    dynmToJson,
    type
}