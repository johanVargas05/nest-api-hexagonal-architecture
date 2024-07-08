export interface ValidObject<T> {
  validate(value: T): void;
  value: T;
}
