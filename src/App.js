import React, { Component } from 'react';
import firebase from './firebase';
import './App.css';
import heart from './assets/heart.png'
import movie from './assets/movie.png'
import book from './assets/book.png'
import beer from './assets/beer.png'
import coffee from './assets/coffee.png'
import vacation from './assets/vacation.png'
import band from './assets/band.png'
import chips from './assets/chips.png'
import meal from './assets/meal.png'
import restaurant from './assets/restaurant.png'
import song from './assets/song.png'
import tv from './assets/tv.png'
import animal from './assets/animal.png'
import sport from './assets/sport.png'
import wine from './assets/wine.png'
import sauce from './assets/sauce.png'
import phoneApp from './assets/app.png'
import Modal from './Modal'
import background from './assets/background.jpg'

class App extends Component {
  constructor() {
    super();

    this.state = {
      Book: [],
      Movie: [],
      Beer: [],
      Coffee: [],
      Vacation: [],
      Band: [],
      Chips: [],
      Meal: [],
      Restaurant: [],
      Song: [],
      TV: [],
      Animal: [],
      Sport: [],
      Wine: [],
      Sauce: [],
      phoneApp: [],
      userInput: '', //for controlled input - best practice in React. When user inputs value => onChange updates State => State updates userInput.
      userComment: '',
      topic: 'Book',
      isShowing: false,
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
    handleTopicChange('Beer');
    handleTopicChange('Coffee');
    handleTopicChange('Vacation');
    handleTopicChange('Band');
    handleTopicChange('Chips');
    handleTopicChange('Meal');
    handleTopicChange('Restaurant');
    handleTopicChange('Song');
    handleTopicChange('TV');
    handleTopicChange('Animal');
    handleTopicChange('Sport');
    handleTopicChange('Wine');
    handleTopicChange('Sauce');
    handleTopicChange('PhoneApp');
    
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
        //if you have multiple user inputs for state you would need to use the function [event.target.name]: event.target.value, (if you have multiple inputs you need to add a name="" to them then use the former code to switch between them).
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    this.state.combo = this.state.userInput + " - " + this.state.userComment;

    let dbRef = firebase.database().ref(this.state.topic);
    dbRef.push({
      thing: this.state.userInput,
      comment: this.state.userComment
    });

    this.setState({
      userInput: '', //clear the field after submit
      userComment: '',
    });
  };

  handleTopic = (event) => {
    event.preventDefault();
    this.setState({
      topic: event.target.value,
      isShowing: true,
    });
  }

  removeBook = (bookId) => {

    const dbRef = firebase.database().ref(this.state.topic);

    dbRef.child(bookId).remove(); //having .child is important here. It can work without the .child, but if a bookId comes back null or undefined the function will still try to run .remove() and end up deleting the whole database.

  }

  closeModalHandler = () => {
    this.setState({
      isShowing: false
    });
  }

  render() {
    return (
      <div className="App">
          <img src={heart}></img>
          <h1>A Few of My Favourite Things ❤</h1>
        {this.state.isShowing &&
          <div className="modalParent">
            <section >
              <Modal
                className="modal"
                show={this.state.isShowing}
                close={this.closeModalHandler}
                topic={this.state.topic}>
                {this.state[this.state.topic].map((book) => {
                  return (
                    <ul>
                      <li key={book.uniqueKey}>
                        <p><span className="itemStyle">{book.title.thing}</span> {book.title.comment}</p>
                        <button onClick={() => this.removeBook(book.uniqueKey)}>Remove</button>
                      </li>
                    </ul>
                  )
                })}
              </Modal>
            </section>
            <section>
              <Modal
                className="modal"
                show={this.state.isShowing}
                close={this.closeModalHandler}
                topic={this.state.topic}>
                <form action="">
                  <input onChange={this.handleChange} type="text" name="userInput" placeholder="Item" value={this.state.userInput} />
                  <input onChange={this.handleChange} type="text" name="userComment" placeholder="Because..." value={this.state.userComment} />
                  <button onClick={this.handleSubmit}>Add New Item</button>
                </form>
              </Modal>
            </section>
          </div>}

          <div className="gridContainer">
            <form className="container" buttons="">
              <div>
                <input type="image" src={movie} alt="Movie" value="Movie" name="Movie" onClick={this.handleTopic}/>
                <label for="Movie">Movie</label>
              </div>
              <div>
                <input type="image" src={book} alt="Book" value="Book" name="Book" onClick={this.handleTopic} />
                <label for="Book">Book</label>
              </div>
              <div>
                <input type="image" src={beer} alt="Beer" value="Beer" name="Beer" onClick={this.handleTopic} />
                <label for="Beer">Beer</label>
              </div>
              <div>
                <input type="image" src={coffee} alt="Coffee" value="Coffee" name="Coffee" onClick={this.handleTopic} />
                <label for="Coffee">Coffee</label>
              </div>
              <div>
                <input type="image" src={vacation} alt="Vacation" value="Vacation" name="Vacation" onClick={this.handleTopic} />
                <label for="Vacation">Vacation</label>
              </div>
              <div>
                <input type="image" src={band} alt="Band" value="Band" name="Band" onClick={this.handleTopic} />
                <label for="Band">Band</label>
              </div>
              <div>
                <input type="image" src={chips} alt="Chips" value="Chips" name="Chips" onClick={this.handleTopic} />
                <label for="Chips">Chips</label>
              </div>
              <div>
                <input type="image" src={meal} alt="Meal" value="Meal" name="Meal" onClick={this.handleTopic} />
                <label for="Meal">Meal</label>
              </div>
              <div>
                <input type="image" src={restaurant} alt="Restaurant" value="Restaurant" name="Restaurant" onClick={this.handleTopic} />
                <label for="Restaurant">Restaurant</label>
              </div>
              <div>
                <input type="image" src={song} alt="Song" value="Song" name="Song" onClick={this.handleTopic} />
                <label for="Song">Song</label>
              </div>
              <div>
              <input type="image" src={animal} alt="Animal" value="Animal" name="Animal" onClick={this.handleTopic} />
              <label for="Animal">Animal</label>
              </div>
              <div>
                <input type="image" src={sport} alt="Sport" value="Sport" name="Sport" onClick={this.handleTopic} />
                <label for="Sport">Sport</label>
              </div>
              <div>
                <input type="image" src={tv} alt="TV-Show" value="TV" name="TV" onClick={this.handleTopic} />
                <label for="TV">TV-Show</label>
              </div>
              <div>
                <input type="image" src={wine} alt="Wine" value="Wine" name="Wine" onClick={this.handleTopic}  />
                <label for="Wine">Wine</label>
              </div>
            <div>
              <input type="image" src={sauce} alt="Sauce" value="Sauce" name="Sauce" onClick={this.handleTopic} />
              <label for="Sauce">Sauce</label>
            </div>
            <div>
              <input type="image" src={phoneApp} alt="PhoneApp" value="PhoneApp" name="PhoneApp" onClick={this.handleTopic} />
              <label for="PhoneApp">App</label>
            </div>
            </form>
          </div>
        <div className="footerText">
          <p>Copyright © <a href="www.jeffrudd.dev" target="_blank">Jeff Rudd</a> 2019</p>
          <p>Icons made by <a href="https://www.flaticon.com/authors/freepik" target="_blank">Freepik</a> from <a href="https://www.flaticon.com/" target="_blank">Flaticon</a></p>
        </div>

      </div>
    );
  }
}

export default App;
