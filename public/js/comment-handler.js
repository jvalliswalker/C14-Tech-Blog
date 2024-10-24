document.addEventListener('click', async (event) => {

  if(event.target.id == "submit-post-comment"){
    console.log('clicked');
    
    const submitResponse = await submitCommentToPost();

    if(submitResponse.ok){
      location.reload();
    }
    else{
      console.log('submit comment error');
    }
  }
})

  
async function getCommentsForPost(){

  const postCardElement = document.querySelector('div.card[data-post-id]');
  const postId = postCardElement.dataset.postId;

  const response = await fetch(`/api/comment/${postId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if(response.ok){
    return await response.json();
  }
  else{
    return [];
  }
}

async function submitCommentToPost(){

  const postCardElement = document.querySelector('div.card[data-post-id]');
  const commentInput = document.querySelector('textarea');
  const postId = postCardElement.dataset.postId;

  console.log('commentInput',commentInput);

  const response = await fetch(`/api/comment/${postId}`, {
    method: 'POST',
    body: JSON.stringify({ content: commentInput.value }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  return response;
}