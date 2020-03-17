process.argv.forEach((val, index) => {
  console.log(`${index}: ${val}`);
});

const args = process.argv.slice(2);

console.log(args);

console.log("My name is %s and I am %d years old", "Harshith", 20);

// %s string
// %d integer
// %f floating
// %O object

// console.log("%O", Number);

const x = 1;

console.count(
  "The value of x is " + x + " and has been checked .. how many times?"
);

console.count(
  "The value of x is " + x + " and has been checked .. how many times?"
);

// const function2 = () => console.trace();
// const function1 = () => function2();
// function1();

console.clear();

const doSomething = () => console.log("test");
const measureDoingSomething = () => {
  console.time("doSomething()");
  //do something, and measure the time it takes
  doSomething();
  console.timeEnd("doSomething()");
};
measureDoingSomething();

console.log("\x1b[33m%s\x1b[0m", "hi!");

// Using Chalk
const chalk = require("chalk");
console.log(chalk.yellow("Hello"));

setTimeout(() => {
  console.clear();
}, parseInt(process.argv[2] * 1000));
