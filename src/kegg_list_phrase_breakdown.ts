import fs from "fs"
import phraseSplitter from "./phrase_splitter"

const keggListPhraseBreakdown = (listFilePath: string, outFilePath, numOfWords: number = 1) => {
    const keggList = fs.readFileSync(listFilePath).toString().split("\n")
    const phraseOccurancesMap = {}
    const writeStream = fs.createWriteStream(outFilePath)

    keggList.forEach((keggItem) => {
        const phraseSplitted = phraseSplitter(keggItem, numOfWords)
        phraseSplitted.forEach(({ phrase, occurances }) => {
            if (!phraseOccurancesMap.hasOwnProperty(phrase)) {
                phraseOccurancesMap[ phrase ] = occurances
            } else {
                phraseOccurancesMap[ phrase ] += 1
            }
        })
    })

    const phraseOccurances = Object
        .entries<number>(phraseOccurancesMap)
        .map(([ key, val ]) => ({ phrase: key, occurances: val }))
        .sort((prev, next) => next.occurances - prev.occurances)

    writeStream.write(`"phrase", "occurances"\n`)
    phraseOccurances.forEach(({ phrase, occurances }) => {
        writeStream.write(`${phrase}, ${occurances}\n`)
    })
}

export default keggListPhraseBreakdown
