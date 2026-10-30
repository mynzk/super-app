import React from 'react';
import {css, html} from 'react-strict-dom';
import type {ListProps} from './List';

// Web twin of List.tsx — a scrollable DOM column (html.div + overflowY, no
// react-native-web / no LegendList) rendering the rows directly. The asset set
// is small so no virtualization is needed; mirrors sdk's ScrollContainer.web.
const styles = css.create({
  scroll: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    overflowY: 'auto',
  },
});

const List = ({data, keyExtractor, renderItem}: ListProps) => (
  <html.div style={styles.scroll}>
    {data.map(item => (
      <React.Fragment key={keyExtractor(item)}>
        {renderItem({item})}
      </React.Fragment>
    ))}
  </html.div>
);

export default List;
