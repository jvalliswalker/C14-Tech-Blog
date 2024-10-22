async function handleLogout(){
  const logoutResponse = await fetch('/api/user/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  return logoutResponse;
}