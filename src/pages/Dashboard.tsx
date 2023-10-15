import useIsAuthenticated from "../hooks/useIsAuthenticated";


const Dashboard = () => {
    
    return (
        <>
       <h1> HOME PAGE { localStorage.getItem("loginToken")}</h1> 
        </>
    )

}

export default Dashboard;