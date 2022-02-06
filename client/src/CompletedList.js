function CompletedList(props) {
  const {data} = props;

  return (
    <table>
      <tbody>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Author</th>
          <th>Rating</th>
          <th>Started</th>
          <th>Finished</th>
        </tr>

        {data.map(v =>
          <tr key={v.id}>
            <td>{v.id}</td>
            <td>{v.name}</td>
            <td>{v.description}</td>
            <td><input type='number' max='5' /></td>
            <td><input type='date' /></td>
            <td><input type='date' /></td>
            <td>Edit</td>
            <td>Remove</td>
            <td>Move</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default CompletedList;