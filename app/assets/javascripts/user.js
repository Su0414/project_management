$(function(){
    class User{
        constructor(userTasksJSON){
            //alert("const user");
            this.id = userTasksJSON.id
            this.first_name = userTasksJSON.first_name;            
            this.last_name = userTasksJSON.last_name;
            this.email = userTasksJSON.email;
            this.admin = userTasksJSON.admin;

            this.user_tasks = userTasksJSON.user_tasks;
            
        }
     

        renderUserTasks(){
            $("div.usertasks").html('');
            let html = "" ;
            
            if(this.user_tasks.length === 0){
                html += `<p>You have completed all tasks. There are no pending tasks.</p>`;
            }else{    
                this.user_tasks.forEach(task => {
                    html += `<p>${this.first_name} ${this.last_name}</p>`;
                    html += `<p>Your list of pending tasks is as follows:</p>`;
                    html += `<p><a href="/projects/${task.project_id}/tasks/${task.id}/edit">${task.content}</a></p>`;
                });
            }
            
    

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