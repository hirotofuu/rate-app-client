const RadioInput=(props: any)=>{
  const title=props.title
  const name=props.name
  const values=props.values
  const updateInput=props.updateInput

  return (
      <>
        <section key={name} className="mb-6">
          <label id={name} className="text-sm text-gray-600">{title}</label>
          <ul>
            {values.map((value: string, index: number)=>

              <li key={index} id={value} className="flex gap-1">
                <input
                  type="radio"
                  name={name}
                  required
                  className="px-3 py-2"
                  value={value}
                  onChange={updateInput}
                /><span className="text-sm p-2">{value}</span>
              </li>
            )}
          </ul>
        </section>
      </>
  );
}

export default RadioInput