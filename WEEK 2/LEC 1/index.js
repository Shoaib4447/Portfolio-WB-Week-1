let duplicate = function (x) {
  return x * 2;
};

console.log(duplicate(4));

// ES6
// Arrow Function

let multiply = (x) => x * 2;
console.log(multiply(6));

let multiply_2 = (y, x = 10) => {
  return x * y;
};

// console.log(multiply_2(2)); // Output: 20

// Callback function
function userFunction(name, callback) {
  let user = name;
  callback(user);
}


let greet = (name) => {
    console.log(name + " Welcome");
};

userFunction("Shoaib", greet);


// for in on object
let person = { name: "John", age: 30, city: "New York" };
for (const key in person) {
  console.log(key + ": " + person[key]);
}

// for of on string
let greeting = "hello world!";
for (const greet of greeting) {
  if (greet == " ") {
    break;
  }
  console.log(greet);
}