import { Transform } from "stream"
import phraseSplitter from "./phrase_splitting/phrase_splitter"


class PhraseSplittingStream extends Transform {
    public phraseOccurancesMap: any


    constructor(public prop: string, public numOfWords: number) {
        super({
            readableObjectMode: true,
            writableObjectMode: true,
        })

        this.phraseOccurancesMap = {}
    }

    public _transform(chunk, _, next) {
        if (chunk.hasOwnProperty(this.prop)) {
            throw new Error(`The property ${this.prop} does not exist on this set of data.`)
        }

        const text = chunk[ this.prop ]
        const numOfWords = this.numOfWords

        const phrasedData = phraseSplitter(text, numOfWords)

        next(null, phrasedData)
    }
}

export default PhraseSplittingStream
