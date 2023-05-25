const b1 = document.querySelector('.b1');
const b2 = document.querySelector('.b2');
const b3 = document.querySelector('.b3');

function f1(){
    window.location.href = "profile.html";
}

function f2(){
          window.location.href = "record.html";
}

function f3(){
          window.location.href = "reminder.html";
}












b2.addEventListener('click', f2);
b3.addEventListener('click', f3);
