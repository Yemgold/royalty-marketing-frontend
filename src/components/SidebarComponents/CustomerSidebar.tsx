import React, { useState } from 'react';
import { SidebarComponentProps } from '../../constants/types';
import { MdAccountBalanceWallet } from 'react-icons/md';
import CustomerDropDownMenu from '../CustomerDropDownMenu';

const CustomerSidebar = ({
  toggle,
  handleCustomerMenuToggle,
  customerMenuOpen,
  handleCloseToggle,
}: SidebarComponentProps) => {
  const [dropDownOpen, setDropDownOpen] = useState(false);

  const handleDropDownToggle = () => {
    setDropDownOpen(!dropDownOpen);
    console.log('DROP DOWN TOGGLED:', !dropDownOpen);
  };
  return (
    <div
      className={[customerMenuOpen ? 'mb-[1px]' : 'mb-[10px]', 'ml-5 '].join(
        ' '
      )}
    >
      <button onClick={handleCustomerMenuToggle}>
        <span className={toggle ? 'flex' : 'hidden'}>
          {' '}
          <MdAccountBalanceWallet className="text-xl " />
        </span>
        <span
          className={[toggle ? 'hidden' : 'flex', 'font-bold italic'].join(' ')}
        >
          CUSTOMER
        </span>
      </button>
      {customerMenuOpen && (
        <CustomerDropDownMenu
          handleDropDownToggle={handleDropDownToggle}
          dropDownOpen={dropDownOpen}
          toggle={toggle}
          handleCloseToggle={handleCloseToggle}
        />
      )}
    </div>
  );
};

export default CustomerSidebar;
