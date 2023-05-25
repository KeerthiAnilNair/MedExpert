const et = document.querySelector('.e');
const pt = document.querySelector('.p');
const bt = document.querySelector('.bt');
const al = document.querySelector('.al');
const dt = document.querySelector('.d');
const nt = document.querySelector('.n');
var valem = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
var fl = 1;



function vl() {
  const txt = et.value;
  const pst = pt.value;
  const dat = dt.value;
  const nmt = nt.value;

  if (txt == "" || pst == "" || dat == "" || nmt == "") {


    if (nmt == "") {
      nt.placeholder = 'Enter name';
      document.getElementById("al").innerHTML = "*Details not entered";
    }

    else if (txt == "") {
      et.placeholder = 'Enter valid email id';
      document.getElementById("al").innerHTML = "*Details not entered";
    }

    else if (pst == "") {
      pt.placeholder = 'Enter password';
      document.getElementById("al").innerHTML = "*Details not entered";
    }
    else {
      document.getElementById("al").innerHTML = "*DOB not entered";
    }

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
        document.getElementById("al").innerHTML = "*min password length 6";
      }
      else {
        alert('Sign-up succesful');
        document.getElementById("al").innerHTML = "";
        window.location.href = "home.html";

      }



    }










  }




}












bt.addEventListener('click', vl);

