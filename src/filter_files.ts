import fs from "fs"
import path from "path"
import filterWords from "./filter_words"

const filterFiles = (inputDirPath: string, outputDirPath: string) => {
    const typeOfExtractionFilePath = path.resolve(__dirname, "filters", "type_of_extraction.json")
    const regionOfExtractionFilePath = path.resolve(__dirname, "filters", "region_of_extraction.json")
    const stopWordsFilePath = path.resolve(__dirname, "filters", "stop_words.json")

    const typeOfExtraction = JSON.parse(fs.readFileSync(typeOfExtractionFilePath).toString())
    const regionOfExtraction = JSON.parse(fs.readFileSync(regionOfExtractionFilePath).toString())
    const stopWords = JSON.parse(fs.readFileSync(stopWordsFilePath).toString())

    const filters = typeOfExtraction.concat(regionOfExtraction).concat(stopWords)
    const files = fs.readdirSync(inputDirPath)

    files.forEach((file) => {
        const fileName = path.parse(file).name
        const filePath = path.resolve(__dirname, inputDirPath, file)
        const outputFilePath = path.resolve(__dirname, outputDirPath, `${fileName}_filtered.csv`)
        filterWords({
            csvFilePath: filePath,
            filterList: filters,
            outputFilePath,
        })
    })
}

export default filterFiles
