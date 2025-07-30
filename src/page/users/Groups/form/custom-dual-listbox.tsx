'use client';
import { useDualListbox } from '@/hooks/useDualListbox';
import React, { useEffect } from 'react';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight, MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from 'react-icons/md';

interface Item {
  Id: string;
  Name: string;
}

type Props = {
  data: Item[];
  Data: any;
  setData: any;
};

const DualListbox = ({ data, setData, Data }: Props) => {
  const {
    leftList,
    rightList,
    selectedLeft,
    selectedRight,
    leftSearch,
    rightSearch,
    filteredLeftList,
    filteredRightList,
    moveToRight,
    moveToLeft,
    moveAllToRight,
    moveAllToLeft,
    setLeftSearch,
    setRightSearch,
    handleSelectLeft,
    handleSelectRight,
  } = useDualListbox(data);

  useEffect(() => {
    setData({ ...Data, Users: [...Data?.Users, ...rightList] });
  }, [rightList]);

  const renderList = (items: Item[], selectedItems: string[], onSelect: (id: string) => void, searchValue: string, onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void) => (
    <div className="w-1/2">
      <input type="text" placeholder="Search..." value={searchValue} onChange={onSearchChange} className="mb-2 w-full rounded border p-2" />
      <div className="h-60 overflow-auto border p-2">
        {items.length > 0 ? (
          items.map((item, index) => (
            <div key={item.Id} className="flex items-center space-x-2 border-b p-2">
              <input type="checkbox" checked={selectedItems.includes(item.Id)} onChange={() => onSelect(item.Id)} className="form-checkbox" id={index.toString()} />
              <label htmlFor={index.toString()} className="cursor-pointer">
                {item.Name}
              </label>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No Items found</p>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex space-x-4 py-5">
      {/* Left List */}
      {renderList(filteredLeftList, selectedLeft, handleSelectLeft, leftSearch, (e) => setLeftSearch(e.target.value))}
      <div className="mt-6 flex flex-col justify-center gap-5">
        <MdKeyboardDoubleArrowRight className="h-9 w-12 cursor-pointer rounded border p-1 hover:bg-slate-100" onClick={moveAllToRight} />
        <MdKeyboardArrowRight className="h-9 w-12 cursor-pointer rounded border p-1 hover:bg-slate-100" onClick={moveToRight} />
        <MdKeyboardArrowLeft className="h-9 w-12 cursor-pointer rounded border p-1 hover:bg-slate-100" onClick={moveToLeft} />
        <MdKeyboardDoubleArrowLeft className="h-9 w-12 cursor-pointer rounded border p-1 hover:bg-slate-100" onClick={moveAllToLeft} />
      </div>
      {/* Right List */}
      {renderList(filteredRightList, selectedRight, handleSelectRight, rightSearch, (e) => setRightSearch(e.target.value))}
    </div>
  );
};

export default DualListbox;
