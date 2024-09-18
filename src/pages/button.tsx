interface ButtonProps {
    content: string
    onClick: () => void
}

export default function Button({ content, onClick }: ButtonProps){
    return (
        <button onClick={onClick} className="bg-blue-500 my-1 mx-1 py-2 px-4 rounded-full active:bg-blue-700">
            { content }
        </button>
    )
}