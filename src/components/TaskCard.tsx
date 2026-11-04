function TaskCard(props: { name: string; completed: boolean }) {
  return (
    <div className="TaskCard">
      <h1>{props.name}</h1>
      <h2>{props.completed ? 'Выполнен' : 'Не выполнен'}</h2>
    </div>
  );
}
export default TaskCard;
