import Header from '../components/Header'
import Settings from '../components/Settings'

function SettingsPage({ userEmail, onLogout }) {
  return (
    <>
      <Header userEmail={userEmail} onLogout={onLogout} />
      <Settings />
    </>
  )
}

export default SettingsPage
