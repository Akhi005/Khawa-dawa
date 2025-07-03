import { Link } from 'react-router';

export default function Logo() {
  return (
    <div className="p-[2px] rounded-full bg-gradient-to-r from-red-500 to-yellow-500 inline-block">
      <Link to="/">
        <div className="flex flex-col bg-white rounded-full px-4 py-2 items-center justify-center">
          <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-yellow-500">
            Khawa
          </h1>
          <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-red-500">
            Dawa
          </h1>
        </div>
      </Link>
    </div>
  );
}
