export function CreateTaskModal() {
    const [todoTitle, setTodoTitle] = useState("");

    const handleTextToEmoji = async () =>  {
        const res = await textToEmoji(text)
        console.log(res)
    }

    return (
        <>
        </>
    )
}