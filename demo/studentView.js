class StudentView {
  constructor(student){
    this.student = student;
    this.el = null
  }
  template(){
    var container = $("<div class='student'></div>")
    container.append($("<h1>" + this.student.name + "</h1>"))
    container.append($("<p>Age: " + this.student.age + "</p>"))
    container.append($("<p>Favorite Food: " + this.student.name + "</p>"))
    container.append($("<img src='" + this.student.imgUrl + "'>"))
    container.on("click", () => {
      this.makeBlue()
    })
    return container
  }
  render(){
    this.el = this.template()
  }
  makeBlue(){
    this.el.css("background", "blue")
  }
}
