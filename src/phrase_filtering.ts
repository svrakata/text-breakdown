export interface IPhrase {
    occurances: number
    phrase: string
}

interface IPhraseFilteringOptions {
    listOfPhrases: IPhrase[]
    threshold?: number
    skipPhrases?: string[]
    filterPhrases?: string[]
}

type TPhraseFiltering = (options: IPhraseFilteringOptions) => string[]

const phraseFiltering: TPhraseFiltering = ({ listOfPhrases, threshold = 0, skipPhrases = [], filterPhrases = [] }) => {
    let filteredPhrases = listOfPhrases
    const conflict = skipPhrases.find((phrase) => filterPhrases.includes(phrase))

    if (conflict) {
        throw new Error("You are trying to skip and filter the same phrase.")
    }

    if (threshold > 0) {
        filteredPhrases = filteredPhrases
            .filter(({ occurances }) => occurances <= threshold)
    }

    if (skipPhrases.length > 0) {
        filteredPhrases = filteredPhrases
            .concat(
                listOfPhrases
                    .filter(({ phrase }) => skipPhrases.includes(phrase)),
            )

    }

    if (filterPhrases.length > 0) {
        filteredPhrases = filteredPhrases
            .filter(({ phrase }) => !filterPhrases.includes(phrase))
    }


    return filteredPhrases.map(({ phrase }) => phrase).sort()
}

export default phraseFiltering
