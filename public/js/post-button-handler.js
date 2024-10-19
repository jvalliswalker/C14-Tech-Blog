

document.addEventListener('click', (event) => {

  const targetId = event.target.id;
  const targetDataset = event.target.dataset;

  // Handle new post button
  if(targetId == 'new-post'){
    window.location.href = '/new-post';
  }

  // Handle Edit and Comment buttons
  else if (targetDataset.postId){

    if(targetDataset.buttonType == 'editPost'){
      window.location.href = `/post/edit/${targetDataset.postId}`;
    }
    else if(targetDataset.buttonType == 'commentOnPost'){
      window.location.href = `/post/comment/${targetDataset.postId}`
    }
  }
})