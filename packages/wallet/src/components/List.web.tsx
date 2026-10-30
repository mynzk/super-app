import React from 'react';
import {css, html} from 'react-strict-dom';
import type {ListProps} from './List';

// Web twin of List.tsx — a scrollable DOM column (html.div + overflowY, no
// react-native-web / no LegendList). The header renders first, then the rows;
// content padding (16, native's contentContainerStyle) is a static StyleX rule
// here. The holdings set is small so no virtualization is needed.
const styles = css.create({
  scroll: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    overflowY: 'auto',
  },
  content: {
    padding: 16,
  },
});

const List = ({data, keyExtractor, renderItem, header}: ListProps) => (
  <html.div style={styles.scroll}>
    <html.div style={styles.content}>
      {header}
      {data.map(item => (
        <React.Fragment key={keyExtractor(item)}>
          {renderItem({item})}
        </React.Fragment>
      ))}
    </html.div>
  </html.div>
);

export default List;
