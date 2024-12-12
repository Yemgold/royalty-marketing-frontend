import { useState } from 'react';
import Spinner from '../../components/Spinner';

const customerLists = [
  {
    id: 1,
    contact_no: '080,98543920',
    percent: '100-1000',
    remark: 'confirm',
  },
  {
    contact_no: '071,27381726',
    percent: '1001-5000',
    remark: 'confirm',
  },
  {
    id: 2,
    contact_no: '090,45324532',
    percent: '5001-10000',
    remark: 'confirm',
  },
  { id: 3, contact_no: '080,32435432', percent: '100-1000', remark: 'confirm' },
  { id: 4, contact_no: '081,89273829', percent: '100-1000', remark: 'confirm' },
];
const ReConfirmCustomerPage = () => {
  const [loading, setLoading] = useState(false);

  return (
    <div>
      <div className="flex px-4 max-w-[100%] flex-col md:flex-row items-center justify-between">
        <div className="w-[90%] md:w-[50%] lg:w-[50%]">
          <img
            className="w-[100%] md:w-[80%] rounded-lg"
            src="../../../public/images/placeholder.jpg"
            alt=""
          />
        </div>{' '}
        <div className="w-[100%] md:w-[60%]">
          <div className="flex flex-col text-center">
            <p className="mt-5 text-xl font-semibold">
              List of your customers <br /> for Token reconfirmation
            </p>
            <div className="flex text-center items-center justify-center font-bold gap-10 text-2xl my-10">
              <p>Total Token:</p>
              <p>#100,000</p>
            </div>
          </div>
          <div className=" overflow-x-auto w-[100%] md:w-full flex flex-col mx-auto smn:ml-[-1px]">
            <table className="md:table-auto w-full min-w-full divide-y divide-gray-200 table-auto">
              <thead className="bg-gray-50">
                <tr>
                  <th className="pl-2 md:pl-6 py-2 md:py-3 text-left text-sm md:text-[13px] lg:text-base">
                    Contact No:
                  </th>
                  <th className="pl-2 md:pl-6 py-2 md:py-3 text-left text-sm md:text-[13px] lg:text-base">
                    Percentage cost range/Date
                  </th>
                  <th className="hidden text-start mng:table-cell pl-2 md:pl-6 py-2 md:py-4 text-sm md:text-[13px] lg:text-base">
                    Remark
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 text-sm">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="text-center">
                      <Spinner />
                    </td>
                  </tr>
                ) : customerLists.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-6">
                      You have no customer requesting for token yet 😑
                    </td>
                  </tr>
                ) : (
                  customerLists.map((list, index) => (
                    <tr key={index}>
                      <td className="pl-2 md:pl-6 py-2 md:py-4 text-sm md:text-[13px] lg:text-base">
                        {list?.contact_no}
                      </td>
                      <td className="pl-2 md:pl-6 py-2 md:py-4 text-sm md:text-[13px] lg:text-base">
                        {list?.percent}
                      </td>
                      <td className="hidden mng:table-cell pl-2 md:pl-6 py-2 md:py-4 text-sm md:text-[13px] lg:text-base">
                        {list?.remark}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReConfirmCustomerPage;
