export interface ToastType {
  id?: number;
  type: "success" | "info" | "warning" | "error";
  message: string;
}
