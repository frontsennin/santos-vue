declare module 'v-mask' {
  import { Plugin } from 'vue'

  interface VueMaskOptions {
    placeholders?: {
      [key: string]: RegExp | null
    }
  }

  interface VueMaskStatic extends Plugin {
    VueMaskPlugin: Plugin
    VueMaskDirective: any
    VueMaskFilter: any
  }

  const VueMask: VueMaskStatic

  export default VueMask
  export const VueMaskDirective: any
  export const VueMaskFilter: any
}
