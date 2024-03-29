export interface ClientFactory<T> {
  init(): Promise<T>;
  finish(): Promise<void>;
  drop(): Promise<void>;
}
