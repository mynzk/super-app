import React from 'react';
import {css, html} from 'react-strict-dom';
import {
  ASSETS,
  ConnectionBanner,
  type Asset,
} from 'super-app-showcase-sdk';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import AssetRow from '../components/AssetRow';
import List from '../components/List';
import type {TradingStackParamList} from '../navigation/MainNavigator';

// Screen chrome authored with react-strict-dom (html.div + css.create; StyleX
// needs static literals so background #0A0E1A is inlined). The list itself is
// split per platform in ../components/List (native = LegendList virtualization,
// web = scrollable DOM column), so this screen stays a single cross-platform file.
type NavigationProp = NativeStackNavigationProp<
  TradingStackParamList,
  'AssetList'
>;

const styles = css.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    backgroundColor: '#0A0E1A',
  },
});

const AssetListScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  const handlePress = React.useCallback(
    (asset: Asset) => {
      navigation.navigate('AssetDetails', {asset});
    },
    [navigation],
  );

  return (
    <html.div style={styles.container}>
      <ConnectionBanner />
      <List
        data={ASSETS}
        keyExtractor={item => item.symbol}
        renderItem={({item}) => <AssetRow asset={item} onPress={handlePress} />}
      />
    </html.div>
  );
};

export default AssetListScreen;
