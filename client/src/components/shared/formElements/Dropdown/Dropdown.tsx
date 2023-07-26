import { Fragment, useState } from 'react';
import React from 'react';
import { Menu, Transition } from '@headlessui/react';

import { ReactComponent as Checkmark } from '@/assets/checkmark.svg';
import { ReactComponent as ArrowDown } from '@/assets/down_arrow.svg';
import { ReactComponent as ArrowUp } from '@/assets/up_arrow.svg';

interface MenuItemProps {
  item: string;
  setSortBy: React.Dispatch<React.SetStateAction<string>>;
  sortBy: string;
}

const MenuItem = ({ item, setSortBy, sortBy }: MenuItemProps) => (
  <Menu.Item key={item}>
    {({ active }) => {
      return (
        <button
          className={`font-normal flex items-center justify-between px-4 py-2 text-md  h-[2.9375rem] text-left ${
            active ? 'text-fuchsia-600' : ''
          }`}
          onClick={() => {
            setSortBy(item);
          }}
        >
          <span>{item}</span>
          {sortBy === item ? <Checkmark /> : null}
        </button>
      );
    }}
  </Menu.Item>
);

interface DropdownProps extends React.HTMLAttributes<HTMLButtonElement> {
  handleOptionClick: () => void;
  items: string[];
  width?: string;
}

export const Dropdown = ({ ...props }: DropdownProps) => {
  const [sortBy, setSortBy] = useState(props.items?.[0] || '');

  return (
    <Menu as="div" className="relative">
      {({ open }) => (
        <>
          <Menu.Button
            className={`bg-slate-50 rounded-[0.3125rem] flex flex-row justify-between items-center focus:outline-indigo-600 focus:outline focus:outline-1 focus:border-indigo-600 py-[0.8125rem] px-6 ${
              props.width || 'w-full'
            }`}
            {...props}
          >
            <span className="text-slate-600 text-[15px] font-normal">
              {sortBy}
            </span>
            {open ? (
              <ArrowUp
                aria-hidden="true"
                className="inline-block ml-2 text-indigo-600"
              />
            ) : (
              <ArrowDown
                aria-hidden="true"
                className="inline-block ml-2 text-indigo-600"
              />
            )}
          </Menu.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items
              className={`h-60 divide-y divide-opacity-20 focus:outline-none divide-slate-600 shadow-xl mt-4 flex flex-col rounded-[0.625rem] text-slate-500 ${
                props.width || 'w-full'
              }`}
            >
              {props.items.map((item) => (
                <MenuItem item={item} setSortBy={setSortBy} sortBy={sortBy} />
              ))}
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
};
