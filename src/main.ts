import path from "path"
import keggListPhraseBreakdown from "./kegg_list_phrase_breakdown"

const keggListFilePath = path.resolve(__dirname, "temp", "kegg_list.csv")
const keggListHistogramOneWordPhraseFilePath = path.resolve(__dirname, "temp", "kegg_histogram_one_word_phrase.csv")
const keggListHistogramTwoWordsPhraseFilePath = path.resolve(__dirname, "temp", "kegg_histogram_two_words_phrase.csv")
// tslint:disable-next-line: max-line-length
const keggListHistogramThreeWordsPhraseFilePath = path.resolve(__dirname, "temp", "kegg_histogram_three_words_phrase.csv")

keggListPhraseBreakdown(keggListFilePath, keggListHistogramOneWordPhraseFilePath, 1)
keggListPhraseBreakdown(keggListFilePath, keggListHistogramTwoWordsPhraseFilePath, 2)
keggListPhraseBreakdown(keggListFilePath, keggListHistogramThreeWordsPhraseFilePath, 3)


// set a threshold after which the words/phrases are considered stop/trash words
// return a list of those words
// accept list of words with high occurances which should not be filtered

// parse and filter all the kegg items
// compare them with mesh

// the result give to Yana and Rossi
