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
                    let new_task = new Task(response);
                    // new_task.renderTasks(); 
                    $("div.created_task").append(response); 
                    $("#task_content").val(""); 

            }
            });
            
        });

        class Task {
            constructor(data) {
                this.id = data.id;
                this.content = data.content;
                this.user_id = data.user_id;
            }
            renderTasks() {
                alert("render");
                let html = "" ;
                html += 
            
                `<div class='created_task'>        
                <strong> Task Assigned To: ${this.user_id}</strong>
                <p>${this.content}</p>
                </div>`;
                
                $("div.created_task").append(html);       
             };
          
          };
  
    });
