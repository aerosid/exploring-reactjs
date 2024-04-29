#!/usr/bin/env node

import { Greeting } from './Greeting.mjs';

console.log(Greeting.build().greeting("Howdy!").toString());

let o = { "greeting": "Howdy!" };
let v = { "version": "1.2" };

let g = { o, v };
const func = ({o}) => {
    let x = o.greeting;
    console.log(x);
}
func(g);


