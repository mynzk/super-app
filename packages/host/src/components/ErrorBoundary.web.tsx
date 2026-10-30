import React from 'react';
import {css, html} from 'react-strict-dom';

// Web split of ErrorBoundary.tsx. The native version renders a vector-icons
// glyph via the image-source API, which is native-only; the web version drops
// the icon and keeps the same failure message so a remote that fails to load
// (e.g. its dev server is down) degrades gracefully instead of blanking.
// Authored with react-strict-dom (html.div/span + css.create, static-literal
// theme hex) so the web build carries no react-native-web.
type Props = {
  children: React.ReactNode;
  name: string;
};

type State = {
  hasError: boolean;
};

class ErrorBoundary extends React.Component<Props, State> {
  name: string;

  constructor(props: Props) {
    super(props);
    this.name = props.name;
    this.state = {hasError: false};
  }

  static getDerivedStateFromError() {
    return {hasError: true};
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <html.div style={styles.container}>
          <html.span style={styles.text}>{`Failed to load ${this.name}`}</html.span>
        </html.div>
      );
    }

    return this.props.children;
  }
}

const styles = css.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0A0E1A',
    padding: 24,
  },
  text: {
    fontSize: 20,
    color: '#A0AEC0',
    textAlign: 'center',
  },
});

export default ErrorBoundary;
