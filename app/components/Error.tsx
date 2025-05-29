export default function ErrorEffect({message} : {message: string}) {
    return (
        <div className="flex justify-center items-center mt-10 text-2xl font-bold text-mainText">
            <div role="alert" className="alert alert-error alert-outline">
                <span>{message}</span>
            </div>
        </div>
    )
}