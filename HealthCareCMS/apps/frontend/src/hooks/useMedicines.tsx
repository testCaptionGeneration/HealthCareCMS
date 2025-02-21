import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";
import axios from "axios";

export const useMedicines = ({ prescriptionId, refresh }: { prescriptionId: string, refresh?: boolean}) => {
    const [medication, setMedication] = useState([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetch = async () => {
            setIsLoading(true);
            try{
            await axios.get(`${BACKEND_URL}cms/v1/doctor/medications/${prescriptionId}`).then((response) => {
                setMedication(response.data.medication);
                setIsLoading(false);
            })}
            catch(e){
                console.log(e);
            }

        }
        fetch();
    }, [refresh])

    return { medication, isLoading }
}

