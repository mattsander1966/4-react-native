import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList, Modal, Button, StyleSheet } from 'react-native';
import { Card, Icon, Input, Rating } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite } from '../redux/ActionCreators';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = state => {
    return {
        campsites: state.campsites,
        comments: state.comments,
        favorites: state.favorites
    };
};

const mapDispatchToProps = {
    postFavorite: campsiteId => (postFavorite(campsiteId))
};

function RenderCampsite(props) {

    const {campsite} = props;

    if (campsite) {
        return (
            <Animatable.View animation='fadeInDown' duration={2000} delay={1000}> 
                <Card
                    featuredTitle={campsite.name}
                    image={{uri: baseUrl + campsite.image}}>
                    <Text style={{margin: 10}}>
                        {campsite.description}
                    </Text>
                    <View style={styles.cardRow}>
                        <Icon
                            name={props.favorite ? 'heart' : 'heart-o'}
                            type='font-awesome'
                            color='#f50'
                            raised
                            reverse
                            onPress={() => props.favorite ?
                                console.log('Already set as a favorite') : props.markFavorite()}
                            />
                        <Icon style={styles.cardItem}
                            name={'pencil'}
                            type='font-awesome'
                            color='#5637DD'
                            raised
                            reverse
                            onPress={() => props.onShowModal()}
                            />
                    </View>
                    
                </Card>
            </Animatable.View>
        );
    }
    return <View />;
}

function RenderComments({comments}) {

    const renderCommentItem = ({item}) => {
        return (
            <View style={{margin: 10}}>
                <Rating 
                    startingValue={3}
                    imageSize={10}
                    read-only
                    type={'star'}
                    ratingCount={10}
                    style={{alignItems: 'flex-start', padding: '5%'}}
                />
            </View>
        );
    };

    return (
        <Animatable.View animation='fadeInUp' duration={2000} delay={1000}> 
            <Card title='Comments'>
                <FlatList
                    data={comments}
                    renderItem={renderCommentItem}
                    keyExtractor={item => item.id.toString()}
                />
            </Card>
        </Animatable.View>
    );
}

class CampsiteInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            favorite: false,
            showModal: false,
            rating: 5,
            author: '',
            text: ''
        };
    }

    markFavorite(campsiteId) {
        this.props.postFavorite(campsiteId);
    }

    toggleModal() {
        this.setState({
            showModal: !this.state.showModal
        });
    }

    handleComment(campsiteId) {
        console.log(JSON.stringify(this.state));
        this.toggleModal();
    }

    resetForm() {  
        this.setState({
                favorite: false,
                showModal: false,
                rating: 5,
                author: '',
                text: ''
            });
    }

    static navigationOptions = {
        title: 'Campsite Information'
    }

    render() {
        const campsiteId = this.props.navigation.getParam('campsiteId');
        const campsite = this.props.campsites.campsites.filter(campsite => campsite.id === campsiteId)[0];
        const comments = this.props.comments.comments.filter(comment => comment.campsiteId === campsiteId);
        return (
            <ScrollView>
                <RenderCampsite campsite={campsite}
                    favorite={this.props.favorites.includes(campsiteId)}
                    markFavorite={() => this.markFavorite(campsiteId)}
                    onShowModal={() => this.toggleModal()}
                />
                <RenderComments comments={comments} />
                <Modal
                    animationType={'slide'}
                    transparent={false}
                    visible={this.state.showModal}
                    onRequestClose={() => this.toggleModal()}>
                        <View style={styles.modal}>
                            <Rating
                                showRating
                                startingValue={5}
                                imageSize={40}
                                onFinishRating={(rating) =>this.setState({rating: rating})}
                                type={'star'}
                                ratingCount={10}
                                style={{paddingVertical: 10}}
                            />
                            <Input
                                placeholder="Author"
                                leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                                leftIconContainerStyle={{paddingRight: 10}}
                                onChangeText={(text) => this.setState({ text: text })}
                            />
                            <Input
                                placeholder="Comment"
                                leftIcon={{ type: 'font-awesome', name: 'comment-o' }}
                                leftIconContainerStyle={{paddingRight: 10}}
                                onChangeText={(text) => this.setState({ text: text })}
                                />
                                <View>
                                    <Button
                                        color='#5637EE'
                                        title='Submit'
                                        onPress={() => {this.handleComment(campsiteId);
                                                     this.resetForm();
                                        }}
                                    />
                                </View>
                        <View style={{margin: 10}}>
                                <Button
                                onPress={() => {this.toggleModal();
                                                this.resetForm();  
                                }} 
                                color='#808080'
                                title='Cancel'
                                /> 
                        </View>
                            {/* <Text styule={styles.modalTitle}>Search Camp Reservations</Text>
                            <Text styule={styles.modalText}># of Campers: {this.state.campers}</Text>
                            <Text styule={styles.modalText}>Hiking In?: {this.state.hikeIn ? 'Yes' : 'No'}</Text>
                            <Text styule={styles.modalText}>When: {this.state.date}</Text> */}
                        </View>
                    </Modal>
               
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create ({
    cardRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    cardItem: {
        flex: 1,
        margin: 10
    },
    modal: {
        justifyContent: 'center',
        margin: 20
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(CampsiteInfo);