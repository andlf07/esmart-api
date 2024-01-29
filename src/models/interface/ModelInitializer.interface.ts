export interface ModelInitializer {
  initialize: () => void;
  assosiations?: () => void;
}
