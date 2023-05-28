const Select=(props: any)=>{
  const title=props.title
  const name=props.name
  const value=props.value
  const contents=props.contents
  const updateSelect=props.updateSelect

  return (
      <>
        <section className="mb-6">
          <label id={name} className="block text-sm text-gray-600">{title}</label>
          <select name={name} className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 block w-full p-2.5 "
            value={value}
            onChange={updateSelect}
          >
          {contents.map((content: string, index: number)=>
          <option key={index} value={content}>{content}</option>
          )}

          </select>
        </section>
      </>
  );
}

export default Select