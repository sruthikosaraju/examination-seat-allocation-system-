import Header from '../components/Header'
import SeatingChart from '../components/SeatingChart'

function SeatingChartPage({ userEmail, onLogout }) {
  return (
    <>
      <Header userEmail={userEmail} onLogout={onLogout} />
      <SeatingChart />
    </>
  )
}

export default SeatingChartPage