async function handleSubmitPost(formData){
  const response = await fetch('/api/post/submit', {
    method: 'POST',
    body: JSON.stringify(formData),
    headers: {
      'Content-Type': 'application/json'
    }
  })

  return response;
}


async function handleEditPost(formData){
  const response = await fetch('/api/post/edit', {
    method: 'POST',
    body: JSON.stringify(formData),
    headers: {
      'Content-Type': 'application/json'
    }
  })

  return response;
}

async function handleDeletePost(formData){
  const response = await fetch(`/api/post/delete/${formData.postId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  return response;
}


