import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { AiOutlineMenu } from 'react-icons/ai';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import {List} from '@mui/material';
import { Button } from '@mui/material';
import {Link} from 'react-router-dom';



const top100Films = [
  { label: 'Audi A6 (3ba199ae2)', year: 1994 },
  { label: 'The Godfather', year: 1972 },
  { label: 'The Godfather: Part II', year: 1974 },
  { label: 'The Dark Knight', year: 2008 },
  { label: '12 Angry Men', year: 1957 }
];

export default function AdminSide() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
    <ul className='px-20 mt-20 text-center'>
      <li className='px-5 text-center w-full bg-gray-300 rounded-xl hover:bg-gray-600 cursor-pointer'><Button><Link className='block'>Device</Link></Button></li>
      <li> <Button><Link className='block'>Message</Link></Button></li>
      <li><Button><Link className='block'>Signal</Link></Button></li>
      <li><Button><Link className='block'>aggregation</Link></Button></li>
      <li><Button><Link className='block'>Map</Link></Button></li>
      <li><Button><Link className='block'>graph</Link></Button></li>

    </ul>

    </Box>
  );

  return (
    <nav className="h-20 bg-slate-100 top-0 sticky z-50">
      <div className="flex justify-between">
        <div className="p-3 flex gap-4">
          <div className="flex gap-x-2">
            <button className="bg-white px-2 border border-gray-300">device</button>
            <Autocomplete
              disablePortal
              id="device-autocomplete"
              className="bg-white"
              options={top100Films}
              sx={{ width: 150 }}
              renderInput={(params) => <TextField {...params} label="Audi A6" />}
            />
          </div>
          <div className="flex gap-x-2">
            <button className="bg-white px-2 border border-gray-300">message</button>
            <Autocomplete
              disablePortal
              id="message-autocomplete"
              className="bg-white"
              options={top100Films}
              sx={{ width: 200 }}
              renderInput={(params) => <TextField {...params} label="can1_obd2" />}
            />
          </div>
          <div className="flex gap-x-2">
            <button className="bg-white px-2 border border-gray-300">signal</button>
            <Autocomplete
              disablePortal
              id="signal-autocomplete"
              className="bg-white"
              options={top100Films}
              sx={{ width: 200 }}
              renderInput={(params) => <TextField {...params} label="can1_obd2__service" />}
            />
          </div>
          <div className="flex gap-x-2">
            <button className="bg-white px-2 border border-gray-300">aggregation</button>
            <Autocomplete
              disablePortal
              id="aggregation-autocomplete"
              className="bg-white"
              options={top100Films}
              sx={{ width: 100 }}
              renderInput={(params) => <TextField {...params} label="AVG" />}
            />
          </div>
        </div>
        <div className="mr-8">
          <button
            className="flex gap-x-2 mt-6"
            onClick={toggleDrawer(true)}
            aria-label="Open Dashboard Drawer"
          >
            <AiOutlineMenu className="mt-1" />
            <span>Dashboard</span>
          </button>
          <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
            {DrawerList}
          </Drawer>
        </div>
      </div>
    </nav>
  );
}
