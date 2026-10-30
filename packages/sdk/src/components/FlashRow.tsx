import React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import {colors} from '../theme';

// Native implementation of the price-flash row. Owns the WHOLE flash concern —
// both the animated view AND the signal writer — so consumers (trading AssetRow/
// PriceCell, wallet HoldingRow/ValueCell) never import reanimated. The web twin
// (FlashRow.web.tsx) expresses the same `flash(isUp)` controller with the Web
// Animations API and zero RNW.
//
// `children` is a render prop: the row creates the SharedValues, builds the
// animated style, and hands the stable `flash` controller down so the leaf price
// cell can trigger a green/red flash on a tick without re-rendering this row.
//
// `variant` selects the row geometry (trading = 'list' with a hairline divider;
// wallet = 'card' with radius + gap). `onPress` is optional: a row without it is
// non-interactive (a plain View / div, not a Pressable / button).
export type FlashController = (isUp: boolean) => void;

export interface FlashRowProps {
  variant?: 'list' | 'card';
  onPress?: () => void;
  children: (flash: FlashController) => React.ReactNode;
}

const styles = StyleSheet.create({
  list: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
  },
});

const FlashRow = ({variant = 'list', onPress, children}: FlashRowProps) => {
  const progress = useSharedValue(0);
  const isUp = useSharedValue(true);

  const flash = React.useCallback<FlashController>(
    up => {
      isUp.value = up;
      progress.value = withSequence(
        withTiming(1, {duration: 150}),
        withTiming(0, {duration: 600}),
      );
    },
    [isUp, progress],
  );

  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      progress.value,
      [0, 1],
      [colors.transparent, isUp.value ? colors.priceUp : colors.priceDown],
    ),
  }));

  const row = (
    <Animated.View style={[styles[variant], animatedStyle]}>
      {children(flash)}
    </Animated.View>
  );

  return onPress ? <Pressable onPress={onPress}>{row}</Pressable> : row;
};

export default FlashRow;
