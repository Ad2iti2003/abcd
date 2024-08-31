// AdminSide.js
import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { AiOutlineMenu } from 'react-icons/ai';

export default function AdminSide() {
  const [devices, setDevices] = useState([]);
  const [aggregations, setAggregations] = useState([]);
  const [signals, setSignals] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/devices')
    .then(response => response.json())
    .then(data => setDevices(data.devices || []));

    fetch('http://localhost:5000/api/signals')
      .then(response => response.json())
      .then(data => setSignals(data.signals));

    fetch('http://localhost:5000/api/aggregations')
      .then(response => response.json())
      .then(data => setAggregations(data.aggregations));

    fetch('http://localhost:5000/api/messages')
      .then(response => response.json())
      .then(data => setMessages(data.messages));
  }, []);

  return (
    <nav className="h-20 bg-slate-100 top-0 sticky z-50">
      <div className="flex justify-between">
        <div className="p-3 flex gap-4">
          
          <div className="flex gap-x-2">
            <button className="bg-white px-2 border border-gray-300">Device</button>
            <Autocomplete
              disablePortal
              id="device-autocomplete"
              className="bg-white"
              options={devices}
              getOptionLabel={(option) => option.name || ''} // Assuming 'name' is the field to display
              sx={{ width: 150 }}
              renderInput={(params) => <TextField {...params} label="Device" />}
            />
          </div>

          
          <div className="flex gap-x-2">
            <button className="bg-white px-2 border border-gray-300">Message</button>
            <Autocomplete
              disablePortal
              id="message-autocomplete"
              className="bg-white"
              options={messages}
              getOptionLabel={(option) => option.message || ''}
              sx={{ width: 150 }}
              renderInput={(params) => <TextField {...params} label="Message" />}
            />

          </div>

          {/* Signals Autocomplete */}
          <div className="flex gap-x-2">
            <button className="bg-white px-2 border border-gray-300">Signal</button>
            <Autocomplete
             disablePortal
             id="signal-autocomplete"
             className="bg-white"
             options={signals}
             getOptionLabel={(option) => option.signal_type || ''}
             sx={{ width: 150 }}
             renderInput={(params) => <TextField {...params} label="Signal" />}
            />

          </div>

          
          <div className="flex gap-x-2">
            <button className="bg-white px-2 border border-gray-300">Aggregation</button>
            <Autocomplete
              disablePortal
              id="aggregation-autocomplete"
              className="bg-white"
              options={aggregations}
              getOptionLabel={(option) => option.aggregation_type || ''} // Adjust based on your data
              sx={{ width: 150 }}
              renderInput={(params) => <TextField {...params} label="Aggregation" />}
            />
          </div>
        </div>
        <div className="mr-8">
          <button className="flex gap-x-2 mt-6">
            <AiOutlineMenu className="mt-1" />
            <span>Dashboard</span>
          </button>
        </div>
      </div>
    </nav>
  );
}