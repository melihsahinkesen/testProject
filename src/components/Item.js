import React from "react";

const Item = () => {
  return (
    <div className="col-4">
      <div className="item">
        <img src="/assets/img/example.jpg" alt="example image." />
        <div>
          <div>Salamis Bay Conti Resort Hotel</div>
          <hr />
          <ul>
            <li>Kıbrıs</li>
            <li>Girne</li>
            <li>Çatalköy</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Item;