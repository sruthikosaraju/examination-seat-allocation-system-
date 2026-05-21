import Header from '../components/Header'
import ExamHalls from '../components/ExamHalls'

function ExamHallsPage({ userEmail, onLogout }) {
  return (
    <>
      <Header userEmail={userEmail} onLogout={onLogout} />
      <ExamHalls />
    </>
  )
}

export default ExamHallsPage