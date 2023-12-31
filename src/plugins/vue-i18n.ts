import { createI18n } from 'vue-i18n'
import en from '@/i18n/en'
import es from '@/i18n/es'

// Types
import type { App } from 'vue'

export default (app: App) => {
  const i18n = createI18n({
    locale: 'en', // set locale
    fallbackLocale: 'en', // set fallback locale
    // set messages objects
    messages: {
      en, es,
    }
  })

  app.use(i18n)
}
