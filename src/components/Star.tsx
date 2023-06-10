import ReactStarsRating from 'react-awesome-stars-rating';

type Props={
  rateNumber: number;
}

const Star:React.FC<Props>=({rateNumber})=>{
  return (
      <>
        <ReactStarsRating
        id="rate"
        size={20}
        isEdit={false}
        value={rateNumber}
        selectedValue={()=>{}}
        className="flex"
        />
      </>
  );
}

export default Star