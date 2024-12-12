import { Link } from 'react-router-dom';

const TraderDashboardPage = () => {
  return (
    <div className="flex md:flex-row flex-col max-w-[100%] items-center justify-between md:px-16 py-4 min-h-screen">
      <div className="w-[90%] md:w-[50%] lg:w-[50%]">
        <img
          className="w-[100%] md:w-[80%] rounded-lg"
          src="../../../public/images/placeholder.jpg"
          alt=""
        />
      </div>

      <div className="w-[90%] md:w-[50%] lg:w-[50%] flex flex-col items-center">
        <p className="text-center text-xl mb-8 font-semibold">Dashboard</p>
        <div className="flex gap-20 md:gap-28 ml-[-20px] md:ml-0 items-start font-bold">
          <p>Total token:</p>
          <p>100,000.00</p>
        </div>

        <div className="flex md:gap-9 gap-12 ml-[-20px] md:ml-0 items-start my-5">
          <Link
            className="bg-primary py-1 px-4 md:px-11 rounded-full text-[15px] content-center"
            to="/trader/all-customers-confirmation"
          >
            View Request
          </Link>
          <p className="font-bold">100 Customers</p>
        </div>

        <div className="flex gap-6 md:gap-6 items-start">
          <Link
            className="bg-primary py-1 px-2 md:px-8 rounded-full text-[14px] content-center"
            to="/trader/sales-promo"
          >
            Request for Token
          </Link>
          <Link
            className="bg-primary py-1 px-8 rounded-full text-[14px] content-center"
            to="#"
          >
            Transaction History
          </Link>
        </div>

        <div className="mt-5 bg-primary h-28 mb-16 content-center w-[100%]">
          <p className="text-center">Message from Admin</p>
        </div>
      </div>
    </div>
  );
};

export default TraderDashboardPage;
