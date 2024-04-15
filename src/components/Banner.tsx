import banner from '../assets/banner.jpg';

export const Banner = () => {
  return (
    <div className='banner'>
      <img className='banner__img' src={banner} alt='banner' />
    </div>
  );
};
