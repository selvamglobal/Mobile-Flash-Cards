import React from 'react';
import { View,Platform,StyleSheet,StatusBar } from 'react-native';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from '../reducers/index.js';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { setNotification } from '../util/notificationAPI';
import NewDeck from './deck/NewDeck';
import DecksList from './deck/DecksList.js';
import IndividualDeck from './deck/IndividualDeck.js';
import NewQuestion from './question/NewQuestion';
import { purple, white } from '../util/colors';
import Quiz from './quiz/Quiz.js';
import { FontAwesome, Foundation } from '@expo/vector-icons';
import { Constants } from 'expo';

function UdaciStatusBar({ backgroundColor, ...props }) {
    return (
        <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
            <StatusBar translucent backgroundColor={backgroundColor} {...props} />
        </View>
    )
}
const Tabs = TabNavigator({
    DecksList: {
        screen: DecksList,
        navigationOptions: {
            tabBarLabel: 'All decks',
            tabBarIcon: ({ tintColor }) => <Foundation name='list' size={30} color={tintColor} />
        },
    },
    NewDeck: {
        screen: NewDeck,
        navigationOptions: {
            tabBarLabel: 'Add new deck',
            tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />
        },
    },
}, {
        navigationOptions: {
            header: null
        },
        tabBarOptions: {
            activeTintColor: Platform.OS === 'ios' ? purple : white,
            style: {
                height: 56,
                backgroundColor: Platform.OS === 'ios' ? white : purple,
                shadowColor: 'rgba(0, 0, 0, 0.24)',
                shadowOffset: {
                    width: 0,
                    height: 3
                },
                shadowRadius: 6,
                shadowOpacity: 1
            }
        }
    }
);

const AppNavigator = StackNavigator({
    Home: {
        screen: Tabs,
        navigationOptions: { title: 'Home' },
    },
    IndividualDeck: {
        screen: IndividualDeck,
        navigationOptions: {
            headerTintColor: '#000',title: 'Card',
        },
    },
    Quiz: {
        screen: Quiz,
        navigationOptions: {
            title: 'Quiz',
            headerTintColor: '#000',
        },
    },
    NewQuestion: {
        screen: NewQuestion,
        navigationOptions: {
            title: 'Add Question',
            headerTintColor: '#000',
        },
    },
});

export default class Index extends React.Component {
    componentDidMount() {
        setNotification();
    }

    render() {
        return <Provider store={createStore(reducer)}>        
            <View style={{ flex: 1 }}>
            <UdaciStatusBar backgroundColor={purple} barStyle="light-content" />
                <AppNavigator />
            </View>
        </Provider>
    }
}
