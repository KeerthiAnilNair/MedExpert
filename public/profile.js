const name = document.querySelector('.nnam');  
const age = document.querySelector('.nage'); 
const bg = document.querySelector('.nbg'); 
const weight = document.querySelector('.nw'); 
const height = document.querySelector('.nh'); 
const al = document.querySelector('.al');

async function v2(){
    const name = name.value;
    const age = age.value;
    const bg = bg.value;
    const weight = weight.value;
    const height = height.value;
    
try {
    const response = await fetch('/profile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        age: age,
        bloodgroup: bg,
        weight: weight,
        height: height
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