import { En3SourceManager } from '../attachments/En3SourceManager'

export interface En3SourceConsumer<T> {
  get sourceManager(): En3SourceManager<T>
}
