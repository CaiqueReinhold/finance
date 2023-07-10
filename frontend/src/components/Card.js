function Card({ children }) {
  return (
    <div className="w-full rounded-lg md:border border-gray-100 md:shadow-lg bg-white md:p-10">
      {children}
    </div>
  );
}

export default Card;
