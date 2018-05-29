import React from 'react';
import firebase from 'react-native-firebase';
import { FlatList, Button, View, Text, TextInput } from 'react-native';
import BookingList from './BookingList'; // we'll create this next

class CreateBooking extends React.Component {
    constructor() {
        super();
        this.ref = firebase.firestore().collection('Bookings');
        this.unsubscribe = null;
        this.state = {
            textInput: '',
            loading: true,
            listOfBookings: [],
        };
    }
    componentDidMount() {
        this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate) 
    }
    
    componentWillUnmount() {
        this.unsubscribe();
    }

    updateTextInput(value) {
        this.setState({ textInput: value });
    }

    addBooking() {
        this.ref.add({
          title: this.state.textInput,
          complete: false,
        });
        this.setState({
          textInput: '',
        });
      }

      onCollectionUpdate = (querySnapshot) => {
        const listOfBookings = [];
        querySnapshot.forEach((doc) => {
          const { title, complete } = doc.data();
          listOfBookings.push({
            key: doc.id,
            doc, // DocumentSnapshot
            title,
            complete,
          });
        });
        this.setState({ 
        listOfBookings,
        loading: false,
       });
      }


render() {
    if (this.state.loading) {
        return null; // or render a loading icon
      }

    return (
    <View style={styles.mainConatiner}>
        <FlatList style = {styles.flatList}
            data={this.state.listOfBookings}
            renderItem={({ item }) => <BookingList style= {styles.listStyle} {...item} />}
        />
        <TextInput style = {styles.listStyle}
            placeholder={'Skriv in din bokning...'}
            value={this.state.textInput}
            onChangeText={(text) => this.updateTextInput(text)}
        />
        <Button
            title={'Lägg till bokning!'}
            disabled={!this.state.textInput.length}
            onPress={() => this.addBooking()}
            color = '#3DCC90'
        />
    </View>
    );
}
}

const styles = {
    mainConatiner: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: 300,

    },
    listStyle: {
        color:'#FFFFFF',
    },
    flatList: {
        width: 300,
        marginTop: 100,
    },
};

export default CreateBooking;