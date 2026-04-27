export interface DataWithExpirationDate<T = unknown> {
  data: T
  /**
   * ISO 8610 date string
   */
  expirationDate: string
  /**
   * ISO 8610 date string
   */
  savedAt: string
}
