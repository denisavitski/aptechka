import { En3SourceManager } from '../misc/En3SourceManager'

export interface En3SourceConsumer<T> {
  get sourceManager(): En3SourceManager<T>
}
