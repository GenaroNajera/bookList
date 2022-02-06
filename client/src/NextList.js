function NextList(props) {
  const {data} = props;

  return (
    <table>
      <tbody>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Author</th>
        </tr>

        {data.map(v =>
          <tr key={v.id}>
            <td>{v.id}</td>
            <td>{v.name}</td>
            <td>{v.description}</td>
            <td>Edit</td>
            <td>Remove</td>
            <td>Move</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default NextList;