$(document).ready(function(){
  data.forEach((person) => {
    var student = new Student(person.name, person.age, person.favoriteFood, person.imgUrl)
    var studentView = new StudentView(student)
    studentView.render()
    $(".students").append(studentView.el)
  })
})
