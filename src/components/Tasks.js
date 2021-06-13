import Task from './Task'
const Tasks = ({tasks,onDelete,onToggle}) => {
   
    return (
        
        <div >
            {tasks.map((task, index) => (
                <Task 
                    key={index} 
                    task={task} 
                    onDelete={() => onDelete(task.id)} 
                    onToggle={onToggle}
                />
                ))}
        </div>
    )
}

export default Tasks
