import UpperFrame from '../../components/NFTDetail/UpperFrame'
import styled from 'styled-components'
import LowerFrame from '../../components/NFTDetail/LowerFrame'

const Wrapper = styled.div`
  * {
    margin: 0px;
    padding: 0px;
    position: relative;
    list-style: none;
    text-decoration: none;
    box-sizing: border-box;
  }
`

const NFTDetail = () => {

  return (
    <>
      <UpperFrame />
      <LowerFrame />
  
      
    </>
  )
}

export default NFTDetail