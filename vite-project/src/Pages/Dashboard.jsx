import React, { useEffect, useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS
import AdminSide from '../Components/AdminSide';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register chart components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

function Dashboard() {
  const latitude = 51.505; // Define your latitude
  const longitude = -0.09; // Define your longitude

  const [chartData, setChartData] = useState({
    speed: {
      labels: [],
      datasets: [{
        label: 'Speed (km/h)',
        data: [],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      }],
    },
    attitude: {
      labels: [],
      datasets: [
        {
          label: 'Roll (deg)',
          data: [],
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          fill: true,
        },
        {
          label: 'Pitch (deg)',
          data: [],
          borderColor: 'rgba(255, 99, 132, 1)',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          fill: true,
        },
      ],
    },
    acceleration: {
      labels: [],
      datasets: [{
        label: 'Acceleration (m/s^2)',
        data: [],
        borderColor: 'rgba(255, 159, 64, 1)',
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
        fill: true,
      }],
    },
  });

  useEffect(() => {
    // Fetch chart data
    fetch('http://localhost:5000/api/chart-data')
      .then(response => response.json())
      .then(data => {
        setChartData({
          speed: {
            labels: data.speed.labels,
            datasets: [{
              label: 'Speed (km/h)',
              data: data.speed.data,
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              fill: true,
            }],
          },
          attitude: {
            labels: data.attitude.labels,
            datasets: [
              {
                label: 'Roll (deg)',
                data: data.attitude.roll,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
              },
              {
                label: 'Pitch (deg)',
                data: data.attitude.pitch,
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                fill: true,
              },
            ],
          },
          acceleration: {
            labels: data.acceleration.labels,
            datasets: [{
              label: 'Acceleration (m/s^2)',
              data: data.acceleration.data,
              borderColor: 'rgba(255, 159, 64, 1)',
              backgroundColor: 'rgba(255, 159, 64, 0.2)',
              fill: true,
            }],
          },
        });
      })
      .catch(error => console.error('Error fetching chart data:', error));
  }, []);

  const barOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const lineOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

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
              <Line data={chartData.speed} options={lineOptions} />
            </div>
          </div>
          <div className="w-48 h-40 bg-white text-center">
            <div className="py-1 pl-2">Altitude (AVG)</div>
            <div className="bg-blue-500 justify-center flex py-11 text-white text-4xl">
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
                <Line data={chartData.speed} options={lineOptions} />
              </div>
            </div>
            <div className="h-40 bg-white mt-56">
              <div>Attitude (deg)</div>
              <div className="w-full h-auto bg-white p-4">
                <h2 className="text-center mb-4">Attitude Roll and Pitch Graph</h2>
                <Line data={chartData.attitude} options={lineOptions} />
              </div>
            </div>
            <div className="h-auto bg-white mt-64">
              <div>Acceleration (m/s^2)</div>
              <div>
                <Bar data={chartData.acceleration} options={barOptions} />
              </div>
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
                <Bar data={chartData.acceleration} options={barOptions} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
