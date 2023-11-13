import React from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { startUpdatePayment } from '../../actions/paymentAction'

export default function PaymentSuccess() {
  const dispatch = useDispatch()

  useEffect(() => {
    const stripId = localStorage.getItem('stripId')
    if (stripId) {
      dispatch(startUpdatePayment(stripId))
    }
  }, [])

  return (
    <div>
      <h1>Payment Successs</h1>
    </div>
  )
}
