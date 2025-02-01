import React, { useContext } from 'react'
import { MiContexto } from '../context/MiContexto'

const Cuenta = () => {

const { cuenta } = useContext(MiContexto);


  return (
    <div>Cuenta: {cuenta}</div>
  )
}

export default Cuenta