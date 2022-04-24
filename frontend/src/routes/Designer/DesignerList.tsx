import styled from 'styled-components'
import PageContentAll from '../../components/Designer/PageContentAll'
import PageContentThema from '../../components/Designer/PageContentThema'
import PageHeader from '../../components/Designer/PageHeader'
import {useState} from 'react'

const FadeIn = styled.div`
animation: 0.7s ease-in-out loadEffect1;

@keyframes loadEffect1 {
    0%{
        opacity: 0;
    }
    100%{
        opacity: 1;
    }
}
`

const DesignerList = () => {

  const [flag,setFlag] = useState(false)

  const changeThema = () => {
    setFlag(false)
  }
  const changeAll = () => {
    setFlag(true)
  }

  return (
    <>
      <PageHeader changeThema={changeThema} changeAll={changeAll}/>
      {!flag ? <FadeIn><PageContentThema /></FadeIn> : null}
      {flag ? <FadeIn><PageContentAll /></FadeIn> : null}
    </>
  )
}

export default DesignerList