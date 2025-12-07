export const handleWeight = (weightPounds: number) => {
    const stone = Math.floor(weightPounds / 14);
    const pounds = weightPounds % 14;
    return `${stone}st ${pounds}lbs (${weightPounds}lbs)`;
  };

  export const handleHeight = (heightInches: number) => {
    const feet = Math.floor(heightInches / 12);
    const inches = heightInches % 12;
    return `${feet}' ${inches}" (${heightInches}")`;
  };

export const formatDate = (jsonDate:string) => {
    const formatted = new Date(jsonDate).toISOString().split("T")[0];
    return formatted;
  };

  export const handleAge = (jsonDate:string) => {
    //https://www.w3resource.com/javascript-exercises/javascript-date-exercise-18.php
    const diff_ms = Date.now() - Date.parse(jsonDate);
    const age_dt = new Date(diff_ms);
    const birthdateFormatted = formatDate(jsonDate);
    const age = Math.abs(age_dt.getUTCFullYear() - 1970);
    return `${birthdateFormatted} (${age})`;
  }

  