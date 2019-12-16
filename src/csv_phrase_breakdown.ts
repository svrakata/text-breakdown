import csvParse from "csv-parse"
import fs from "fs"
import path from "path"

import phraseSplitter from "./phrase_splitting/phrase_splitter"

interface ICSVPhraseBreakdownOptions {
    csvFilePath: string
    outFolderPath: string
    propertiesToRead: string[]
    numberOfWordsSet?: number[]
}

const csvPhraseBreakdown = (options: ICSVPhraseBreakdownOptions) => {
    // takes csv file path
    // takes properties to read from the data or column 1,2,3,4 etc
    // takes number of words in array which determines the set of phrase splitting --> [1,3], [4], [2,3,4], [4,9]
    // returns csv with phrase/occurances on each line for each number of "word per phrase" sets

    const csvParserOptions = {
        columns: true,
    }

    const { csvFilePath, outFolderPath, propertiesToRead } = options
    const numberOfWordsSet = options?.numberOfWordsSet || [ 1 ]

    propertiesToRead.forEach((prop) => {
        numberOfWordsSet.forEach((numOfWords) => {
            // tslint:disable-next-line: max-line-length
            const outputFilePath = path.resolve(outFolderPath, `${prop}_${numOfWords}word${numOfWords > 1 ? "s" : ""}.csv`)
            const csvParser = csvParse(csvParserOptions)
            const csvReadStream = fs.createReadStream(csvFilePath)
            const csvWriteStream = fs.createWriteStream(outputFilePath)
            // const phraseSplittingStream = new PhraseSplittingStream(prop, numOfWords)

            const phraseHash = {}

            csvParser.on("end", () => {
                // transfrom the hash and send it to the appropriate file
                csvWriteStream.write(`"phrase", "occurances"\n`)
                Object
                    .entries<number>(phraseHash)
                    .sort((prev, next) => next[ 1 ] - prev[ 1 ])
                    .forEach(([ key, val ]) => {
                        csvWriteStream.write(`${key}, ${val}\n`)
                    })
            })

            csvParser.on("readable", () => {
                let chunk = csvParser.read()
                while (chunk !== null) {
                    // read each line of the csv as js object
                    // generate the phrases of the prop
                    // match each phrase to the hash


                    mapListOfPhrases(phraseHash, phraseSplitter(chunk[ prop ], numOfWords))
                    chunk = csvParser.read()
                }
            })

            csvReadStream.pipe(csvParser)
        })
    })
}


const mapListOfPhrases = (map: object, phrases: string[]) => {
    phrases.forEach((phrase) => {
        if (map.hasOwnProperty(phrase)) {
            map[ phrase ] = map[ phrase ] + 1
        } else {
            map[ phrase ] = 1
        }
    })
}

export default csvPhraseBreakdown
