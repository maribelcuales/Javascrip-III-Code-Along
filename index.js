/////////// 'this'  /////////////////

/*   // this //
- A pointer to an object 
- Use 'this' to reference an object without having to refer to that object's name

- Note: It is impossible to know what ‘this’ points to, without some execution context, or knowledge of where a function is being called.

- Tip: Understand where a function is called. You may be able to deduce what the 'this' keyword is pointing to.

There are four rules to this discovery. They all concern an object’s bounds. Remember, JavaScript has global objects (or execution context) that exist wherever JavaScript lives. In the browser, this is called window, and in node it’s called global/console. Either way, JavaScript lives inside of a context. Go ahead and try this out in your Chrome web browser.
*/

// Principle 1: Window/Global Object Binding
// * When in the global scope, the value of “this” will be the window/console Object;

function sayName(name) {
  console.log(this);
  return name;
}

sayName("D'Artagnan");

// Principle 2: Implicit Binding
// Whenever a preceding dot calls a function, the object before the dot is this.

const myObj = {
  greeting: 'Hello',
  sayHello: function(name) {
    console.log(`${this.greeting} my name is ${name}`);
    console.log(this);
  }
};

myObj.sayHello('Ryan');


// This principle is one of the most commonly used applications of the this keyword. Here is another example: 

const sayNameFunc = obj => {
  obj.sayName = function() {
    console.log(`Hello my name is ${this.name}`);
    console.log(this);
  };
};
const me = { name: 'Ryan' };
const you = { name: 'Freddy' };
sayNameFunc(me);
sayNameFunc(you);

// Invoke Methods on our objects
me.sayName();
you.sayName();

// In this previous example, You see that we have a function that receives an object as an argument. Depending on the object being passed in, we get a different context for this, so when we log out the this keyword, we get a different object each time it’s run.


// Principle 3: New binding
// Whenever we use a constructor function, this refers to the specific instance of the object that is created and returned by the constructor function.

// A constructor function is a function that returns an object. It's an object creator. (object-oriented programming)

// The function CordialPerson will create an object for us. When we call the function, we have to use the new keyword.

function CordialPerson(greeter) {
  this.greeting = 'Hello ';
  this.greeter = greeter;
  this.speak = function() {
    console.log(this.greeting + this.greeter);
    console.log(this);
  };
}

const jerry = new CordialPerson('Newman');
const newman = new CordialPerson('Jerry');

jerry.speak();
newman.speak();




