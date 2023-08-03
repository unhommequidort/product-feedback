import { Sidebar } from '@/components/Sidebar/Sidebar';

const HomePage = () => {
  return (
    <div className="container md:pt-14 xl:pt-24">
      <div className="grid xl:grid-cols-12 xl:gap-[1.875rem]">
        <Sidebar />
        <div className="column xl:col-span-9 border">
          <div className="rounded-box w-full">
            <p>World</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
