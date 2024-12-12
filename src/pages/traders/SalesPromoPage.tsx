import { useState } from 'react';

const durations = [
  {
    title: '1 Month',
  },
  {
    title: '2 Months',
  },
  {
    title: '3 Months',
  },
  {
    title: '4 Months',
  },
  {
    title: '5 Months',
  },
  {
    title: '6 Months',
  },
  {
    title: '7 Months',
  },
  {
    title: '8 Months',
  },
  {
    title: '9 Months',
  },
  {
    title: '10 Months',
  },
  {
    title: '11 Months',
  },
  {
    title: '12 Months',
  },
];

const SalesPromoPage = () => {
  const [selectedDuration, setSelectedDuration] = useState('');

  const handleDurationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDuration(e.target.value);
  };
  return (
    <div className="py-4">
      <div className="flex px-4 md:px-6 lg:px-8 max-w-[100%] flex-col md:flex-row items-center justify-between">
        <div className="w-[90%] md:w-[50%] lg:w-[50%]">
          <img
            loading="lazy"
            className="w-[100%] md:w-[80%] rounded-lg"
            src="../../../images/placeholder.jpg"
            alt=""
          />
        </div>

        <div className="w-[100%] md:w-[50%] lg:w-[50%] flex flex-col items-center">
          <div className="flex flex-col text-center">
            <p className="mt-5 text-xl font-semibold">
              Trader requesting for Marketing <br /> and Advertisement services
            </p>
            <div className="flex text-center items-center justify-center font-bold gap-10 text-xl lg:text-2xl my-5">
              <p>Total Token:</p>
              <p>0.00</p>
            </div>

            <div className="flex text-center items-center justify-center font-bold gap-10 text-xl lg:text-2xl mb-5">
              <p>Trader's id:</p>
              <p>0564a</p>
            </div>

            {/* DROP DOWN FOR MARKETING DURATION */}
            <div className="flex text-center items-center justify-center font-bold gap-10 text-xl lg:text-2xl">
              <p>SELECT MARKETING DURATION</p>
            </div>

            <div className="mt-3 flex items-end flex-col">
              <select
                className="w-full border p-2 rounded-full cursor-pointer"
                name=""
                id=""
                value={selectedDuration}
                onChange={handleDurationChange}
              >
                <option disabled value="">
                  Choose duration
                </option>
                {durations.map((duration, index) => (
                  <option value={duration.title} key={index}>
                    {duration.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex text-center items-center justify-center font-bold gap-10 text-xl lg:text-2xl">
              <div className="">
                <p>Duration</p>
                <p>{selectedDuration ? selectedDuration : 0}</p>
              </div>
              <div className="">
                <p>Amount to pay</p>
                <p>0.00</p>
              </div>
            </div>
          </div>
          <div className=" overflow-x-auto content-center mb-16 max-w-[100%] md:w-full flex flex-col mx-auto smn:ml-[-1px]">
            <p className="text-center">
              Please Note: Customers Royalty Reward Tokens will be given to you
              to give your customers free of charge for their patronage. This
              will encourage them and more customers to patronize your business.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesPromoPage;
