const et = document.querySelector('.e');
const pt = document.querySelector('.p');
const bt = document.querySelector('.bt');
const al = document.querySelector('.al');
var ee = document.getElementById("ee")
var valem = /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/;
var fl = 1;

function val() {
  const txt = et.value;
  const pst = pt.value;

  if (txt == "" || pst == "") {
    if (txt == "") {
      et.placeholder = 'Enter valid email id';
    } else {
      pt.placeholder = 'Enter password';
    }
    document.getElementById("al").innerHTML = "*Details not entered";
  } else {
    document.getElementById("al").innerHTML = "";

    if (txt.match(valem)) {
      fl = 1;
    } else {
      fl = 2;
    }

    if (fl == 2) {
      document.getElementById("al").innerHTML = "*Invalid mail id";
    } else {
      document.getElementById("al").innerHTML = "";
      if (pst.length < 6) {
        document.getElementById("al").innerHTML = "*Invalid password";
      } else {
        // Send login request to the server
        const data = {
          email: txt,
          password: pst
        };
        fetch('/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
        .then(response => {
          if (response.ok) {
            // Login successful
            alert('Login successful');
            document.getElementById("al").innerHTML = "";
            window.location.href = "index.html";
          } else if (response.status === 404) {
            // User not found
            document.getElementById("al").innerHTML = "*User not found";
          } else if (response.status === 401) {
            // Invalid password
            document.getElementById("al").innerHTML = "*Invalid password";
          } else {
            throw new Error('Login failed');
          }
        })
        .catch(error => {
          console.error('Error authenticating user:', error);
          document.getElementById("al").innerHTML = "*Internal server error";
        });
      }
    }
  }
}

bt.addEventListener('click', val);
