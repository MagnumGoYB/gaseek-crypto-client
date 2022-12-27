import { GiphyFetch } from '@giphy/js-fetch-api'
import { FunctionComponent } from 'preact'
import { useCallback, useEffect, useState } from 'preact/hooks'

import { GIPHY_API_KEY, shortenAddress } from '@/utils'

type CardProps = {
  addressTo: string
  addressFrom: string
  timestamp: string
  message: string
  keyword: string
  amount: number
}

console.log(GIPHY_API_KEY)

const gf = new GiphyFetch(GIPHY_API_KEY)

const useGiphy = (keyword: string) => {
  const [gifUrl, setGifUrl] = useState('')

  const fetchGifs = useCallback(async () => {
    try {
      const gif = await gf.search(keyword.split(' ').join(''), { limit: 1 })
      if (gif.data.length > 0) {
        const url = gif.data[0].images.preview_webp.url
        setGifUrl(url)
      } else {
        const errorGif = await gf.random()
        const errorUrl = errorGif.data.images.preview_webp.url
        setGifUrl(errorUrl)
      }
    } catch (error) {
      console.error(error)
      setGifUrl('')
    }
  }, [keyword])

  useEffect(() => {
    if (keyword) fetchGifs()
  }, [fetchGifs, keyword])

  return gifUrl
}

const Card: FunctionComponent<CardProps> = ({
  addressTo,
  addressFrom,
  timestamp,
  message,
  keyword,
  amount
}) => {
  const gifUrl = useGiphy(keyword)

  return (
    <div
      className="bg-[#181918] m-4 flex flex-1
      2xl:min-w-[450px]
      2xl:max-w-[500px]
      sm:min-w-[270px]
      sm:max-w-[300px]
      min-w-full
      flex-col p-3 rounded-md hover:shadow-2xl"
    >
      <div className="flex flex-col items-center w-full mt-3">
        <div className="display-flex justify-start w-full mb-6 p-2">
          <a
            href={`https://goerli.etherscan.io/address/${addressFrom}`}
            target="_blank"
            rel="noreferrer"
          >
            <p className="text-white text-base">
              From: {shortenAddress(addressFrom)}
            </p>
          </a>
          <a
            href={`https://goerli.etherscan.io/address/${addressTo}`}
            target="_blank"
            rel="noreferrer"
          >
            <p className="text-white text-base">
              To: {shortenAddress(addressTo)}
            </p>
          </a>
          <p className="text-white text-base">Amount: {amount} ETH</p>
          {message && (
            <>
              <br />
              <p className="text-white text-base">Message: {message}</p>
            </>
          )}
          {keyword && (
            <>
              <br />
              <p className="text-white text-base">keyword: {keyword}</p>
            </>
          )}
        </div>
        {gifUrl && (
          <img
            src={gifUrl}
            alt="nature"
            className="w-full h-64 2xl:h-96 rounded-md shadow-lg object-cover"
          />
        )}
        <div className="bg-black p-3 px-5 rounded-3xl mt-5 shadow-2xl w-full text-center">
          <p className="text-[#37c7da] font-bold">{timestamp}</p>
        </div>
      </div>
    </div>
  )
}

export default Card
