$(function(){
    
    class Task {
        constructor(taskJSON, type) {  
            this.status = taskJSON.status;
            this.current_user = taskJSON.logged_user;
            if(type === "completed"){
                this.format_tasks = taskJSON.completed_tasks;
            }else{
                this.format_tasks = taskJSON.all_tasks;
            }
        }     
        
        renderContent(task){
            let formatContent = "";
            formatContent += `Assigned to: ${task.user[0].first_name} ${task.user[0].last_name} <br/>`;
            if(task.completed_at!=null){
                formatContent += `<strike>${task.content}</strike>`;
            }else{
                if(this.status === "active" && this.current_user.id === task.user[0].id)  {
                    formatContent +=`<a href="/projects/${task.project_id}/tasks/${task.id}/edit">`;
                    formatContent += `${task.content}`;
                    formatContent +=`</a>`;
                }else{
                    formatContent += `${task.content}`;
                }
            }
            return formatContent;
        }

        renderMarkComplete(task){
            let formatIcon = "";
            if(task.completed_at!=null){
                formatIcon += `<i style="opacity:0.4;" class="fa fa-check"></i>`;
            }else{  
                if(this.status === "active" && this.current_user.id === task.user[0].id)  {
                formatIcon += `<a href="/projects/${task.project_id}/tasks/${task.id}/complete", data-method="PATCH", class="complete_task">
                <div class="complete">
                    <i class="fa fa-check">
                </i></div>
            </a>`;
                }
            }
            return formatIcon;
        }

        renderDelete(task){
            let formatIcon = "";
            if(this.status === "active" && this.current_user.id === task.user[0].id)  {
                    formatIcon += `<a href="/projects/${task.project_id}/tasks/${task.id}", data-method="DELETE", class="delete_task">
                    <div class="trash">
                        <i class="fa fa-trash"></i>
                    </div>
                    </a>`;                
            }
            return formatIcon;
        }
        
        renderTable(){
            let formatTdhtml = "" ;
            formatTdhtml += `<table width="100%">`; 
            if(this.format_tasks.length === 0){
                formatTdhtml += `There are no tasks added for this project.`;
            }else{
            formatTdhtml += `<tr>
                                <td width="60%"><strong>Task Content</strong></td>
                                <td width="20%"><strong>Mark Complete</strong></td>
                                <td width="20%"><strong>Delete Task</strong></td>
                                
                            </tr>`;
            this.format_tasks.forEach(task => {
            
                formatTdhtml += `<tr>`;
                formatTdhtml +=`<td data-id=${task.id}> 
                                    <div class="task">`

                formatTdhtml += this.renderContent(task);
                         
           
                formatTdhtml += `</div>
                                    </td>`;
            
                formatTdhtml +=`<td edit-id=${task.id}>`;                                      
                            
                formatTdhtml += this.renderMarkComplete(task);                                       

                formatTdhtml += `</td>
                                     <td delete-id=${task.id}>`;
                
                formatTdhtml += this.renderDelete(task);

                formatTdhtml +=`</td>
                                </tr>`;
                
                });
            }
            formatTdhtml += `</table>`
            return formatTdhtml;
        }
       
        renderTasks(){
            let html = "";
            html += this.renderTable();
            $("div.projecttasks").append(html);  
        }        
    }

    function displayAllTasks(response){        
        $("div.projecttasks").html('');
        let type = "all";
        let mytask = new Task(response, type);
        let display_tasks = mytask.renderTasks();
        $("div.projecttasks").append(display_tasks);            
    }
        
    // submitting completed project tasks through JS
    $('a.project_completed_tasks').on('click', function(e){
        e.preventDefault();
        $.get(this.href)
        .success(function(response) {
            //debugger;  
            $("div.projecttasks").html('');
            let type = "completed";
            let mytask = new Task(response, type);
            let display_tasks = mytask.renderTasks();           
            $("div.projecttasks").append(display_tasks);
            
        }).error(function() {
            alert( "Load Error" );
        });
    });  

    // submitting all project tasks through JS
    $('a.project_all_tasks').on('click', function(e){
        e.preventDefault();
        $.get(this.href)
        .success(function(response) {
            displayAllTasks(response);
        }).error(function() {
            alert( "Load Error" );
        });
    });  

    // submitting form through AJAX -Lower level
    $('#new_task').on('submit', function(e){ 
        e.preventDefault();
        var url = this.action;
        var data = $(this).serialize();
             
        let posting = $.post(url, data);
        //debugger; 
        posting.done(
            function(response){
                displayAllTasks(response);
                $("#task_content").val("");
        });
        posting.error(function() {
            alert( "Task cannot be blank or Task already exists" );
        });
        
    });    

    // submitting mark complete form through AJAX -Lower level
    $('a.complete_task').on('click',function(e){   
        e.preventDefault();
        var url = this.href;
        var data = $(this).serialize();
        $.ajax({
            type: "PATCH",
            url: url, 
            data: data,
            success: function(response) { 
                displayAllTasks(response);
            $("#task_content").val("");        
                
            }
        });  
    });    

    // submitting delete form through AJAX -Lower level
    $('a.delete_task').on('click', function(e){          
        e.preventDefault();
        var url = this.href;
        var data = $(this).serialize();
        $.ajax({
            type: "DELETE",
            url: url, 
            data: data,
            success: function(response) { 
                displayAllTasks(response);
                $("#task_content").val("");               
            }
        });  
    });    


});
