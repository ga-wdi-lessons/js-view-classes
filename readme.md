# OOJS View Constructors

## Learning Objectives
- Leverage objects within other constructors
- define a model using a constructor function
- define a view using a constructor function
- use the view constructor to render HTML

## Framing
We've learned a lot about objects. Whether they be object literals or objects instantiated with constructor functions. The purpose of this class is to learn how to create "views" using a constructor function. However, the implications from view constructors are enormous. The basic idea is the ability to pass in an object as an argument to another constructor.

In this way, we can leverage all properties and methods of that object as a property within a different constructor. Confusing, right? It is. Extremely confusing, at first. Like everything else in programming it takes a lot of practice and repetition. The topics we'll be covering are especially difficult to understand at first. That said, once we start understanding, we can start to realize the tremendous amount of power constructors/objects bring to the programmatic table.

The biggest takeaway from this lesson is exposure. If we aren't necessarily able to code these things from scratch after this class, that's totally fine we're not expected to. We want to get exposure to things we're about to learn in Ruby with respect to a language we're already familiar with.

We're about to get into the backend where we can start storing data in databases and then rendering webpages with said data. Today we'll be doing that with data just supplied in a script file. The code we're writing today is basically how front end frameworks work under the hood.

At the end of the day, web development is all about grabbing data and doing something to it.

## Constructor - Review

Let's take a couple simple constructors:

```js
function Dog(name, breed){
  this.name = name;
  this.age = age;
}

function Person(name, age){
  this.name = name;
  this.age = age;
}
```

Great and now we can do things like this:

```js
var buddy = new Dog("Buddy", "Blue Heeler")
var spot = new Dog("Spot", "Greyhound")
var sue = new Person("Sue Q", 32)
var bob = new Person("Bob Evans", 52)

buddy.name
spot.breed
sue.age
bob.name
```

## Passing objects into Constructors
Lets say we want to talk about a dog with respect to it being a person's pet in the program, what would that look like?

Something like this:

```js
function Dog(name, breed){
  this.name = name;
  this.breed = breed;
}

function Person(name, age, dog){
  this.name = name;
  this.age = age;
  this.pet = dog;
}
```

With the above code we can now do things like this:

```js
var buddy = new Dog("Buddy", "Blue Heeler");
var spot = new Dog("Spot", "Greyhound");
var sue = new Person("Sue Q", 32, buddy);
var bob = new Person("Bob Evans", 52, spot);

buddy.name
spot.breed
sue.age
bob.name
bob.pet.name
sue.pet.breed
```

Well, that's cool. Let's step back and think about this.

If our application grows and things about `Dog`s change, our `Person` constructor doesn't care. The `Dog` behavior isn't tightly coupled to our `Person` only in so far as a `Dog` object is a property of our `Person` objects. If we were to add properties or methods to `Dog` nothing in our existing code base would break at all. That's really awesome. Moving forward in this class, we really need to start thinking about separating our concerns.

