import {StyleSheet} from 'react-native';
import Colors from './Colors';

import {RFValue} from 'react-native-responsive-fontsize';

const buttonHeight = RFValue(60);

export default StyleSheet.create({
  buttonModal: {
    height: RFValue(45),
  },
  buttonPrimary: {
    height: buttonHeight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTextPrimary: {
    fontSize: RFValue(12),
  },
});
