document.addEventListener('DOMContentLoaded', function() {
    // Fetch all posts and display on homepage
    fetch('/api/posts')
      .then(response => response.json())
      .then(posts => {
        const postsContainer = document.getElementById('posts');
        posts.forEach(post => {
          const postElement = document.createElement('div');
          postElement.innerHTML = `
            <h2>${post.title}</h2>
            <p>${post.content.substring(0, 200)}...</p>
            <a href="/views/post.html?id=${post._id}">Read more</a>
          `;
          postsContainer.appendChild(postElement);
        });
      })
      .catch(error => console.error('Error fetching posts:', error));
  
    // Handle form submission to create new post
    const newPostForm = document.getElementById('new-post-form');
    newPostForm.addEventListener('submit', function(event) {
      event.preventDefault();
  
      const formData = new FormData(this);
      const title = formData.get('title');
      const content = formData.get('content');
  
      fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, content })
      })
      .then(response => response.json())
      .then(newPost => {
        alert('New post created successfully!');
        window.location.href = '/views/home.html';
      })
      .catch(error => console.error('Error creating post:', error));
    });
  });
  