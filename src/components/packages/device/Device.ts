import { RESIZE_ORDER } from '@packages/order'
import { windowResizer } from '@packages/window-resizer'
import { isBrowser } from '@packages/utils'
import { TierResult, getGPUTier } from 'detect-gpu'

export type DeviceOS =
  | 'macOS'
  | 'iOS'
  | 'Windows'
  | 'Android'
  | 'Linux'
  | 'unknown'

class Device {
  #OS = 'unknown'
  #gpu = 'unknown'
  #gpuTier = 0
  #gpuDetection: Promise<TierResult> = null!
  #isMobile = false
  #isTouch = false
  #isWebgl = false
  #isWebp = false
  #isApple = false

  constructor() {
    if (isBrowser) {
      this.#gpuDetection = getGPUTier()

      this.#gpuDetection.then((v) => {
        this.#gpu = v.gpu || 'unknown'
        this.#gpuTier = v.tier
      })

      windowResizer.subscribe(() => {
        this.#isMobile = /Mobi|Android/i.test(navigator.userAgent)

        this.#isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0

        setTimeout(() => {
          this.#isTouch =
            'ontouchstart' in window || navigator.maxTouchPoints > 0
        }, 0)
      }, RESIZE_ORDER.DEVICE)

      {
        const canvas = document.createElement('canvas')
        const gl =
          canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
        this.#isWebgl = (gl && gl instanceof WebGLRenderingContext) || false
      }

      {
        const canvas = document.createElement('canvas')
        if (canvas.getContext('2d')) {
          this.#isWebp =
            canvas.toDataURL('image/webp').indexOf('data:image/webp') == 0
        }
      }

      const userAgent = window.navigator.userAgent
      const platform =
        (window.navigator as any)?.userAgentData?.platform ||
        window.navigator.platform
      const macosPlatforms = [
        'Macintosh',
        'MacIntel',
        'MacPPC',
        'Mac68K',
        'macOS',
      ]
      const windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE']
      const iosPlatforms = ['iPhone', 'iPad', 'iPod']

      if (macosPlatforms.includes(platform)) {
        this.#OS = 'macOS'
        this.#isApple = true
      } else if (iosPlatforms.includes(platform)) {
        this.#OS = 'iOS'
        this.#isApple = true
      } else if (windowsPlatforms.includes(platform)) {
        this.#OS = 'Windows'
      } else if (/Android/.test(userAgent)) {
        this.#OS = 'Android'
      } else if (/Linux/.test(platform)) {
        this.#OS = 'Linux'
      } else {
        this.#OS = 'unknown'
      }
    }
  }

  public get OS() {
    return this.#OS
  }

  public get gpu() {
    return this.#gpu
  }

  public get gpuTier() {
    return this.#gpuTier
  }

  public get gpuDetection() {
    return this.#gpuDetection
  }

  public get isMobile() {
    return this.#isMobile
  }

  public get isTouch() {
    return this.#isTouch
  }

  public get isWebgl() {
    return this.#isWebgl
  }

  public get isWebp() {
    return this.#isWebp
  }

  public get isApple() {
    return this.#isApple
  }
}

export const device = new Device()
