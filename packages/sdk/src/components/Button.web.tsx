import React from 'react';
import {css, html} from 'react-strict-dom';

// Shared button — web side. A real DOM html.button + onClick, zero
// react-native-web. Mirrors Button.tsx: `variant` picks the color skin (theme
// hex inlined because StyleX needs static literals — primary #4F8EF7 on
// #FFFFFF, secondary #1C2438 on #A0AEC0, onColor translucent white on #FFFFFF),
// `fullWidth` / `flex` are neutral layout props.
export type ButtonVariant = 'primary' | 'secondary' | 'onColor';
// `md` is the default skin (16px label, 16px vertical padding); `sm` is the
// compact skin (14px label, 12px vertical padding) for denser contexts.
export type ButtonSize = 'sm' | 'md';

export interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  flex?: 1 | 2;
}

const styles = css.create({
  base: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 24,
    paddingRight: 24,
    borderRadius: 12,
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    cursor: 'pointer',
  },
  md: {paddingTop: 16, paddingBottom: 16},
  sm: {paddingTop: 12, paddingBottom: 12},
  fullWidth: {width: '100%'},
  flex1: {flexGrow: 1, flexBasis: 0},
  flex2: {flexGrow: 2, flexBasis: 0},
  labelMd: {fontSize: 16, fontWeight: '600'},
  labelSm: {fontSize: 14, fontWeight: '500'},
  primaryBg: {backgroundColor: '#4F8EF7'},
  secondaryBg: {backgroundColor: '#1C2438'},
  onColorBg: {backgroundColor: 'rgba(255,255,255,0.2)'},
  primaryFg: {color: '#FFFFFF'},
  secondaryFg: {color: '#A0AEC0'},
  onColorFg: {color: '#FFFFFF'},
});

const BG = {
  primary: styles.primaryBg,
  secondary: styles.secondaryBg,
  onColor: styles.onColorBg,
};
const FG = {
  primary: styles.primaryFg,
  secondary: styles.secondaryFg,
  onColor: styles.onColorFg,
};

const Button = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  fullWidth,
  flex,
}: ButtonProps) => {
  return (
    <html.button
      onClick={onPress}
      style={[
        styles.base,
        size === 'sm' ? styles.sm : styles.md,
        BG[variant],
        fullWidth && styles.fullWidth,
        flex === 1 && styles.flex1,
        flex === 2 && styles.flex2,
      ]}>
      <html.span style={[size === 'sm' ? styles.labelSm : styles.labelMd, FG[variant]]}>
        {title}
      </html.span>
    </html.button>
  );
};

export default Button;
