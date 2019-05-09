import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @font-face {
  font-family: 'SpoqaHanSans';
  font-weight: 700;
  font-display: swap;
  src: local('Spoqa Han Sans Bold'),
    url('https://cdn.rawgit.com/spoqa/spoqa-han-sans/01ff0283/Subset/SpoqaHanSans/SpoqaHanSansBold.woff2')
      format('woff2'),
    url('https://cdn.rawgit.com/spoqa/spoqa-han-sans/01ff0283/Subset/SpoqaHanSans/SpoqaHanSansBold.woff') format('woff'),
    url('https://cdn.rawgit.com/spoqa/spoqa-han-sans/01ff0283/Subset/SpoqaHanSans/SpoqaHanSansBold.ttf')
      format('truetype');
}

@font-face {
  font-family: 'SpoqaHanSans';
  font-weight: 400;
  font-display: swap;
  src: local('Spoqa Han Sans Regular'),
    url('https://cdn.rawgit.com/spoqa/spoqa-han-sans/01ff0283/Subset/SpoqaHanSans/SpoqaHanSansRegular.woff2')
      format('woff2'),
    url('https://cdn.rawgit.com/spoqa/spoqa-han-sans/01ff0283/Subset/SpoqaHanSans/SpoqaHanSansRegular.woff')
      format('woff'),
    url('https://cdn.rawgit.com/spoqa/spoqa-han-sans/01ff0283/Subset/SpoqaHanSans/SpoqaHanSansRegular.ttf')
      format('truetype');
}

@font-face {
  font-family: 'SpoqaHanSans';
  font-weight: 300;
  font-display: swap;
  src: local('Spoqa Han Sans Light'),
    url('https://cdn.rawgit.com/spoqa/spoqa-han-sans/01ff0283/Subset/SpoqaHanSans/SpoqaHanSansLight.woff2')
      format('woff2'),
    url('https://cdn.rawgit.com/spoqa/spoqa-han-sans/01ff0283/Subset/SpoqaHanSans/SpoqaHanSansLight.woff')
      format('woff'),
    url('https://cdn.rawgit.com/spoqa/spoqa-han-sans/01ff0283/Subset/SpoqaHanSans/SpoqaHanSansLight.ttf')
      format('truetype');
}

*,
*::before,
*::after {
  box-sizing: border-box; // 1
}

html {
  font-family: sans-serif; // 2
  line-height: 1.15; // 3
  -webkit-text-size-adjust: 100%; // 4
  -ms-text-size-adjust: 100%; // 4
  -ms-overflow-style: scrollbar; // 5
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0); // 6
}

@at-root {
  @-ms-viewport {
    width: device-width;
  }
}
article,
aside,
dialog,
figcaption,
figure,
footer,
header,
hgroup,
main,
nav,
section {
  display: block;
}

body {
  margin: 0;
  text-align: left;
  text-transform: none;
  line-height: 1.5;
  letter-spacing: 0;
  font-family: -apple-system, 'SpoqaHanSans', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu',
    'Cantarell', 'Open Sans', 'Helvetica Neue', 'Icons16', sans-serif;
  background: #f8f8f9; /* gray000 */
  position: relative;
  margin: 0;

  &.lock-scrolling {
    overflow: hidden;
    -webkit-overflow-scrolling: touch;
  }
}

[tabindex='-1']:focus {
  outline: 0 !important;
}

hr {
  box-sizing: content-box;
  height: 0; // 1
  overflow: visible; // 2
}

abbr[title],
abbr[data-original-title] {
  // 4
  text-decoration: underline; // 2
  text-decoration: underline dotted; // 2
  cursor: help; // 3
  border-bottom: 0; // 1
}

address {
  margin-bottom: 1rem;
  font-style: normal;
  line-height: inherit;
}

ol,
ul,
dl {
  margin-top: 0;
  margin-bottom: 1rem;
}

ol ol,
ul ul,
ol ul,
ul ol {
  margin-bottom: 0;
}

dt {
  // font-weight: $dt-font-weight;
}

dd {
  margin-bottom: 0.5rem;
  margin-left: 0;
}

blockquote {
  margin: 0 0 1rem;
}

dfn {
  font-style: italic;
}

b,
strong {
  font-weight: bolder;
}

small {
  font-size: 80%;
}

sub,
sup {
  position: relative;
  font-size: 75%;
  line-height: 0;
  vertical-align: baseline;
}

sub {
  bottom: -0.25em;
}
sup {
  top: -0.5em;
}

a:not([href]):not([tabindex]) {
  color: inherit;
  text-decoration: none;

  &:focus {
    outline: 0;
  }
}

pre,
code,
kbd,
samp {
  font-family: monospace, monospace;
  font-size: 1em;
}

