async function handleSubmitPost(formData){
  const submitResponse = await fetch('/api/post/submit', {
    method: 'POST',
    body: formData,
    headers: {
      'Content-Type': 'application/json'
    }
  })

  return submitResponse;
}