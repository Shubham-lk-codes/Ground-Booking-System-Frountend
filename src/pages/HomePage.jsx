import { Navbar } from "../components/navbar";
import imageSrc from '../assets/img/1.jpg'; // Adjust the import path accordingly
import Homeone  from "../components/Homeone";

export const HomePage = () => {
    return (
        <>
            <Navbar />
            <div className="w-full h-screen flex flex-row mt-10">
                <div className="w-[40vw] h-[70vh] bg-white m-10 flex flex-col justify-center ">
                    <h1 className="text-2xl font-bold text-green-500 mb-5 text-[40px]">Book your game, skip the wait</h1>
                    <h1 className="text-2xl font-bold text-green-500 mb-5 text-[40px]">Game On!</h1>
                    <h3 className="text-lg text-gray-400">Hassle-free ground and turf bookings!</h3>
                    <h3 className="text-lg text-gray-400">Own the field, book your game spot in a click!</h3>
                </div>
                <div className="w-[40vw] h-[70vh] bg-white m-10">
                    <img src={imageSrc} alt="Game Field" className="w-full h-full object-cover" />
                </div>
            </div>
            <Homeone />

        </>
    );
}
