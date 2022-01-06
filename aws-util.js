const r = require("ramda")
const u = require("js-util")

const valDynmToJson = (val) => { //val => {tipo:valor}
    const [type, value] = Object.entries(val)[0]
    return typeToFn[type](value)
}

const dynmToJson = (input) => {
    return r.map(valDynmToJson, (input))
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

const typeToDynmType = {
    "string": "S",
    "number": "N",
    "boolean": "BOOL"
}

const whichSet = (s) => {
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

const dynmTypeOf = (x) => {
    const typ = typeof (x)

    return (typ === "object") ? whatObject(x) : typeToDynmType[typ]
}


const valJsonToDynm = (value) => { 
    const type = dynmTypeOf(value)
    const val = dynmTypeToFn[type](value)
    return {[type]:val}
}

const jsonToDynm = (input) => {
    return r.map(valJsonToDynm, (input))
}

const dynmTypeToFn = {
    "S": r.identity,
    "N": u.toString,
    "BOOL": r.identity,
    "NULL": r.always(true),
    "SS": u.explodeIterable,
    "NS": r.compose(r.map(u.toString), u.explodeIterable),
    "L": jsonToDynm,
    "M": jsonToDynm
}


module.exports = {
    dynmToJson,
    dynmTypeOf,
    jsonToDynm
}