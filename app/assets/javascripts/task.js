
$(function(){
    // submitting user tasks through JS
    $('a.user_tasks').on('click', function(e){
        e.preventDefault();
        $.get(this.href)
        .success(function(response) {  
        $("div.usertasks").append(response);
        });
    });  
}); 

$(function(){
    // submitting project tasks through JS
    $('a.project_tasks').on('click', function(e){
        e.preventDefault();
        $.get(this.href)
        .success(function(response) {  
            $("div.projecttasks").html('');
            $("div.projecttasks").append(response);
        });
    });  
}); 

$(function(){
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
                let mytask = new Task(response);
                mytask.renderTasks();
                $("#task_content").val("");        
                
            }
        });  
    }); 
    
    class Task {
        constructor(data) {
        this.display_data = data;
        }

        renderTasks(){
            let html = "" ;
            html += 
            `<p>${this.display_data}</p>`;
            
            $("div.projecttasks").append(html);  
        };

    }

});
