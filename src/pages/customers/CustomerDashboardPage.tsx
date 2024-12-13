import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { tokensArray } from '../../constants/array';

const CustomerDashboardPage = () => {
  const navigate = useNavigate();
  const [selectedToken, setSelectedToken] = useState('');

  const handleNavigation = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === 'token for value') {
      navigate('/customer/token-for-value');
    } else {
      navigate('/customer/token-for-target');
    }
  };
  return (
    <div className="flex md:flex-row flex-col max-w-full items-center justify-between md:px-5 lg:px-32 py-4 min-h-screen">
      <div className="w-[90%] md:w-[50%] lg:w-[50%]">
        <img
          className="w-[100%] md:w-[80%] rounded-lg"
          src="../../../images/placeholder.jpg"
          alt=""
        />
      </div>

      <div className="w-[90%] md:w-[50%] lg:w-[50%] flex flex-col items-center">
        <p className="text-center text-xl mb-8 font-semibold">Dashboard</p>
        <div className="flex gap-28 items-start font-bold">
          <p>Total token:</p>
          <p>100,000.00</p>
        </div>
        <div className="flex gap-9 items-start my-5">
          <p className="bg-primary py-1 px-11 rounded-full text-[13px] content-center">
            Current Value
          </p>
          <p className="font-bold">Not yet launched</p>
        </div>
        <div className="flex gap-6 items-start">
          <Link
            className="bg-primary py-1 px-6 rounded-full text-[13px] content-center"
            to="#"
          >
            Request for Token
          </Link>

          <select
            className=" bg-primary font-bold text-white text-[13px]  py-1 px-6 border p-2 rounded-full cursor-pointer"
            name=""
            id=""
            value={selectedToken}
            onChange={handleNavigation}
          >
            <option
              className="text-center text-white font-bold"
              disabled
              value=""
            >
              Redeem Token
            </option>
            {tokensArray.map((token, index) => (
              <option
                className="text-white font-bold"
                value={token.title}
                key={index}
              >
                {token.title}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-5 bg-primary h-28 mb-16 content-center w-[100%]">
          <p className="text-center">Message from Admin</p>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboardPage;
