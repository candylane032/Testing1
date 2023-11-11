$("#order").click(function() {
    var InfoComplete = $("InfoComplete").val();
    
    if(InfoComplete == '') {
        swal({
        title: "Incomplete",
        text: "Please complete your Information",
        icon: "warning",
        button: "Okay",
        }); 
    }else {
        redirect('Order Modal')
    }
});