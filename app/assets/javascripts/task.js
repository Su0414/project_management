$(function(){

    $(document).on('turbolinks:load',function(){   
        attachListeners();
    });
    
    function attachListeners(){
        $('a.user_tasks').on('click', function(e){
            e.preventDefault();

            $.get(this.href)
             .success(function(response) {                   
                $("div.tasks").html(response);
             });
        });
    }  
});
