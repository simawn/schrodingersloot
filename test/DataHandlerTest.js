describe("Testing data transfer operations", () => {
    beforeEach(() => {
        this.jsonObj = {
            1:{
                "amount":1
            },
            2:{
                "amount":3
            }
        };
        this.jsonString = `{"1":{"amount":1},"2":{"amount":3}}`;
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
        setItemsObj(this.jsonObj);
        expect(localStorage.getItem("items")).toBe(this.jsonString);
    });

    it("should get an items object in localStorage", () => {
        localStorage.setItem("items", this.jsonString);
        expect(getItemsObj()).toEqual(this.jsonObj);
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
        expect(parseInt(localStorage.getItem("cash"))).toBe(100);
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
            6:{
                amount: -1, //Should not happen
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
        removeItem(1);
        expect(JSON.parse(localStorage.getItem("items"))[1].amount).toBe(1);

        removeItem(2);
        expect(JSON.parse(localStorage.getItem("items"))[2]).toBe(undefined); //id2 is not defined and should not be

        removeItem(3);
        expect(JSON.parse(localStorage.getItem("items"))[3].amount).toBe(3);

        removeItem(4);
        expect(JSON.parse(localStorage.getItem("items"))[4]).toBe(undefined); //id4 is not defined and should not be

        removeItem(5);
        expect(JSON.parse(localStorage.getItem("items"))[5].amount).toBe(5);

        removeItem(6);
        expect(JSON.parse(localStorage.getItem("items"))[6].amount).toBe(-1);

        removeItem(7);
        expect(JSON.parse(localStorage.getItem("items"))[7].amount).toBe(0);
    });
});

describe("Testing new user operations", () => {
    beforeEach(() => {
        localStorage.clear();
    });

    afterEach(() => {
        localStorage.clear();
    });

    it("should create an empty items db for a new user", () => {
        createItemDb();
        expect(localStorage.getItem("items")).toBe("{}")
    });

    it("should create an empty wallet for a new user", () => {
        createWallet();
        expect(localStorage.getItem("cash")).toBe(String(STARTCASH));
    });

    describe("Testing new user operations on existing users", () => {
        beforeEach(() => {
            var jsonItemString = `{"1":{"amount":1},"2":{"amount":3}}`;
            localStorage.setItem("items", jsonItemString);
            localStorage.setItem("cash", "999");
        });

        afterEach(() => {
            localStorage.clear();
        });

        it("should not create an empty item db for existing users", () => {
            createItemDb();
            expect(localStorage.getItem("items")).toBe(`{"1":{"amount":1},"2":{"amount":3}}`);
        });

        it("should not create an empty wallet for existing users", () => {
            createWallet();
            expect(localStorage.getItem("cash")).toBe("999");
        });
    });
});