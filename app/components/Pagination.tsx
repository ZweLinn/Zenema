'use client'
export default function Pagination({ fetchPage ,  setFetchPage } : { fetchPage: number;setFetchPage: (page: number) => void }) {


    const onDecHandler = () => {
            
            if (fetchPage > 1) {
                setFetchPage(fetchPage - 1);
            }else{
                setFetchPage(1);
            }
    }
    const onIncHandler = () => {
             setFetchPage(fetchPage + 1);

    }

    
    return (
        <div className="join">
            <button className="join-item btn" onClick={onDecHandler}>«</button>
            <button className="join-item btn">{fetchPage}</button>
            <button className="join-item btn" onClick={onIncHandler}>»</button>
        </div>
    )
}