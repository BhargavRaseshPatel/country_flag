import { useEffect, useState } from 'react'
import './App.css'

function App() {
  interface DataType {
    name: string
    flag: string
    abbr: string
  }

  const [countryFlagData, setCountryFlagData] = useState<DataType[][]>([])

  useEffect(() => {

    try {

      const fetchFlag = async () => {
        const response = await fetch('https://xcountries-backend.azurewebsites.net/all')
        const allFlagData: DataType[] = await response.json()

        // Group into rows of 7
        const rows: DataType[][] = []
        for (let i = 0; i < allFlagData.length; i += 7) {
          rows.push(allFlagData.slice(i, i + 7))
        }
        setCountryFlagData(rows)
      }

      fetchFlag()
    } catch (error) {
      console.error("Error fetching data: ",error)
    }

  }, [])

  return (
    <div>
      {countryFlagData.map((row, rowIndex) => (
        <div key={rowIndex} style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '20px' }}>
          {row.map(({ name, flag }: DataType, index) => (
            <div key={index} style={{ textAlign: 'center' }}>
              <p>{name}</p>
              <img src={flag} width={120} height={70} alt={name} />
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default App
