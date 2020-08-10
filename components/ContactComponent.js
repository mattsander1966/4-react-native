import React, { Component } from 'react';
import { ScrollView, Text, FlatList } from 'react-native';
import { Card, ListItem } from 'react-native-elements';
import { render } from 'react-dom'; 
import { COMMENTS } from '../shared/comments';

// function Contact() {
//     return (
//         <Card title='Contact Information' wrapperStyle={{margin: 20}}>
//             <Text style={{marginBottom: 10}}>
//                             1 Nucamp Way
//                             Seattle, WA 98001
//                             U.S.A.

//                             Phone: 1-206-555-1234
//                             Email: campsites@nucamp.co
//             </Text>
//         </Card>
//     );

    class Contact extends Component {
        constructor(props) {
            super(props);
            this.state = {
                comments: COMMENTS
            };
        }

        state navitationOptions ={
            title: 'Contact Us'
        };

        render() {
            const renderComments = ({item}) => {
                return (
                    <ListItem

                    />
                );
            };

            return (
                <ScrollView>
                    <Comment />
                    <Card
                        title="Contact Info">
                        <FlatList
                            data={this.state.comments}
                            renderItem={}
                            keyExtractor={item=>item.id.toString()}
                        />
                    </Card>
                </ScrollView>
        );
    }
}

export default Contact;