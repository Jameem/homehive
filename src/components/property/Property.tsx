import { useState } from 'react';
import { DefaultModal } from '../modal/Index';

export interface PropertyProps {
  name: string;
  address: string;
  description?: string;
  id: string;
  image: string;
  attributes: {
    trait_type: string;
    value: string | number;
  }[];
  escrow: any;
  account?: string;
  provider: any;
}

export const Property = (props: PropertyProps) => {
  const { name, address, image, attributes, escrow, account, provider } = props;
  const [showModal, setShowModal] = useState(false);
  const onClickProperty = () => {
    setShowModal(true);
  };

  return (
    <>
      <div
        className='green-pink-gradient p-[1px] rounded-[5px]'
        onClick={onClickProperty}
      >
        <div className='property  m-[1px]  min-h-[280px]  flex   flex-col'>
          <img src={image} alt='web-development' className='  object-contain' />

          <div className='px-1 py-1 flex flex-col gap-0.5'>
            <div className='flex justify-between items-center'>
              <h3 className='text-white text-[15px] font-bold'>{name}</h3>
              <h5 className='color-purple text-[20px] font-bold'>
                {attributes[0].value} ETH
              </h5>
            </div>
            <div>
              <span className='text-xs'> {attributes[2].value} bds |</span>
              <span className='text-xs'> {attributes[3].value} ba |</span>
              <span className='text-xs'> {attributes[4].value} sqft </span>
            </div>
            <span className='text-sm'>{address}</span>
          </div>
        </div>
      </div>
      <DefaultModal
        show={showModal}
        property={props}
        onClose={() => setShowModal(false)}
        escrow={escrow}
        account={account}
        provider={provider}
      />
    </>
  );
};
