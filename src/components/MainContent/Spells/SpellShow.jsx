export function SpellShow(props) {
  let spell = props.spell;
  return (
    <div className="overflow-auto w-full h-full scrollbar-hide">
      <div>
        <p className="font-bold text-xl">{spell.name}</p>
        <div className="flex justify-center">
          <p className="font-bold pr-2">Level: </p>
          <p className="font-normal">{spell.level}</p>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="grid grid-cols-2 gap-2 w-[80%]">
          <div className="font-bold">
            Description:
            <p className="font-normal">{spell.description}</p>
          </div>
          <div className="font-bold">
            Higher level:
            <p className="font-normal">{spell.higher_level}</p>
          </div>
          <div className="flex justify-center">
            <p className="font-bold pr-2">Range: </p>
            <p className="font-normal">{spell.range}</p>
          </div>
          <div className="flex justify-center">
            <p className="font-bold pr-2">Material: </p>
            <p className="font-normal">{spell.material}</p>
          </div>
          {spell.ritual === true ? (
            <div className="flex justify-center">
              <p className="font-bold pr-2">Ritual: </p>
              <p className="font-normal">True</p>
            </div>
          ) : (
            <div className="flex justify-center">
              <p className="font-bold pr-2">Ritual: </p>
              <p className="font-normal">False</p>
            </div>
          )}
          <div className="flex justify-center">
            <p className="font-bold pr-2">Duration: </p>
            <p className="font-normal">{spell.duration}</p>
          </div>
          {spell.concentration === true ? (
            <div className="flex justify-center">
              <p className="font-bold pr-2">Concentration: </p>
              <p className="font-normal">True</p>
            </div>
          ) : (
            <div className="flex justify-center">
              <p className="font-bold pr-2">Concentration: </p>
              <p className="font-normal">False</p>
            </div>
          )}
          <div className="flex justify-center">
            <p className="font-bold pr-2">Casting Time: </p>
            <p className="font-normal">{spell.casting_time}</p>
          </div>
          <div className="flex justify-center">
            <p className="font-bold pr-2">DC Type: </p>
            <p className="font-normal">{spell.dc_type}</p>
          </div>
          <div className="flex justify-center">
            <p className="font-bold pr-2">Attack Type: </p>
            <p className="font-normal">{spell.attack_type}</p>
          </div>
          <div className="flex justify-center">
            <p className="font-bold pr-2">Damage Type: </p>
            <p className="font-normal">{spell.damage_type}</p>
          </div>
          <div className="flex justify-center">
            <p className="font-bold pr-2">School: </p>
            <p className="font-normal">{spell.school}</p>
          </div>
          <div className="flex justify-center">
            <p className="font-bold pr-2">Classes: </p>
            <p className="font-normal">{spell.classes}</p>
          </div>
          <div className="flex justify-center">
            <p className="font-bold pr-2">Subclasses: </p>
            <p className="font-normal">{spell.subclasses}</p>
          </div>
          {spell.area_of_effect ? (
            <>
              <div className="flex justify-center">
                <p className="font-bold pr-2">Area of Effect Shape: </p>
                <p className="font-normal">{spell.area_of_effect.type} </p>
              </div>
              <div className="flex justify-center">
                <p className="font-bold pr-2">Area of Effect Size: </p>
                <p className="font-normal">{spell.area_of_effect.size} </p>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
