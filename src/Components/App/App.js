import React, { Component, Fragment } from 'react';

// Import librairie axios
import Axios from 'axios';

// Import composants GuessMask, KeyBoard et Counter
import GuessMask from '../GuessMask/GuessMask';
import KeyBoard from '../KeyBoard/KeyBoard';
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
    }
  
    // Requête GET pour aller chercher data JSON
    componentWillMount() {
        Axios
            .get('http://localhost:3000/data/wordGuess.json')
            .then(({ data }) => {
                this.setState({ 
                    wordGuess: data,
                },
                    () => this.randomWordGuess()
                );
            })
            .catch((err)=> {})
    }
  
    // Mise en place du mot aléatoire
    randomWordGuess = () => {
        const { wordGuess } = this.state; 
        const wordTab = wordGuess.map(word => word.guessWord);
        const randomWord = wordTab[Math.floor(Math.random() * wordTab.length)];
        const extractletter = randomWord.toLocaleUpperCase().split('');
        this.setState({
            wordGuess: extractletter
        })
    }

    // Feedback visible ou hidden concernant le masque de devinette
    getFeedbackForLetterGuess = letterGuess => {
        const { isActive } = this.state;
        const isActiveTab = isActive.includes(letterGuess)
        if(isActiveTab){
            return letterGuess && 'visible'
        }
        else{
            return letterGuess && 'hidden';
        }
    }
  
    // Manipulation du clavier
    handleKeyBoard = letter => {
        const { isClicked, isActive, counter } = this.state;
        const newCounter = counter + 1
        this.setState({
            isClicked: [...isClicked, letter],
            isActive: [...isActive, letter],
            counter: newCounter
        });
        return;
    }

    newGame = () => {
        this.setState({ isClicked: [], isActive: [], counter: 0, wordGuess: [] }, () => this.componentWillMount() )
    }

    // Feedback isClicked ou isNotClicked concernant le clavier de boutons
    getFeedbackForKeyBoard = letter => {
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
                <div className="replay-button--area">
                    <button 
                        className="replay-button"
                        onClick={ this.newGame }
                    >
                        New Game
                    </button>
                </div>
                <div className="keyboard">
                { letters.map((letter, index) => (
                    <KeyBoard 
                        key={ index }
                        letter={ letter }
                        feedback={ this.getFeedbackForKeyBoard(letter) }
                        onClick={ this.handleKeyBoard }
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