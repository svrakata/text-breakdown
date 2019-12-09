import fs from "fs"
import path from "path"

import { parse } from "JSONStream"

const keggListJSONFileName = "kegg.json"
const keggListCSVName = "kegg_list.csv"
const dataFolderName = "temp"
const dataFolderPath = path.resolve(__dirname, dataFolderName)

const readKeggJSONStream = fs.createReadStream(`${dataFolderPath}/${keggListJSONFileName}`)
const writeKeggCSVStream = fs.createWriteStream(`${dataFolderPath}/${keggListCSVName}`)

const jsonStream = readKeggJSONStream.pipe(parse("..name.text"))

jsonStream.on("data", (data) => {
    const names = data
    names.forEach((name) => {
        writeKeggCSVStream.write(`${name.trim()}\n`)
    })
})

jsonStream.on("end", () => {
    console.log("All the KEGG items have been written to the CSV file")
})
