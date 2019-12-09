import phraseFiltering from "./../src/phrase_filtering"


describe("Testing phrase filtering by number of occurances,givven threshold and list of phrases to skip", () => {
    it("Should return all phrases if threshold and skipPhrases are not set", () => {

        const phrases = [
            { phrase: "cherry", occurances: 2 },
            { phrase: "root", occurances: 2 },
            { phrase: "bark", occurances: 2 },
            { phrase: "tulipe", occurances: 2 },
            { phrase: "green", occurances: 1 },
        ]

        const output = [
            "bark",
            "cherry",
            "green",
            "root",
            "tulipe",
        ]

        const phraseFilteringResult = phraseFiltering({ listOfPhrases: phrases })
        expect(phraseFilteringResult).toEqual(output)
    })

    it("Should return only items below the passed threshold", () => {
        const threshold = 1
        const phrases = [
            { phrase: "cherry", occurances: 2 },
            { phrase: "root", occurances: 2 },
            { phrase: "bark", occurances: 2 },
            { phrase: "tulipe", occurances: 2 },
            { phrase: "green", occurances: 1 },
        ]

        const output = [
            "green",
        ]

        expect(phraseFiltering({ listOfPhrases: phrases, threshold })).toEqual(output)
    })

    it("Should skip filtering items pointed in the skipPhrases parameter", () => {
        const threshold = 1
        const skipPhrases = [ "cherry", "bark" ]
        const phrases = [
            { phrase: "cherry", occurances: 2 },
            { phrase: "root", occurances: 2 },
            { phrase: "bark", occurances: 2 },
            { phrase: "tulipe", occurances: 2 },
            { phrase: "green", occurances: 1 },
        ]

        const output = [
            "bark", "cherry", "green",
        ]

        expect(phraseFiltering({ listOfPhrases: phrases, threshold, skipPhrases })).toEqual(output)
    })

    it("Should filter items listed in the filterPhrases parameter", () => {
        const threshold = 2
        const filterPhrases = [ "root" ]
        const phrases = [
            { phrase: "cherry", occurances: 2 },
            { phrase: "root", occurances: 2 },
            { phrase: "bark", occurances: 2 },
            { phrase: "tulipe", occurances: 2 },
            { phrase: "green", occurances: 1 },
        ]

        const output = [
            "bark", "cherry", "green", "tulipe",
        ]

        expect(phraseFiltering({ listOfPhrases: phrases, threshold, filterPhrases })).toEqual(output)
    })

    it("Should throw error if you try to pass same skip and filter items", () => {
        const threshold = 2
        const skipPhrases = [ "root", "bark" ]
        const filterPhrases = [ "green", "root" ]
        const phrases = [
            { phrase: "cherry", occurances: 2 },
            { phrase: "root", occurances: 2 },
            { phrase: "bark", occurances: 2 },
            { phrase: "tulipe", occurances: 2 },
            { phrase: "green", occurances: 1 },
        ]

        expect(() => {
            phraseFiltering({ listOfPhrases: phrases, threshold, filterPhrases, skipPhrases })
        }).toThrow()
    })
})
