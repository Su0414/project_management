$(function(){
       $('a.user_tasks').on('click', function(e){
            // submitting user tasks through JS
            e.preventDefault();       

            $.get(this.href)
            .success(function(response) {                   
            $("div.usertasks").append(response);
            });
                

        });  
 

        // submitting form through AJAX
        $('#new_task').on('submit', function(e){
            alert("5");
            e.preventDefault();
        
            $.ajax({
                type: 'POST',
                url: this.action,
                data: $(this).serialize(),
                success: function(json) {
                    $("div.created_task").append(json);
            }
            });
            
        });
  
    });