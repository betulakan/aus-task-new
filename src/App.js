import React from 'react';
import { ChakraProvider } from '@chakra-ui/react'
import Login from './pages/LoginPage'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from 'react-router-dom'
import Equipments from './pages/Equipments'
import MapPage from './pages/MapPage'
import AlarmsPage from './pages/AlarmsPage'
import WithNav from './components/Layout/WithNav'
import WithoutNav from './components/Layout/WithoutNav'

function App () {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route element={<WithoutNav />}>
            <Route path='/' element={<Navigate replace to='/login' />} />
            <Route path='login' element={<Login />} />
          </Route>

          <Route element={<WithNav />}>
            <Route path='equipments' element={<Equipments />}></Route>
            <Route path='map' element={<MapPage />}></Route>
            <Route path='alarms' element={<AlarmsPage />}></Route>
          </Route>
        </Routes>
      </Router>
    </ChakraProvider>
  )
}

export default App