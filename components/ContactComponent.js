import React, { Component } from 'react';
import { ScrollView, Text, } from 'react-native';
import { Card, } from 'react-native-elements';



class Contact extends Component {
       
        static navigationOptions = {
            title: 'Contact Us'
        }

        render() {
            return (
                <ScrollView>
                    <Card
                        title='Contact Information'
                        wrapperStyle={{margin: 20}}>
                        <Text>1 Nucamp Way</Text>
                        <Text>Seattle, WA 98001</Text> 
                        <Text stuyle={{marginBottom: 10}}>USA</Text> 
                        <Text>Phone: 206-555-9874</Text> 
                        <Text>email: info@nucamp.co</Text>     
                    </Card>
                </ScrollView>
            );
        };
    }

export default Contact;