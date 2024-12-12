import { RiCheckboxMultipleFill } from 'react-icons/ri';
import Spinner from '../../components/Spinner';
import { useEffect, useState } from 'react';
import {
  MdOutlineCheckBox,
  MdOutlineCheckBoxOutlineBlank,
} from 'react-icons/md';
import useDebounce from '../../hooks/UseDebounce';
import axios from 'axios';
import { toast } from 'react-toastify';
import useApi from '../../hooks/ApiCalls';
import { useSelector } from 'react-redux';
import { TokenState } from '../../constants/types';

const customerLists = [
  {
    id: 1,
    contact_no: '080,98543920',
    percent: '100-1000',
    remark: 'confirm',
  },
  {
    id: 2,
    contact_no: '071,27381726',
    percent: '1001-5000',
    remark: 'confirm',
  },
  {
    id: 3,
    contact_no: '090,45324532',
    percent: '5001-10000',
    remark: 'confirm',
  },
  { id: 4, contact_no: '081,89273829', percent: '100-1000', remark: 'confirm' },
  { id: 5, contact_no: '080,32435432', percent: '100-1000', remark: 'confirm' },
];
const TokenConfirmationPage = () => {
  const [loading, setLoading] = useState(false);
  const [selectedCustomers, setSelectedCustomers] = useState<number[]>([]);

  const { allMyCustomersForTokenApprovalTotalCount } = useSelector(
    (state: { token: TokenState }) => state.token
  );

  // const allMyCustomersForTokenApprovalTotalCount = 300;

  const queryParams = new URLSearchParams(location.search);
  const pageParam = queryParams.get('page');
  const limitParam = queryParams.get('limit');
  const searchParam = queryParams.get('search');

  const { getCustomersDetailsForConfirmation } = useApi();

  const [searchValue, setSearchValue] = useState(searchParam || '');
  const [page, setPage] = useState(Number(pageParam) || 1);
  const limit = limitParam || '10';

  const totalPages = Math.ceil(
    allMyCustomersForTokenApprovalTotalCount / Number(limit)
  );

  const handleIsSelected = (id: number) => {
    setSelectedCustomers((prevSelected) => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter((i) => i !== id);
      } else {
        return [...prevSelected, id];
      }
    });
  };

  const getCustomersDetailsForTokenConfirmation = async (
    searchValue: string
  ) => {
    try {
      const response = await getCustomersDetailsForConfirmation(
        page.toString(),
        limit,
        searchValue
      );

      if (response) {
        console.log(response?.data?.message);
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        console.error(error.response.data.message);
        toast.error(error.response.data.message);
      } else {
        toast.error('An error occurred');
      }
    }
  };

  const debouncedSearchValue = useDebounce(searchValue, 1000);

  useEffect(() => {
    getCustomersDetailsForTokenConfirmation(searchValue);
  }, []);

  useEffect(() => {
    if (debouncedSearchValue || page) {
      getCustomersDetailsForTokenConfirmation(debouncedSearchValue);
    }
  }, [debouncedSearchValue, page]);

  useEffect(() => {
    const queryParams = new URLSearchParams();
    queryParams.set('page', page.toString());
    queryParams.set('limit', limit.toString());
    console.log('I am running');

    if (searchValue) {
      queryParams.set('search', searchValue);
    }

    console.log('Updated URL Params:', queryParams.toString());

    window.history.replaceState(
      {},
      '',
      `${location.pathname}?${queryParams.toString()}`
    );

    getCustomersDetailsForTokenConfirmation(searchValue);
  }, [page, location.pathname, limit, searchValue]);

  return (
    <div className="py-4">
      <div className="flex px-4 max-w-[100%] flex-col md:flex-row items-center justify-between">
        <div className="w-[90%] md:w-[40%] lg:w-[50%]">
          <img
            className="w-[100%] md:w-[80%] rounded-lg"
            src="../../../images/placeholder.jpg"
            alt=""
          />
        </div>

        <div className="w-[100%] md:w-[60%] lg:w-[50%] flex flex-col items-center">
          <div className="flex flex-col text-center">
            <p className="mt-5 text-xl font-semibold">
              List of your customers <br /> requesting for Token
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
                  <th className="py-2 md:py-3 text-left text-sm md:text-[13px] lg:text-base w-[5%]">
                    <RiCheckboxMultipleFill />
                  </th>
                  <th className="pl-2 md:pl-6 py-2 md:py-3 text-left text-sm md:text-[13px] lg:text-base">
                    Contact No:
                  </th>
                  <th className="pl-2 md:pl-6 py-2 md:py-3 text-left text-sm md:text-[13px] lg:text-base">
                    Percentage cost range/Date
                  </th>
                  <th className=" text-start mng:table-cell pl-2 md:pl-6 py-2 md:py-4 text-sm md:text-[13px] lg:text-base">
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
                      <td className="py-2 md:py-4 text-sm md:text-[13px] lg:text-base w-[5%]">
                        <button
                          onClick={() => handleIsSelected(list.id)}
                          className="text-center"
                        >
                          {selectedCustomers.includes(list.id) ? (
                            <MdOutlineCheckBox />
                          ) : (
                            <MdOutlineCheckBoxOutlineBlank />
                          )}
                        </button>
                      </td>
                      <td className="pl-2 pr-10 md:pl-6 py-2 md:py-4 text-sm md:text-[13px] lg:text-base">
                        {list?.contact_no}
                      </td>
                      <td className="pl-2 md:pl-6 py-2 md:py-4 text-sm md:text-[13px] lg:text-base">
                        {list?.percent}
                      </td>
                      <td className=" mng:table-cell pl-2 md:pl-6 py-2 md:py-4 text-sm md:text-[13px] lg:text-base">
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
      <div className="mb-20 flex justify-between items-center w-full px-4 mt-5">
        <div className="flex gap-4">
          {page > 1 && (
            <button
              className="bg-primary p-2 rounded-lg font-bold text-white"
              onClick={() => setPage(page - 1)}
            >
              Previous
            </button>
          )}
          {page < totalPages && (
            <button
              className="bg-primary p-2 rounded-lg font-bold text-white"
              onClick={() => setPage(page + 1)}
            >
              Next
            </button>
          )}
        </div>
        <div>
          Page {page} of {totalPages}
        </div>
      </div>
    </div>
  );
};

export default TokenConfirmationPage;
