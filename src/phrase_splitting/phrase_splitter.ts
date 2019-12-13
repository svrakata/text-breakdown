import { isSafeInteger } from "lodash"
import { sanitizeString } from "../utilities/sanitize_string"

type TPhraseSplitter = (text: string, numOfWords: number) => string[]

const phraseSplitter: TPhraseSplitter = (text: string, numOfWords: number) => {

    if (!isSafeInteger(numOfWords)) {
        throw new Error("The numOfWords parameter should be positive integer number.")
    }

    if (numOfWords < 1) {
        throw new Error("The numOfWords parameter should be positive integer number.")
    }

    const sanitizedText = sanitizeString(text)
    const words = sanitizedText.split(" ")
    const phrases = []
    let phrase = ""

    if (numOfWords >= words.length) {
        return [ words.join(" ") ]
    }

    for (let i = 0; i < words.length; i++) {
        if (i + numOfWords > words.length) {
            break
        }

        for (let y = i; y < i + numOfWords; y++) {
            phrase += `${phrase !== "" ? " " : ""}${words[ y ]}`
        }

        phrases.push(phrase)

        phrase = ""
    }

    return phrases.sort((a, b) => a.localeCompare(b))
}


export default phraseSplitter
