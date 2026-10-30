import React from 'react';
import {LegendList} from '@legendapp/list/react-native';
import type {Asset} from 'super-app-showcase-sdk';

// Native list engine for the asset list: LegendList (virtualization, built on
// react-native). The web twin (List.web.tsx) renders the same rows into a
// scrollable DOM column with zero react-native-web — the asset set is tiny, so
// virtualization isn't needed on web. The screen passes data/keyExtractor/
// renderItem; the native list tuning (estimatedItemSize, fill style) lives here.
export interface ListProps {
  data: readonly Asset[];
  keyExtractor: (item: Asset) => string;
  renderItem: (info: {item: Asset}) => React.ReactElement;
}

const listStyle = {flex: 1};

const List = ({data, keyExtractor, renderItem}: ListProps) => (
  <LegendList
    data={data as Asset[]}
    keyExtractor={keyExtractor}
    renderItem={renderItem}
    estimatedItemSize={69}
    recycleItems={false}
    style={listStyle}
  />
);

export default List;
