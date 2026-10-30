import puppeteer from 'puppeteer-core';

const CHROME =
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

const targets = [
  {name: 'Spike A — banner :9101 (RSD + Rspack, no MF)', url: 'http://localhost:9101/'},
  {name: 'Spike B — host :9100 (RSD + Rspack + web MF)', url: 'http://localhost:9100/'},
];

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  args: ['--no-sandbox'],
});

let allOk = true;

for (const t of targets) {
  const page = await browser.newPage();
  const errors = [];
  page.on('console', m => {
    if (m.type() !== 'error') return;
    const url = m.location()?.url || '';
    // /favicon.ico is auto-requested by the browser and 404s harmlessly.
    if (/favicon\.ico/.test(url) || /favicon\.ico/.test(m.text())) return;
    errors.push('console.error: ' + m.text() + (url ? ' @ ' + url : ''));
  });
  page.on('pageerror', e => errors.push('pageerror: ' + e.message));

  try {
    await page.goto(t.url, {waitUntil: 'networkidle0', timeout: 20000});
  } catch (e) {
    console.log('=== ' + t.name + ' ===');
    console.log('  NAV FAILED:', e.message);
    allOk = false;
    await page.close();
    continue;
  }
  // give lazy/federated remote a beat to resolve + commit
  await new Promise(r => setTimeout(r, 1500));

  const rootHtmlLen = await page
    .$eval('#root', el => el.innerHTML.length)
    .catch(() => 0);
  const rootText = await page
    .$eval('#root', el => el.innerText)
    .catch(() => '(no #root)');
  // Find the banner by its text span, then read the banner div (its parent).
  const bannerBg = await page.evaluate(() => {
    const span = [...document.querySelectorAll('span')].find(s =>
      /market/i.test(s.textContent || ''),
    );
    const banner = span ? span.parentElement : null;
    return banner ? getComputedStyle(banner).backgroundColor : null;
  });

  const rendered = rootHtmlLen > 0 && /market/i.test(rootText);
  const styled = bannerBg === 'rgb(42, 45, 49)'; // #2a2d31
  const clean = errors.length === 0;

  console.log('=== ' + t.name + ' ===');
  console.log('  #root innerHTML length :', rootHtmlLen);
  console.log('  #root text            :', JSON.stringify((rootText || '').replace(/\s+/g, ' ').slice(0, 160)));
  console.log('  banner computed bg    :', bannerBg, styled ? '(= #2a2d31 ✓)' : '(expected rgb(42,45,49))');
  console.log('  console/page errors   :', clean ? 'none ✓' : errors);
  console.log('  VERDICT               :', rendered && styled && clean ? 'PASS ✓' : 'FAIL ✗');
  if (!(rendered && styled && clean)) allOk = false;

  await page.close();
}

await browser.close();
console.log('\nOVERALL:', allOk ? 'ALL PASS ✓' : 'SOME FAIL ✗');
process.exit(allOk ? 0 : 1);
