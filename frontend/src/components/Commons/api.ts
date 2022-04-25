import axios from 'axios'

export const fetchCoins = async() => {
  console.log('실행됨')
  return (await axios.get("https://api.coinpaprika.com/v1/coins")).data
 
}