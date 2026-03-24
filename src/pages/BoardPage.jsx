import Board from '../components/Board/Board'
import Navbar from "../components/Navbar/Navbar"
import { useBoardAction } from '../hooks/useBoardAction';

const BoardPage = () => {
    const { board } = useBoardAction();

    return (
        <div className="h-screen flex flex-col">
            <Navbar board={board} />
            <div className="flex-1 relative overflow-hidden">
                <Board />
            </div>
        </div>
    )
}

export default BoardPage