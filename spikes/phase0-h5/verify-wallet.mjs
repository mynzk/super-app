import puppeteer from 'puppeteer-core';

const URL = process.env.WALLET_URL || 'http://localhost:9202/';
const CHROME =
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  args: ['--no-sandbox'],
});
const page = await browser.newPage();
const errors = [];
page.on('console', m => {
  if (m.type() !== 'error') return;
  const url = m.location()?.url || '';
  if (/favicon\.ico/.test(url) || /favicon\.ico/.test(m.text())) return;
  errors.push('console.error: ' + m.text() + (url ? ' @ ' + url : ''));
});
page.on('pageerror', e => errors.push('pageerror: ' + e.message));

await page.goto(URL, {waitUntil: 'networkidle0', timeout: 30000});
// Let the Kraken WS deliver at least one ticker.
await new Promise(r => setTimeout(r, 6000));

const text = await page.$eval('#root', el => el.innerText).catch(() => '(no #root)');
const rootLen = await page.$eval('#root', el => el.innerHTML.length).catch(() => 0);
const hasDollar = /\$[\d,]/.test(text);

const want = [
  'My Wallet',
  'Total Portfolio Value',
  'My Holdings',
  'Bitcoin',
  'Ethereum',
  'BTC',
  'ETH',
];
const missing = want.filter(w => !text.includes(w));

console.log('=== wallet H5 (:9202) ===');
console.log('  #root innerHTML length :', rootLen);
console.log('  #root text (160)       :', JSON.stringify(text.replace(/\s+/g, ' ').slice(0, 160)));
console.log('  missing expected text  :', missing.length ? missing : 'none ✓');
console.log('  live price ($ seen)    :', hasDollar ? 'yes ✓ (Kraken WS delivered)' : 'no — values still "—" (WS not yet/blocked)');
console.log('  console/page errors    :', errors.length ? errors : 'none ✓');

const structureOk = rootLen > 0 && missing.length === 0 && errors.length === 0;
console.log('  VERDICT (structure)    :', structureOk ? 'PASS ✓' : 'FAIL ✗');

await browser.close();
process.exit(structureOk ? 0 : 1);
