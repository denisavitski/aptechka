import { TickerCallbackEntry } from '@packages/ticker'
import { AnimationStore } from './AnimationStore'

export interface SpringOptions {
  initial?: number
  stiffness?: number
  damping?: number
  mass?: number
  preset?: SpringPreset
}

export const SpringPresets = {
  // Мягкая и плавная анимация
  gentle: {
    stiffness: 80,
    damping: 15,
    mass: 1,
  },
  // Стандартная пружина
  default: {
    stiffness: 100,
    damping: 20,
    mass: 1,
  },
  // Быстрая и отзывчивая
  quick: {
    stiffness: 200,
    damping: 25,
    mass: 1,
  },
  // Медленная и тяжелая
  slow: {
    stiffness: 50,
    damping: 25,
    mass: 1.5,
  },
  // Более упругая с перерегулированием
  bouncy: {
    stiffness: 150,
    damping: 10,
    mass: 1,
  },
  // Очень упругая с сильным перерегулированием
  veryBouncy: {
    stiffness: 180,
    damping: 5,
    mass: 1,
  },
  // Критическое демпфирование (без колебаний)
  critical: {
    stiffness: 100,
    damping: 40,
    mass: 1,
  },
  // Легкая и воздушная
  airy: {
    stiffness: 120,
    damping: 12,
    mass: 0.8,
  },
  // Тяжелая и инерционная
  heavy: {
    stiffness: 70,
    damping: 30,
    mass: 2,
  },
} as const

export type SpringPreset = keyof typeof SpringPresets

export class Spring extends AnimationStore {
  #options: Required<Omit<SpringOptions, 'preset' | 'initial'>> = null!
  #speed = 0
  #velocity = 0
  #acceleration = 0

  constructor(options?: SpringOptions) {
    super(options?.initial || 0)

    this.setOptions(options)
  }

  public get speed() {
    return this.#speed
  }

  public get velocity() {
    return this.#velocity
  }

  public get acceleration() {
    return this.#acceleration
  }

  public setOptions(options?: Omit<SpringOptions, 'initial'>) {
    if (options?.preset) {
      this.#options = {
        ...SpringPresets[options.preset],
      }
    } else {
      this.#options = {
        damping: 20,
        mass: 1,
        stiffness: 100,
        ...options,
      }
    }
  }

  protected override onAnimationStop() {
    this.#speed = 0
    this.#velocity = 0
    this.#acceleration = 0
  }

  protected override onAnimationTick(e: TickerCallbackEntry) {
    const delta = Math.abs(this.current - this.target)
    const dt = e.timeBetweenFrames / 1000
    const { mass, stiffness, damping } = this.#options

    this.#speed = delta / e.timeBetweenFrames
    this.#acceleration =
      (this.target - this.current) * stiffness - this.#velocity * damping
    this.#velocity += (this.#acceleration / mass) * dt
    this.current += this.#velocity * dt
  }
}
