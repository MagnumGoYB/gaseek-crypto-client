import { ethers } from 'ethers'
import { createContext, FunctionComponent } from 'preact'
import { useCallback, useEffect, useState } from 'preact/hooks'

import { Dialog } from '@/components'

import { contractABI, contractAddress } from '../contracts'
import type {
  TransactionContextType,
  Transaction,
  TransferStruct
} from './typings'

export const TransactionContext = createContext({} as TransactionContextType)

const { ethereum } = window

const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum)
  const signer = provider.getSigner()
  const transactionsContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  )

  return transactionsContract
}

export const TransactionsProvider: FunctionComponent = ({ children }) => {
  const [formData, setformData] = useState({
    addressTo: '',
    amount: '',
    keyword: '',
    message: ''
  })
  const [currentAccount, setCurrentAccount] = useState('')
  const [currentChainId, setCurrentChainId] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const storageTransactionCount = localStorage.getItem('transactionCount')
  const [transactionCount, setTransactionCount] = useState(
    storageTransactionCount === null ? 0 : parseInt(storageTransactionCount, 10)
  )
  const [transactions, setTransactions] = useState<Transaction[]>([])

  const handleChange: TransactionContextType['handleChange'] = (e, name) => {
    setformData((prevState) => ({
      ...prevState,
      [name]: e.currentTarget.value
    }))
  }

  const installMetaMask = () => {
    Dialog.show({
      title: 'Error',
      content: 'Please install MetaMask!',
      confirmText: 'Go install now',
      onConfirm: async () => {
        window.open('https://metamask.io/download/')
      }
    })
  }

  const getAllTransactions = async () => {
    try {
      if (ethereum) {
        const transactionsContract = getEthereumContract()

        const availableTransactions =
          (await transactionsContract.getAllTransactions()) as TransferStruct[]

        const structuredTransactions = availableTransactions.map(
          (transaction) => ({
            addressTo: transaction.receiver,
            addressFrom: transaction.sender,
            timestamp: new Date(
              Number(transaction.timestamp) * 1000
            ).toLocaleString(),
            message: transaction.message,
            keyword: transaction.keyword,
            amount: parseInt(transaction.amount, 10) / 10 ** 18
          })
        )

        setTransactions(structuredTransactions)
      } else {
        console.log('Ethereum is not present')
      }
    } catch (error) {
      console.error(error)
    }
  }

  const checkIfWalletIsConnect = useCallback(async () => {
    try {
      if (!ethereum) return

      const accounts = await ethereum.request({ method: 'eth_accounts' })
      if (accounts.length) {
        setCurrentAccount(accounts[0])

        await ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x5' }]
        })

        setCurrentChainId('0x5')

        getAllTransactions()
      } else {
        console.log('No accounts found')
      }
    } catch (error) {
      console.error(error)
    }
  }, [])

  const checkIfTransactionsExists = async () => {
    try {
      if (ethereum) {
        const transactionsContract = getEthereumContract()
        const currentTransactionCount =
          await transactionsContract.getTransactionCount()

        window.localStorage.setItem('transactionCount', currentTransactionCount)
      }
    } catch (error) {
      console.error(error)
      throw new Error('No ethereum object')
    }
  }

  const connectWallet = async () => {
    try {
      if (!ethereum) {
        installMetaMask()
        return
      }

      const accounts = await ethereum.request({ method: 'eth_requestAccounts' })

      setCurrentAccount(accounts[0])
      window.location.reload()
    } catch (error) {
      console.error(error)

      throw new Error('No ethereum object')
    }
  }

  const switchChain = async () => {
    try {
      if (!ethereum) {
        installMetaMask()
        return
      }

      await ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x5' }]
      })
    } catch (error) {
      console.error(error)

      throw new Error('No ethereum object')
    }
  }

  const disconnectWallet = () => {
    setCurrentAccount('')
    setCurrentChainId('')
  }

  const sendTransaction = async () => {
    try {
      if (ethereum) {
        const { addressTo, amount, keyword, message } = formData
        const transactionsContract = getEthereumContract()
        const parsedAmount = ethers.utils.parseEther(amount)

        setIsLoading(true)

        await ethereum.request({
          method: 'eth_sendTransaction',
          params: [
            {
              from: currentAccount,
              to: addressTo,
              gas: '0x5208',
              value: parsedAmount._hex
            }
          ]
        })

        const transactionHash = await transactionsContract.addToBlockchain(
          addressTo,
          parsedAmount,
          message,
          keyword
        )

        console.log(`Loading - ${transactionHash.hash}`)
        await transactionHash.wait()
        console.log(`Success - ${transactionHash.hash}`)
        setIsLoading(false)

        const transactionsCount =
          await transactionsContract.getTransactionCount()

        setTransactionCount(transactionsCount.toNumber())
        window.location.reload()
      } else {
        console.log('No ethereum object')
      }
    } catch (error) {
      console.error(error)

      throw new Error('No ethereum object')
    }
  }

  const handleAccountsChanged = (accounts: string[]) => {
    setCurrentAccount(accounts[0])
  }

  const handleChainChanged = (chainId: string) => {
    setCurrentChainId(chainId)
  }

  useEffect(() => {
    checkIfWalletIsConnect()
    checkIfTransactionsExists()
  }, [checkIfWalletIsConnect, transactionCount])

  useEffect(() => {
    if (!ethereum) return

    ethereum.on('accountsChanged', handleAccountsChanged)
    ethereum.on('chainChanged', handleChainChanged)

    return () => {
      ethereum.removeListener('accountsChanged', handleAccountsChanged)
      ethereum.removeListener('chainChanged', handleChainChanged)
    }
  }, [])

  return (
    <TransactionContext.Provider
      value={{
        transactionCount,
        connectWallet,
        disconnectWallet,
        switchChain,
        transactions,
        currentAccount,
        currentChainId,
        isLoading,
        sendTransaction,
        handleChange,
        formData
      }}
    >
      {children}
    </TransactionContext.Provider>
  )
}
