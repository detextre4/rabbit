import store from '@/store'

export function createObserver({ options, targets, handle }:
  {
      options?: IntersectionObserverInit | undefined,
      targets: HTMLElement|HTMLElement[]|NodeListOf<Element>,
      handle: IntersectionObserverCallback,
  }): IntersectionObserver {
  options ??= {
    root: null,
    rootMargin: "0px",
    threshold: buildThresholdList(),
  };

  const observer = new IntersectionObserver(handle, options);
  if (targets instanceof HTMLElement) observer.observe(targets);
  else targets.forEach(el => observer.observe(el))

  return observer
}

/// Useful to set intersection threshold
export function buildThresholdList(): number[] {
  const thresholds = [];
  const numSteps = 40;

  for (let i = 1.0; i <= numSteps; i++) {
    const ratio = i / numSteps;
    thresholds.push(ratio);
  }

  thresholds.push(0);
  return thresholds;
}

export function showLoader(): void {
  store.commit('setLoaderState', true)
}

export function closeLoader(): void {
  store.commit('setLoaderState', false)
}

export function isOnlyDigits(value: string|number|undefined): boolean {
  if (!value) return false
  const regex = /^[0-9.]+$/
  return regex.test(value.toString())
}

export function toCssVal(value: any, unit = 'px'): string {
  // helper
  function setValue(val: string|number|Array<number|string>, i: number|null) {
    if (typeof val === 'string') return val

    const def = `${val}${unit}`
    switch (length) {
      case 2: { if (i === 1) return `${val}em` } break;
      case 3: { if (i === 1) return `${val}vw` } break;
    }

    return def
  }

  if (Number.isFinite(value)) {
    return `${value}${unit}`
  } else if (Array.isArray(value)) {
    const length = value.length
    const formatValue = value.map((e, i) => setValue(e, i)).join(',')

    switch (length) {
      case 1: return setValue(value.at(0), null)
      case 2: return `max(${formatValue})`
      default: return `clamp(${formatValue})`
    }
  }

  return value
}

export function getUrlFromFile(file: File) {
  if (!file) return null
  return URL.createObjectURL(file)
}

export async function getFileFromUrl(url: string, type = 'image/jpeg') {
  const
    response = await fetch(url),
    blob = await response.blob(),
    filename = getFilenameFromUrl(url),
    file = new File([blob], filename, { type })
  
  return file
}

export function getFilenameFromUrl(url: string) {
  const path = url.split('/')

  // Gets the last part, which should be the name of the file
  return path[path.length - 1]
}

export async function getImageSize(file: File): Promise<{ width: number, height: number }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = function(event) {
      const img = new Image();
      img.onload = function() {
        const width = img.width;
        const height = img.height;
        resolve({ width, height });
      };
      img.src = event.target?.result?.toString() ?? '';
    };
    reader.onerror = (error) => reject(error);

    reader.readAsDataURL(file);
  });
}
