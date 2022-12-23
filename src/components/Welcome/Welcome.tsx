import { FunctionComponent, JSX } from 'preact'
import { useContext } from 'preact/hooks'
import { BiWallet } from 'react-icons/bi'
import { BsInfoCircle } from 'react-icons/bs'
import { SiEthereum } from 'react-icons/si'

import { TransactionContext } from '@/context/transcations'
import { shortenAddress } from '@/utils'

import Dialog from '../Dialog'
import Loader from '../Loader'
import Input from './Input'

const companyCommonStyles =
  'min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 font-light text-white'

const Welcome: FunctionComponent = () => {
  const {
    currentChainId,
    currentAccount,
    connectWallet,
    switchChain,
    handleChange,
    sendTransaction,
    formData,
    isLoading
  } = useContext(TransactionContext)

  const handleSubmit = (e: JSX.TargetedMouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (currentChainId !== '0x5') {
      Dialog.show({
        onConfirm: async () => {
          await switchChain()
        },
        title: 'Warning',
        content: 'Please switch to Goerli network!'
      })
      return
    }
    const { addressTo, amount, keyword, message } = formData
    if (!addressTo || !amount || !keyword || !message) {
      Dialog.show({
        title: 'Warning',
        content: 'Please enter the transfer data!'
      })
      return
    }
    sendTransaction()
  }

  return (
    <div className="flex w-full justify-center items-center">
      <div className="flex mf:flex-row flex-col items-start justify-between md:py-20 py-12 px-5">
        <div className="flex flex-1 justify-start items-start flex-col mf:mr-28">
          <h1 className="text-3xl sm:text-5xl text-white font-semibold text-gradient py-1">
            Send Crypto <br /> Across the world
          </h1>
          <p className="text-left mt-10 text-white font-light md:w-9/12 w-11/12 text-base">
            Explore the crypto world. Buy and sell cryptocurrencies easily on
            Gaseek Crypto.
          </p>
          {!currentAccount && (
            <button
              type="button"
              onClick={connectWallet}
              className="flex flex-row justify-center items-center my-5 bg-[#2952e3] py-3 px-4 rounded-full cursor-pointer hover:bg-[#2546bd]"
            >
              <span className="text-white mr-2">
                <BiWallet size={20} />
              </span>
              <p className="text-white text-base font-semibold">
                Connect Wallet
              </p>
            </button>
          )}

          <div className="grid sm:grid-cols-3 grid-cols-2 w-full mt-10">
            <div className={`rounded-tl-2xl ${companyCommonStyles}`}>
              Reliability
            </div>
            <div className={companyCommonStyles}>Security</div>
            <div className={`sm:rounded-tr-2xl ${companyCommonStyles}`}>
              Ethereum
            </div>
            <div className={`sm:rounded-bl-2xl ${companyCommonStyles}`}>
              Web 3.0
            </div>
            <div className={companyCommonStyles}>Low Fees</div>
            <div className={`rounded-br-2xl ${companyCommonStyles}`}>
              Blockchain
            </div>
          </div>
        </div>

        <div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10">
          <div className="p-3 flex justify-end items-start flex-col rounded-xl h-48 sm:w-96 w-full mb-5 eth-card white-glassmorphism ">
            <div className="flex justify-between flex-col w-full h-full">
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                  <SiEthereum size={21} color="#fff" />
                </div>
                <BsInfoCircle size={17} color="#fff" />
              </div>
              <div>
                {currentAccount && (
                  <p className="text-white font-light text-sm">
                    {shortenAddress(currentAccount)}
                  </p>
                )}
                <p className="text-white font-semibold text-lg mt-1">
                  Ethereum
                </p>
              </div>
            </div>
          </div>
          <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
            <Input
              placeholder="Address To"
              name="addressTo"
              type="text"
              handleChange={handleChange}
            />
            <Input
              placeholder="Amount (ETH)"
              name="amount"
              type="number"
              handleChange={handleChange}
            />
            <Input
              placeholder="Keyword (Gif)"
              name="keyword"
              type="text"
              handleChange={handleChange}
            />
            <Input
              placeholder="Enter Message"
              name="message"
              type="text"
              handleChange={handleChange}
            />

            <div className="h-[1px] w-full bg-gray-700 my-4" />

            {currentAccount && (
              <>
                {isLoading ? (
                  <Loader />
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer"
                  >
                    Send now
                  </button>
                )}
              </>
            )}

            {!currentAccount && (
              <button
                type="button"
                onClick={connectWallet}
                className="flex justify-center items-center text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer"
              >
                <span className="mr-2">
                  <BiWallet size={20} />
                </span>
                Connect Wallet
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Welcome
