class Greeting {
    #message;
    static build(message) {
        var obj = new Greeting(message);
        return obj;
    }
    constructor(message) {
        if (message !== undefined && message !== null) {
            this.#message = message;
        } else {
            this.#message = "Hello World!";
        }
    }
    greeting(value) {
        this.#message = value;
        return this;
    }
    toString() {
        return this.#message;
    }
}
export { Greeting };