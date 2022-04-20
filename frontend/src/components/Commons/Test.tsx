import { useQuery } from 'react-query';
import axios from 'axios'
// Create a client


const Test = () => {
  const getUserWithAxios = async () => {
    const { data } = await axios.get('https://reqres.in/api/users?page=2');
    return data;
  };
  const query = useQuery('users', getUserWithAxios);
  console.log(query);
  return (
    <>
    
    </>
  )
}

export default Test
// render(<App />, document.getElementById('root'))