import { defineStore } from 'pinia'
import { Toast } from '../composables/ToastError.js'
import { i18n } from '@/locales'


export const useToastStore = defineStore('toast', {

  state: () => ({
    lastToast: null,
  }),

  actions: {

    notifyApiError(err) {
      const { t } = i18n.global;
      const { showError, showWarning } = Toast();

      console.error("DEV LOG : " + err.message); // DEV

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
      
      const handler = statusHandlers[err?.status] || { type: 'error', key: 'error.unknow_error' };
      let message = `${t(handler.key)} : ${err.message}`;
      
      if (handler.type === 'warning') {
        showWarning(message);
        this.lastToast = showWarning;
      } else {
        showError(message);
        this.lastToast = showError;
      }
    },

    notifyInfo(type) {
      const { t } = i18n.global;
      const { showSuccess } = Toast();

      const typeHandler = {
        'register': 'toast.register',
        'login': 'toast.login',
        'logout': 'toast.logout'
      }
  
      let message = t(typeHandler[type]);
      showSuccess(message);
      this.lastToast = showSuccess;
    }
  },
})
