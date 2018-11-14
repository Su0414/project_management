$(function(){
    class Project{
        constructor(projectJSON){
            console.log(projectJSON);
            this.id = projectJSON.id;
            this.name = projectJSON.name;
            this.description = projectJSON.description;
            this.status = projectJSON.status;
            this.current_user = projectJSON.logged_user;

            this.attachProjectListners();
        }
    attachProjectListners(){
        this.body = document.querySelector('body');
    }

    renderProjectDetails(){
        alert("name", this.name);
        let html = "";
        html+= `${this.name}`;
        html+= `${this.description}`;
        return html;
    }
    
}
// submitting project details show page through JS
$('a.more_info').on('click', function(e){
    alert("more info");
    e.preventDefault();
    
    var data = {};

    let posting = fetch(this.href, {
        method: "GET", 
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
       body: JSON.stringify(data),
    });
    posting.then(function(response) {
        alert(response);
        //debugger;
        let myproject = new Project(response);
        let display_project = myproject.renderProjectDetails();
        $("div.projectdetails").append(display_project);
    });
});  


});