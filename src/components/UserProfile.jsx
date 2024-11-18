import { Navbar } from "./navbar"

export const UserProfile = () => {
    return (
        <>
            <Navbar />
            <div className="h-screen w-full pl-10 flex flex-row">
                <div className="h-full w-[30vw] border-2 border-black">
                    
                    <div className="bg-black h-10 w-10 rounded">

                    </div>
                </div>
                <div className="h-full w-[60vw]"></div>
            </div>
        </>
    );
}
