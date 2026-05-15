interface IProps {
    color: string;
    onClick?: () => void;
}

const CircleColor = ({ color, onClick }: IProps) => {
    return <span key={color} style={{ backgroundColor: color }} className={`w-5 h-5 rounded-full ${onClick ? 'cursor-pointer' : ''}`} onClick={onClick} />
}

export default CircleColor
