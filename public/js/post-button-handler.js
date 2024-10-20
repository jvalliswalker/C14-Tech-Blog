document.addEventListener("click", (event) => {

  const targetId = event.target.id;
  const dataset = event.target.dataset;

  // Handle new post button
  if (targetId == "new-post") {
    window.location.href = "/new-post";
  }

  // Handle blog pill click
  if (dataset.identity == "blog-pill") {
    if (dataset.clickEffect == "update") {
      window.location.href = `/post/edit/${dataset.postId}`;
    } else if (dataset.clickEffect == "comment") {
      window.location.href = `/post/comment/${dataset.postId}`;
    }
  }
});
