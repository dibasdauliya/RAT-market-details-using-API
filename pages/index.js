import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home({ resData }) {
  const {
    name,
    symbol,
    image,
    last_updated,
    market_data,
    market_cap_rank,
    description
  } = resData

  function formatNum(num) {
    return num.toLocaleString()
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>RAT</title>
        <meta name='description' content='RAT' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Image src={image?.large} alt={name} width='200px' height='200px' />
      <p>{description.en}</p>
      <small>Rank: {market_cap_rank}</small>
      <ul>
        <li>Name: {name}</li>
        <li>Symbol: {symbol}</li>
        <li>Current price: {market_data.current_price.usd}</li>
        <li>Market cap: {'$' + formatNum(market_data.market_cap.usd)}</li>
        <li>
          Fully diluted valuation:{' '}
          {'$' + formatNum(market_data.fully_diluted_valuation.usd)}
        </li>
        <li>Circulating supply: {formatNum(market_data.circulating_supply)}</li>
        <li>Total volume: {'$' + formatNum(market_data.total_volume.usd)}</li>
        <li>Max supply: {formatNum(market_data.max_supply)}</li>
      </ul>
      <small className='no'>Last updated at {last_updated}</small>
    </div>
  )
}

export async function getServerSideProps() {
  const res = await fetch(
    'https://api.coingecko.com/api/v3/coins/the-rare-antiquities-token?localization=false'
  )
  const resData = await res.json()

  return { props: { resData } }
}
