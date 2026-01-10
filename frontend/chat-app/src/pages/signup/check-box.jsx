import {CheckboxGroup, Checkbox, input} from "@heroui/react";


const CheckBox = ({gender, onGenderChange}) => {

  return (
    <>
      <CheckboxGroup label="Select Your Gender" orientation="horizontal">
        <Checkbox
          value="male"
          isSelected={gender === "male"}
          onValueChange={() => onGenderChange("male")}
        >
          Male
        </Checkbox>
        <Checkbox
          value="female"
          isSelected={gender === "female"}
          onValueChange={() => onGenderChange("female")}
        >
          Female
        </Checkbox>
      </CheckboxGroup>
    </>
  );
}

export default CheckBox;