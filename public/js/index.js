// Variables
// ====================
const formIdLogIn = 'form-login'; 

// Process
// ====================

document.body.addEventListener("submit", (event) => {
  event.preventDefault();
  const formsData = getFormsData();
  
  if(Object.keys(formsData).includes(formIdLogIn)){
    // Hide login error message if present
    document.getElementById('login-error-message').hidden = true;
 
    // Call login endpoint with credentials and return response
    const loginResponse = handleLogIn(formsData[formIdLogIn])

    // Return to homepage if login successful
    if(loginResponse == true){
      document.location.replace('/');
    }
    // Display login error message if login unsuccessful
    else {
      document.getElementById('login-error-message').hidden = false;
    }
  }
})

// Functions
// ====================

function getFormsData(){

  // Query elements
  const inputs = document.querySelectorAll('input');
  const forms = document.querySelectorAll('form');
  
  // Create and seed form from forms on page
  const formIdToInputsMap = {};

  for(const form of forms){
    formIdToInputsMap[form.id] = {};
  }

  // Assign inputs to form map
  for(const input of inputs){
    formIdToInputsMap[input.dataset.formId][input.id] = input.value;
  }

  // Return map
  return formIdToInputsMap;
}