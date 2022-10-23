import React, { useEffect, useState } from 'react'
import AccessCodeForm from '../components/AccessCodeForm';

function Home() {

   const [accessCode, setAccessCode] = useState('');

  return (
    <><div>Atypical Speech</div><AccessCodeForm>

      </AccessCodeForm></>
  )
}

export default Home