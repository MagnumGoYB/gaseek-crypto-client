/// <reference types="vite/client" />

declare interface Window {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ethereum: any
}

declare type EffectiveConnectionType = '2g' | '3g' | '4g' | 'slow-2g'
declare type ConnectionType =
  | 'bluetooth'
  | 'cellular'
  | 'ethernet'
  | 'mixed'
  | 'none'
  | 'other'
  | 'unknown'
  | 'wifi'
  | 'wimax'
declare interface NetworkInformation extends EventTarget {
  readonly type?: ConnectionType
  readonly effectiveType?: EffectiveConnectionType
}
declare interface Navigator {
  readonly connection?: NetworkInformation
}
