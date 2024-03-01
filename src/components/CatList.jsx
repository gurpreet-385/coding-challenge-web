import { FaMale, FaFemale } from "react-icons/fa";
import { Card } from "react-bootstrap";

const CatList = ({ gender, catDetails }) => (
  <div className="CatList">
    <div className="owner-card">
      <h2 className={gender === "male" ? "male-header" : "female-header"}>
        {gender === "male" ? <FaMale /> : <FaFemale />}
        {gender === "male" ? "Male" : " Female"}
      </h2>
      {catDetails.map((catDetail, index) => (
        <Card key={index} style={{ width: "18rem", margin: "5px" }}>
          <Card.Body>
            <Card.Title>{catDetail.catName}</Card.Title>
            <Card.Text>Owner: {catDetail.ownerName}</Card.Text>
          </Card.Body>
        </Card>
      ))}
    </div>
  </div>
);

export default CatList;
