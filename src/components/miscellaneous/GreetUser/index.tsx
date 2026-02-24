interface GreetUserProps {
  userName: string;
}

export default function GreetUser({ userName }: GreetUserProps) {
  return (
    <div className="flex flex-col w-full h-[80px] bg-rocket">
      <span className="text-sm xl:text-md text-gray-700 dark:text-gray-100 mb-0">
        Olá,
      </span>
      <strong className="text-md xl:text-lg text-black dark:text-white font-bold">
        {userName}
      </strong>
    </div>
  );
}
