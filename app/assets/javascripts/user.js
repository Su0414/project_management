$(function(){
    class User{
        constructor(userTasksJSON){
            //alert("const user");
            this.id = userTasksJSON.id
            this.first_name = userTasksJSON.first_name;            
            this.last_name = userTasksJSON.last_name;
            this.email = userTasksJSON.email;
            this.admin = userTasksJSON.admin;
            
            this.current_user = userTasksJSON.logged_user;
            this.user_tasks = userTasksJSON.user_tasks;            
        }     

        renderUserTasks(){
            $("div.usertasks").html('');
            let html = "" ;
            
            if(this.user_tasks.length === 0){
                html += `<p>You have completed all tasks. There are no pending tasks.</p>`;
            }else{    
                
                html += `<p>${this.first_name} ${this.last_name}</p>`;
                html += `<p>Your list of pending tasks is as follows:</p>`;
                html += `<table width="100%">`;
                html += `<tr>`;
                html += `<td width="65%">`;
                html += `<strong>Task Content</strong>`;
                html += `</td>`;
                
                html += `<td width="33%">`;
                html += `<strong>Project Name</strong>`;
                html += `</td>`;

                html += `</tr>`;

                this.user_tasks.forEach(task => {
                    if(task.project[0].status === "active"){
                        html += `<tr>`;

                        if(this.current_user.id === task.user[0].id){
                            html += `<td width="65%">`;
                            
                                html += `<a href="/projects/${task.project[0].id}/tasks/${task.id}/edit">${task.content}</a>`;
                        
                            html += `</td>`;

                            html += `<td width="33%">`;
                            html += `<a href="/projects/${task.project[0].id}">${task.project[0].name}</a></p>`;
                            html += `</td>`;
                        }
                    }
                    html += `</tr>`;
                });
                html += `</table>`;
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