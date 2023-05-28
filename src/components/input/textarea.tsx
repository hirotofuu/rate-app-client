const Textarea=(props: any)=>{
  const title=props.title
  const name=props.name
  const holder=props.holder
  const value=props.value
  const updateTextarea=props.updateTextarea

  return (
      <>
        <section className="mb-6">
          <div className="flex gap-2 mb-1 text-sm text-gray-600">
            <label id={name}>{`${title}`}</label>
            <p>({value.length}/500)</p>
          </div>
          <textarea
          name={name}
          placeholder={holder}
          className="h-24 w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md  focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
          value={value}
          onChange={updateTextarea}
          maxLength={500} 
          required
          >
          </textarea>
        </section>
      </>
  );
}

export default Textarea