import Header from '../components/Header'
import GenerateReports from '../components/GenerateReports'

function GenerateReportsPage({ userEmail, onLogout }) {
  return (
    <>
      <Header userEmail={userEmail} onLogout={onLogout} />
      <GenerateReports />
    </>
  )
}

export default GenerateReportsPage