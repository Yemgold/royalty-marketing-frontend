import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { biddingProductType } from '../../constants/types';
import axios from 'axios';
import { toast } from 'react-toastify';
import useApi from '../../hooks/ApiCalls';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../components/Spinner';

Modal.setAppElement('#root');

const BidForProductsPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [biddingId, setBiddingId] = useState('');
  const [biddingProductArray, setBiddingProductArray] =
    useState<biddingProductType>([]);

  const { fetchBiddingProduct, processBiddingFunction } = useApi();

  console.log('biddingId:', biddingId);
  console.log('inputValue:', inputValue);
  console.log('biddingProductArray:', biddingProductArray);

  const handleFetchingBiddingProduct = async () => {
    try {
      const response = await fetchBiddingProduct();
      if (response) {
        setBiddingProductArray(response?.products);
        return;
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        console.error(error.response.data.message);
        toast.error(error.response.data.message);
      } else {
        console.error('An error occurred:', error);
        toast.error('An error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // FETCH THE BIDING PRODUCTS
    handleFetchingBiddingProduct();
  }, []);

  const handleModalOpen = (image: string) => {
    setIsOpen(!isOpen);
    setBiddingId(image);
  };

  const handleModalClose = () => {
    setIsOpen(false);
    console.log('setBiddingId:', setBiddingId);
    console.log('inputValue:', inputValue);
    if (
      setBiddingId &&
      setBiddingId !== null &&
      setBiddingId !== undefined &&
      inputValue !== ''
    ) {
      processBidding();
    } else {
      return;
    }
  };

  const processBidding = async () => {
    const actualItem = biddingProductArray.find(
      (item) => item._id === biddingId
    );
    const payload = {
      productToken: actualItem?.productToken || '',
      royaltyBidingAmount: inputValue,
    };

    try {
      const response = await processBiddingFunction(payload);
      console.log('response', response);
      if (response) {
        toast.success(response.message);
        setInputValue('');
        setBiddingId('');
        navigate('/customer/dashboard');
        return;
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        console.error(error.response.data.message);
        toast.error(error.response.data.message);
        setInputValue('');
        setBiddingId('');
      } else {
        console.error('An error occurred:', error);
        toast.error('An error occurred');
        setInputValue('');
        setBiddingId('');
      }
    }
  };

  return (
    <>
      {isLoading && <Spinner />}

      <div className="mt-[50px] mb-[100px] md:mb-[60px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pl-10 md:pl-20">
        {isLoading === false &&
          biddingProductArray !== null &&
          biddingProductArray.map((image, index) => (
            <div key={index}>
              <img
                className="h-52 w-[280px] md:w-[350px] lg:w-[300px] object-cover"
                src={image?.name}
                alt="placeholder"
              />
              <div className="flex gap-40">
                <p>{image?.cost}</p>

                <button onClick={() => handleModalOpen(image?._id)}>Bid</button>
              </div>

              <div>
                <Modal
                  isOpen={isOpen}
                  onRequestClose={() => setIsOpen(false)}
                  overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
                  className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md mx-auto outline-none relative"
                >
                  <h2>Enter Royalty bidding amount</h2>
                  <div className="flex-col flex">
                    <input
                      type="text"
                      value={inputValue}
                      className="border-2 p-2 rounded-xl"
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="amount..."
                    />
                    <button
                      className="bg-green-400 w-[50%] m-auto py-2 mt-2 rounded-xl italic font-bold uppercase"
                      onClick={handleModalClose}
                    >
                      Submit bidding
                    </button>
                  </div>
                </Modal>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default BidForProductsPage;
