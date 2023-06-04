import { useEffect, useState } from "react";
import cities from 'cities.json';

function CitiesInput(prop: any) {
    const [fillter, setFillter] = useState<string>("");
    const [list, setList] = useState<any[]>([])

    let allCities = (cities as Array<any>)

    useEffect(() => {
        if (!fillter) {
            setList([]);
            return;
        }
        let temp = allCities.filter((city: any) => (city.name).toLowerCase().startsWith((fillter).toLowerCase()));
        setList(temp);
    }, [fillter])

    function handleClick(city: string): void {
        prop.updateCity(city);
        setFillter("");
    }

    return (
        <div className='flex items-center justify-center'>
            <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>
                <input onFocus={(event: any) => {setFillter(event.target.value); console.log(event)}} onChange={(event: any) => setFillter(event.target.value)} type="search" id="default-search" className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search City" required/>
                <div className='max-h-36 overflow-hidden absolute bg-white w-full shadow-md rounded-sm'>
                    {
                        list.map((city: any, i: number) => <div className='h-6 cursor-pointer hover:bg-slate-400' key={i} onClick={() => handleClick(city.name)}>{city.name}</div>)
                    }
                </div>
            </div>
        </div>
    )
}

export default CitiesInput