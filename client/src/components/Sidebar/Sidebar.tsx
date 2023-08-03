import RoundedBox from '../shared/containers/RoundedBox';
import { Chip } from '../shared/interactiveElements/Chip/Chip';

export const Sidebar = () => {
  return (
    <div className="hidden md:block xl:col-span-3">
      <div className="flex gap-6 xl:flex-col w-full">
        <RoundedBox className="flex flex-col justify-end items-start h-[11.6875rem] xl:h-[8.5625rem] p-6 bg-[url('/src/assets/gradient_oval.svg')] bg-no-repeat bg-cover bg-center">
          <h1 className="text-white text-xl font-bold ">Frontend Mentor</h1>
          <h2 className="opacity-75 text-white text-[15px] font-medium">
            Feedback Board
          </h2>
        </RoundedBox>
        <RoundedBox className="flex flex-wrap content-start gap-[14px] p-6 h-[11.6875rem] xl:h-[10.375rem]">
          <Chip value="All" />
          <Chip value="UI" />
          <Chip value="UX" />
          <Chip value="Enhancement" />
          <Chip value="Bug" />
          <Chip value="Feature" />
        </RoundedBox>
        <RoundedBox className="p-6 h-[11.6875rem] xl:h-[11.125rem]">
          hello
        </RoundedBox>
      </div>
    </div>
  );
};
