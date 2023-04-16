import React from 'react';
import Header from './Header';
import DataT1 from './DataT1';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";
import Modal from 'react-modal';

let baseUrl2 = process.env.REACT_APP_API || 'http://localhost:3004';

class Show extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      posts: [],
      isModalOpen: false
    }
  }

  openModal = () => {
    this.setState({ isModalOpen: true });
  }

  closeModal = () => {
    this.setState({ isModalOpen: false });
  }

  fetchPosts(articleUrl) {
    fetch(baseUrl2 + '/comments?articleUrl=' + encodeURIComponent(articleUrl))
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({ posts: data });
      })
      .catch(error => console.error('Error fetching posts:', error));
  }


  handleCreate = (createdPost) => {
    console.log("State before calling handleCreate:", this.state);
    console.log("Sending data to the backend:", createdPost);
    fetch(
      `${baseUrl2}/comments`,
      {
        body: JSON.stringify(createdPost),
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        }
      }
    )
      .then(createdPost => {
        return createdPost.json()
      }
      )
      .then(jsonedPost => {
        this.setState({
          posts: jsonedPost
        })
      }).catch(error => console.log(error))
  }

  removePost = (post) => {
    const updatedPosts = this.state.posts.filter((_, index) => index !== post);
    this.setState({ posts: updatedPosts });
  }

  handleDelete = (id) => {
    fetch(`${baseUrl2}/comments/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    })
      .then(json => {
        this.setState(prevState => {
          const posts = prevState.posts.filter(post => post._id !== id);
          return { posts };
        });
      })
      .catch(err => console.log(err));
  }


  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const articleUrl = this.props.location.state.news.url;
    let newPost = {
      articleUrl: articleUrl,
      name: this.state.name,
      email: this.state.email,
      body: this.state.body,
    };

    fetch(`${baseUrl2}/comments`, {
      method: 'POST',
      body: JSON.stringify(newPost),
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
    })
      .then(response => response.json())
      .then(json => {
        this.setState(prevState => ({
          posts: [json, ...prevState.posts],
          name: '',
          email: '',
          body: '',
          isModalOpen: false
        }));
      })
      .catch(err => console.log(err));
  };

  componentDidMount() {
    const articleUrl = this.props.location.state.news.url;
    this.fetchPosts(articleUrl);
  }



  render() {
    console.log(this.state.posts)
    return (
      <div>
        <ul>
          <li><Link to="/">Home |</Link></li>
          <li><Link to="/About"> About |</Link></li>
          <li><Link to="/Price"> Crypto Price |</Link></li>
        </ul>
        <Header />
        <br />
        <div className="div3">
          <dl className="dlOne">
            <dt><h3>{this.props.location.state.news.title}</h3></dt>
            <dd id="title"></dd>
            <dt>-----------------------------------------------------------------------------</dt>
            <dt>Author: {this.props.location.state.news.author}</dt>
            <dd id="Author"></dd>
            <dt>Description: {this.props.location.state.news.description}</dt>
            <dd id="description"></dd>
            <dt>Webpage: <a href={this.props.location.state.news.url} target="_blank" rel="noopener noreferrer">{this.props.location.state.news.source.name}</a></dt>
            <dd id="webpage"></dd>
          </dl>
          <div>
            {Array.isArray(this.state.posts) &&
              this.state.posts.map((post, index) => (
                // eslint-disable-next-line no-sequences
                console.log("Post object:", post),
                <dl key={index} className="dlOne">
                  <dt>Name: {post.name}</dt>
                  <dd id="Name"></dd>
                  <dt>Email: {post.email}</dt>
                  <dd id="Email"></dd>
                  <dt>Post: {post.body}</dt>
                  <dd id="Post"></dd>

                  <button className='delete' onClick={() => { this.handleDelete(post._id) }}>DELETE</button>
                </dl>
              ))
            }
            <button className='modal-button' onClick={this.openModal}>Add Comment</button>
          </div>

          <Modal
            isOpen={this.state.isModalOpen}
            onRequestClose={this.closeModal}
            contentLabel="Add Comment"
            className="modal-content"
          >
            <div className="modal-header">
              <h2>Add Comment</h2>
              <button className="modal-close" onClick={this.closeModal}>&times;</button>
            </div>
            <form onSubmit={this.handleSubmit}>
              <input type="text" placeholder="Your name" id="name" value={this.state.name} onChange={this.handleChange} /><br />
              <input type="text" placeholder="Your email" id="email" value={this.state.email} onChange={this.handleChange} /><br />
              <textarea placeholder="Comments here" id="body" value={this.state.body} onChange={this.handleChange}></textarea><br />
              <input className="submit" type="submit" value="Submit" />
            </form>
          </Modal>


        </div>
      </div>
    )
  }
}


export default Show;