import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, Picker, Switch, Button, PanResponder, Alert } from 'react-native';
import DatePicker from 'react-native-datepicker';
import * as Animatable from 'react-native-animatable';

class Reservation extends Component {

    constructor(props) {
        super(props);

        this.state = {
            campers: 1,
            hikeIn: false,
            date: '',
            // showModal: false
        };
    }

    // toggleModal() {
    //     this.setState({showModal: !this.state.showModal});
    // }
 
    static navigationOptions = {
        title: 'Reserve Campsite'
    }

    handleReservation() {
        console.log(JSON.stringify(this.state));
        let message = `Number of Campers: ${this.state.campers}
                        \nHike-In? ${this.state.hikeIn}
                        '\nDate: ${this.state.date}`;
        Alert.alert (
            'Begin Search?',
            message,
        [
            {
                text: 'Cancel',
                onPress: () => {
                    console.log('Reservation Search Canceled');
                    this.resetForm();
                },
                style: 'cancel'
            },
            {
                text: 'OK',
                onPress: () => {this.resetForm()}
            }
        ],
        {cancelable: false}
        );
    }

      resetForm() {  
        this.setState({
            campers: 1,
            hikeIn: false,
            date: '',
            // showModal: False
        });
    }

    render() {
        return (
            <Animatable.View animation='zoomIn' duration={2000} delay={1000}> 
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Number of Campers</Text>
                    <Picker
                        style={styles.formItem}
                        selectedValue={this.state.campers}
                        onValueChange={itemValue => this.setState({campers: itemValue})}>
                        <Picker.Item label='1' value='1' />
                        <Picker.Item label='2' value='2' />
                        <Picker.Item label='3' value='3' />
                        <Picker.Item label='4' value='4' />
                        <Picker.Item label='5' value='5' />
                        <Picker.Item label='6' value='6' />
                    </Picker>
                </View>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Hike-In?</Text>
                    <Switch
                        style={styles.formItem}
                        value={this.state.hikeIn}
                        trackColor={{true: '#5637EE', false: null}}
                        onValueChange={value => this.setState({hikeIn: value})}>
                    </Switch>
                </View>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>When?</Text>
                    <DatePicker
                        style={{flex: 2, marginRight: 20}}
                        date={this.state.date}
                        format='YYYY-MM-DD'
                        mode='date'
                        placeholder='Select Date'
                        minDate={new Date().toISOString()}
                        confirmBtnText='Confirm'
                        cancelBtnText='Cancel'
                        customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0
                            },
                            dateInput: {
                                marginLeft: 36
                            }
                        }}
                        onDateChange={date => {this.setState({date: date})}}
                    />
                </View>
                <View style={styles.formRow}>
                    <Button
                        onPress={() => this.handleReservation()}
                        title='Search'
                        color='#5637DD'
                        accessibilityLabel='Tap me to search for available campsites to reserve'
                    />
                </View>
                {/* <Modal
                    animationType={'slide'}
                    transparent={false}
                    visible={this.state.showModal}
                    onRequestClose={() => this.toggleModal()}>
                        <View style={styles.modal}>
                            <Text styule={styles.modalTitle}>Search Camp Reservations</Text>
                            <Text styule={styles.modalText}># of Campers: {this.state.campers}</Text>
                            <Text styule={styles.modalText}>Hiking In?: {this.state.hikeIn ? 'Yes' : 'No'}</Text>
                            <Text styule={styles.modalText}>When: {this.state.date}</Text>
                            <Button
                            onPress={() => {
                                this.toggleModal();
                                this.resetForm();
                            }} 
                            color='5672EE'
                            title='Close'
                          />
                        </View>
                    </Modal> */}
            </Animatable.View>
        );
    }
}

const styles = StyleSheet.create({
    formRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1
    },
    // modal: {
    //     justifyContent: 'center',
    //     margin: 20
    // },
    // modalTitle: {
    //     fontSize: 24,
    //     fontWeight: 'bold',
    //     backgroundColor: '#5637EE',
    //     textAlign: 'center',
    //     color: '#fff',
    //     marginBottom: 20
    // },
    // modalText: {
    //     fontSize: 20,
    //     margin: 10
    // }
});

export default Reservation;