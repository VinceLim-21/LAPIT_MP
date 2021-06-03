$(document).ready(function () {

    $('#email').keyup(function () {
        // your code here
        var email = $('#email').val();
		console.log(email);
		
		$.get("/checkEmailexist", {email: email}, function(result){
            if (result.email == email){
                $("#email").css("background-color", "#E3E3E3");
                $("#error").html("")
                $("#submit").prop("disabled", false);
            }
            
            else{
				$("#email").css("background-color", "red");
                $("#error").html("Email does not exist.")
            }
        })
		
    });
	
	$('#submit').onclick(function() {
		$.get('/checkPassword', {email: $('#email').val(), psw: $('#psw').val()}, function(result){
			if(result){
				$('#psw').css("background-color", "#E3E3E3");
                $('#error').html("")
				console.log("Logged in");
				//load logged in page.
			}
			else{
				$("#psw").css("background-color", "red");
				$("#error").html("Email does not exist.")
			}
		}
	});
	
	
	
})