describe("Testing data transfer operations", () => {
    beforeEach(() => {
        var jsonObj = {
            1:{
                "amount":1
            },
            2:{
                "amount":3
            }
        };
        var jsonString = `{"1":{"amount":1},"2":{"amount":3}}`;
    });
    
    afterEach(() => {
        localStorage.clear();
    });

    it("should serialize a JSON object", () => {
        expect(serialize(this.jsonObj)).toBe(this.jsonString);
    });

    it("should deserialize a string to a JSON object", () => {
        expect(deserialize(this.jsonString)).toEqual(this.jsonObj);
    });

    it("should set an items object in localStorage", () => {
        expect(setItemsObj(this.jsonObj)).toBe(localStorage.getItem("items"));
    });

    it("should get an items object in localStorage", () => {
        localStorage.setItem("items", this.jsonString);
        expect(getItemsObj()).toBe(this.jsonObj);
    });
});

describe("Testing cash operations", () => {
    beforeEach(() => {
        localStorage.setItem("cash", 100);
    });

    afterEach(() => {
        localStorage.clear();
    });

    it("setCash(amount) should set the correct amount", () => {
        setCash(500);
        var value = parseInt(localStorage.getItem("cash"));
        expect(value).toBe(500);
    });

    it("getCash(amount) should return the correct amount", () => {
        expect(getCash()).toBe(100);
    });

    it("addCash(amount) should add the correct amount", () => {
        addCash(100);
        var value = parseInt(localStorage.getItem("cash"));
        expect(value).toBe(200);
    });

    it("removeCash(amount) should remove the correct amount", () => {
        var remove = removeCash(50);
        var value = parseInt(localStorage.getItem("cash"));
        expect(value).toBe(50);
        expect(remove).toBe(true);
    });

    it("removeCash(amount) should not remove amount that the wallet does no have", () => {
        expect(removeCash(200)).toBe(false);
    });
});

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
            7:{
                amount: 0,
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
        removeItem(1)
        expect(localStorage.getItem("items")[1].amount).toBe(1);

        removeItem(2)
        expect(localStorage.getItem("items")[2].amount).toBe(false);

        removeItem(3)
        expect(localStorage.getItem("items")[3].amount).toBe(3);

        removeItem(4)
        expect(localStorage.getItem("items")[4].amount).toBe(false);

        removeItem(5)
        expect(localStorage.getItem("items")[5].amount).toBe(5);

        removeItem(7)
        expect(localStorage.getItem("items")[7].amount).toBe(false);
    });
});