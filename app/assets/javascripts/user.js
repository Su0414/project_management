$(function(){
    class User{
        constructor(userTasksJSON){
            //alert("const user");
            this.id = userTasksJSON.id
            this.first_name = userTasksJSON.first_name;            
            this.last_name = userTasksJSON.last_name;
            this.email = userTasksJSON.email;
            this.admin = userTasksJSON.admin;

            this.projects = userTasksJSON.projects;
            this.tasks = userTasksJSON.tasks;
        }
     

        renderUserTasks(){
            
            let html = "" ;
            html += `<p>${this.first_name} ${this.last_name}</p>`;
            html += `<p>Your list of pending tasks is as follows:</p>`;

            this.tasks.forEach(task => {
                html += `<p><a href="https://www.w3schools.com">${task.content}</a></p>`;
            });           

            $("div.usertasks").append(html);
        }
      
    }


    // submitting user tasks through JS
    $('a.user_tasks').on('click', function(e){
        e.preventDefault();
        $.get(this.href)
        .success(function(response) { 
            //debugger;           

            const logged_user = new User(response);
            logged_user.renderUserTasks();       


        });
    });  
}); 