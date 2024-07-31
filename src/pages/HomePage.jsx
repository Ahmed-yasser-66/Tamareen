import Hero from '../components/Hero';

function HomePage() {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex items-center justify-center flex-grow">
        <Hero />
      </div>
    </div>
  );
}

export default HomePage;
