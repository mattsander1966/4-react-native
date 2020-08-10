import React, { Component } from 'react';
import Home from './HomeComponent';
import Directory from './DirectoryComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import CampsiteInfo from './CampsiteInfoComponent';
import { View, Platform, StyleSheet, Text, ScrollView, Image } from 'react-native';
import { createStackNavigator, createDrawerNavigator, DrawerItems } from 'react-navigation';
import SafeAreaView from 'react-native-safe-area-view';
import { Icon } from 'react-native-elements';

const DirectoryNavigator = createStackNavigator(
    {
        Directory: { 
            screen: Directory, 
            navigationOptions: ({navigation}) => ({
                headerLeft: <Icon
                    name='list'
                    type='font-awesome'
                    iconStyle={Style.stackIcon}
                    onPress={() => navigation.toggleDrawer()}
                />
            })
        },
        CampsiteInfo: { screen: CampsiteInfo }
    },
    {
        initialRouteName: 'Directory',
        navigationOptions: {
            headerStyle: {
                backgroundColor: '#5637DD'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            }
        }
    }
);

const HomeNavigator = createStackNavigator(
    {
        Home: { screen: Home }
    },
    {
        navigationOptions: ({navigation}) => ({
            headerStyle: {
                backgroundColor: '#5637DD'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            },
                    headerLeft: <Icon
                    name='Home'
                    type='font-awesome'
                    iconStyle={Style.stackIcon}
                    onPress={() => navigation.toggleDrawer()}
                />
        })
    }
);

const AboutNavigator = createStackNavigator (
    {
        About: { screen: About }
    },
    {
        navigationOptions: ({navigation}) => ({
            headerStyle: {
                backgroundColor: '#5637DD'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            },
                    headerLeft: <Icon
                    name='info-circle'
                    type='font-awesome'
                    iconStyle={Style.stackIcon}
                    onPress={() => navigation.toggleDrawer()}
                />
        })
    }
);

const ContactNavigator = createStackNavigator (
    {
        Contact: { screen: Contact }
    },
    {
        navigationOptions: ({navigation}) => ({
            headerStyle: {
                backgroundColor: '#5637DD'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            },
                    headerLeft: <Icon
                    name='address-card'
                    type='font-awesome'
                    iconStyle={Style.stackIcon}
                    onPress={() => navigation.toggleDrawer()}
                />
        })
    }
);
const CustomDrawercontentCompoenent = props => (
    <ScrollView>
        <SafeAreaView
            style={style.container}
            forceInset={{top: 'always', horizontal: 'never'}}>
            <View style={styles.drawerHeader}>
                <View style={{flex: 1}}>
                   <Image source={require('./images/logo.png')} style={styles.drawerImage} />
                </View>
                <View style={{flex: 2}}>
                    <Text style={styles.drawerHeaderText}>Nucamp</Text>
                </View>
            </View>
            <DrawerItems {...props} />
        </SafeAreaView>

    </ScrollView>
);

const MainNavigator = createDrawerNavigator(
    {
        Home: { 
            screen: HomeNavigator,
            navigationOptions: {
                drawerIcon: ({tintColor}) => (
                    <Icon
                        name='home'
                        type='font-awesome'
                        size={24}
                        color={tintColor}
                    />
                )
            }
        },
        Directory: { 
            screen: DirectoryNavigator,
            navigationOptions: {
                drawerIcon: ({tintColor}) => (
                    <Icon
                        name='hlistome'
                        type='font-awesome'
                        size={24}
                        color={tintColor}
                    />
                )
            }
         },
        About: { 
            screen: AboutNavigator,
            navigationOptions: {
                drawerLable: 'Contact Us'
                drawerIcon: ({tintColor}) => (
                    <Icon
                        name='address-card'
                        type='font-awesome'
                        size={24}
                        color={tintColor}
                    />
                )
            }
        },
        Contact: { 
            screen: ContactNavigator,
            screen: AboutNavigator,
            navigationOptions: {
                drawerLable: 'About Us'
                drawerIcon: ({tintColor}) => (
                    <Icon
                        name='info-circle'
                        type='font-awesome'
                        size={24}
                        color={tintColor}
                    />
                )
            }
        }
    },
    {
        drawerBackgroundColor: '#CEC8FF',
        contentComponent: CustomDrawercontentCompoenent
    }
);

class Main extends Component {
    render() {
        return (
            <View style={{
                flex: 1,
                paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight
            }}>
                <MainNavigator />
            </View>
        );
    }
}

const Styles = StyleSheet.create({
    container: {
        flex: 1,
    },
        drawerHeader: {
        backgroundColor: '#5637DE',
        height: 140
        alighItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row'
    },
    drawerHeaderText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold'
    },
    drawerImage: {
        margin: 10,
        height: 60,
        width: 60
    },
    stackIcon: {
        marginLeft: 10,
        color: '#fff',
        fontSize: 24
    }
});

export default Main;