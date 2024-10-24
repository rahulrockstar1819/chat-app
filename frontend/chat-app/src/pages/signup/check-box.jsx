const Checkbox = ({onCheckboxChange, selectedGender}) => {
    return (
        <div className="flex flex-col gap-2">
            <label htmlFor="gender" className="block mb-1 font-medium text-sm sm:text-base">Gender</label>
            <div className="flex items-center justify-items-start gap-2 sm:gap-20">
                <label className={`flex items-center text-white gap-2 sm:gap-5 ${selectedGender === "male" ? "selected" : ""}`}>
                    <input type="checkbox" className="checkbox"
                    name="gender" 
                    value="male"
                    checked={selectedGender === "male"}
                    onChange={() => onCheckboxChange("male")}
                    />
                    <span className="text-sm sm:text-base">Male</span>
                </label>
                <label className={`flex items-center text-white gap-2 sm:gap-5 ${selectedGender === "female" ? "selected" : ""}`}>
                    <input type="checkbox" className="checkbox" 
                    name="gender" 
                    value="female" 
                    checked={selectedGender === "female"}
                    onChange={() => onCheckboxChange("female")}
                    />
                    <span className="text-sm sm:text-base">Female</span>
                </label>
            </div>
        </div>
    );
}

export default Checkbox;