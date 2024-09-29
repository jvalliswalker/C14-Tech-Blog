async function handleSignUp(formData){

  const signUpReponse = await fetch('/api/sign-up', {
    method: 'POST',
    body: JSON.stringify({
      username: formData['form-sign-up-username'],
      email: formData['form-sign-up-email'],
      password: formData['form-sign-up-password']
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })

  return signUpReponse;
}