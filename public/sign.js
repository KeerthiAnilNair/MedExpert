const et = document.querySelector('.e');
const pt = document.querySelector('.p');
const bt = document.querySelector('.bt');
const al = document.querySelector('.al');
const dt = document.querySelector('.d');
const nt = document.querySelector('.n');
var valem = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
var fl = 1;

async function vl() {
  const txt = et.value;
  const pst = pt.value;
  const dat = dt.value;
  const nmt = nt.value;

  if (txt === '' || pst === '' || dat === '' || nmt === '') {
    if (nmt === '') {
      nt.placeholder = 'Enter name';
      al.textContent = '*Details not entered';
    } else if (txt === '') {
      et.placeholder = 'Enter valid email id';
      al.textContent = '*Details not entered';
    } else if (pst === '') {
      pt.placeholder = 'Enter password';
      al.textContent = '*Details not entered';
    } else {
      al.textContent = '*DOB not entered';
    }
  } else {
    al.textContent = '';
    if (txt.match(valem)) {
      fl = 1;
    } else {
      fl = 2;
    }
    if (fl === 2) {
      al.textContent = '*Invalid mail id';
    } else {
      al.textContent = '';
      if (pst.length < 6) {
        al.textContent = '*Minimum password length is 6';
      } else {
        try {
          const response = await fetch('/signup', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              username: nmt,
              email: txt,
              birthdate: dat,
              password: pst
            })
          });
          const data = await response.json();
          if (response.status === 200) {
            alert('Sign-up successful');
            al.textContent = '';
            window.location.href = 'home.html';
          } else if (response.status === 400) {
            al.textContent = data.message;
          } else {
            al.textContent = 'An error occurred. Please try again later.';
          }
        } catch (error) {
          console.error('Error signing up:', error);
          al.textContent = 'An error occurred. Please try again later.';
        }
      }
    }
  }
}

bt.addEventListener('click', vl);
