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
            
            e.preventDefault();           

            var url = this.action;
            var data = $(this).serialize();

            // fetch(url, {
            // method: 'POST', // or 'PUT'
            // body: data // data can be `string` or {object}!
            
            // })
            // .then(response => response.json())
            // .then(response => console.log(data));

            $.ajax({
                type: this.method,
                url: this.action,
                data: data,
                success: function(response) {
                    $("#task_content").val("");
                    alert("1"+response.user);
                    let new_task = Task(response);
                    alert("2");
                    new_task.renderTasks();                    
            }
            });
            
        });

        // class Task {
        //     constructor(data) {
        //     this.id = data.id;
        //     this.content = data.content;
        //     this.user = data.user;
        //     }
        //     renderTasks() {
        //         alert("render");
        //         let html = "" ;
        //         html += 
            
        //         `<div class='new_task'>        
        //         <strong> Task Assigned To: ${this.user.name}</strong>
        //         <p>${this.content}</p>
        //         </div>`;
                
        //         $("div.show_task").append(html);       
        //      };
          
        //   };
  
    });