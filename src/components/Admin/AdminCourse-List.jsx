import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Footer from "../footer";
import { AdminHeader } from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";

const Wrapper = styled.div`
  padding: 1rem;
  @media (min-width: 768px) {
    padding: 1.5rem;
  }
  @media (min-width: 1024px) {
    padding: 0 2rem;
  }
`;

const Card = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const CardHeader = styled.div`
  padding: 1rem;
  border-bottom: 1px solid #e0e0e0;
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0;
`;

const CardContent = styled.div`
  padding: 1rem;
`;

const TableWrapper = styled.div`
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  background-color: #f2f2f2;
  padding: 12px;
  text-align: left;
  border-bottom: 2px solid #ddd;
`;

const Td = styled.td`
  padding: 12px;
  border-bottom: 1px solid #ddd;
`;

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
`;

const PageButton = styled.button`
  background-color: ${props => props.active ? '#4CAF50' : '#f1f1f1'};
  color: ${props => props.active ? 'white' : 'black'};
  border: 1px solid #ddd;
  padding: 8px 16px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  margin: 0 4px;
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    background-color: ${props => props.active ? '#45a049' : '#ddd'};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const AdminCourseList = () => {
  const [allCourses, setAllCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const token = localStorage.getItem('adminToken');
  const coursesPerPage = 15;

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('https://api.novajobs.us/api/trainers/all-courses', {
          headers: {
            Authorization: `${token}`
          }
        });
        setAllCourses(response.data.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, [token]);

  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = allCourses.slice(indexOfFirstCourse, indexOfLastCourse);
  const totalPages = Math.ceil(allCourses.length / coursesPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="main-wrapper">
      <AdminHeader />
      <div className="breadcrumb-bar breadcrumb-bar-info">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-12">
              <div className="breadcrumb-list">
                <h2 className="breadcrumb-title">Admin Dashboard</h2>
                <nav aria-label="breadcrumb" className="page-breadcrumb">
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="page-content">
        <div className="container">
          <div className="row">
            <AdminSidebar />
            <div className="col-xl-9 col-lg-9">
              <Wrapper>
                <Card>
                  <CardHeader>
                    <CardTitle>Course List</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <TableWrapper>
                      <Table>
                        <thead>
                          <tr>
                            <Th>Course Title</Th>
                            <Th>Trainer Name</Th>
                            <Th>Price</Th>
                            <Th>Enrolled Students</Th>
                            <Th>Created At</Th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentCourses.map((course) => (
                            <tr key={course.id}>
                              <Td>{course.course_title}</Td>
                              <Td>{`${course.trainer_first_name} ${course.trainer_last_name}`}</Td>
                              <Td>${course.course_price}</Td>
                              <Td>{course.enrolled_student_count}</Td>
                              <Td>{new Date(course.created_at).toLocaleDateString()}</Td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </TableWrapper>
                    <PaginationWrapper>
                      <PageButton 
                        onClick={() => handlePageChange(currentPage - 1)} 
                        disabled={currentPage === 1}
                      >
                        Previous
                      </PageButton>
                      {[...Array(totalPages).keys()].map((page) => (
                        <PageButton
                          key={page + 1}
                          onClick={() => handlePageChange(page + 1)}
                          active={currentPage === page + 1}
                        >
                          {page + 1}
                        </PageButton>
                      ))}
                      <PageButton 
                        onClick={() => handlePageChange(currentPage + 1)} 
                        disabled={currentPage === totalPages}
                      >
                        Next
                      </PageButton>
                    </PaginationWrapper>
                  </CardContent>
                </Card>
              </Wrapper>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminCourseList;