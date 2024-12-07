import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode'; // Correctly import jwtDecode
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa'; // Import icons
import { API_ENDPOINT } from './Api';

function Dashboard() {
  const [user, setUser] = useState(null); // Initialize as null
  const navigate = useNavigate();

  // Verify user session from LocalStorage
  useEffect(() => {
    const verifySession = () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login'); // Redirect if no token
          return;
        }

        const decoded = jwtDecode(token); // Decode the token
        setUser(decoded); // Set the decoded token as user data
      } catch (error) {
        console.error('Session verification failed:', error);
        navigate('/login'); // Redirect on error
      }
    };

    verifySession();
  }, [navigate]);

  // Logout Function
  const handleLogout = () => {
    try {
      localStorage.removeItem('token'); // Remove token from storage
      setUser(null); // Clear user state
      navigate('/login'); // Redirect to login
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <>
      <Navbar bg="success" expand="lg" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Naga College Foundation, Inc.</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="#users">Users</Nav.Link>
              <Nav.Link href="#departments">Departments</Nav.Link>
              <Nav.Link href="#courses">Courses</Nav.Link>
              <NavDropdown
                title={user ? `Hello, ${user.username}` : 'More'}
                id="basic-nav-dropdown"
                align="end"
              >
                <NavDropdown.Item href="#">
                  <FaUser className="me-2" />
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Item href="#">
                  <FaCog className="me-2" />
                  Settings
                </NavDropdown.Item>
                <NavDropdown.Item onClick={handleLogout}>
                  <FaSignOutAlt className="me-2" />
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Dashboard;
