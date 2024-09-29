// Variables
// ====================
const formIdSignIn = 'form-sign-in'; 

// Process
// ====================

document.body.addEventListener("submit", (event) => {
  event.preventDefault();
  const formsData = getFormsData();
  
  if(Object.keys(formsData).includes(formIdSignIn)){
    handleSignIn(formsData[formIdSignIn])
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