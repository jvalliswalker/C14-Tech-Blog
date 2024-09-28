// Variables
// ====================


// Process
// ====================

document.body.addEventListener("submit", (event) => {
  event.preventDefault();

  console.log('submitted');
  getInputValues();
})

// Functions
// ====================

function getInputValues(){

  const inputs = document.querySelectorAll('input');

  for(const input of inputs){
    console.log(input.value);
  }

}