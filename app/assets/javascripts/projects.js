$(function(){
    class Project{
        constructor(projectJSON, type){
            this.id = projectJSON.id;
            this.name = projectJSON.name;
            this.description = projectJSON.description;
            this.status = projectJSON.status;
            this.current_user = projectJSON.current_user;
            this.current_user_name = projectJSON.current_user_name;

            //this.attachProjectListners();
        }
        
   

    // attachProjectListners(){
    //     this.body = document.querySelector('body');
    // }

    renderProjectDetails(){
        let html = "";
        html+= `${this.name}`;
        html+= `${this.description}`;
        return html;
    }
    
}
// submitting project details show page through JS
$('a.more_info').on('click', function(e){
    
    e.preventDefault();
    let posting = fetch(this.href);
    posting.then(function(response) {
        //debugger;
        let myproject = new Project(response);
        let display_project = myproject.renderProjectDetails();
        $("div.projectdetails").append(display_project);
    });
});  


});