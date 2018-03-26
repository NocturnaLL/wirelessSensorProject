import React from 'react';
import {TabNavigator} from 'react-navigation';

import Map from  '../components/Map/Map';
import Authentication from '../components/Authentication/Authentication';

export const Tabs = TabNavigator({
  Authentication: {
    screen: Authentication,
  },
  Map: {
    screen: Map,
  },

});
