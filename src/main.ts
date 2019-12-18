import path from "path"
import filterFiles from "./filter_files"

const inputFolderName = "temp/mesh_matched"
const inputFolderPath = path.resolve(__dirname, inputFolderName)

const outputFolderName = "temp/filtered"
const outputFolderPath = path.resolve(__dirname, outputFolderName)

filterFiles(inputFolderPath, outputFolderPath)
