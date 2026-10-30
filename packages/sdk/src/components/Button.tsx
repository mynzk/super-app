import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import {colors} from '../theme';

// Shared button — native side. A react-native Pressable with press-opacity
// feedback wrapping a Text label. The web twin (Button.web.tsx) renders a real
// html.button + onClick with the same variant skins and zero react-native-web,
// so screens import one <Button> and the bundler resolves the platform file.
//
// `variant` picks the color skin only. Geometry that varies per site (full
// width, side-by-side flex ratio) arrives as neutral props — never as a style
// object crossing the platform line, since StyleX (css.create) output isn't a
// valid RN style and vice versa.
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

const SKINS: Record<ButtonVariant, {bg: string; fg: string}> = {
  primary: {bg: colors.primary, fg: colors.onPrimary},
  secondary: {bg: colors.surfaceVariant, fg: colors.secondary},
  onColor: {bg: 'rgba(255,255,255,0.2)', fg: '#FFFFFF'},
};

const styles = StyleSheet.create({
  base: {
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  md: {paddingVertical: 16},
  sm: {paddingVertical: 12},
  labelMd: {fontSize: 16, fontWeight: '600'},
  labelSm: {fontSize: 14, fontWeight: '500'},
  pressed: {
    opacity: 0.8,
  },
});

const Button = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  fullWidth,
  flex,
}: ButtonProps) => {
  const skin = SKINS[variant];
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [
        styles.base,
        size === 'sm' ? styles.sm : styles.md,
        {backgroundColor: skin.bg},
        fullWidth && {width: '100%'},
        flex != null && {flexGrow: flex, flexBasis: 0},
        pressed && styles.pressed,
      ]}>
      <Text style={[size === 'sm' ? styles.labelSm : styles.labelMd, {color: skin.fg}]}>
        {title}
      </Text>
    </Pressable>
  );
};

export default Button;
