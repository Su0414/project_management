$(function(){

    $(document).on('turbolinks:load',function(){   
        attachListeners();
    });
    
    function attachListeners(){
        $('a.user_tasks').on('click', function(e){
            e.preventDefault();

            $.ajax({
                method: "GET",
                url: this.href
              })
                .done(function(data) {                   
                  $("body").append(data);                
                });
        });
    }
    
  
});
