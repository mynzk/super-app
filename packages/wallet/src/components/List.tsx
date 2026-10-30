import React from 'react';
import {LegendList} from '@legendapp/list/react-native';
import type {Holding} from '../constants';

// Native list engine for the holdings list: LegendList (virtualization, built on
// react-native). The web twin (List.web.tsx) renders the same rows + header into
// a scrollable DOM column with zero react-native-web — the holdings set is tiny,
// so virtualization isn't needed on web. The screen passes data/keyExtractor/
// renderItem/header; the native list tuning (estimatedItemSize, content padding)
// lives here.
export interface ListProps {
  data: readonly Holding[];
  keyExtractor: (item: Holding) => string;
  renderItem: (info: {item: Holding}) => React.ReactElement;
  header?: React.ReactElement;
}

const listContentStyle = {padding: 16};

const List = ({data, keyExtractor, renderItem, header}: ListProps) => (
  <LegendList
    data={data as Holding[]}
    keyExtractor={keyExtractor}
    renderItem={renderItem}
    estimatedItemSize={84}
    recycleItems={false}
    ListHeaderComponent={header}
    contentContainerStyle={listContentStyle}
  />
);

export default List;
