class Greeting {

    static build() {
        var obj = new Greeting();
        return obj;
    }

    constructor() {
        this.message = "Hello World!";
    }

    greeting(value) {
        this.message = value;
        return this;
    }

    toString() {
        return this.message;
    }
}
export { Greeting };
