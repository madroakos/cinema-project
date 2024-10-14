
export default function DatePicker() {

    return (
        <div className="flex flex-col items-center justify-center w-full h-full">
            <h1 className="text-4xl font-bold mb-4">Choose a date</h1>
            <input type="date" className="p-2 border border-gray-300 rounded-md mb-4" />
            <button className="p-2 bg-blue-500 text-white rounded-md">Submit</button>
        </div>
    )
}