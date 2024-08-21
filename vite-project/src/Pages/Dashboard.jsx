import React from 'react';
import { Chart as ChartJs } from 'chart.js/auto';
import { Bar, Line } from 'react-chartjs-2';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS
import AdminSide from '../Components/AdminSide';


// Sample data for charts
const barData = {
  labels: ['2.1', '2.2', '2.3', '2.4', '2.5', '2.6', '2.7', '2.8', '2.9', '3.0'],
  datasets: [
    {
      label: 'acc',
      data: [20, 10, 20, 10, 10, 20, 10, 30, 10, 20],
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
    },
  ],
};

const attitudeData = {
  labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'], // Example time labels
  datasets: [
    {
      label: 'Roll (deg)',
      data: [10, 15, 9, 13, 12, 14, 10, 16, 8, 12], // Sample Roll data
      fill: false,
      borderColor: 'rgba(75, 192, 192, 1)', // Customize the color for Roll
      tension: 0.3,
      pointRadius: 4,
      pointBackgroundColor: 'rgba(75, 192, 192, 1)',
    },
    {
      label: 'Pitch (deg)',
      data: [5, 8, 6, 7, 8, 9, 5, 10, 7, 6], // Sample Pitch data
      fill: false,
      borderColor: 'rgba(255, 99, 132, 1)', // Customize the color for Pitch
      tension: 0.3,
      pointRadius: 4,
      pointBackgroundColor: 'rgba(255, 99, 132, 1)',
    },
  ],
};

const attitudeOptions = {
  scales: {
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: 'Degrees',
      },
    },
    x: {
      title: {
        display: true,
        text: 'Time (s)',
      },
    },
  },
};

const barOptions = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};


function Dashboard() {
  const latitude = 51.505; // Define your latitude
  const longitude = -0.09; // Define your longitude

  return (
    <div className="adminContainer">
      <AdminSide />
      <main className="dashboard">
        <div className="flex gap-x-4 m-4">
          <div className="w-64 h-40 bg-white">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWzuffDFVJRdqeoVLVC-WLrAc0anEVZ7XRwA&s"
              alt="Dashboard"
              className="object-cover w-full h-full"
            />
          </div>
          <div className="w-48 h-40 bg-white">
            <div className="py-1 pl-2">Speed</div>
            <div className="bg-lime-600 justify-center flex py-11 text-white text-4xl">
              29km/h
            </div>
          </div>
          <div className="w-40 h-40 bg-white">
            <div className="py-1 pl-2">Distance</div>
            <div className="bg-blue-500 text-center text-3xl py-11 text-white">
              8.66km
            </div>
          </div>
          <div className="w-40 h-40 bg-white">
            <div className="py-1 pl-2">RPM</div>
            <div className="bg-blue-500 text-center text-3xl py-11 text-white">1530</div>
          </div>
          <div className="w-36 h-40 bg-white">
          <div className="py-1 pl-2">Fuel (%)</div>
            <div className="fuel">
              <span className="text-2xl">23</span>
            </div>
          </div>
          <div className="w-36 h-40 bg-white">
          <div className='py-1 pl-2'>Load (%)</div>
            <div className="load">
              <span className="text-2xl">23</span>
            </div>
          </div>
          <div className="w-36 h-40 bg-white">
          <div className='py-1 pl-2'>Torque (%)</div>
            <div className="torque">
              <span className="text-2xl">17</span>
            </div>
          </div>
        </div>
        <div className="flex m-4 gap-x-4">
          <div className="w-1/2 h-auto bg-white">
            <div>Speed (km/h)</div>
            <div>
              <Line data={barData} options={barOptions} />
            </div>
          </div>
          <div className="w-48 h-40 bg-white text-center">
            <div className="py-1 pl-2">Altitude (AVG)</div>
            <div className="bg-lime-600 justify-center flex py-11 text-white text-4xl">
              64 m
            </div>
          </div>
          <div className="w-40 h-40 bg-white text-center">
            <div className="py-1 pl-2">Satellites</div>
            <div className="bg-lime-600 justify-center flex py-10 text-white text-5xl">
              12
            </div>
          </div>
          <div className="w-40 h-40 bg-white text-center">
            <div className="py-1 pl-2">Fix</div>
            <div className="bg-lime-600 justify-center flex py-10 text-white text-5xl">
              3.9
            </div>
          </div>
        </div>
        <div className="flex gap-4 m-4">
          <div className="w-1/2">
            <div className="h-44 bg-white">
              <div>Message: | Signal</div>
              <div className="w-full h-auto bg-white p-4">
              
              <Line data={barData} options={barData} />
              </div>

            </div>
            <div className="h-40 bg-white mt-56">
              <div>Attitude (deg)</div>
              <div className="w-full h-auto bg-white p-4">
              <h2 className="text-center mb-4">Attitude Roll and Pitch Graph</h2>
              <Line data={attitudeData} options={attitudeOptions} />
              </div>
            </div>
            <div className="h-auto bg-white mt-64">
              <div>Acceleration (m/s^2)</div>
              <Line data={barData} options={barData} />
            </div>
          </div>
          <div className="w-1/2 h-auto">
            <div className="h-96 bg-white">
              <div>GPS Position</div>
              <div style={{ height: '400px', width: '100%' }}>
                <MapContainer center={[latitude, longitude]} zoom={13} style={{ height: '100%', width: '100%' }} className='z-10'>
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    className='z-10'
                  />
                  <Marker position={[latitude, longitude]}>
                    <Popup>
                      A pretty popup.<br /> Easily customizable.
                    </Popup>
                  </Marker>
                </MapContainer>
              </div>
            </div>
            <div className="h-auto bg-white mt-16">
              <div>Acceleration X (m/s^2) - Histogram</div>
              <div>
                <Bar data={barData} options={barOptions} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;

