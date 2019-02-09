describe("Testing ItemDb properties", () => {
    it("chances should add up to 1", () => {
        var chance = 0;
        Object.keys(itemDb).forEach((key) => {
            chance += itemDb[key]["itemChance"];
        });
        expect(chance).toBe(1);
    });
});