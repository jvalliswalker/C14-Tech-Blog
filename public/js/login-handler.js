async function handleLogIn(formData){

  const loginResponse = await fetch('/api/user/login', {
    method: 'POST',
    body: JSON.stringify({
      username: formData['form-login-username'],
      password: formData['form-login-password']
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })

  return loginResponse;
}