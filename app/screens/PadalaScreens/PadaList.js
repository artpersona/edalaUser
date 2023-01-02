import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {Colors} from '../../shared/layouts';
import {CustomHeader, ActivityItem} from '../../components';
import {usePadalaContext} from '../../shared/contexts/PadalaContext';
function PadaList({navigation}) {
  const {padalas} = usePadalaContext();

  const renderItem = ({item}) => {
    return <ActivityItem {...item} onPress={() => navigateToTracking(item)} />;
  };

  const navigateToTracking = item => {
    navigation.navigate('PadalaTrack', {padala: item});
  };
  return (
    <>
      <CustomHeader showBackButton={true} title="My Activity" />
      <View style={styles.background}>
        <FlatList
          renderItem={renderItem}
          data={padalas}
          contentContainerStyle={{
            width: '95%',
            alignSelf: 'center',
            paddingBottom: '25%',
          }}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});

export default PadaList;
