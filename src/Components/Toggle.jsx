import React, { useEffect, useRef, useState } from 'react'
import { dateArray, strategyArray } from '@/data/Constants';
import Image from 'next/image';
import up from "../../public/up.png"


const Toggle = () => {

    const [selectedView, setSelectedView] = useState(strategyArray[0].View);
    const [selectedDate, setSelectedDate] = useState(dateArray[0]);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const dropdownRef = useRef(null);

    const uniqueViews = [...new Set(strategyArray.map(strategy => strategy.View))];
    const strategies = strategyArray.find(strategy => strategy.View === selectedView)?.Value[selectedDate] || [];
    const uniqueStrategies = [...new Set(strategies)];
    console.log("strategies", strategies, "uniqueStrategies", uniqueStrategies)

    const handleDateSelect = (date) => {
        setSelectedDate(date);
        setIsDropdownVisible(false);
    };

    const toggleDropdown = () => {
        setIsDropdownVisible(prev => !prev);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsDropdownVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="p-6" >
            {/* toggle buttons */}
            <div className="flex justify-around mb-6">
                {uniqueViews.map(view => (
                    <button
                        key={view}
                        onClick={() => setSelectedView(view)}
                        className={`py-2 rounded-2xl px-8 ${selectedView === view ? 'bg-blue-500 text-white' : 'bg-white text-gray-500'} rounded`}
                    >
                        {view}
                    </button>
                ))}
            </div>

              {/* Select dropdown */}
            <div className="mb-6 " ref={dropdownRef}>
                <div
                    className="border font-bold p-2 cursor-pointer  rounded flex justify-between items-center"
                    onClick={toggleDropdown}
                >
                    {selectedDate.replace(/-/g, ' ')}
                    <span>
                        {isDropdownVisible ?
                            <Image
                                src={up}
                                height={30}
                                width={30}
                                alt="logo"
                                className='rotate-180 scale-90'
                            />
                            :
                            <Image
                                src={up}
                                height={30}
                                width={30}
                                alt="logo"

                            />
                        }
                    </span>
                </div>

                {/* Dropdown options */}
                {isDropdownVisible && (
                    <div className="  mt-2  rounded bg-white  w-[90%] flex flex-col m-auto z-10" >
                        {dateArray.map(date => (
                            <div
                                key={date}
                                className="p-2 mb-2 font-bold rounded-lg border border-gray-400 cursor-pointer hover:bg-gray-200"
                                onClick={() => handleDateSelect(date)}

                            >
                                {date.replace(/-/g, ' ')} {/* Display date without hyphens */}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* strategies Data */}
            <div>
                {uniqueStrategies.length === 0 ? (
                    <>
                        <div className='flex justify-center'>There are no strategies  for </div>
                        <div className='flex justify-center font-bold'>{selectedDate.replace(/-/g, ' ')}</div>
                    </>

                ) : (
                    uniqueStrategies.map((strategy, index) => {
                        const count = strategies.filter(s => s === strategy).length;
                        const label = count === 1 ? 'Strategy' : 'Strategies';
                        return (
                            <div key={index} className="border border-gray-300 p-4 mb-4 rounded-md shadow-sm flex flex-row justify-between">
                                <div className='font-bold'>{strategy}</div>
                                <div className='  text-gray-500'> &bull; {count} {label}</div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default Toggle