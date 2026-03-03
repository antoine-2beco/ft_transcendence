import { defineStore } from 'pinia'
import { Toast } from '../composables/ToastError.js'
import { i18n } from '@/locales'

function getT() {
  try {
    return i18n.global.t.bind(i18n.global);
  } catch {
    return (key) => key;
  }
}

export const useToastStore = defineStore('toast', {

  state: () => ({
    lastToast: null,
  }),

  actions: {

    notifyApiError(err) {
      const t = getT();
      const { showError, showWarning } = Toast();

      const status = err?.response?.status ?? err?.status ?? null;

      const statusHandlers = {
        400: { type: 'warning', key: 'error.bad_request' },
        409: { type: 'warning', key: 'error.already_exists' },
        
        401: { type: 'error', key: 'error.bad_entries' },
        403: { type: 'error', key: 'error.forbidden' },
        404: { type: 'error', key: 'error.not_found' },
        422: { type: 'error', key: 'error.validation' },
        
        0:   { type: 'warning', key: 'error.network' },
        408: { type: 'warning', key: 'error.timeout' },
        
        500: { type: 'error', key: 'error.server' }
      };
      
      const handler = statusHandlers[status] || { type: 'error', key: 'error.unknow_error' };
      let message = `${t(handler.key)}`;
      
      if (handler.type === 'warning') {
        showWarning(message);
        this.lastToast = showWarning;
      } else {
        showError(message);
        this.lastToast = showError;
      }
    },

    notifySuccess(type) {
      const t = getT();
      const { showSuccess } = Toast();
  
      let message = t(`success.${type}`);
      showSuccess(message);
      this.lastToast = showSuccess;
    },

    notifyWarning(type) {
      const t = getT();
      const { showWarning } = Toast();
  
      let message = t(`warning.${type}`);
      showWarning(message);
      this.lastToast = showWarning;
    }
  },
})
