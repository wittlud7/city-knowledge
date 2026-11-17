# 天津小程序首页 · Design QA

Date: 2026-11-02

Source visual truth: `preview/design-target.png` (single mobile design reference; app content only).

Implementation: <http://127.0.0.1:8801/mini/>. Actual WXML, WXSS and page controllers are rendered through the browser adapter; this is not a WeChat compiler or device simulator.

Viewport/state: 390×844, home, light theme, loaded public data, blank question field. Source and implementation were shown together in the same browser capture. Combined evidence: `docs/pocket-comparison.png`; final rendered page: `docs/pocket-home.png`.

## Findings and repairs

- [P1, fixed] Initial HTML button measured only 62px wide. The primary action now explicitly fills its question module, retaining the darker press edge.
- [P2, fixed] Initial vertical density hid the final metadata/count behind the tab bar. Reduced list spacing and aligned the adapter tab bar to49px; final count bottom793.4px is above the tab bar top795px at the comparison viewport.
- [P2, fixed] The browser adapter initially treated self-closing textarea as HTML raw text and did not tolerate missing WXML data during loading. The adapter now expands non-void WXML tags and applies native-like empty-value behavior; the question flow returns a real result and four citations.
- [P2, fixed] Category scroll-view initially widened the document. Horizontal overflow is contained in the scroll-view. The housing selection displays2records; the All action resets the selection and displays11records.

## Post-fix comparison

The final combined image was reopened after repairs. The question module, six-entry grid, three guide rows and tab bar follow the source hierarchy and dimensions. One font family is used throughout the preview; headings and body differ by weight and size. No actionable P0/P1/P2 visual mismatch remains.

## Follow-up polish

- [P3] The source mockup uses a slightly different sans face and some filled icons. The implementation uses an OFL sans for preview and the existing licensed icon library; WeChat uses platform sans fonts. Exact glyph metrics can differ by device.
- [P3] The static city label omits the mockup's dropdown arrow because cross-mini-program switching is not configured.

## Validation and limits

- Query handoff, retrieval with citations, category selection, resetting all content and source-bearing details were exercised against the real local backend.
- 320px and390px preview widths show no document overflow. The final browser run reported no console errors.
- Native page structure/event checks pass for11pages. Eight relevant tests pass, including approved file exposure and rejection of unregistered paths/types.
- WeChat compilation, true device rendering, OS accessibility and native map integration remain unverified. The visual pass applies to the browser-adapted home screen, not a claim of native release approval.

final result: passed
