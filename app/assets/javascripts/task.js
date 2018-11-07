
$(function(){
    // submitting user tasks through JS
    $('a.user_tasks').on('click', function(e){
        e.preventDefault();
        $.get(this.href)
        .success(function(response) {  
            //debugger;       
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
            //debugger; 
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
            type: this.method,
            url: this.action,
            data: data,
            success: function(response) {
                debugger;              
                $("div.projecttasks").html('');
                $("div.projecttasks").append(response);
                $("#task_content").val("");
            }
        });            
    });        
});