pre {
  margin-top: 0;
  margin-bottom: 1rem;
  overflow: auto;
  -ms-overflow-style: scrollbar;
}

figure {
  margin: 0 0 1rem;
}

img {
  vertical-align: middle;
  border-style: none;
}

svg:not(:root) {
  overflow: hidden;
}

table {
  border-collapse: collapse;
}

caption {
  // padding-top: $table-cell-padding;
  // padding-bottom: $table-cell-padding;
  // color: $table-caption-color;
  text-align: left;
  caption-side: bottom;
}

th {
  text-align: inherit;
}

label {
  display: inline-block;
  // margin-bottom: $label-margin-bottom;
}

button {
  border-radius: 0;
}

button:focus {
  outline: 1px dotted;
  outline: 5px auto -webkit-focus-ring-color;
}

input,
button,
select,
optgroup,
textarea {
  margin: 0;
  font-size: inherit;
  line-height: inherit;
}

button,
input {
  overflow: visible;
}

button,
select {
  text-transform: none;
}

button,
html [type='button'],
[type='reset'],
[type='submit'] {
  -webkit-appearance: button;
}

button::-moz-focus-inner,
[type='button']::-moz-focus-inner,
[type='reset']::-moz-focus-inner,
[type='submit']::-moz-focus-inner {
  padding: 0;
  border-style: none;
}

input[type='radio'],
input[type='checkbox'] {
  box-sizing: border-box;
  padding: 0;
}

input[type='date'],
input[type='time'],
input[type='datetime-local'],
input[type='month'] {
  -webkit-appearance: listbox;
}

textarea {
  overflow: auto;
  resize: vertical;
}

fieldset {
  min-width: 0;
  padding: 0;
  margin: 0;
  border: 0;
}

legend {
  display: block;
  width: 100%;
  max-width: 100%; // 1
  padding: 0;
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
  line-height: inherit;
  color: inherit; // 2
  white-space: normal; // 1
}

progress {
  vertical-align: baseline;
}

[type='number']::-webkit-inner-spin-button,
[type='number']::-webkit-outer-spin-button {
  height: auto;
}

[type='search'] {
  outline-offset: -2px;
  -webkit-appearance: none;
}

[type='search']::-webkit-search-cancel-button,
[type='search']::-webkit-search-decoration {
  -webkit-appearance: none;
}

::-webkit-file-upload-button {
  font: inherit; // 2
  -webkit-appearance: button; // 1
}

output {
  display: inline-block;
}

summary {
  display: list-item;
  cursor: pointer;
}

template {
  display: none;
}

[hidden] {
  display: none !important;
}

label {
  display: inline-block;
}

.small,
small {
  font-size: 80%;
  font-weight: 400;
}

button,
input,
optgroup,
select,
textarea {
  margin: 0;
  font-family: 'SpoqaHanSans';
  line-height: inherit;
}
.img-fluid {
  width: 100%;
}
.card-columns {
  column-count: 4;
}
.toast-z {
  z-index: 10000 !important;
}
.clearfix::before,
.clearfix::after {
  content: '';
  display: table;
}
.clearfix::after {
  clear: both;
}
.clearfix {
  zoom: 1;
}

@keyframes openModal {
  from {
    -ms-transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, calc(-50% - 8px));
    -webkit-font-smoothing: antialiased;
  }
  to {
    -ms-transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    -webkit-font-smoothing: antialiased;
  }
}
@keyframes openOverlay {
  from {
    opacity: 0;
    -webkit-font-smoothing: antialiased;
  }
  to {
    opacity: 1;
    -webkit-font-smoothing: antialiased;
  }
}

*:focus {
  outline: none !important;
}

hr {
  margin: 20px 0;
  border: none;
  border-bottom: 1px solid rgba(16, 22, 26, 0.15);
}

h1 {
  color: #182026;
  font-weight: 600;
  margin: 0 0 10px;
  padding: 0;
  line-height: 40px;
  font-size: 36px;
}

h2 {
  color: #182026;
  font-weight: 600;
  margin: 0 0 10px;
  padding: 0;
  line-height: 32px;
  font-size: 28px;
}

h3 {
  color: #182026;
  font-weight: 600;
  margin: 0 0 10px;
  padding: 0;
  line-height: 25px;
  font-size: 22px;
}

h4 {
  color: #182026;
  font-weight: 600;
  margin: 0 0 10px;
  padding: 0;
  line-height: 21px;
  font-size: 18px;
}

h5 {
  color: #182026;
  font-weight: 600;
  margin: 0 0 10px;
  padding: 0;
  line-height: 19px;
  font-size: 16px;
}

h6 {
  color: #182026;
  font-weight: 600;
  margin: 0 0 10px;
  padding: 0;
  line-height: 16px;
  font-size: 14px;
}
`;

export default GlobalStyle;