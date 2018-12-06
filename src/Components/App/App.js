import React, { Component, Fragment } from 'react';

// Import librairie axios
import Axios from 'axios';

// Import composants GuessMask, TestButton et Counter
import GuessMask from '../GuessMask/GuessMask';
import TestButton from '../TestButton/TestButton';
import Counter from '../Counter/Counter';

import './App.css';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      wordGuess: [],
      letters: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
      isClicked: [],
      isActive: [],
      counter: 0
    }
    this.wordBeingGuessed = [];
  }

  componentWillMount() {

    Axios
      .get('http://localhost:3000/data/wordGuess.json')
      .then(({ data }) => {
        this.setState({ 
          wordGuess: data,
        },  () => {
          this.randomWordGuess()
        });
      })
      .catch((err)=> {})

  }
  
  randomWordGuess = () => {

      const { wordGuess } = this.state; 

      const wordTab = wordGuess.map(word => word.guessWord);
      const randomWord = wordTab[Math.floor(Math.random() * wordTab.length)];

      const extractletter = randomWord.toLocaleUpperCase().split('');

      this.setState({
        wordGuess: extractletter
      })

  }

  getFeedbackForLetterGuess = letterGuess => {

    const { isActive } = this.state;

    const isActiveTab = isActive.includes(letterGuess)
    
    if(isActiveTab){
      this.wordBeingGuessed.push(letterGuess);
      return letterGuess && 'visible'
    }
    else{
      return letterGuess && 'hidden';
    }

    

  }

  handleTestButtonClick = letter => {

    const { isClicked, isActive, counter } = this.state;
    const newCounter = counter + 1

    this.setState({
      isClicked: [...isClicked, letter],
      isActive: [...isActive, letter],
      counter: newCounter
    });

    return;

  }

  getFeedbackForTestButton = letter => {

    const{ isClicked } = this.state;
    const isClickedTab = isClicked.includes(letter)

    if(isClickedTab){
      return letter && 'is-clicked'
    }
    else{
      return letter && 'is-not--clicked'; 
    }

  }
  
  render() {
    
    const { wordGuess, letters, counter } = this.state;

    const wordGuessExtract = wordGuess.map((letterGuess, index) => (
        <GuessMask 
          key={ index }
          letterGuess={ letterGuess }
          feedback={ this.getFeedbackForLetterGuess(letterGuess) }
        />
    ))

    return (
      <Fragment>
        <div className="guess-mask">
          { wordGuessExtract }
        </div>
        <div className="test-button">
        { letters.map((letter, index) => (
          <TestButton 
            key={ index }
            letter={ letter }
            feedback={ this.getFeedbackForTestButton(letter) }
            onClick={ this.handleTestButtonClick }
          />
        )) }
        </div>
        <div className="counter">
          <Counter 
            counter={ counter }
          />
        </div>
      </Fragment>
    )

  }
}

export default App;