import { useParams } from 'react-router-dom';

import { NavbarComponent } from '../Components/NavbarComponent';

import { QueueCard } from '../Components/DashboardBlockComponents/Queue';


import { OutPatient } from '../Components/DashboardBlockComponents/OutPatient';

export const Dashboard = () => {
  const { doctorId="" } = useParams(); 
  console.log(doctorId);

  return (
    <div className='text-slate-700 min-h-screen xl:fixed min-w-screen relative bg-slate-200'>
      <NavbarComponent doctorId={doctorId} />
      <div className='flex justify-center'>
        <div className='grid xl:grid-cols-1 lg:grid-cols-2 xl:gap-10 xl:fixed'>
          <div className='grid grid-cols-3'>
          </div>
          <div className='flex justify-center'>
            <QueueCard />
            <OutPatient />
          </div>
        </div>
      </div>
    </div>
  );
};