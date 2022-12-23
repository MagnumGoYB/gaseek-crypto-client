import { JSX } from 'preact'

export type TransferStruct = {
  receiver: string
  sender: string
  timestamp: string
  message: string
  keyword: string
  amount: string
}

export type Transaction = {
  addressTo: string
  addressFrom: string
  timestamp: string
  message: string
  keyword: string
  amount: number
  url?: string
}

export type TransactionContextType = {
  transactionCount: number
  connectWallet: () => Promise<void>
  switchChain: () => Promise<void>
  disconnectWallet: () => void
  transactions: Transaction[]
  currentAccount: string
  currentChainId: string
  isLoading: boolean
  sendTransaction: () => Promise<void>
  handleChange: (
    e: JSX.TargetedEvent<HTMLInputElement, Event>,
    name: string
  ) => void
  formData: {
    addressTo: string
    amount: string
    keyword: string
    message: string
  }
}
