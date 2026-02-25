import { toast } from 'vue3-toastify'

export function Toast() {

  function showError(message) {
    toast.error(message);
  }

  function showWarning(message) {
    toast.warning(message);
  }

  function showSuccess(message) {
    toast.success(message);
  }

  return { showError, showWarning, showSuccess }
}