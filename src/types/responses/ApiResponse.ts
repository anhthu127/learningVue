export default interface ApiResponse {
  message: string;
  errors: Array<Record<string, string>>;
}
