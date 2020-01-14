import React, { Component } from 'react';

import './Posts.css';

class Posts extends Component {
  constructor() {
    super();
    this.state = {
      posts: []
    };
  }

  componentDidMount() {
    fetch('/api/v1/posts')
      .then(res => res.json())
      .then(posts =>
        this.setState({ posts }, () =>
          console.log('Posts fetched ✔✨✨✔', posts)
        )
      );
  }

  render() {
    return (
      <div>
        <h2>Posts</h2>
        <ul>
          {this.state.posts.map(post => (
            <li key={post.id}>
              {post.title}, {post.content}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Posts;
