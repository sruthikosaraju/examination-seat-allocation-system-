import Header from "../Components/Header"   
import Dashboard from "../Components/Dashboard" 


function Home({ userEmail, onLogout }) {
  return (
    <>
      <Header userEmail={userEmail} onLogout={onLogout} />
      <Dashboard />
    </>
  )
}

export default Home