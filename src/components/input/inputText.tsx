const Input=(props: any)=>{
  const title=props.title
  const name=props.name
  const holder=props.holder
  const value=props.value
  const updateInput=props.updateInput

  return (
      <>
        <section className="mb-6">
          <label id={name} className="text-sm text-gray-600">{title}</label>
          <input
            type="text"
            name={name}
            placeholder={holder}
            required
            maxLength={50} 
            className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 text-sm  rounded-md  focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
            value={value}
            onChange={updateInput}
          />
        </section>
      </>
  );
}

export default Input