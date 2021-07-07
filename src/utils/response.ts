import ApiResponse from "@/types/responses/ApiResponse";
import { notification } from "ant-design-vue";

type ToastType = "success" | "error" | "info" | "warning";

interface ResponOptions {
  successMsg?: string;
  errorMsg?: string;
  isError?: boolean;
  hideDetail?: boolean;
}

/**
 * toast message
 * @param string message
 * @param string desc
 * @param string type
 *
 * @return void
 */
export function toastMessage(
  message: string,
  desc: string,
  type: ToastType = "success"
): void {
  notification[type]({
    message: message,
    description: desc,
  });
}

/**
 * toast message
 * @param string message
 * @param string type
 *
 * @return boolean
 */
export function handleResponse(
  response: ApiResponse,
  options?: ResponOptions
): boolean {
  if ((!options || !options.isError) && response && !response.errors) {
    toastMessage(
      options && options.successMsg ? options.successMsg : "Success",
      ""
    );
    return true;
  }
  const errorMsg = response.message ? response.message : "";
  const errorDetail = response.errors ? JSON.stringify(response.errors) : "";
  toastMessage(
    options && options.errorMsg ? options.errorMsg : errorMsg,
    options && options.hideDetail ? "" : errorDetail,
    "error"
  );
  return false;
}
