import phraseBreakdown, { IPhrase } from "../src/phrase_breakdown"

describe("Testing phrasing breakdown function", () => {
    it("Should throw an error if the numOfWords is different than positive integer", () => {
        const text = `cherry root
        cherry bark`

        expect(() => { phraseBreakdown(text, 0) }).toThrow()
    })

    it("Should return array with one phrase, the whole text", () => {
        const text = `cherry root
        cherry bark`

        const output = [
            { phrase: "cherry root cherry bark", occurances: 1 },
        ]

        const phrasingResult = phraseBreakdown(text, 4)
        expect(phrasingResult).toEqual(output)
    })

    it("Should return array with phrases with lenght one word", () => {
        const text = `cherry root
        cherry bark
        tulipe green root
        tulipe bark`

        const output = [
            { phrase: "cherry", occurances: 2 },
            { phrase: "root", occurances: 2 },
            { phrase: "bark", occurances: 2 },
            { phrase: "tulipe", occurances: 2 },
            { phrase: "green", occurances: 1 },
        ]

        const phrasingResult = phraseBreakdown(text, 1)
        expect(phrasingResult).toEqual(output)
    })

    it("Should return array with phrases with lenght two words", () => {
        const text = `cherry root
        cherry bark
        tulipe green root
        tulipe bark`

        const output = [
            { phrase: "cherry root", occurances: 1 },
            { phrase: "root cherry", occurances: 1 },
            { phrase: "cherry bark", occurances: 1 },
            { phrase: "bark tulipe", occurances: 1 },
            { phrase: "tulipe green", occurances: 1 },
            { phrase: "green root", occurances: 1 },
            { phrase: "root tulipe", occurances: 1 },
            { phrase: "tulipe bark", occurances: 1 },
        ]

        const phrasingResult = phraseBreakdown(text, 2)
        expect(phrasingResult).toEqual(output)
    })

    it("Should return array with phrases with lenght three words", () => {
        const text = `cherry root
        cherry bark
        tulipe green root
        tulipe bark`

        const output = [
            { phrase: "cherry root cherry", occurances: 1 },
            { phrase: "root cherry bark", occurances: 1 },
            { phrase: "cherry bark tulipe", occurances: 1 },
            { phrase: "bark tulipe green", occurances: 1 },
            { phrase: "tulipe green root", occurances: 1 },
            { phrase: "green root tulipe", occurances: 1 },
            { phrase: "root tulipe bark", occurances: 1 },
        ]

        const phrasingResult = phraseBreakdown(text, 3)
        expect(phrasingResult).toEqual(output)
    })

    it("Should return array with phrases with lenght one word sorted by occurances", () => {
        // Optional ?= after the occurances are sorted, should sort the phrase lexicographically
        const text = `cherry root root
        cherry bark
        tulipe green root
        tulipe bark`

        const output = [
            { phrase: "root", occurances: 3 },
            { phrase: "cherry", occurances: 2 },
            { phrase: "bark", occurances: 2 },
            { phrase: "tulipe", occurances: 2 },
            { phrase: "green", occurances: 1 },
        ]

        const phrasingResult = phraseBreakdown(text, 1)
        expect(phrasingResult).toEqual(output)
    })
})
