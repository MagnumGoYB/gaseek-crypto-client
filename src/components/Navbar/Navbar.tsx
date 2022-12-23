import { FunctionComponent } from 'preact'
import { useContext, useState } from 'preact/hooks'
import { AiOutlineClose } from 'react-icons/ai'
import { BiWallet, BiLogOut } from 'react-icons/bi'
import { HiMenuAlt4 } from 'react-icons/hi'

import { TransactionContext } from '@/context/transcations'
import { shortenAddress } from '@/utils'

import { NavbarItem } from '.'
import logo from '../../assets/logo.png'

const menus: string[] = []

const Navbar: FunctionComponent = () => {
  const [toggleMenu, setToggleMenu] = useState(false)
  const { currentAccount, connectWallet, disconnectWallet } =
    useContext(TransactionContext)

  return (
    <nav className="w-full flex md:justify-center justify-between items-center p-4">
      <div className="md:flex-1 md:ml-5 flex-initial justify-center items-center">
        <img src={logo} alt="logo" className="w-32 cursor-pointer" />
      </div>
      <ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
        {menus.map((title, index) => (
          <NavbarItem key={index} title={title} />
        ))}
        <li
          onClick={() => {
            if (!currentAccount) {
              connectWallet()
            } else {
              disconnectWallet()
            }
          }}
          className="bg-[#2952e3] flex justify-center items-center py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]"
        >
          {!currentAccount ? (
            <>
              <BiWallet size={20} />
              <span className="ml-2">Connect Wallet</span>
            </>
          ) : (
            <>
              <span className="mr-2">{shortenAddress(currentAccount)}</span>
              <BiLogOut size={20} />
            </>
          )}
        </li>
      </ul>
      <div className="flex relative">
        {!toggleMenu && (
          <div
            className="md:hidden cursor-pointer"
            onClick={() => setToggleMenu(true)}
          >
            <HiMenuAlt4 size={28} color="#fff" />
          </div>
        )}
        {toggleMenu && (
          <div
            className="md:hidden cursor-pointer"
            onClick={() => setToggleMenu(false)}
          >
            <AiOutlineClose size={28} color="#fff" />
          </div>
        )}
        {toggleMenu && (
          <ul
            className="z-10 fixed -top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none
            flex flex-col justify-start rounded-md blue-glassmorphism text-white animate-slide-in"
          >
            <li
              className="text-xl w-full my-2"
              onClick={() => setToggleMenu(false)}
            >
              <AiOutlineClose />
            </li>
            {menus.map((title, index) => (
              <NavbarItem key={index} title={title} className="my-2 text-lg" />
            ))}
            <li
              onClick={() => {
                if (!currentAccount) {
                  connectWallet()
                } else {
                  disconnectWallet()
                }
              }}
              className="my-2 bg-[#2952e3] flex justify-center items-center py-2 px-7 rounded-full cursor-pointer hover:bg-[#2546bd]"
            >
              {!currentAccount ? (
                <>
                  <BiWallet size={20} />
                  <span className="ml-2">Connect Wallet</span>
                </>
              ) : (
                <>
                  <span className="mr-2">{shortenAddress(currentAccount)}</span>
                  <BiLogOut size={20} />
                </>
              )}
            </li>
          </ul>
        )}
      </div>
    </nav>
  )
}

export default Navbar
