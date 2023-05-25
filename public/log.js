const et = document.querySelector('.e');
const pt = document.querySelector('.p');
const bt = document.querySelector('.bt');
const al = document.querySelector('.al');
var ee = document.getElementById("ee")
var valem = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
var fl = 1;

function val() {

  const txt = et.value;
  const pst = pt.value;

  if (txt == "" || pst == "") {

    if (txt == "") {
      et.placeholder = 'Enter valid email id';
    }

    else {
      pt.placeholder = 'Enter password';
    }



    document.getElementById("al").innerHTML = "*Details not entered";

  }

  else {

    document.getElementById("al").innerHTML = "";

    if (txt.match(valem)) {
      fl = 1;
    }
    else {
      fl = 2;

    }

    if (fl == 2) {
      document.getElementById("al").innerHTML = "*Invalid mail id";
    }
    else {
      document.getElementById("al").innerHTML = "";
      if (pst.length < 6) {
        document.getElementById("al").innerHTML = "*Invalid password";
      }
      else {
        alert('login succesful');
        document.getElementById("al").innerHTML = "";
        window.location.href = "index.html";

      }
    }


  }
}

















bt.addEventListener('click', val);