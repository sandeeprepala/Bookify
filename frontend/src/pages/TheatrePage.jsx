// pages/TheatrePage.js
import React from 'react';
import { useParams } from 'react-router-dom';
import Theatre from './Theatres.jsx'; // adjust the path if needed

const TheatrePage = () => {
  const { eventId } = useParams();

  return <Theatre eventId={eventId} />;
};

export default TheatrePage;
