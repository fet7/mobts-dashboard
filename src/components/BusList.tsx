import React from 'react'
import { DataTable } from './busTable/data-table';
import { listOfBuses, columns } from './busTable/columns';


interface Bus {
    id: number;
    plateNumber: string;
    seatCapacity: number;
    status: string;
    createdAt: string;
    formattedCreatedAt: string;
}

const BusList = () => {

    const getData = async () => {
        try {
            const response = await fetch('/api/get-bus');

            if (response.ok) {
                const data = await response.json();
                return data.buses.map((bus: Bus) => ({
                    ...bus,
                    formattedCreatedAt: new Date(bus.createdAt).toLocaleDateString('en-GB'),
                }));
            } else {
                return [];
            }
        } catch (error) {
            console.log('Data fetching error: ', error);
            return [];
        }
    }

    const [buses, setBuses] = React.useState<Bus[]>([]);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getData();
                console.log(data);
                setBuses(data);
            } catch (error) {
                console.error('Data fetching error: ', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className=' mx-auto py-10'>
            <DataTable columns={columns} data={buses} />
        </div>
    )
}

export default BusList