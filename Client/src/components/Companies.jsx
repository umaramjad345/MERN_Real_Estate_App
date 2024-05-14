import React from "react";

const Companies = () => {
  return (
    <section className="flex justify-around gap-4">
      <div className="p-4 flex items-center">
        <img src="./prologis.png" alt="" className="w-32" />
      </div>
      <div className="p-4 flex items-center">
        <img src="./tower.png" alt="" className="w-32" />
      </div>
      <div className="p-4 flex items-center">
        <img src="./equinix.png" alt="" className="w-32" />
      </div>
      <div className="p-4 flex items-center">
        <img src="./realty.png" alt="" className="w-32" />
      </div>
    </section>
  );
};

export default Companies;
