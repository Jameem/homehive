import { Property, PropertyProps } from './Property';

interface PropertiesProps {
  properties: PropertyProps[];
  escrow: any;
  account?: string;
  provider: any;
}

export const Properties = ({
  properties,
  escrow,
  account,
  provider,
}: PropertiesProps) => {
  return (
    <section className='py-1 px-1 gap-1 properties-container'>
      <h1>Properties for you</h1>
      <div className=' properties-wrapper'>
        {properties.map(
          ({ id, name, address, attributes, image, description }) => {
            return (
              <Property
                key={id}
                id={id}
                name={name}
                address={address}
                attributes={attributes}
                image={image}
                description={description}
                escrow={escrow}
                account={account}
                provider={provider}
              />
            );
          }
        )}
      </div>
    </section>
  );
};
