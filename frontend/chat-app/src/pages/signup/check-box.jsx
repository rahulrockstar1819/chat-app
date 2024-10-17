import { useState } from "react";
const Checkbox = () => {
    const [isCheckedMale, setIsCheckedMale] = useState(false);
    const [isCheckedFemale, setIsCheckedFemale] = useState(false);

    const handleMaleCheckboxChange = () => {
        setIsCheckedMale(prev => !prev);
        setIsCheckedFemale(false);
    };

    const handleFemaleCheckboxChange = () => {
        setIsCheckedFemale(prev => !prev);
        setIsCheckedMale(false);
    };
  return (
    <div className="flex flex-col gap-2">
    <label htmlFor="gender" className="block mb-1 font-medium text-sm sm:text-base">Gender</label>
    <div className="flex items-center justify-items-start gap-2 sm:gap-20">
      <label className="flex items-center text-white gap-2 sm:gap-5">
        <input type="checkbox" className="checkbox"
        name="gender" 
        value="male"
        checked={isCheckedMale}
        onChange={handleMaleCheckboxChange}
        />
        <span className="text-sm sm:text-base">Male</span>
      </label>
      <label className="flex items-center text-white gap-2 sm:gap-5">
        <input type="checkbox" className="checkbox" 
        name="gender" 
        value="female" 
        checked={isCheckedFemale}
        onChange={handleFemaleCheckboxChange}
        />
        <span className="text-sm sm:text-base">Female</span>
      </label>
    </div>
  </div>
  )
}

export default Checkbox;