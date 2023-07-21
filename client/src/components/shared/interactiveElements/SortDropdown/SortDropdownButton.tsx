import { Fragment, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';

import { ReactComponent as Checkmark } from '../../../../assets/checkmark.svg';
import { ReactComponent as ArrowDown } from '../../../../assets/down_arrow.svg';
import { ReactComponent as ArrowUp } from '../../../../assets/up_arrow.svg';

export interface SortDropdownButtonProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  handleOptionClick: () => void;
}

export const SortDropdownButton = ({ ...props }: SortDropdownButtonProps) => {
  const [sortBy, setSortBy] = useState('Most Upvotes');

  return (
    <Menu as="div" className="relative">
      {({ open }) => (
        <>
          <Menu.Button
            className={`w-[12.125rem] h-[4.5rem] bg-slate-700 rounded-[0.625rem] text-violet-50 text-sm font-bold text-center transition-colors duration-200 ease-in-out focus:outline-fuchsia-700 focus:outline-2 ${
              open ? 'text-opacity-75' : ''
            }`}
            {...props}
          >
            <div>
              <span className="text-sm font-normal">Sort by : </span>
              <span className="text-sm font-bold">{sortBy}</span>
              {open ? (
                <ArrowUp
                  aria-hidden="true"
                  className="inline-block ml-2 text-white"
                />
              ) : (
                <ArrowDown
                  aria-hidden="true"
                  className="inline-block ml-2 text-white"
                />
              )}
            </div>
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
            <Menu.Items className="w-[15.9375rem] divide-y divide-opacity-20 focus:outline-none divide-slate-600 h-48 shadow-2xl mt-4 flex flex-col rounded-[0.625rem]">
              {[
                'Most Upvotes',
                'Least Upvotes',
                'Most Comments',
                'Least Comments',
              ].map((item) => (
                <Menu.Item key={item}>
                  {({ active }) => (
                    <button
                      className={`font-normal flex items-center justify-between px-4 py-2 text-md  h-[2.9375rem] text-left ${
                        active ? 'text-fuchsia-600' : 'text-slate-500'
                      } ${
                        sortBy === item ? 'text-fuchsia-600' : 'text-slate-500'
                      }`}
                      onClick={() => {
                        setSortBy(item);
                      }}
                    >
                      <span>{item}</span>
                      {sortBy === item ? <Checkmark /> : null}
                    </button>
                  )}
                </Menu.Item>
              ))}
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
};
