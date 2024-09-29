// Variables
// ====================
const formIdLogIn = 'form-login'; 
const formIdSignUp = 'form-sign-up';

// Process
// ====================

document.body.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formsData = getFormsData();
  
  // Handle Login
  if(Object.keys(formsData).includes(formIdLogIn)){
    // Hide login error message if present
    document.getElementById('login-error-message').hidden = true;
 
    // Call login endpoint with credentials and return response
    const loginResponseRaw = await handleLogIn(formsData[formIdLogIn])    
    const loginResponse = await loginResponseRaw.json()
    
    // Return to homepage if login successful
    if(loginResponse.login_successful == true){
      document.location.replace('/');
    }
    // Display login error message if login unsuccessful
    else {
      document.getElementById('login-error-message').hidden = false;
    }
  }

  // Handle Sign-Up
  if(Object.keys(formsData).includes(formIdSignUp)){
    // Hide error message if visible
    const passwordMismatchError = document.getElementById('sign-up-error-password-mismatch');
    const somethingWrongError = document.getElementById('sign-up-error-something-wrong');

    passwordMismatchError.hidden = true;
    somethingWrongError.hidden = true;

    const signUpResponseRaw = await handleSignUp(formsData[formIdSignUp]);
    const signUpResponse = await signUpResponseRaw.json();

    if(signUpResponse.signup_successful){
      document.location.replace('/');
    }
    else {
      somethingWrongError.hidden = false;
    }
  }
})

document.body.addEventListener('click', async (event) => {

  const elementId = event.target.id;

  if(elementId == 'button-logout'){
    await handleLogout();
    document.location.replace('/');
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