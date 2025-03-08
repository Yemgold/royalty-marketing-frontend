import { useSelector } from 'react-redux';
import { UserState } from '../../constants/types';

const CustomerDashboardPage = () => {
  const { currentUser } = useSelector(
    (state: { user: UserState }) => state.user
  );

  return (
    <div className="mb-32">
      <p className="text-center text-xl mb-8 font-semibold uppercase mt-3 underline">
        Dashboard
      </p>
      <div className="ml-10">
        <div className="flex gap-1 uppercase w-full font-bold ">
          <p className="text-left">Name:</p>
          <p>{currentUser?.name}</p>
        </div>
        <div className="flex gap-1 uppercase w-full font-bold ">
          <p className="text-left">Token:</p>
          <p>{currentUser?.token}</p>
        </div>
      </div>
      <div className="flex lg:flex-row flex-col gap-10 max-w-full items-center justify-between md:px-5 lg:px-32">
        <div className="w-[90%] lg:w-[50%]">
          <img
            className="w-[100%] rounded-lg h-[400px]"
            src="../../../images/placeholder.png"
            alt=""
          />
        </div>

        <div className="w-[90%] lg:w-[50%] flex flex-col">
          <div className="flex justify-between w-full font-bold">
            <p className="text-left bg-primary text-white w-[150px] border-b-black border-b-2 pl-2">
              Wallet Balance:
            </p>
            <p>{currentUser?.walletBalance}</p>
          </div>
          <div className="flex justify-between w-full font-bold  ">
            <p className="text-left bg-primary text-white w-[150px] border-b-black border-b-2 pl-2">
              Potential Earnings:
            </p>
            <p>{currentUser?.potentialEarning}</p>
          </div>
          <div className="flex justify-between w-full font-bold ">
            <p className="text-left bg-primary text-white w-[150px] border-b-black border-b-2 pl-2">
              Referral Wallet:
            </p>
            <p>{currentUser?.referralCashWallet}</p>
          </div>
          <div className="flex justify-between w-full font-bold ">
            <p className="text-left bg-primary text-white w-[150px] border-b-black border-b-2 pl-2">
              Booking Wallet:
            </p>
            <p>{currentUser?.bookingWallet}</p>
          </div>
          <div className="flex justify-between w-full font-bold ">
            <p className="text-left bg-primary text-white w-[150px] pl-2">
              Bidding Wallet:
            </p>
            <p>{currentUser?.biddingWallet}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboardPage;
