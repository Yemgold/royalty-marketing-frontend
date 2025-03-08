import React, { useState } from 'react';
import { SidebarComponentProps } from '../../constants/types';
import { MdAccountBalanceWallet } from 'react-icons/md';
import TraderDropDownMenu from '../TraderDropDownMenu';

const TraderSidebar = ({
  toggle,
  handleTraderMenuToggle,
  traderMenuOpen,
  handleCloseToggle,
}: SidebarComponentProps) => {
  const [dropDownOpen, setDropDownOpen] = useState(false);

  const handleDropDownToggle = () => {
    setDropDownOpen(!dropDownOpen);
    console.log('DROP DOWN TOGGLED:', !dropDownOpen);
  };
  return (
    <div
      className={[traderMenuOpen ? 'mb-[1px]' : 'mb-[10px]', 'ml-5 '].join(' ')}
    >
      <button onClick={handleTraderMenuToggle}>
        <span className={toggle ? 'flex' : 'hidden'}>
          {' '}
          <MdAccountBalanceWallet className="text-xl " />
        </span>
        <span
          className={[toggle ? 'hidden' : 'flex', 'font-bold italic'].join(' ')}
        >
          TRADER
        </span>
      </button>
      {traderMenuOpen && (
        <TraderDropDownMenu
          handleDropDownToggle={handleDropDownToggle}
          dropDownOpen={dropDownOpen}
          toggle={toggle}
          handleCloseToggle={handleCloseToggle}
        />
      )}
    </div>
  );
};

export default TraderSidebar;