> look into this stackoverflow response on [cohesion & coupling](http://stackoverflow.com/questions/3085285/cohesion-coupling)

Let's take this a step further.

## Student App - I Do - You SHOULD NOT code along

> Just try to absorb as much as possible, we'll get the opportunity to do this in a different domain. Another issue is that while we tell you its generally good advice to write a bit of code and test it out. It's kind of hard to do with OOJS. Basically we have to get a bit more done before we can test it out.

We're going to create a folder and some files. We're going to generate a bunch of folders and files so we don't have to do it later. Worry not, we'll go into detail as to what and why we're creating the files throughout the lesson.

```bash
$ mkdir students
$ cd students
$ touch index.html studentData.js studentModel.js studentView.js script.js
```

We're going to take the contrived example of `Dog` and `Person` and convert that same pattern into something a bit more useful. What we're about to build is an app that displays students. Let's look at the data we'll be using first:

### The data
We'll create some data for our students in `studentData.js`:

```js
var students = [
  {name: "mary", age: 42, favoriteFood: "pizza", imgUrl: "https://www.placebear.com/200/200"},
  {name: "bob", age: 23, favoriteFood: "burger", imgUrl: "https://www.placecage.com/200/200"},
  {name: "sue", age: 33, favoriteFood: "burrito", imgUrl: "https://www.placebear.com/200/200"},
  {name: "tom", age: 27, favoriteFood: "sushi", imgUrl: "https://www.placecage.com/200/200"},
  {name: "harry", age: 31, favoriteFood: "melon", imgUrl: "https://www.placebear.com/200/200"},
  {name: "sally", age: 53, favoriteFood: "escargot", imgUrl: "https://www.placecage.com/200/200"}
]
```

> Because we don't have a backend, this data will serve as our backend.

If we look at this data, we can see that its just an array of objects stored in `var students`. Each object has 4 properties(name, age, favorite food and an image url). Pretty standard and many of us used very similar data structures for project 1.

### The Model Constructor
We'll be seeing the term `model` come up again soon in week 5 but we'll quickly introduce it here. At a high level, the model is how our data gets represented/structured at the application level. Let's build a constructor function that will represent our model for a student. This will be a pretty simple constructor.

In `studentModel.js`:

```js
function Student(name, age, favoriteFood, imgUrl){
  this.name = name;
  this.age = age;
  this.favoriteFood = favoriteFood;
  this.imgUrl = imgUrl;
}
```

> In this constructor we are just setting 4 properties passed in as arguments.

### The View Constructor
In web development another term that will come up very frequently is the `view`. Again we'll talk about this at great length in week 5 and the rest of the course, but let's touch on it a little bit now. At a high level, the `view` is how the data actually gets presented/rendered on the web page.

In today's app we'll be creating another constructor that will handle the view. It's sole purpose and responsibility is to render HTML. Let's take a look at what this will look like.

In `studentView.js`:

```js
function StudentView(student){
  this.student = student;
  this.el = null
}

StudentView.prototype = {
  template: function(){
    var container = $("<div class='student'></div>")
    container.append($("<h1>" + this.student.name + "</h1>"))
    container.append($("<p>Age: " + this.student.age + "</p>"))
    container.append($("<p>Favorite Food: " + this.student.name + "</p>"))
    container.append($("<img src='" + this.student.imgUrl + "'>"))
    return container
  },
  render: function(){
    this.el = this.template()
  }
}
```

There's a lot going on here so let's break it down.

The first four lines are just a standard constructor. In the same way that we made a dog object a property of a person. We're making a `Student` (the thing we defined in `studentModel.js`) a property of the `StudentView`

Next we extend some functionality of the `StudentView` by prototyping it with a couple of functions.

The `.template()` function takes the properties of the student it was instantiated with and shoves a whole bunch of html into a variable called `container` then returns that container.

The `.render()` function calls the `.template()` function and stores the return value into a property called `.el`.

> `el` is a convention thats used to denote element. We use `el` here as a property of the StudentView.

### Putting It All Together
Alright, let's connect all these files in our `index.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Document</title>
</head>
<body>
  <!-- Container for all our students -->
  <div class="students"></div>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
  <script src="studentData.js"></script>
  <script src="studentModel.js"></script>
  <script src="studentView.js"></script>
  <script src="script.js"></script>
</body>
</html>
```

Great! Got all this awesome code let's spin up our browser and check it out! Opening `index.html` annndd.. nothing...Hmm. What's missing?

If we look carefully, we still haven't actually *done* anything with this code yet, all we've done is define functions. Let's do something.

In `script.js`:

```js
$(document).ready(function(){
  for(var i = 0; i < students.length; i++){
    var student = new Student(students[i].name, students[i].age, students[i].favoriteFood, students[i].imgUrl)
    var studentView = new StudentView(student)
    studentView.render()
    $(".students").append(studentView.el)
  }
})
```

Alright, let's put it all together. Remember the data from `studentData.js`? That's the array we'll be looping through.

For each of those objects in that array, we'll be creating a new object using the `Student` constructor.

Then we'll also create a new `StudentView` by passing in the `Student` object that was just created. Then the `.render()` method is called in the view which generates the HTML to the `el` property of the `StudentView`. Finally that `el` property gets appended to the `$(".students")`

Whew.

As soon as we refresh we can see all of the students properly displayed on the page.

It might seem like a lot of extra code up front. That assumption is largely correct. However, our concerns are now really well separated. If we need to change any logic about our model we have a place for it(`studentModel.js`). Should we change anything about how students *look* we have a place for it(`studentView.js`).

### Adding functionality && A Gotcha with `this`
Let's say we do want to add functionality. For the sake of it being a classroom(and we love our contrived examples in the classroom), let's say we want to make the view blue when we click on it.

Well, we just need to add a bit of code to the view. First let's add a function to the `StudentView` prototype that changes the `el` properties background to blue.

In `studentView.js`:

```js
// ... more code above (look above in the lesson plan for the code above the render function)
render: function(){
    this.el = this.template()
},
makeBlue: function(){
  this.el.css("background", "blue")
}
```

All this function does, when called, is to change the CSS of the `el` property to have a background color of blue.

Now we just need to update our template so that when we click it calls this new function we just made.

In `studentView.js`:

```js
// ...more code above
template: function(){
  var self = this
  var container = $("<div class='student'></div>")
  container.append($("<h1>" + this.student.name + "</h1>"))
  container.append($("<p>Age: " + this.student.age + "</p>"))
  container.append($("<p>Favorite Food: " + this.student.name + "</p>"))
  container.append($("<img src='" + this.student.imgUrl + "'>"))
  container.on("click", function(){
    self.makeBlue()
  })
  return container
}
// ...more code below
```

> We'll notice we had to do the `var self = this` trick here. If we hadn't, what would `this` be in the callback for the click event?

We've added a click event to the container, such that when it gets clicked it runs the `makeBlue()` method for an instance of a `StudentView`

Now, we could've just put the functionality of `makeBlue()` inside the click event itself. Both would work. However, its not the `template()` functions job to make itself blue. It's only job is to generate the HTML and potentially any event listener that needs to be added to the HTML(one could argue even that isn't it's job...) Better to make a `makeBlue()` function. When we talk about things being modular and scalable this is a small example of that. This separation of concerns allows us to encapsulate logic.

If our PM comes to us and says the makeBlue feature is no good and instead needs to change to random colors on click, we know exactly where we need to go. We don't have to scour through our entire code base. We know it's part of the `StudentView` constructor because it has to do with `view`s. Additionally we can just look through all of our prototype functions and see if that feature is stored in one of those.

### Thinking about OOJS

Let's step back and think about how we leveraged OOJS. Realistically this is just one of literally limitless implementations of how we can make objects communicate with each other. Think of the power you can harness when you have a full understanding of object oriented design. The instructors will tell you, this stuff is hard. It's probably the hardest concept we cover in all of WDI. It's hard for the instructors too!

## You Do - Wamazon
Clone [this repo](https://github.com/ga-wdi-exercises/wamazon) and build Wamazon.
