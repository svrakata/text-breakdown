import { isSafeInteger } from "lodash"
import { sanitizeString } from "./utilities"

export interface IPhrase {
    occurances: number
    phrase: string
}

type TPhraseSplitter = (text: string, numOfWords: number) => IPhrase[]

const phraseSplitter: TPhraseSplitter = (text: string, numOfWords: number) => {

    if (!isSafeInteger(numOfWords)) {
        throw new Error("The numOfWords parameter should be positive integer number.")
    }

    if (numOfWords < 1) {
        throw new Error("The numOfWords parameter should be positive integer number.")
    }

    const sanitizedText = sanitizeString(text)
    const words = sanitizedText.split(" ")
    const wordsHash = {}
    let phrase = ""

    if (numOfWords >= words.length) {
        return [ { phrase: words.join(" "), occurances: 1 } ]
    }

    for (let i = 0; i < words.length; i++) {
        if (i + numOfWords > words.length) {
            break
        }

        for (let y = i; y < i + numOfWords; y++) {
            phrase += `${phrase !== "" ? " " : ""}${words[ y ]}`
        }

        if (!wordsHash.hasOwnProperty(phrase)) {
            wordsHash[ phrase ] = 1
        } else {
            wordsHash[ phrase ] += 1
        }

        phrase = ""
    }

    return Object.entries<number>(wordsHash)
        .map(([ key, val ]) => ({ phrase: key, occurances: val }))
        .sort((prev, next) => next.occurances - prev.occurances)
}


export default phraseSplitter
