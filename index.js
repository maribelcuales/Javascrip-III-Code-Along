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
  