class MockEndpoint {
  nextQuote = () => {
    const executor = (resolve, reject) => {
      const onTimeout = () => {
        const quote = {id: "x", message: "sdkjfasj", author: "adsjas"}
        resolve(quote);
      }
      const period = 3000;
      this.timeout = setTimeout(onTimeout, period);
      return;
    }
    return new Promise(executor);
  }
}

class ServerEndpoint {
  nextQuote = async () => {
    const res = await fetch("./api/nextQuote");
    return res.json();
  }
}

class ApiEndpoint {
  #endpoint
  constructor() {
    //See:
    //https://create-react-app.dev/docs/adding-custom-environment-variables/    
    let env = process.env.NODE_ENV;
    if (env && env === 'development') {
      this.#endpoint = new MockEndpoint();
    } else {
      this.#endpoint = new ServerEndpoint();
    }
  }
  nextQuote = () => {
    return this.#endpoint.nextQuote();
  }
}

const apiEndpoint = new ApiEndpoint();

export default apiEndpoint;