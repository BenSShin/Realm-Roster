export function HomePage() {
  return (
    <div>
      <div className="min-h-60 bg-gradient-to-r from-[#B31312] to-[#FF7676]">
        <h1 className="text-3xl font-bold text-[#FCF5ED] flex justify-start pl-10 pt-10">Welcome to Roll 20</h1>
        <p className="flex justify-start pl-10 ml-5 ">Dungeons and Dragons application</p>
      </div>
      <div>
        <div className="absolute top-50 right-0 bg-gradient-to-l from-black h-[49%] w-[100%] z-20">
          <p className="flex justify-end p-5 text-white">hello</p>
        </div>
        <img
          className="bg-gradient-to-r border-2 border-black z-10"
          src="https://static1.cbrimages.com/wordpress/wp-content/uploads/2022/08/dnd-5e-dragonlance-chapter-2-art-1.jpg"
          alt="Dnd img"
        />
        <p></p>
      </div>
    </div>
  );
}
