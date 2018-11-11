$(function(){
    class Project{
        constructor(){
            this.attachProjectListners();
        }
        
   

    attachProjectListners(){
        this.body = document.querySelector('body');
    }

    
}
// submitting completed project tasks through JS
$('a.more_info').on('click', function(e){
    e.preventDefault();
    $.get(this.href)
    .success(function(response) {
        
        $("div.projecttasks").append(response);
    });
});  


});