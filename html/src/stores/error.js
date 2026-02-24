import { defineStore } from 'pinia'
import { ToastError } from '../composables/ToastError.js'
import { i18n } from '@/locales'


export const useErrorStore = defineStore('error', {

  state: () => ({
    lastError: null,
  }),

  actions: {
    notifyError(err) {
      const { t } = i18n.global;
      const { showError } = ToastError();

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
      }
      
      const handler = statusHandlers[err?.status] || { type: 'error', key: 'error.unknow_error' }
      let message = t(handler.key)
      
      if (handler.type === 'warning') {
        showWarning(message)
      } else {
        showError(message)
      }
      this.lastError = message
    },
  },
})
