import fs from "fs"
import path from "path"
import keggListPhraseBreakdown from "./csv_phrase_breakdown"
import phraseSplitter from "./phrase_splitting/phrase_splitter"

import csvPhraseBreaker from "./csv_phrase_breakdown"

// const keggListFilePath = path.resolve(__dirname, "temp", "kegg_list.csv")
// const keggListHistogramOneWordPhraseFilePath = path.resolve(__dirname, "temp", "kegg_histogram_one_word_phrase.csv")
// const keggListHistogramTwoWordsPhraseFilePath = path.resolve(__dirname, "temp", "kegg_histogram_two_words_phrase.csv")
// tslint:disable-next-line: max-line-length
// const keggListHistogramThreeWordsPhraseFilePath = path.resolve(__dirname, "temp", "kegg_histogram_three_words_phrase.csv")

// keggListPhraseBreakdown(keggListFilePath, keggListHistogramOneWordPhraseFilePath, 1)
// keggListPhraseBreakdown(keggListFilePath, keggListHistogramTwoWordsPhraseFilePath, 2)
// keggListPhraseBreakdown(keggListFilePath, keggListHistogramThreeWordsPhraseFilePath, 3)


// set a threshold after which the words/phrases are considered stop/trash words
// return a list of those words
// accept list of words with high occurances which should not be filtered

// parse and filter all the kegg items
// compare them with mesh

// the result give to Yana and Rossi


const text = "some words on the line to tryout with my new fancy phrase splitter that brings awesomenesss"
fs.mkdirSync(path.resolve(__dirname, "example"), { recursive: true })

csvPhraseBreaker({
    csvFilePath: path.resolve(__dirname, "temp", "cancerogens.csv"),
    numberOfWordsSet: [ 1, 2 ],
    outFolderPath: path.resolve(__dirname, "example"),
    propertiesToRead: [ "name", "cancer_site" ],
})


