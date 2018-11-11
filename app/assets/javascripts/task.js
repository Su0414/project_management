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
            formatTdhtml += `<table>`; 
            this.format_tasks.forEach(task => {
            
                formatTdhtml += `<tr>
                                    <td data-id=${task.id}> `

                if(task.completed_at!=null){
                    formatTdhtml += `<strike>${task.content}</strike>`;
                }else{
                    formatTdhtml += `${task.content}`;
                }            

            
                formatTdhtml += `</td>
                                     <td data-id=${task.id}>
                                        <a href="/projects/${task.project_id}/tasks/${task.id}/complete">
                                        <div class="complete">
                                            <i class="fa fa-check"></i>
                                        </div>
                                        </a>
                                     </td>
                                     <td data-id=${task.id}>
                                        <a href="/projects/${task.project_id}/tasks/${task.id}/delete">
                                        <div class="trash">
                                            <i class="fa fa-trash"></i>
                                        </div>
                                        </a>
                                     </td>
                                     </tr>`
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

});
