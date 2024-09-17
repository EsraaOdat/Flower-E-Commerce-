async function getotp(event) {
    event.preventDefault();
    var id=localStorage.getItem("varificationId");
    var url=`https://localhost:7000/api/Users_Bassam/GetOTP?id=${id}`;
    var form=document.getElementById("form1");
    var formData=new FormData(form);
    var response=await fetch(url,{
        method:"POST",
        body:formData
    });
    if(response.ok){
        window.location.href="formforget.html";
    }
    
}