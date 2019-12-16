// read CSV
// parse it as js object
// remove words defined in filter list
// output csv or json

import parse from "csv-parse"
import fs from "fs"

interface IFilterWordsOptions {
    csvFilePath: string
    outputFilePath: string
    filterList: string[]
    outputType?: "json" | "csv"
}

type TFilterWords = (options: IFilterWordsOptions) => string[]

const filterWords: TFilterWords = (
    options,
) => {
    const { csvFilePath, outputFilePath, filterList, outputType } = options
    const csvParserOptions: parse.Options = {
        columns: true,
    }
    const csvReadStream = fs.createReadStream(csvFilePath)
    const csvParser = parse(csvParserOptions)
    const csvWriteStream = fs.createWriteStream(outputFilePath)

    csvParser.on("readable", () => {
        let chunk = csvParser.read()
        while (chunk !== null) {
            // read each line of the csv as js object
            // generate the phrases of the prop
            // match each phrase to the hash
            let filteredText = chunk.name

            filterList.forEach((word) => {
                filteredText = filterWordFromString(filteredText, word)
            })

            if (filteredText !== "") {
                csvWriteStream.write(`"${filteredText}"\n`)
            }

            chunk = csvParser.read()
        }
    })

    csvReadStream.pipe(csvParser)
    return []
}

type TFilterWordsFromText = (text: string, word: string) => string

const filterWordFromString: TFilterWordsFromText = (text, word) => {
    const regex = new RegExp(`\\b${word}\\b`, "gi")
    return text.replace(regex, "").replace(/[^\S\r\n]{2,}/g, "").trim()
}

export default filterWords
