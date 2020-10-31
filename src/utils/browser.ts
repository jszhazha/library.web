function getTypeVersion() {
  const userAgent = navigator.userAgent.toLowerCase();

  const browserTypes = {
    IE: /(?:msie|trident.*rv).([\d.]+)/,
    Edge: /edge.([\d.]+)/,
    Chrome: /chrome.([\d.]+)/,
    Firefox: /firefox.([\d.]+)/,
    Opera: /opera.([\d.]+)/,
    Safari: /(?:safari|version).([\d.]+)/,
  };

  type BrowserKeys = keyof typeof browserTypes;

  /** browser 信息 */
  let type!: BrowserKeys | null;

  /** browser 版本 */
  let version!: string | null | Array<string>;

  for (type in browserTypes) {
    if (version = browserTypes[type as BrowserKeys].exec(userAgent)) {
      version = version[1];
      break;
    }
  }

  if (!version) {
    type = version = null
  }

  return { type, version }
}


const { type, version } = getTypeVersion();


export function getVersion() {
  return version;
}

export function isIeFn() {
  return type === 'IE';
}

export function isChromeFn() {
  return type === 'Chrome';
}

export function isEdgeFn() {
  return type === 'Edge';
}

export function isSafariFn() {
  return type === 'Safari';
}

export function isFirefoxFn() {
  return type === 'Firefox';
}

export function isOperaFn() {
  return type === 'Opera';
}
