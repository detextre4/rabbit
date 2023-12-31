import Vue3Storage from "vue3-storage-secure";

// Types
import type { App } from 'vue'

export default (app: App) => {
  // 1. app.use(Vue3Storage)
  // 2. app.use(Vue3Storage, { namespace: "jarvis_" })

  // namespace: 命名空间，secureKey: 加密盐值
  app.use(Vue3Storage, { namespace: "jarvis_", secureKey: "246810" })
}
