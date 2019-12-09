import fs from "fs"
import path from "path"
import phraseBreakdown from "./phrase_breakdown"
import phraseFiltering from "./phrase_filtering"

const keggListFilePath = path.resolve(__dirname, "temp", "kegg_list.csv")
const keggList = fs.readFileSync(keggListFilePath).toString().split("\n")

const oneWordOccurancesHash = {}

keggList.forEach((keggItem) => {
    const oneWordPhraseBreakdown = phraseBreakdown(keggItem, 1)
    oneWordPhraseBreakdown.forEach(({ phrase, occurances }) => {
        if (!oneWordPhraseBreakdown.hasOwnProperty(phrase)) {
            oneWordOccurancesHash[ phrase ] = occurances
        } else {
            oneWordOccurancesHash[ phrase ] += occurances
        }
    })
})

const oneWordOccurances = Object
    .entries<number>(oneWordOccurancesHash)
    .map(([ key, val ]) => ({ phrase: key, occurances: val }))

console.log(phraseFiltering({ listOfPhrases: oneWordOccurances }))

// console.log(oneWordPhraseBreakdown)
// console.log(phraseFiltering({ listOfPhrases: oneWordPhraseBreakdown, threshold: 2 }))
// console.log(phraseFiltering({ listOfPhrases: twoWordsPhraseBreakdown, threshold: 2 }))
