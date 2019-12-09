import phrasing from "./../src/phrasing"


describe("Testing phrasing function", () => {
    it("Should take string and return object.", () => {
        const phrasingResult = phrasing()
        expect(typeof phrasingResult).toBe("object")
    })
})
