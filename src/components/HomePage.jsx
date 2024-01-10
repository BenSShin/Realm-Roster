export function HomePage() {
  return (
    <div className="bg-[#B7B7B7] min-h-screen w-full">
      <div className="min-h-60 bg-gradient-to-r from-[#B31312] to-[#FF7676]">
        <h1 className="text-4xl font-bold text-[#FCF5ED] flex justify-start pl-10 pt-10">Welcome to Professor Roll</h1>
        <p className="flex justify-start pl-[100px] pt-2 ml-5 ">D&D Application</p>
      </div>
      <div className="flex justify-start ">
        <div className="pl-[20px] bg-[url('/public/calm.jpeg')] overflow-hidden bg-no-repeat w-screen h-screen"></div>
        <div className="absolute bg-gradient-to-r from-black border-[5px] border-black  w-[100%] h-[600px] z-10">
          <p className="absolute pl-4 pt-5 text-white z-3 max-w-[50%] font-bold text-xl">Welcome to Prof. Roll!</p>
          <p className="absolute pl-4 pt-[80px] text-white z-3 max-w-[800px] text-left text-lg">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat perferendis perspiciatis nemo voluptates
            id non, maxime quidem saepe in, quo aut omnis voluptatum atque nisi quia facilis a ab ut! Lorem ipsum dolor
            sit amet, consectetur adipisicing elit. Quaerat perferendis perspiciatis nemo voluptates id non, maxime
            quidem saepe in, quo aut omnis voluptatum atque nisi quia facilis a ab ut! Lorem ipsum dolor sit amet,
            consectetur adipisicing elit. Quaerat perferendis perspiciatis nemo voluptates id non, maxime quidem saepe
            in, quo aut omnis voluptatum atque nisi quia facilis a ab ut! Lorem ipsum dolor sit amet, consectetur
            adipisicing elit. Quaerat perferendis perspiciatis nemo voluptates id non, maxime quidem saepe in, quo aut
            omnis voluptatum atque nisi quia facilis a ab ut! Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Quaerat perferendis perspiciatis nemo voluptates id non, maxime quidem saepe in, quo aut omnis voluptatum
            atque nisi quia facilis a ab ut!
          </p>
        </div>
      </div>
    </div>
  );
}
