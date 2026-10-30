import React from 'react';
import renderer, {act} from 'react-test-renderer';

import ConnectionBannerRsd from '../components/ConnectionBanner.rsd';

// Spike A native proof: an RSD (html.* + css) component renders through the
// existing host React Native + Jest pipeline without error. RSD commits its
// content after effects flush, so create() is wrapped in act().
it('renders the RSD ConnectionBanner on native', () => {
  let r: renderer.ReactTestRenderer;
  act(() => {
    r = renderer.create(<ConnectionBannerRsd status="reconnecting" />);
  });
  const tree = r!.toJSON();
  expect(tree).toBeTruthy();
  expect(JSON.stringify(tree)).toContain('Reconnecting to market');
});

it('hides when connected', () => {
  let r: renderer.ReactTestRenderer;
  act(() => {
    r = renderer.create(<ConnectionBannerRsd status="connected" />);
  });
  expect(r!.toJSON()).toBeNull();
});
