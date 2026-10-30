import React from 'react';
import renderer, {act} from 'react-test-renderer';

import {ConnectionBanner} from 'super-app-showcase-sdk';

// Proves the UNIFIED (single-file) RSD ConnectionBanner renders on native via
// the real RN pipeline — same file the web build uses. Default WS status is
// 'disconnected', so the banner shows the connecting label (non-null).
it('renders the unified RSD ConnectionBanner on native', () => {
  let r: renderer.ReactTestRenderer;
  act(() => {
    r = renderer.create(<ConnectionBanner />);
  });
  const tree = r!.toJSON();
  expect(tree).toBeTruthy();
  expect(JSON.stringify(tree)).toContain('market');
});
