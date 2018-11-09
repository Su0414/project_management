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
    
    class Task {
        constructor(data) {
            alert("const task");

            this.id = data.id
            this.content = data.content; 
        }
       
        renderTasks(){
            let html = "" ;
            html += 
            `<p>${this.content}</p>`;
            
            $("div.projecttasks").append(html);  
        };

    }

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
