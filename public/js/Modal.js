    var btn = document.getElementById("mybtn");
    var modal = document.getElementById("mymodal");
    var closebtn = document.getElementsByClassName("close")[0];

    btn.onclick = () => {
        modal.style.display = "block";
    }

    closebtn.onclick = () => {
        modal.style.display = "none";
    }