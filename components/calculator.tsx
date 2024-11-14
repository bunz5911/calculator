'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"

export function Calculator() {
  const [display, setDisplay] = useState('0')
  const [currentValue, setCurrentValue] = useState('')
  const [operator, setOperator] = useState('')
  const [previousValue, setPreviousValue] = useState('')

  const handleNumberClick = (num: string) => {
    if (display === '0' || operator) {
      setDisplay(num)
      setCurrentValue(num)
    } else {
      setDisplay(display + num)
      setCurrentValue(currentValue + num)
    }
  }

  const handleOperatorClick = (op: string) => {
    if (previousValue && currentValue) {
      handleEqualsClick()
    }
    setOperator(op)
    setPreviousValue(currentValue)
    setCurrentValue('')
  }

  const handleEqualsClick = () => {
    if (!previousValue || !currentValue) return

    let result
    switch (operator) {
      case '+':
        result = parseFloat(previousValue) + parseFloat(currentValue)
        break
      case '-':
        result = parseFloat(previousValue) - parseFloat(currentValue)
        break
      case '*':
        result = parseFloat(previousValue) * parseFloat(currentValue)
        break
      case '/':
        result = parseFloat(previousValue) / parseFloat(currentValue)
        break
      default:
        return
    }

    setDisplay(result.toString())
    setCurrentValue(result.toString())
    setPreviousValue('')
    setOperator('')
  }

  const handleClear = () => {
    setDisplay('0')
    setCurrentValue('')
    setPreviousValue('')
    setOperator('')
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-500 to-pink-500">
      <div className="p-6 rounded-2xl backdrop-blur-md bg-white/30 shadow-xl">
        <div className="mb-4 p-4 bg-gray-800 rounded-lg">
          <div className="text-right text-3xl font-bold text-white">{display}</div>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {['7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '0', '.', '=', '+'].map((btn) => (
            <Button
              key={btn}
              onClick={() => {
                if (btn === '=') handleEqualsClick()
                else if (['+', '-', '*', '/'].includes(btn)) handleOperatorClick(btn)
                else handleNumberClick(btn)
              }}
              className={`text-xl font-bold ${btn === '=' ? 'col-span-2 bg-green-500 hover:bg-green-600' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
            >
              {btn}
            </Button>
          ))}
          <Button onClick={handleClear} className="col-span-4 bg-red-500 hover:bg-red-600 text-xl font-bold">
            C
          </Button>
        </div>
      </div>
    </div>
  )
}