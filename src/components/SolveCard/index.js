import {useState} from 'react'
import YouTellIdoContext from '../../YouTellIdoContext'
import './index.css'

const SolveCard = () => {
  const [getInp, setGetInp] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const onChangeInpElement = event => {
    setGetInp(event.target.value)
    if (getInp.length > 1) {
      setErrorMessage('')
    }
  }

  const getAddition = (num1, num2) => num1 + num2

  const getDivision = (num1, num2) => Math.ceil(num1 / num2)

  const getMultiPlication = (num1, num2) => num1 * num2

  const getSubtraction = (num1, num2) => num1 - num2

  const getCaluculations = (num1, operation, num2) => {
    switch (operation) {
      case 'minus':
        return getSubtraction(num1, num2)
      case 'plus':
        return getAddition(num1, num2)
      case 'divided_by':
        return getDivision(num1, num2)
      case 'times':
        return getMultiPlication(num1, num2)

      default:
        setErrorMessage('Enter valid Operation')
        return null
    }
  }

  const getNumericValue = stringval => {
    switch (stringval) {
      case 'zero':
        return 0
      case 'one':
        return 1
      case 'two':
        return 2
      case 'three':
        return 3
      case 'four':
        return 4
      case 'five':
        return 5
      case 'six':
        return 6
      case 'seven':
        return 7
      case 'eight':
        return 8
      case 'nine':
        return 9

      default:
        setErrorMessage('Enter valid Number')
        return null
    }
  }

  const getCalucuationSymbol = oparation => {
    switch (oparation) {
      case 'minus':
        return '-'
      case 'plus':
        return '+'
      case 'times':
        return 'x'
      case 'divided_by':
        return '/'

      default:
        return ''
    }
  }

  return (
    <YouTellIdoContext.Consumer>
      {value => {
        const {setCalcHistoryFn, currentUser} = value
        const getFormateValues = () => {
          const splitted = getInp.split('(')
          const id = new Date()

          if (
            splitted[0] !== undefined &&
            splitted[2] !== undefined &&
            splitted[1] !== undefined &&
            splitted[3] !== undefined
          ) {
            const num1 = getNumericValue(splitted[0].toLowerCase())
            const num2 = getNumericValue(splitted[2].toLowerCase())
            const result = getCaluculations(num1, splitted[1], num2)
            const symbole = getCalucuationSymbol(splitted[1])
            const showDets = {
              id,
              studentusername: currentUser.username,
              firstNum: num1,
              secondNum: num2,
              oparation: symbole,
              results: result,
            }
            if (
              symbole !== '' &&
              num1 !== null &&
              num2 !== null &&
              splitted[3].length === 3
            ) {
              setCalcHistoryFn(showDets)
              setGetInp('')
            } else {
              setErrorMessage('Enter Valid Expression')
            }
          }
        }
        return (
          <div className="solve-card-container">
            <p className="label">Ask master to Solve Here...</p>
            <div className="inp-btn-container">
              <input
                type="text"
                onChange={onChangeInpElement}
                value={getInp}
                className="input-field"
                placeholder="Enter expression here"
              />
              <button
                type="button"
                className="calculate-btn"
                onClick={getFormateValues}
              >
                Calculate
              </button>
            </div>
            <p className="error-message">{errorMessage}</p>
          </div>
        )
      }}
    </YouTellIdoContext.Consumer>
  )
}

export default SolveCard
