import { imagesArray } from '../../constants/array';

const TokenForTargetPage = () => {
  return (
    <div className="mt-[50px] mb-[6000px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pl-10 md:pl-20">
      {imagesArray.map((image, index) => (
        <div key={index}>
          <img
            className="h-52 w-[280px] md:w-[350px] lg:w-[300px] object-cover"
            src={image.title}
            alt="placeholder"
          />
          <div className="flex gap-40">
            <p>{image.text}</p>
            <button>Claim</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TokenForTargetPage;
