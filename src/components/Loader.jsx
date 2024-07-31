import { Bars, MagnifyingGlass } from 'react-loader-spinner';

function Loader({ type }) {
  return (
    <div className="flex items-center justify-center mx-auto mt-8">
      {type === 'search' ? (
        <MagnifyingGlass
          visible={true}
          height="80"
          width="80"
          ariaLabel="magnifying-glass-loading"
          wrapperStyle={{}}
          wrapperClass="magnifying-glass-wrapper"
          glassColor="#c0efff"
          color="#0092ca"
        />
      ) : (
        <Bars
          height="60"
          width="60"
          color="#0092ca"
          ariaLabel="bars-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      )}
    </div>
  );
}

export default Loader;
