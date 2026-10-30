import React from 'react';
import {css, html} from 'react-strict-dom';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from 'recharts';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  useAssetPrice,
  useHistoricalPrices,
  formatPrice,
  colors,
  Button,
} from 'super-app-showcase-sdk';
import type {TradingStackParamList} from '../navigation/MainNavigator';
import TradeBottomSheet from '../components/TradeBottomSheet';
import type {BottomSheetRef} from '../components/TradeBottomSheet';

// Web implementation of the asset details screen (the native file uses Skia +
// victory-native + react-native-bottom-tabs, none of which run in the browser).
// Chrome/news authored with react-strict-dom (html.* + css.create, static-literal
// theme hex); the price chart uses recharts (SVG). The 60-tick buffer logic
// mirrors the native screen; line color is derived in plain JS state instead of a
// reanimated derived value, and there is no bottom-tab inset on web.
type Props = NativeStackScreenProps<TradingStackParamList, 'AssetDetails'>;

const MAX_TICKS = 60;

const NEWS_ITEMS = [
  {
    id: '1',
    title: 'Federal Reserve signals potential rate cuts later this year',
    time: '2h ago',
    source: 'Reuters',
  },
  {
    id: '2',
    title:
      'Institutional adoption accelerates as major banks enter crypto market',
    time: '4h ago',
    source: 'Bloomberg',
  },
  {
    id: '3',
    title: 'On-chain metrics suggest accumulation phase for long-term holders',
    time: '6h ago',
    source: 'CoinDesk',
  },
  {
    id: '4',
    title:
      'New regulatory framework proposed to clarify digital asset classification',
    time: '8h ago',
    source: 'Financial Times',
  },
];

const formatYLabel = (value: number) => {
  const n = Number(value);
  if (n >= 1000) {
    return `$${(n / 1000).toFixed(1)}k`;
  }
  if (n >= 1) {
    return `$${n.toFixed(0)}`;
  }
  return `$${n.toFixed(3)}`;
};

const styles = css.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    backgroundColor: '#0A0E1A',
  },
  scroll: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    overflowY: 'auto',
    padding: 16,
  },
  priceRow: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 16,
    gap: 4,
  },
  currentPrice: {
    color: '#E2E8F0',
    fontSize: 32,
    fontWeight: '700',
    fontVariantNumeric: 'tabular-nums',
  },
  symbol: {color: '#A0AEC0', fontSize: 14},
  chartContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 220,
    marginBottom: 24,
    backgroundColor: '#131929',
    borderRadius: 12,
    overflow: 'hidden',
  },
  chartInner: {width: '100%', height: '100%'},
  chartPlaceholderText: {color: '#A0AEC0', fontSize: 14},
  sectionTitle: {
    color: '#E2E8F0',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  newsItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
    backgroundColor: '#131929',
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
  },
  newsTitle: {
    color: '#E2E8F0',
    fontSize: 14,
    // StyleX (RSD's engine) leaves a numeric line-height UNITLESS — `20` would
    // mean 20× the font size (280px). Use an explicit px to match native's 20.
    lineHeight: '20px',
    fontWeight: '500',
  },
  newsMeta: {color: '#A0AEC0', fontSize: 12},
  footer: {
    padding: 16,
    backgroundColor: '#0A0E1A',
    borderTopWidth: 1,
    borderTopColor: '#2D3748',
  },
});

const AssetDetailsScreen = ({route, navigation}: Props) => {
  const {asset} = route.params;
  const price = useAssetPrice(asset.symbol);
  const historicalPrices = useHistoricalPrices(asset.krakenPair);
  const prevPriceRef = React.useRef(0);
  const tradeSheetRef = React.useRef<BottomSheetRef>(null);

  const [chartData, setChartData] = React.useState<
    {index: number; price: number}[]
  >([]);
  const bufferRef = React.useRef<number[]>([]);
  const seededRef = React.useRef(false);

  const [lineColor, setLineColor] = React.useState(colors.primary);
  const colorTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(() => {
    if (historicalPrices.length === 0 || seededRef.current) {
      return;
    }
    seededRef.current = true;
    bufferRef.current = historicalPrices;
    setChartData(historicalPrices.map((p, index) => ({index, price: p})));
  }, [historicalPrices]);

  React.useEffect(() => {
    if (price === 0) {
      return;
    }

    bufferRef.current = [...bufferRef.current, price].slice(-MAX_TICKS);
    React.startTransition(() => {
      setChartData(bufferRef.current.map((p, index) => ({index, price: p})));
    });

    if (prevPriceRef.current !== 0 && price !== prevPriceRef.current) {
      setLineColor(
        price > prevPriceRef.current
          ? colors.priceUpText
          : colors.priceDownText,
      );
      if (colorTimer.current) {
        clearTimeout(colorTimer.current);
      }
      colorTimer.current = setTimeout(
        () => setLineColor(colors.primary),
        800,
      );
    }
    prevPriceRef.current = price;
  }, [price]);

  React.useEffect(
    () => () => {
      if (colorTimer.current) {
        clearTimeout(colorTimer.current);
      }
    },
    [],
  );

  const openTradeSheet = React.useCallback(() => {
    tradeSheetRef.current?.open();
  }, []);

  const hasData = chartData.length > 1;

  return (
    <html.div style={styles.container}>
      <html.div style={styles.scroll}>
        {/* Current price */}
        <html.div style={styles.priceRow}>
          <html.span style={styles.currentPrice}>
            {formatPrice(price)}
          </html.span>
          <html.span style={styles.symbol}>{asset.symbol}/USD</html.span>
        </html.div>

        {/* Chart */}
        <html.div style={styles.chartContainer}>
          {hasData ? (
            <html.div style={styles.chartInner}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={chartData}
                  margin={{top: 8, right: 8, bottom: 8, left: 8}}>
                  <XAxis dataKey="index" hide />
                  <YAxis
                    orientation="right"
                    domain={['auto', 'auto']}
                    tickCount={4}
                    width={48}
                    tick={{fill: colors.secondary, fontSize: 11}}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={formatYLabel}
                  />
                  <Line
                    type="monotone"
                    dataKey="price"
                    stroke={lineColor}
                    strokeWidth={2}
                    dot={false}
                    isAnimationActive={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </html.div>
          ) : (
            <html.span style={styles.chartPlaceholderText}>
              Waiting for price data…
            </html.span>
          )}
        </html.div>

        {/* News */}
        <html.span style={styles.sectionTitle}>Latest News</html.span>
        {NEWS_ITEMS.map(item => (
          <html.div key={item.id} style={styles.newsItem}>
            <html.span style={styles.newsTitle}>{item.title}</html.span>
            <html.span style={styles.newsMeta}>
              {item.source} · {item.time}
            </html.span>
          </html.div>
        ))}
      </html.div>

      {/* Trade button */}
      <html.div style={styles.footer}>
        <Button
          variant="primary"
          fullWidth
          title={`Trade ${asset.symbol}`}
          onPress={openTradeSheet}
        />
      </html.div>

      <TradeBottomSheet
        ref={tradeSheetRef}
        asset={asset}
        bottomInset={0}
        onConfirm={() => {
          navigation.navigate('TradeSuccess', {symbol: asset.symbol});
        }}
      />
    </html.div>
  );
};

export default AssetDetailsScreen;
