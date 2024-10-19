

document.addEventListener("DOMContentLoaded", async function() {

    const comments = await getCommentsForPost();

    console.log(comments);

});

async function getCommentsForPost(){

  const postCardElement = document.querySelector('div.card[data-post-id]');
  const postId = postCardElement.dataset.postId;

  const response = await fetch(`/api/comment/:postId`, {
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

  const response = await fetch(`/api/comment/:postId`, {
    method: 'POST',
    body: JSON.stringify({ content: commentInput.innerHTML }),
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