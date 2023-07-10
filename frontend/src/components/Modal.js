export default function Modal({ children, onDismiss }) {
  const handleBackgroundClick = () => {
    if (onDismiss) {
      onDismiss();
    }
  };

  return (
    <div>
      <div className="fixed z-50 inset-x-0 overflow-y-auto bg-white md:top-[10%] top-5 lg:w-[860px] w-11/12 m-auto">
        <div className="m-5">{children}</div>
      </div>
      <div
        onClick={handleBackgroundClick}
        className="fixed z-40 inset-0 bg-black opacity-25"
      ></div>
    </div>
  );
}
