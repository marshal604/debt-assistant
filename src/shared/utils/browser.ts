export const getBrowser = () => {
  // Firefox 1.0+
  const isFirefox = typeof (window as any).InstallTrigger !== 'undefined';

  // Safari 3.0+ "[object HTMLElementConstructor]"
  const isSafari = /constructor/i.test(
    (window.HTMLElement as any) ||
      (function(p) {
        return p.toString() === '[object SafariRemoteNotification]';
      })(!(window as any).safari || (typeof (window as any).safari !== 'undefined' && (window as any).safari.pushNotification))
  );

  // Internet Explorer 6-11
  const isIE = /*@cc_on!@*/ false || !!(document as any).documentMode;

  // Edge 20+
  const isEdge = !isIE && !!window.StyleMedia;

  // Chrome 1 - 79
  const isChrome = !!(window as any).chrome && (!!(window as any).chrome.webstore || !!(window as any).chrome.runtime);

  // Edge (based on chromium) detection
  const isEdgeChromium = isChrome && navigator.userAgent.indexOf('Edg') != -1;

  // Blink engine detection
  // const isBlink = (isChrome || isOpera) && !!(window as any).CSS;
  if (isChrome) {
    return 'Chrome';
  } else if (isFirefox) {
    return 'Firefox';
  } else if (isSafari) {
    return 'Safari';
  } else if (isEdge) {
    return 'Edge';
  } else if (isIE) {
    return 'IE';
  } else {
    return 'unknown';
  }
};
