import React from 'react';
import {TabBarBottom, SwitchNavigator, TabNavigator, NavigationActions, StackNavigator} from 'react-navigation';
import Ionicons from "react-native-vector-icons/Ionicons";
import {WHITE,GREEN,GREY1,TABBAR_GREY,BACKGROUND_GREY, GREY2, TABBAR_TINT} from '../styles';
import firebase from 'react-native-firebase';

import Login from '../screens/Login';
import RoomsMain from '../screens/RoomScreens/RoomsMain';
import RoomsInfo from '../screens/RoomScreens/RoomsInfo';
import BookingStart from '../screens/BookScreens/BookingStart';
import BookingDetails from '../screens/BookScreens/BookingDetails';
import BookingOverview from '../screens/BookScreens/BookingOverview';
import BookingSummary from '../screens/BookScreens/BookingSummary';
import BookingTime from '../screens/BookScreens/BookingTime';
import ProfileMain from '../screens/ProfileScreens/ProfileMain';
import ProfileBooking from '../screens/ProfileScreens/ProfileBooking';
import Settings from '../screens/Settings';

import  HeaderRight from '../components/Buttons/HeaderRight';


export const BookingNavigator = StackNavigator({
  
    BookingStart: {
    screen: BookingStart,
    navigationOptions: ({navigation}) => ({
      title: typeof(navigation.state.params)==='undefined' || typeof(navigation.state.params.date) === 'undefined' ? 'När vill du boka?': navigation.state.params.date,
      headerLeft: null,
      headerRight: <HeaderRight iconName = {'ios-information-circle-outline'} onPress= {() => alert('Välj datum först, sedan rum och till sist tid för din bokning.')}/>
    }),
  },
  BookingDetails: {
    screen: BookingDetails,
    navigationOptions: ({navigation}) => ({
      title: navigation.state.params.date,
  })
  },
  BookingTime: {
    screen: BookingTime,
    navigationOptions: ({navigation}) => ({
      title: typeof(navigation.state.params)==='undefined' || typeof(navigation.state.params.time) === 'undefined' ? 'Välj tid': navigation.state.params.time,
  })
  },
  BookingOverview: {
    screen: BookingOverview,
    navigationOptions: ({navigation}) => ({
      title: typeof(navigation.state.params)==='undefined' || typeof(navigation.state.params.title) === 'undefined' ? 'Välj titel': navigation.state.params.title,
  })
  },
  BookingSummary: {
    screen: BookingSummary,
    navigationOptions: ({navigation}) => ({
      title: null,
      header: null, 
  })
  },
  }, {
    navigationOptions: ({
      headerStyle: {
        backgroundColor: BACKGROUND_GREY,
        borderBottomColor: WHITE,
        borderBottomWidth: 1,
      },
      headerTintColor: WHITE,
      headerBackTitle: 'Tillbaka',
      initialRouteName: 'BookingStart',
    })
  
});

export const ProfileNavigator = StackNavigator({
  ProfileMain: {
  screen: ProfileMain,
  navigationOptions: ({navigation}) => ({
    title: typeof(navigation.state.params)==='undefined' || typeof(navigation.state.params.title) === 'undefined' ? ' ': navigation.state.params.title,
    headerLeft: null,
    headerRight: <HeaderRight iconName= {'ios-settings-outline'} onPress= {() => navigation.navigate('Settings')}/>
})
},
  ProfileBooking: {
    screen: ProfileBooking,
    navigationOptions: ({navigation}) => ({
      title: navigation.state.params.name,
  })
},
Settings: {
  screen: Settings,
  navigationOptions: {
    title: 'Inställningar'
  }
}
}, {
  navigationOptions: ({
    headerStyle: {
      backgroundColor: BACKGROUND_GREY,
      borderBottomColor: WHITE,
      borderBottomWidth: 1,
    },
    headerTintColor: WHITE,
    headerBackTitle: 'Tillbaka',
    initialRouteName: 'ProfileMain',
  })

});

export const RoomNavigator = StackNavigator({
  RoomsMain: {
  screen: RoomsMain,
  navigationOptions: {
    header: null,
  },
},
  RoomsInfo: {
    screen: RoomsInfo,
    navigationOptions: ({navigation}) => ({
      title: navigation.state.params.roomName,
  })
}}, {
  navigationOptions: ({
    headerStyle: {
      backgroundColor: BACKGROUND_GREY,
      borderBottomColor: WHITE,
      borderBottomWidth: 1,
    },
    headerTintColor: WHITE,
    headerBackTitle: 'Tillbaka',
    initialRouteName: 'RoomsMain',
  })

});

export const SignedOut = StackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      header: null, //hides header
    }
  }
});

export const SignedIn = TabNavigator ({
  Rooms: {
    screen: RoomNavigator,
    navigationOptions: {
      tabBarLabel: 'Hem'
  }},
    Booking: {
      screen: BookingNavigator,
      navigationOptions: {
        tabBarLabel: 'Boka rum'}}, 
    Profile: {
      screen: ProfileNavigator,
      navigationOptions: {
        tabBarLabel: 'Dina bokningar'}
    },
    // Settings: {
    //     screen: Settings,
    //     navigationOptions: {
    //       tabBarLabel: 'Inställningar'}
    //   }
    },
    {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor}) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Rooms') {
          iconName = `ios-home${focused ? '' : '-outline'}`;
        } else if (routeName === 'Booking') {
          iconName = `ios-add-circle${focused ? '' : '-outline'}`;
        }else if (routeName === 'Profile') {
          iconName = `ios-contact${focused ? '' : '-outline'}`;
        }else if (routeName === 'Settings') {
          iconName = `ios-settings${focused ? '' : '-outline'}`;
        }

        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: GREEN, 
      inactiveTintColor: WHITE,
      activeBackgroundColor: '#38424b',
      inactiveBackgroundColor: '#414c56',
      // style: {
      // backgroundColor: TABBAR_GREY,
      // },
    },
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
   
  }
);

export const createRootNavigator = (signedIn = false) => {
  return SwitchNavigator({
      SignedIn: {
        screen: SignedIn
      },
      SignedOut: {
        screen: SignedOut
      }
    },
    {
      initialRouteName: signedIn ? "SignedIn" : "SignedOut"
    }
  );
};