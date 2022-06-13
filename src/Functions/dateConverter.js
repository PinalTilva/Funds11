import { months } from "../Months/Aapi";

  const dateConvert = (prop) => {
    if (prop?.length > 7) {
      let day = +prop.slice(8, 10);
      let month = months[+prop.slice(5, 7)]?.slice(0, 3);
      return (
        <>
          {prop === "Running" ? prop : day + " " + month}
        </>
      );
    } else {
      let year = +prop?.slice(0, 4);
      let month = months[+prop?.slice(5, 7)]?.slice(0, 3);
      return (
        <>
          {prop === "Running" ? prop : month + " " + year}
        </>
      );
    }
  };

  export default dateConvert;