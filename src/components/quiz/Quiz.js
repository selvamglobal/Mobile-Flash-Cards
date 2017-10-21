import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import { purple, orange, blue,white,red } from '../../util/colors';
import { NavigationActions } from 'react-navigation'


export default class Quiz extends React.Component {

    state = {
        questionIndex: 0,
        correctAnswers: 0,
        shouldShowAnswer: false,
    };

    onCorrect = () => {
        const {questionIndex, correctAnswers} = this.state;
        this.setState({questionIndex: questionIndex + 1, correctAnswers: correctAnswers + 1, shouldShowAnswer: false});
    };

    startQuiz = () => {
        this.setState({questionIndex: 0, correctAnswers: 0, shouldShowAnswer: false});
    };

    backToDeck = () => {
        this.props.navigation.goBack();

    }

    onIncorrect = () => {
        this.setState({questionIndex: this.state.questionIndex + 1});
    };

    showAnswer = () => {
        this.setState({shouldShowAnswer: !this.state.shouldShowAnswer});
    };

    render() {
        const {questionIndex, correctAnswers, shouldShowAnswer} = this.state;
        const {questions} = this.props.navigation.state.params;
        const isQuestionAvailable = questionIndex < questions.length;
        const questionLeft = questions.length - questionIndex;

        return (
            <View style={{flex: 1}}>
                {isQuestionAvailable ? (
                    <View style={styles.container}>

                        <View style={[styles.group, {justifyContent: 'flex-start', flex: 1}]}>
                            <View>
                                <Text>Remaining questions/Total Questions: {questionLeft} / {questions.length}</Text>
                            </View>
                        </View>

                        <View style={[styles.group, {flex:2}]}>
                            <View>
                                {shouldShowAnswer ? (
                                    <View style={{alignItems: 'center'}}>
                                        <Text style={{fontSize: 36}}>{questions[questionIndex].answer}</Text>

                                        <TouchableOpacity onPress={this.showAnswer}>
                                            <Text style={{fontSize: 18, color: '#70dd2f'}}>Question</Text>
                                        </TouchableOpacity>

                                    </View>) : (
                                    <View style={{alignItems: 'center'}}>
                                        <Text style={{fontSize: 36}}>{questions[questionIndex].question}</Text>

                                        <TouchableOpacity onPress={this.showAnswer}>
                                            <Text style={{fontSize: 18, color: '#ff463f'}}>Answer</Text>
                                        </TouchableOpacity>

                                    </View>
                                )}
                            </View>
                        </View>

                        <View style={{alignItems: 'center',  flex: 2}}>
                            <View style={styles.container}>

                                <TouchableOpacity onPress={this.onCorrect}>
                                    <Text style={{
                                      backgroundColor: `${purple}`,
                                      justifyContent: 'center',
                                      height: 50,
                                      padding:10,
                                      color:`${white}`,
                                        textAlign: 'center',
                                        width: 200
                                    }}>Correct</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={this.onIncorrect}>
                                    <Text style={{
                                        backgroundColor: `${red}`,
                                        justifyContent: 'center',
                                        height: 50,
                                        padding:10,
                                        color:`${white}`,
                                        textAlign: 'center',
                                        width: 200,
                                        marginTop: 20
                                    }}>Incorrect</Text>
                                </TouchableOpacity>

                            </View>

                        </View>

                    </View>

                ) : (
                    <View style={styles.container}>
                        <Text>Your Score: {correctAnswers}</Text>

                        <View style={{alignItems: 'center', justifyContent: 'space-around', flex: 2}}>
                            <View style={styles.container}>

                                <TouchableOpacity onPress={this.startQuiz}>
                                    <Text style={{
                                        backgroundColor: `${blue}`,
                                        justifyContent: 'center',
                                        color:`${white}`,
                                        height: 50,
                                        textAlign: 'center', 
                                        padding:10,
                                        width: 200
                                    }}>Start Quiz Again</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={this.backToDeck}>
                                    <Text style={{
                                        backgroundColor: `${red}`,
                                        justifyContent: 'center',
                                        padding:10,
                                        color:`${white}`,
                                        height: 50,
                                        textAlign: 'center',
                                        width: 200,
                                        marginTop: 20
                                    }}>Back to Deck</Text>
                                </TouchableOpacity>

                            </View>

                        </View>
                    </View>
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20, margin:24
    }
});
