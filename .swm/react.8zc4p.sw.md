---
id: 8zc4p
name: React
file_version: 1.0.2
app_version: 0.7.2-0
file_blobs:
  package.json: 6d01f288be6ad95cc5550fa789a3b47cc75fae3c
---

_aka Why did Elliot just add 100MB to node\_modules_ 🤬

**tl;dr code UI fast and ez, and make it so if you change the UI code it does a true "hot reload" (preserves state but updates the UI around it)**

I'm going to go through each of the new npm packages added to `package.json`:

## React

<br/>

<!-- NOTE-swimm-snippet: the lines below link your snippet to Swimm -->
### 📄 package.json
```json
⬜ 34         "@types/three": "^0.103.2",
🟩 35         "react": "^17.0.2"
⬜ 36       }
```

<br/>

`react` has 1 job:

*   Given an old state,
    
*   and a new state that you're about to go to,
    
*   what are the minimum "transformations" I need to get to the new state?
    

_NOTE that we are not talking about HTML or CSS or anything at this point,_ `react` _doesn't know what HTML is._

<br/>

As an example, imagine we're building a UI to show a file directory.

The "backing data" might look like this:

```
root:
   folderA:
      file1.txt
      file2.txt
   folderB:
      file3.txt
```

Imagine the data changes to:

```
root:
   folderA:
      file0.txt    <-- new
      file1.txt
      file2.txt
   folderB:
      file3.txt
```

`react`'s only job is to say:

**"To get to the new state, we need to add a** `file0.txt` **node as the first child of** `folderA`**".**

But... to actually make a user interface, we need another library. Enter...

# react-dom

### React -> UI

If you want to make a iOS or Android app with React, you would use [React Native](https://reactnative.dev/). If you want to make a command-line tool with React, you would use [react-ink](https://github.com/vadimdemedes/ink). If you want to make a web interface with React, you would use [react-dom](https://reactjs.org/docs/react-dom.html).

All of these libraries listen to `react` and create a UI based on what `react` tells it to do.

Consider the above "file directory" example. When `react` says **"We need to add a** `file0.txt` **node as the first child of** `folderA`**,"** React Native on iOS might do something like:

```
// folderA is an existing UIView
let file0 = UIView()
folderA.insertSubview(file0, atIndex: 0)
```

Meanwhile, `react-dom` would do something like:

```
let file0 = document.createElement("div")
document.getElementById("folderA").prepend(file0)
```

### Updating elements

> _Q: How does a functional programmer change a lightbulb?_
> 
> _A: First, destroy the world, then remake it with lightbulb.on = true._

In the above example, if the state changed from

```
root:
   folderA:
      file1.txt
      file2.txt
```

to

```
root:
   folderB:      <-- new name
      file1.txt
      file2.txt
```

React would say: **Delete** `folderA` **from the hierarchy, and add a brand new** `folderB` **node with 2 kids,** `file1.txt` **and** `file2.txt` **.**

React has roots in functional programming, which says "it's way easier to just destroy everything and reinstantiate it than worry about a bunch of shared, mutable state that a lot of different parts of this application might be interested in".

<br/>

<div align="center"><img src="https://firebasestorage.googleapis.com/v0/b/swimmio-content/o/repositories%2FZ2l0aHViJTNBJTNBR0dKMjAyMiUzQSUzQUVwaXBoYW5l%2F2b93b65a-525a-40e4-8519-2be947c537fe.gif?alt=media&token=d0868c7a-1883-4867-b306-2552e53005c8" style="width:'25%'"/></div>

<br/>

**It's very very cheap to manipulate data, and it's very expensive to manipulate UI elements.**

When you add a DOM element or a UIView, the layout engine has to rerun and we have to potentially rerender ("repaint") the entire screen, so we want to do that as little as possible.

Whenever the "filesystem" example above changes one file, we _could_ just tear down the entire UI and make it again from scratch. But that gets really expensive, especially since a modern webapp has hundreds of elements.

So instead, React lets you have the functional advantage of avoiding shared mutable state, and gives you a very sexy way to have a component-based, cool as heck UI system.

## parcel

Parcel is a thing that stops Thomas from having to do "cp assets/audio dist/audio".

Parcel is a program that processes your Typescript files and spits them out. It also could take all your audio or img files and put them in a dir that you want them to be in.

But, this is the thing that also allows for Hot Reloading.

### Hot Reloading!

IMAGINE... THE YEAR 1998... YOUR FILE, COOL.HTML LOOKS LIKE

```
<DIV>HELNO WORLD!</DIV>
```

YOU OPEN COOL.HTML IN YOUR NETSCAPE BROWSER. IT LOOKS LIKE

> **HENLO WORLD!**

<br/>

YOU USE VIM TO CHANGE COOL.HTML TO SAY

```
<DIV>HELLLLLLLLO WORLD!</DIV>
```

<br/>

WITHOUT REFRESHING YOUR BROWSER, IT MAGICALLY NOW SAYS

> **HELLLLLLLLO WORLD!**

WOAH!!! WHat year is it????

Hot reloading is a difficult problem!

# JSX

Imagine being able to do:

```
function coolText(word) {
    return (<div id="coolDiv">Here is some cool {word}</div>)
}
```

Woah! Wouldn't that be crazy? If you opened your Chrome inspector and typed `const div = <div>Some text</div>`, it would hella give you an error.

But, you can do this with some magic! However, it's important to realize what's going on behind the scenes here!

Imagine the code:

```
const coolDiv = <div id="coolDiv">Here is some cool text!</div>
```

When we run this through parcel's JSX plugin, we get:

```
const coolDiv = {
   name: "div",
   id: "coolDiv",
   children: {
      text: "Here is some cool text!",
   }
}
```

That's more like it! That'll compile in Chrome if you asked it to.

# Props vs. State

I lied. React doesn't just kill you. It kills your whole family.

<br/>

# Juicy -> React

Whatever the Juicy State is we will turn it into React state.

Don't ask me how. It's black magic.

<br/>

# CSS

Flexbox is a cool thing.

It's a lot better than the old CSS that hurt everyone.

# TypeScript

Imagine you're using JavaScript. Haha, loser.

Imagine you typed

```
var someNumber = 3;
var someString = "what " + someNumber
```

JavaScript was built with the goal of "if we don't manage to load all of the JavaScript on this page, just do the best that you can."

So, when JavaScript sees `"what " + someNumber` it says "Ok, it looks like you might want to convert this number to a String, so you can add it to the String."

TypeScript is a **static** type checker, and **not a dynamic type checker.**

**It's very important to understand that TypeScript does not add anything to your JavaScript code.**

The TypeScript "Compiling process" is 99% just "remove any TypeScript code, which makes the result valid JavaScript code."

Imagine that you had some Java code like:

```
Integer int = CoolThing as Integer
```

The fact that you said "as Integer" actually _changes_ what your code is compiled to.

Typescript simply does not do that.

<br/>

This file was generated by Swimm. [Click here to view it in the app](https://app.swimm.io/repos/Z2l0aHViJTNBJTNBR0dKMjAyMiUzQSUzQUVwaXBoYW5l/docs/8zc4p).