import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import AdminLogin from '../pagesAdmin/adminLogin';
import Cookies from 'js-cookie';
import AdminHome from '../pagesAdmin/adminHome/AdminHome';
import AdminUser from '../pagesAdmin/AdminUser';
import AdminProperty from '../pagesAdmin/AdminProperty';
import AdminBookings from '../pagesAdmin/AdminBookings';
import AdminReports from '../pagesAdmin/AdminReports';
import AdminPosts from '../pagesAdmin/AdminPosts';
import AdminRooms from '../pagesAdmin/AdminRooms';
import { useSelector } from 'react-redux';
import { selectToken } from '../reducers/adminSlice';

const AdminRoute: React.FC = () => {
  const adminToken = useSelector(selectToken)

  return (
    <Routes>
      <Route path="/adminLogin" element={!adminToken ? <AdminLogin /> : <Navigate to="/admin/adminHome" />} />
      <Route path="/adminHome" element={adminToken ? <AdminHome /> : <Navigate to="/admin/adminLogin" />} />
      <Route path="/adminUser" element={adminToken ? <AdminUser /> : <Navigate to="/admin/adminLogin" />} />
      <Route path="/adminProperties" element={adminToken ? <AdminProperty /> : <Navigate to="/admin/adminLogin" />} />
      <Route path="/adminBookings" element={adminToken ? <AdminBookings /> : <Navigate to="/admin/adminLogin" />} />
      <Route path="/adminReports" element={adminToken ? <AdminReports /> : <Navigate to="/admin/adminLogin" />} />
      <Route path="/adminPosts" element={adminToken ? <AdminPosts /> : <Navigate to="/admin/adminLogin" />} />
      <Route path="/adminRooms" element={adminToken ? <AdminRooms /> : <Navigate to="/admin/adminLogin" />} />
    </Routes>
  );
}

export default AdminRoute;
