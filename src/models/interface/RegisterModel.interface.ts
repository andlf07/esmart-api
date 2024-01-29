export interface RegisterModels {
  initializeModels(): Promise<void>;
  makeAssosiations(): Promise<void>;
}
