import React from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { startDistroyPayment } from '../../actions/paymentAction'

export default function PaymentCancel() {
  const dispatch = useDispatch()

  useEffect(() => {
    const stripId = localStorage.getItem('stripId')
    if (stripId) {
      dispatch(startDistroyPayment(stripId))
    }
  }, [])

  return (
    <div>
      <h1>PaymentCancel</h1>
    </div>
  )
}
