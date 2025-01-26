import { Input } from '../Components/Inputs/Input'
import { CloseIcon } from '../Icons/CloseIcon'
import { Button } from './Inputs/Button'

export const CreatePatient = ({ open, setOpen }: { open: boolean, setOpen: (value:boolean) => void }) => {
    return (<div>
        {open && <div className="h-screen w-screen fixed inset-0  flex justify-center items-center z-50">

            <div className="absolute bg-black opacity-60 inset-0"></div>

            <div className="relative bg-white rounded-md shadow-md ">
                
                    <span onClick={()=>setOpen(false)} className='absolute right-0 m-2 mr-3'>

                        <CloseIcon size={25} />
                    </span>
                
                
                <div className='m-10'>
                    <Input placeholder="Patient's Name" type="text" size="large" />
                    <Input placeholder="Patient's Age" type="text" size="large" />
                    <Input placeholder="Patient's Disease" type="text" size="large" />
                    <Input placeholder="Patient's Phone Number " type="text" size="large" />
                    <div className='flex justify-center m-2'>
                        <Button title='Add Patient' variant='primary' size='md' />
                    </div>
                </div>
            </div>


        </div>

        }</div>)
}
