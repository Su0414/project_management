$(function(){
    
    class Task {
        constructor(taskJSON) {
            //alert("const task");
            this.completed_tasks = taskJSON.completed_tasks;           
        }
       
        renderTasks(){
            let html = "" ;
            this.completed_tasks.forEach(task => {
            html += `<p>${task.content}</p>`;
            });
            
            $("div.projecttasks").append(html);  
        };

    }
        
    // submitting project tasks through JS
    $('a.project_completed_tasks').on('click', function(e){
        e.preventDefault();
        $.get(this.href)
        .success(function(response) {
            debugger;  
            $("div.projecttasks").html('');
            let mytask = new Task(response);
            mytask.renderTasks();
            $("div.projecttasks").append(response);
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
                
                //debugger;
                let mytask = new Task(response);
                mytask.renderTasks();
                $("#task_content").val("");        
                
            }
        });  
    });    

});
