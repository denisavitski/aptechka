import { intersector } from '$packages/intersector'
import { ElementOrSelector, getElement } from '$packages/utils'
import { En3SourceConsumer } from '../objects/En3SourceConsumer'

class En3LazyLoader {
  public add(consumer: En3SourceConsumer<any>, element: ElementOrSelector) {
    const subscriber = (entry: IntersectionObserverEntry) => {
      if (entry.isIntersecting) {
        consumer.sourceManager.lazyLoad()
        intersector.unsubscribe(subscriber)
      }
    }

    const target = getElement(element)

    if (target) {
      return intersector.subscribe(target, subscriber)
    }
  }
}

export const en3LazyLoader = new En3LazyLoader()
