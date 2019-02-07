describe("Testing items database operations", () => {
    beforeEach(() => {
        var itemsObj = {
            1:{
                amount: 2,
            },
            3:{
                amount: 4,
            },
            5:{
                amount: 6,
            },
        };
        localStorage.setItem("items", JSON.stringify(itemsObj));
    });

    afterEach(() => {
        localStorage.clear();
    });
    it("getItemAmount(itemId) should return the correct amount", () => {
        expect(getItemAmount(1)).toBe(2);
        expect(getItemAmount(2)).toBe(0);
        expect(getItemAmount(3)).toBe(4);
        expect(getItemAmount(4)).toBe(0);
        expect(getItemAmount(5)).toBe(6);
    });

    it("addItem(Id) should add an item to the database", () =>{
        addItem(1); //becomes 3
        var item1Amount = JSON.parse(localStorage.getItem("items"))[1].amount;
        expect(item1Amount).toBe(3);

        addItem(2); //becomes 1
        var item2Amount = JSON.parse(localStorage.getItem("items"))[2].amount;
        expect(item2Amount).toBe(1);

        addItem(3); //becomes 5
        var item3Amount = JSON.parse(localStorage.getItem("items"))[3].amount;
        expect(item3Amount).toBe(5);

        addItem(4); //becomes 1
        var item4Amount = JSON.parse(localStorage.getItem("items"))[4].amount;
        expect(item4Amount).toBe(1);

        addItem(5); //becomes 7
        var item5Amount = JSON.parse(localStorage.getItem("items"))[5].amount;
        expect(item5Amount).toBe(7);
    });

    it("removeItem(itemId) should remove an item", () => {
        expect(removeItem(1)).toBe(1);
        expect(removeItem(2)).toBe(0);
        expect(removeItem(3)).toBe(3);
        expect(removeItem(4)).toBe(0);
        expect(removeItem(5)).toBe(5);
    });
});