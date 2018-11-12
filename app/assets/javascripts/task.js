$(function(){
    
    class Task {
        constructor(taskJSON, type) {
            if(type === "all" || "new"){
                this.format_tasks = taskJSON.all_tasks;
            }
            if(type === "completed"){
                this.format_tasks = taskJSON.completed_tasks;
            }
        }       
        
        renderTd(){
            let formatTdhtml = "" ;
            formatTdhtml += `                            
                             <table>`; 
            this.format_tasks.forEach(task => {
            
                formatTdhtml += `<tr>
                                    <td data-id=${task.id}> 
                                    <div class="task">`

                if(task.completed_at!=null){
                    formatTdhtml += `<strike>${task.content}</strike>`;
                }else{
                    formatTdhtml += `${task.content}`;
                }            
           
                formatTdhtml += `</div>
                                    </td>
                                     <td edit-id=${task.id}>`;
                                        
                
                if(task.completed_at!=null){
                    formatTdhtml += `<i style="opacity:0.4;" class="fa fa-check"></i>`;
                }else{
                    formatTdhtml += `<a href="/projects/${task.project_id}/tasks/${task.id}/complete", data-method="PATCH", class="complete_task">
                                        <div class="complete">
                                            <i class="fa fa-check">
                                        </i></div>
                                    </a>`;
                }

                formatTdhtml += `</td>
                                     <td delete-id=${task.id}>
                                        <a href="/projects/${task.project_id}/tasks/${task.id}", data-method="DELETE", class="delete_task">
                                        <div class="trash">
                                            <i class="fa fa-trash"></i>
                                        </div>
                                        </a>
                                     </td>
                                </tr>`;
            });
            formatTdhtml += `</table>`
            return formatTdhtml;
        }
       
        renderTasks(){
            let html = this.renderTd();
            $("div.projecttasks").append(html);  
        }
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
        });
    });  

    // submitting all project tasks through JS
    $('a.project_all_tasks').on('click', function(e){
        e.preventDefault();
        $.get(this.href)
        .success(function(response) {
            // alert(response);
            // debugger;  
            $("div.projecttasks").html('');
            let type = "all";
            let mytask = new Task(response, type);
            let display_tasks = mytask.renderTasks();
            $("div.projecttasks").append(display_tasks);
        });
    });  

    // submitting form through AJAX -Lower level
    $('#new_task').on('submit', function(e){          
        e.preventDefault();
        var url = this.action;
        var data = $(this).serialize();
        $.ajax({
            type: "POST",
            url: url, 
            data: data,
            success: function(response) { 
                
            $("div.projecttasks").html('');
            let type = "new";
            let mytask = new Task(response, type);
            let display_tasks = mytask.renderTasks();
            $("div.projecttasks").append(display_tasks);
            $("#task_content").val("");        
                
            }
        });  
    });    

    // submitting mark complete form through AJAX -Lower level
    $('a.complete_task').on('click',function(e){   
        // alert(this.url);
        e.preventDefault();
        var url = this.href;
        var data = $(this).serialize();
        $.ajax({
            type: "PATCH",
            url: url, 
            data: data,
            success: function(response) { 
                // alert(response);
            $("div.projecttasks").html('');
            let type = "all";
            let mytask = new Task(response, type);
            let display_tasks = mytask.renderTasks();
            $("div.projecttasks").append(display_tasks);
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
                
            $("div.projecttasks").html('');
            let type = "all";
            let mytask = new Task(response, type);
            let display_tasks = mytask.renderTasks();
            $("div.projecttasks").append(display_tasks);
            $("#task_content").val("");        
                
            }
        });  
    });    


});
