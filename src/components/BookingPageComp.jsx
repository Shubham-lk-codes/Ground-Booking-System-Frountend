/* eslint-disable react/prop-types */

export const BookingPagecom = ({ name, imageUrl }) => {
  return (
    <>
      <h1>hj</h1>
      <h1>{name}</h1>

      <div>
        <img src={imageUrl} alt={name} />
      </div>
    </>
  );
};
