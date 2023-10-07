import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import viteLogo from '/vite.svg'
import { ChakraProvider, Flex, Box } from "@chakra-ui/react"
import { Sidebar } from './components/Sidebar'
import { Topbar } from './components/Topbar'
import { HomePage } from './pages/HomePage';
import { TaskPlannerPage } from './pages/TaskPlannerPage';
import { JournalPage } from './pages/JournalPage';

export default function App() {
  return (
    <ChakraProvider>

      {/* Topbar shows day and date */}
      <Topbar />
      {/* Flexbox contains sidebar and page content depending on route */}
      <Flex>
        <Router>
          <Sidebar />
          <Box p="2em">
            <Routes>
              {/* routes */}
              <Route path={""} element={<HomePage />} />
              <Route path={"/planner"} element={<TaskPlannerPage />} />
              <Route path={"/journal"} element={<JournalPage />} />
            </Routes>
          </Box>
        </Router>
      </Flex>

    </ChakraProvider>
  )
}
