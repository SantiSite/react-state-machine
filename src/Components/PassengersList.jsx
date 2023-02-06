export default ({ state }) => {
  console.log("estado de la maquina en la lista:", state)
  const { passengers } = state.context
  console.log("passengers:", passengers);
  return (
    <>
    {
      passengers?.length >= 1 &&
        <ul style={{textAlign: "left"}}>
          {passengers.map((passenger, idx) =><li key={idx}>{passenger}</li>)}
        </ul>
    }
    </>
  )
}