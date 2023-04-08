import ToolTip from 'src/components/tooltip/ToolTip'
import './HelpButton.css'

type HelpButtonType = {
    title: string;
    description: string;
}

const HelpButton = ({title, description}: HelpButtonType) => {
    return (
        <ToolTip title={title} description={description}>
            <button className='help'>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
                <span className="material-symbols-outlined help">
                    question_mark
                </span>
            </button>
        </ToolTip>
    )
}

export default HelpButton;