import React, {FC} from 'react';
import {css, html} from 'react-strict-dom';
import Spinner from './Spinner.web';

// Web split of Placeholder.tsx — react-native's ActivityIndicator/View/Text
// become a DOM Spinner + RSD html.div/span (no react-native-web). StyleX needs
// static literals so background #0A0E1A and secondary #A0AEC0 are inlined. The
// native Placeholder.tsx is untouched.
type Props = {
  label: string;
  icon?: string;
};

const styles = css.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0A0E1A',
    gap: 16,
  },
  text: {
    fontSize: 16,
    color: '#A0AEC0',
  },
});

const Placeholder: FC<Props> = ({label}) => (
  <html.div style={styles.container}>
    <Spinner />
    <html.span style={styles.text}>{label}</html.span>
  </html.div>
);

export default Placeholder;
