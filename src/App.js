import React, { Component } from 'react';
import firebase from './firebase';
import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      Book: [],
      Movie: [],
      userInput: '', //for controlled input - best practice in React. When user inputs value => onChange updates State => State updates userInput.
      topic: 'Book',
    };
  }

  componentDidMount() {
    const handleTopicChange = id => {
      const ref = firebase.database().ref(id);
      ref.on('value', (data) => { 

        const response = data.val();
        const newState = []; 

        for (let key in response) { 
          newState.push({
            title: response[key],
            uniqueKey: key
          });
        }
        this.setState({
          [id]: newState,
        });
      });
    };

    handleTopicChange('Movie');
    handleTopicChange('Book');
  }

  handleChange = (event) => {
    this.setState({
      userInput: event.target.value,  //if you have multiple user inputs for state you would need to use the function [event.target.name]: event.target.value, (if you have multiple inputs you need to add a name="" to them then use the former code to switch between them).
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const dbRef = firebase.database().ref(this.state.topic);
    dbRef.push(this.state.userInput);

    this.setState({
      userInput: '', //clear the field after submit
    });
  };

  handleTopic = (event) => {
    this.setState({
      topic: event.target.value
    });
  }

  removeBook = (bookId) => {

    const dbRef = firebase.database().ref(this.state.topic);

    dbRef.child(bookId).remove(); //having .child is important here. It can work without the .child, but if a bookId comes back null or undefined the function will still try to run .remove() and end up deleting the whole database.

  }

  render() {
    return (
      <div className="App">
        <h1>A Few of My Favourite Things</h1>
        <button value="Movie" onClick={this.handleTopic}>Fav Movie</button>
        <button value="Book" onClick={this.handleTopic}>Fav Book</button>
        <form action="">
          <input onChange={this.handleChange} type="text" value={this.state.userInput} />
          <button onClick={this.handleSubmit}>Add New Item</button>
        </form>
        <ul>
          {this.state[this.state.topic].map((book) => {
            return (
              <li key={book.uniqueKey}>
                <p>{book.title}</p>
                <button onClick={() => this.removeBook(book.uniqueKey)}>Remove Book</button>
              </li>
            )
          })}
        </ul>
      </div>
    );
  }
}

export default App;
