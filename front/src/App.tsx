import { BrowserRouter, Routes, Route } from "react-router-dom"
import ProjectList from './Page/Projects'
import Task from "./Page/Task"

function App() {
  return (
    <BrowserRouter>
		<Routes>
			<Route path="/" element={<ProjectList/>} />
			<Route path="/project" element={<Task/>} />
		</Routes>
    </BrowserRouter>
  )
}


export default App
