import puppeteer from 'puppeteer-core';

// Headless end-to-end check for the web Module Federation host (Phase 2).
// Drives the real host at :9200 through the auth gate and asserts each remote
// renders — the decisive test that react / sdk are single shared instances
// across bundles (a duplicate React would throw invalid-hook-call as a
// pageerror here).
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const HOST = 'http://localhost:9200/';

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
  errors.push('console.error: ' + m.text());
});
page.on('pageerror', e => errors.push('pageerror: ' + e.message));

const hasText = async needle =>
  page.evaluate(
    t => document.body && document.body.innerText.includes(t),
    needle,
  );

const waitForText = async (needle, timeout = 20000) => {
  const start = Date.now();
  while (Date.now() - start < timeout) {
    if (await hasText(needle)) return true;
    await new Promise(r => setTimeout(r, 300));
  }
  return false;
};

const clickText = async needle =>
  page.evaluate(t => {
    const el = [...document.querySelectorAll('div,span,button')].find(
      n => n.innerText && n.innerText.trim() === t,
    );
    if (el) {
      el.click();
      return true;
    }
    return false;
  }, needle);

let ok = true;
const check = (label, pass) => {
  console.log(`  ${pass ? 'PASS' : 'FAIL'} — ${label}`);
  if (!pass) ok = false;
};

try {
  await page.goto(HOST, {waitUntil: 'networkidle0', timeout: 30000});

  // 1. auth remote loaded through the host (sign-in gate visible).
  check('auth remote renders SignInScreen', await waitForText('Sign In'));

  // 2. sign in → host tab shell + remotes mount.
  await clickText('Sign In as Demo User');
  check('Trading tab label present', await waitForText('Trading'));
  check('Wallet tab label present', await waitForText('Wallet'));
  check('Account tab label present', await waitForText('Account'));

  // 3. trading remote actually rendered content (asset list pulls live data;
  //    allow generous time). BTC appears in the seeded asset list.
  check('trading remote content rendered', await waitForText('BTC', 25000));
} catch (e) {
  console.log('  NAV/RUN FAILED:', e.message);
  ok = false;
}

check('no console/page errors', errors.length === 0);
if (errors.length) {
  console.log('--- errors ---');
  errors.forEach(e => console.log('  ' + e));
}

await browser.close();
console.log(ok ? '\nWEB HOST OK' : '\nWEB HOST FAILED');
process.exit(ok ? 0 : 1);
