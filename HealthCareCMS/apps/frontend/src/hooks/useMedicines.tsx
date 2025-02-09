import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";
import axios from "axios";

export const useMedicines = ({ userId, refresh }: { userId: string, refresh?: boolean}) => {
    const [medication, setMedication] = useState([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);


    useEffect(() => {
        const fetch = async () => {
            setIsLoading(true);
            await axios.get(`${BACKEND_URL}cms/v1/doctor/medications/${userId}`).then((response) => {
                setMedication(response.data.medication);
                setIsLoading(false);
            }).catch((e) => console.log(`An error occured ${e}`));

        }
        fetch();
    }, [refresh])

    return { medication, isLoading }
}

