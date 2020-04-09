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


// Principle 4: Explicit binding
// Whenever we use JavaScript’s call or apply method, this is explicitly defined.

// We can override how we set CordialPerson constructor objects by taking the object-oriented approach. 

// We do so by calling them explicitly with new functions, .call and .apply

jerry.speak.call(newman);
newman.speak.apply(jerry);


/////////  Challenge   ///////////
// https://repl.it/@maribelcuales/Practice-Explicit-binding

const yourObject = {
  name: 'Dan Frehner',
  city: 'Salt Lake City',
  favoriteFood: 'Burritos'
}

const thingsYouEnjoy = ['Mountain Biking', 'Javascript', 'Snowboarding', 'Rafting', 'Movies', 'Music']

function tellUsAboutYourself(thing1, thing2, thing3){
  return `Hi! My name is ${this.name}, I live in ${this.city}, and I enjoy ${thing1}, ${thing2}, and ${thing3}. I love to eat ${this.favoriteFood}.`
}


// Using yourObject and thingsYouEnjoy array, set the context of this on tellUsAboutYourself and call the function.

tellUsAboutYourself.call(yourObject, thingsYouEnjoy[0], thingsYouEnjoy[1], thingsYouEnjoy[2]);


//If you finish fast add some keys to the yourObject and use them in the funciton. Or create your own function.
yourObject.faveMovie = 'Avengers: Endgame'; 

function tellUsAboutYourFavorites(thing1, thing2, thing3) {
  return `Hi! My name is ${this.name}, I live in ${this.city}, and I enjoy ${thing1}, ${thing2}, and ${thing3}. My favorite movie is ${this.faveMovie}.`
}

tellUsAboutYourFavorites.call(yourObject, thingsYouEnjoy[3], thingsYouEnjoy[4], thingsYouEnjoy[5]);


////// When NOT to use an ARROW FUNCTION  /////
/*
https://wesbos.com/arrow-function-no-no/
 
[ #1: click handlers ]
- if you use an arrow function, the keyword this is not bound to that element. 
- If we use a regular function, the keyword this will be bound to the element we clicked!

const button = document.querySelector('#pushy');
button.addEventListener('click', function() {
    console.log(this);
    this.classList.toggle('on');
});


[ #2: Object Methods ] 
- when you need a method to bind to an object.
- when using an arrow function this is not bound to anything and it just inherits it from the parent scope which in this case is the window.

const person = {
    points: 23,
    score: () => {
        this.points++;
    }
}

// If we run person.score(); a few times, we should be at 26 or something. But if I call person, points is still at 23.
// Because it’s trying to add points to the window! Remember, when using an arrow function this is not bound to anything and it just inherits it from the parent scope which in this case is the window.

(DO THIS!)
const person = {
    points: 23,
    score: function()  {
        this.points++;
    }
}

person.score();
person.score();
person.points;  // 25

// It now works because it is a full function and not an arrow function. 


[ #3: 3: Prototype Methods ] 
- when you need to add a prototype method.

class Car {
    constructor(make, colour) {
        this.make = make;
        this.colour = colour;
    }
}

const beemer = new Car('BMW', 'blue');
const subie = new Car('Subaru', 'white');

(DON'T!)
Car.prototype.summarize = () => {
    return `This car is a ${this.make} in the colour ${this.colour}`;  
};

//this.car is undefined and the colour is undefined --> Because we explicitly need the keyword this so you have to use a regular function


(DO THIS!)
Car.prototype.summarize = function() {
    return `This car is a ${this.make} in the colour ${this.colour}`;  
};

subie.summarize()  //"This car is a Subaru in the colour white"

beemer.summarize()  //"This car is a BMW in the colour blue"


[ #4: When you need an arguments Object ]

const orderChildren = () => {
    const children = Array.from(arguments);
    return children.map((child, i) => {
        return `${child} was child #${i + 1}`;
    })
    console.log(arguments);
}

// It doesn’t have to do with the keyword “this,” but we don’t have access to the arguments object when you use an arrow function.

orderChildren('jill', 'wes', 'jenna'); 

// Gets 'ReferenceError, arguments is not defined'.

// This is because arguments is a keyword that we have in our orderChildren that’s going to give us an Array or array-ish value of everything that was passed in.

// However, you do not get the arguments object if you use an arrow function. 

// USE a regular function, which is going to give us the actual content that we need.

(DO THIS!)
const orderChildren = function() {
    const children = Array.from(arguments);
    return children.map((child, i) => {
        return `${child} was child #${i + 1}`;
    })
    console.log(arguments);
}

orderChildren('jill', 'wes', 'jenna'); // ["jill was child #1", "wes was child #2", "jenna was child #3"]

TIP:  In general, if you do not need the arguments object or you do not need this, or you know that you will not need it in the future, then you can feel free to go ahead and use an arrow function on everything else.
*/





