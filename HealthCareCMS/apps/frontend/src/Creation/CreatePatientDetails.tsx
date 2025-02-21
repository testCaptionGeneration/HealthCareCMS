import { useEffect, useRef } from 'react'
import { Input } from '../Components/Inputs/Input'
import { CloseIcon } from '../Icons/CloseIcon'
import { Button } from '../Components/Inputs/Button'
import { BACKEND_URL } from '../config'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import "react-datepicker/dist/react-datepicker.css";



export const CreatePatient = ({ open, setOpen }: { open: boolean, setOpen: (value: boolean) => void }) => {
    const patientNameRef = useRef<HTMLInputElement | null>(null);
    const patientAgeRef = useRef<HTMLInputElement | null>(null);
    const patientGenderRef = useRef<HTMLSelectElement | null>(null);
    const patientDiseaseRef = useRef<HTMLInputElement | null>(null);
    const patientSeverityRef = useRef<HTMLSelectElement | null>(null);
    const patientPhoneNumberRef = useRef<HTMLInputElement | null>(null);
    const patientBirthDateRef = useRef<HTMLInputElement | null>(null);
    const prescriptionId=useParams().prescriptionId;
    const navigate = useNavigate();

    useEffect(()=>{
        
    },[prescriptionId])


    const createPatientOnClick = async () => {
        const patientName = patientNameRef.current?.value;
        const patientAge = patientAgeRef.current?.value;
        const patientGender = patientGenderRef.current?.value;
        const patientDisease = patientDiseaseRef.current?.value;
        const patientSeverity = patientSeverityRef.current?.value;
        const patientPhoneNumber = patientPhoneNumberRef.current?.value;
        const patientBirthDate = patientBirthDateRef.current?.value;
        const date = Date.now();

        console.log(patientName, patientAge, patientDisease, patientPhoneNumber, patientGender, patientSeverity, patientBirthDate);
        try {
            const response = await axios.post(`${BACKEND_URL}cms/v1/doctor/patient`, {
                name: patientName,
                age: patientAge,
                gender: patientGender,
                disease: patientDisease,
                severity: patientSeverity,
                number: patientPhoneNumber,
                birth: patientBirthDate,
                date: date
            })

            console.log(response.data);
            navigate(`/cms/v1/doctor/patient/prescription/${response.data.ObjectId}`)


            setOpen(false);
        }
        catch (error) {
            console.log(error)
        }
    }

    return (<div>
        {open && <div className="min-h-screen min-w-screen fixed inset-0  flex justify-center items-center z-50">

            <div className=" absolute inset-0 backdrop-blur-xs bg-black/20"></div>

            <div className="relative bg-white rounded-2xl shadow-md flex justify-center">

                <span onClick={() => setOpen(false)} className='absolute right-0 m-2 mr-3'>

                    <CloseIcon size={25} />
                </span>


                <div className='flex justify-center items-center '>

                    <div>

                        <div className='mx-5 mt-5 grid lg:grid-cols-2 md:grif-cols-1'>
                            <Input refrence={patientNameRef} placeholder="Patient's Name" type="text" size="large" />
                            <Input refrence={patientAgeRef} placeholder="Patient's Age" type="text" size="large" />
                            <Input refrence={patientDiseaseRef} placeholder="Patient's Disease" type="text" size="large" />

                            <div className='flex items-center justify-center'>
                                <select ref={patientGenderRef} name="Gender" id="gender" className='px-4 py-2 shadow-md w-64'>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>
                            <div className='flex items-center justify-center'>
                                <select ref={patientSeverityRef} name="Severity" id="severity" className='px-4 py-2 shadow-md w-64'>
                                    <option value="Mild">Mild</option>
                                    <option value="Moderate">Moderate</option>
                                    <option value="Severe">Severe</option>
                                </select>
                            </div>

                            <Input refrence={patientPhoneNumberRef} placeholder="Patient's Phone Number " type="text" size="large" />

                        </div>
                        <div className='flex items-center justify-center top-0'>DOB:<Input refrence={patientBirthDateRef} type='Date' placeholder="date" size='medium' /></div>
                        <div className='flex justify-center m-4'>
                            <Button onClick={createPatientOnClick} title='Add Patient' variant='primary' size='md' />
                        </div>
                    </div>
                </div>
            </div>


        </div>

        }</div>)
}
