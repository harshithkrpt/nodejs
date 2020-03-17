setImmediate(() => {
  console.log("hELLO Set Immediate");
});

process.nextTick(() => {
  console.log("hLLO Next Tick");
});

new Promise((resolve, reject) => resolve("Hello World Promise")).then(resolve =>
  console.log(resolve)
);

const myFunction = (first, second) => {
  console.log(first, second);
};

setTimeout(myFunction, 1000, "hL", "Jl");

const id = setTimeout(() => {
  // should run after 2 seconds
}, 2000);
// I changed my mind
clearTimeout(id);

const is = setInterval(() => {
  console.log("Hell");
  // runs every 2 seconds
}, 2000);

clearInterval(is);
